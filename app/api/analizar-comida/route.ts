// BFF de análisis de comida (Sesión 6, paso 3 — 30-INTEGRACION-IA.md).
// La clave de Anthropic vive SOLO aquí (variable de entorno de servidor, jamás
// NEXT_PUBLIC_*). Circuit-breaker: máximo N análisis/usuario/día antes de negarse,
// para que un error de cliente o un abuso no genere una factura sorpresa.
import Anthropic from '@anthropic-ai/sdk';
import { NextResponse, type NextRequest } from 'next/server';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';
import { crearClienteSupabaseAdmin } from '@/lib/supabase/admin';

const MODELO = 'claude-haiku-4-5-20251001';
const LIMITE_ANALISIS_POR_DIA = 20;
// Estimado aproximado (no es la tarifa exacta de Anthropic) — solo para observabilidad,
// no se usa como corte duro (el corte duro es el conteo de llamadas de arriba).
const COSTO_ESTIMADO_POR_1K_TOKENS_ENTRADA = 0.001;
const COSTO_ESTIMADO_POR_1K_TOKENS_SALIDA = 0.005;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: NextRequest) {
  const supabase = await crearClienteSupabaseServidor();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const admin = crearClienteSupabaseAdmin();

  // Circuit-breaker: contar análisis de las últimas 24h de este usuario.
  const desde = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await admin
    .from('ai_calls')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .gte('creado_en', desde);

  if ((count ?? 0) >= LIMITE_ANALISIS_POR_DIA) {
    return NextResponse.json(
      { error: 'Llegaste al límite de análisis de hoy. Intenta de nuevo mañana.' },
      { status: 429 }
    );
  }

  const { imagenBase64, mediaType } = (await request.json()) as {
    imagenBase64?: string;
    mediaType?: string;
  };
  if (!imagenBase64 || !mediaType) {
    return NextResponse.json({ error: 'Falta la imagen' }, { status: 400 });
  }

  try {
    const respuesta = await anthropic.messages.create({
      model: MODELO,
      max_tokens: 1024,
      tools: [
        {
          name: 'registrar_analisis',
          description: 'Registra el análisis FODMAP de la comida en la foto.',
          input_schema: {
            type: 'object',
            properties: {
              descripcion: { type: 'string', description: 'Descripción corta y humana del plato, ej. "Pasta con ajo y tomate"' },
              ingredientes: { type: 'array', items: { type: 'string' }, description: 'Todos los ingredientes visibles o muy probables' },
              ingredientes_riesgo: { type: 'array', items: { type: 'string' }, description: 'Subconjunto de ingredientes con alto o medio contenido FODMAP (ajo, cebolla, trigo, lácteos, miel, etc.)' },
              nivel_riesgo: { type: 'string', enum: ['bajo', 'medio', 'alto'], description: 'Nivel de riesgo FODMAP general del plato' },
            },
            required: ['descripcion', 'ingredientes', 'ingredientes_riesgo', 'nivel_riesgo'],
          },
        },
      ],
      tool_choice: { type: 'tool', name: 'registrar_analisis' },
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType as 'image/jpeg' | 'image/png' | 'image/webp', data: imagenBase64 },
            },
            {
              type: 'text',
              text: 'Analiza esta foto de comida para alguien con Síndrome del Intestino Irritable / dieta FODMAP. Identifica los ingredientes visibles o muy probables dado el tipo de plato (incluyendo los que suelen esconderse en salsas o preparaciones, como ajo o cebolla en polvo), marca cuáles tienen alto/medio FODMAP, y da un nivel de riesgo general. Sé conservador: si no estás seguro de un ingrediente oculto, inclúyelo igual como riesgo probable en vez de omitirlo.',
            },
          ],
        },
      ],
    });

    const bloqueHerramienta = respuesta.content.find((b) => b.type === 'tool_use');
    if (!bloqueHerramienta || bloqueHerramienta.type !== 'tool_use') {
      throw new Error('La IA no devolvió un análisis estructurado');
    }
    const analisis = bloqueHerramienta.input as {
      descripcion: string;
      ingredientes: string[];
      ingredientes_riesgo: string[];
      nivel_riesgo: 'bajo' | 'medio' | 'alto';
    };

    const costoEstimado =
      (respuesta.usage.input_tokens / 1000) * COSTO_ESTIMADO_POR_1K_TOKENS_ENTRADA +
      (respuesta.usage.output_tokens / 1000) * COSTO_ESTIMADO_POR_1K_TOKENS_SALIDA;

    await admin.from('ai_calls').insert({
      user_id: user.id,
      feature: 'analizar_comida',
      modelo: MODELO,
      tokens_entrada: respuesta.usage.input_tokens,
      tokens_salida: respuesta.usage.output_tokens,
      costo_usd: costoEstimado,
      estado: 'ok',
    });

    return NextResponse.json(analisis);
  } catch (error) {
    await admin.from('ai_calls').insert({
      user_id: user.id,
      feature: 'analizar_comida',
      modelo: MODELO,
      estado: 'error',
    });
    console.error('Error analizando comida:', error);
    return NextResponse.json({ error: 'No pudimos analizar la foto. Intenta de nuevo.' }, { status: 500 });
  }
}
