// Webhook de Hotmart — Sesión 6, paso 7 (18-VENTA-HOTMART.md, sección "SEGURIDAD DEL
// WEBHOOK DE HOTMART"). Pipeline obligatorio: autenticidad -> frescura -> parse ->
// catálogo permitido -> dedupe -> ledger -> transición de membresía -> 200.
// Este endpoint es el más atacado de la app: si alguien lo engaña se autootorga
// FoodScan Pro gratis. Nunca tocar la base de datos antes de las 3 primeras defensas.
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { verificarHotmart } from '@/lib/hotmart-verify';
import { estadoParaEvento, EVENTO_CAMBIO_DE_PLAN } from '@/lib/membership-fsm';
import { crearClienteSupabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs'; // necesitamos node:crypto y el body crudo (no Edge)

const VENTANA_REPLAY_MS = 5 * 60 * 1000;

// ⚠️ Catálogo permitido — PRODUCT_ID se verifica en el panel de Hotmart (Herramientas
// → Mis productos → el ID numérico del producto) y se guarda en esta variable de
// entorno para no hardcodear el número en el código.
const PRODUCT_ID_PERMITIDO = process.env.HOTMART_PRODUCT_ID;

function esFresco(timestampMs?: number): boolean {
  if (!timestampMs) return true; // si el evento no trae fecha fiable, no bloquear por esto
  const edad = Date.now() - timestampMs;
  return edad >= 0 && edad <= VENTANA_REPLAY_MS;
}

export async function POST(request: NextRequest) {
  const admin = crearClienteSupabaseAdmin();

  // 1. Cuerpo CRUDO (bytes exactos) — necesario para un futuro hash de auditoría y
  // para cualquier firma que Hotmart documente sobre el raw body. NUNCA parsear antes.
  const rawBody = await request.text();

  // 2. AUTENTICIDAD — hottok en tiempo constante, sobre HTTPS (Vercel lo fuerza).
  const hottok = request.headers.get('x-hotmart-hottok') ?? undefined;
  if (!verificarHotmart(hottok)) {
    await admin.from('webhook_log').insert({ resultado: 'unauthorized' });
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // 3. Parsear SOLO después de verificar.
  let payload: Record<string, any>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }

  // 4. FRESCURA (anti-replay).
  const ts: number | undefined = payload.creation_date ?? payload.data?.purchase?.approved_date;
  if (!esFresco(ts)) {
    return NextResponse.json({ error: 'stale' }, { status: 400 });
  }

  const evento: string = payload.event;
  const eventId: string =
    payload.id ?? payload.event_id ?? payload.data?.purchase?.transaction ?? `${evento}:${payload.data?.buyer?.email}:${ts ?? ''}`;
  const email: string | undefined = payload.data?.buyer?.email ?? payload.email;
  const subscriberCode: string | undefined = payload.data?.subscription?.subscriber?.code;
  const productId: string | undefined = payload.data?.product?.id?.toString();

  if (evento === EVENTO_CAMBIO_DE_PLAN) {
    // SWITCH_PLAN: no transiciona el estado de la membresía — solo actualiza el plan
    // elegido. Se implementa cuando el producto tenga más de un nivel de plan real;
    // por ahora el mensual/anual de FoodScan comparten el mismo acceso, así que no
    // hay nada que actualizar aún. Se responde 200 para que Hotmart no reintente.
    return NextResponse.json({ received: true, ignored: evento });
  }

  const nuevoEstado = estadoParaEvento(evento);
  if (!nuevoEstado) {
    return NextResponse.json({ received: true, ignored: evento }); // evento que no mapeamos, 200
  }

  // 5. CATÁLOGO PERMITIDO — rechazar un producto ajeno antes de tocar cualquier cuenta.
  if (PRODUCT_ID_PERMITIDO && productId && productId !== PRODUCT_ID_PERMITIDO) {
    await admin.from('webhook_log').insert({ event_id: eventId, tipo: evento, resultado: 'unauthorized' });
    return NextResponse.json({ error: 'producto no reconocido' }, { status: 400 });
  }

  if (!email) {
    await admin.from('webhook_log').insert({ event_id: eventId, tipo: evento, resultado: 'error' });
    return NextResponse.json({ error: 'sin correo del comprador' }, { status: 400 });
  }

  // 6. Resolver el user_id ANTES de la transacción idempotente (patrón A de 18):
  // si no existe cuenta, se crea primero — así cuando se marca el evento como
  // procesado, el acceso ya está garantizado (nunca "pagó y no entra").
  const { data: userIdExistente } = await admin.rpc('buscar_usuario_id_por_email', { p_email: email });
  let userId: string | null = userIdExistente ?? null;

  if (!userId) {
    const { data: nuevoUsuario, error: errorCrear } = await admin.auth.admin.createUser({
      email,
      email_confirm: true, // viene de una compra verificada por Hotmart, no hace falta re-confirmar
    });
    if (errorCrear || !nuevoUsuario.user) {
      console.error('webhook hotmart: no se pudo crear la cuenta', { evento, codigo: errorCrear?.code });
      await admin.from('webhook_log').insert({ event_id: eventId, tipo: evento, resultado: 'error' });
      return NextResponse.json({ error: 'no se pudo crear la cuenta' }, { status: 500 }); // 5xx → Hotmart reintenta
    }
    userId = nuevoUsuario.user.id;
  }

  const payloadHash = crypto.createHash('sha256').update(rawBody).digest('hex');

  // 7. IDEMPOTENCIA + TRANSICIÓN, todo atómico en la función de Postgres.
  const { data, error } = await admin.rpc('aplicar_evento_hotmart', {
    p_event_id: eventId,
    p_event_type: evento,
    p_payload_hash: payloadHash,
    p_user_id: userId,
    p_subscriber_code: subscriberCode ?? null,
    p_nuevo_estado: nuevoEstado,
  });

  if (error) {
    console.error('webhook hotmart: error aplicando evento', { evento, codigo: error.code }); // sin PII
    await admin.from('webhook_log').insert({ event_id: eventId, tipo: evento, resultado: 'error' });
    return NextResponse.json({ error: 'processing failed' }, { status: 500 }); // 5xx → Hotmart reintenta
  }

  const resultado: string = data?.status ?? 'applied';
  await admin.from('webhook_log').insert({ event_id: eventId, tipo: evento, resultado });

  // 8. Siempre 200 cuando la decisión ya se tomó (incluido duplicado/ilegal): así
  // Hotmart deja de reintentar. Solo los 5xx de arriba piden reintento real.
  return NextResponse.json({ received: true, result: resultado });
}
