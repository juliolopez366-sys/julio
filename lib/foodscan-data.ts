// Capa de datos de la app interna (Sesión 6, paso 3) — antes vivía en localStorage,
// ahora lee/escribe la base de datos real de Supabase (RLS por usuario, ver
// supabase/migrations/). La foto real se analiza con IA vía /api/analizar-comida
// (components/app/sheet-nueva-comida.tsx); los presets siguen usando la heurística
// local (calcularRiesgo) para no gastar una llamada de IA en un ejemplo rápido.

import { crearClienteSupabase } from '@/lib/supabase/client';

export type NivelRiesgo = 'bajo' | 'medio' | 'alto';

export interface Comida {
  id: string;
  nombreComida: string;
  descripcion: string;
  ingredientes: string[];
  ingredientesRiesgo: string[];
  nivelRiesgo: NivelRiesgo;
  colorFoto: [string, string];
  fotoUrl: string | null;
  registradoEn: string;
}

export type TipoSintoma = 'hinchazon' | 'dolor' | 'urgencia';

export interface Sintoma {
  id: string;
  tipo: TipoSintoma;
  intensidad: 1 | 2 | 3;
  registradoEn: string;
}

export interface Perfil {
  diasMeta: number;
  rachaActual: number;
  rachaMaxima: number;
  congeladoresDisponibles: number;
}

export interface Correlacion {
  ingrediente: string;
  confianza: number;
  vecesComido: number;
  vecesConSintoma: number;
  comidasRelacionadas: string[];
}

const FODMAP_ALTO = ['ajo', 'cebolla', 'trigo', 'leche', 'miel', 'manzana', 'pera', 'frijoles', 'garbanzo', 'coliflor', 'champiñones', 'cebada'];
const FODMAP_MEDIO = ['tomate', 'plátano maduro', 'queso crema', 'maíz', 'uva'];

export function calcularRiesgo(ingredientes: string[]): { nivel: NivelRiesgo; ingredientesRiesgo: string[] } {
  const bajos = ingredientes.map((i) => i.toLowerCase());
  const alto = bajos.filter((i) => FODMAP_ALTO.includes(i));
  const medio = bajos.filter((i) => FODMAP_MEDIO.includes(i));
  const nivel: NivelRiesgo = alto.length ? 'alto' : medio.length ? 'medio' : 'bajo';
  return { nivel, ingredientesRiesgo: [...alto, ...medio] };
}

export function calcularCorrelacion(comidas: Comida[], sintomas: Sintoma[]): Correlacion | null {
  const candidatos = new Map<string, { vecesComido: number; vecesConSintoma: number; comidas: string[] }>();
  for (const c of comidas) {
    for (const ing of c.ingredientesRiesgo) {
      const entry = candidatos.get(ing) ?? { vecesComido: 0, vecesConSintoma: 0, comidas: [] };
      entry.vecesComido++;
      entry.comidas.push(c.id);
      const tuvoSintomaEn48h = sintomas.some((s) => {
        const diffHoras = (new Date(s.registradoEn).getTime() - new Date(c.registradoEn).getTime()) / 3_600_000;
        return diffHoras >= 0 && diffHoras <= 48;
      });
      if (tuvoSintomaEn48h) entry.vecesConSintoma++;
      candidatos.set(ing, entry);
    }
  }
  let mejor: Correlacion | null = null;
  for (const [ingrediente, e] of candidatos) {
    if (e.vecesComido < 2) continue;
    const confianza = e.vecesConSintoma / e.vecesComido;
    if (!mejor || confianza > mejor.confianza || (confianza === mejor.confianza && e.vecesComido > mejor.vecesComido)) {
      mejor = { ingrediente, confianza, vecesComido: e.vecesComido, vecesConSintoma: e.vecesConSintoma, comidasRelacionadas: e.comidas };
    }
  }
  return mejor && mejor.confianza >= 0.5 ? mejor : null;
}

// --- Mapeo fila de Supabase (snake_case) <-> tipo de la app (camelCase) ---

type FilaComida = {
  id: string;
  nombre_comida: string;
  descripcion: string;
  ingredientes: string[];
  ingredientes_riesgo: string[];
  nivel_riesgo: NivelRiesgo;
  color_foto: [string, string] | null;
  foto_url: string | null;
  registrado_en: string;
};

function mapearComida(fila: FilaComida): Comida {
  return {
    id: fila.id,
    nombreComida: fila.nombre_comida,
    descripcion: fila.descripcion,
    ingredientes: fila.ingredientes,
    ingredientesRiesgo: fila.ingredientes_riesgo,
    nivelRiesgo: fila.nivel_riesgo,
    colorFoto: fila.color_foto ?? ['#dcd0a8', '#a9925f'],
    fotoUrl: fila.foto_url,
    registradoEn: fila.registrado_en,
  };
}

type FilaSintoma = { id: string; tipo: TipoSintoma; intensidad: 1 | 2 | 3; registrado_en: string };

function mapearSintoma(fila: FilaSintoma): Sintoma {
  return { id: fila.id, tipo: fila.tipo, intensidad: fila.intensidad, registradoEn: fila.registrado_en };
}

export async function getComidas(): Promise<Comida[]> {
  const supabase = crearClienteSupabase();
  const { data, error } = await supabase.from('comidas').select('*').order('registrado_en', { ascending: false });
  if (error) throw error;
  return (data as FilaComida[]).map(mapearComida);
}

export async function getSintomas(): Promise<Sintoma[]> {
  const supabase = crearClienteSupabase();
  const { data, error } = await supabase.from('sintomas').select('*').order('registrado_en', { ascending: false });
  if (error) throw error;
  return (data as FilaSintoma[]).map(mapearSintoma);
}

export async function getPerfil(): Promise<Perfil> {
  const supabase = crearClienteSupabase();
  const { data, error } = await supabase.from('perfiles').select('*').single();
  if (error || !data) return { diasMeta: 5, rachaActual: 0, rachaMaxima: 0, congeladoresDisponibles: 1 };
  return {
    diasMeta: data.dias_meta,
    rachaActual: data.racha_actual,
    rachaMaxima: data.racha_maxima,
    congeladoresDisponibles: data.congeladores_disponibles,
  };
}

/** Comida a partir de un preset (sin IA) o de un análisis de IA ya resuelto. */
export async function agregarComida(input: {
  nombreComida: string;
  descripcion: string;
  ingredientes: string[];
  ingredientesRiesgo?: string[];
  nivelRiesgo?: NivelRiesgo;
  colorFoto: [string, string];
  fotoUrl?: string | null;
}): Promise<Comida> {
  const supabase = crearClienteSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('No autenticado');

  const { nivel, ingredientesRiesgo } =
    input.nivelRiesgo && input.ingredientesRiesgo
      ? { nivel: input.nivelRiesgo, ingredientesRiesgo: input.ingredientesRiesgo }
      : calcularRiesgo(input.ingredientes);

  const { data, error } = await supabase
    .from('comidas')
    .insert({
      user_id: user.id,
      nombre_comida: input.nombreComida,
      descripcion: input.descripcion,
      ingredientes: input.ingredientes,
      ingredientes_riesgo: ingredientesRiesgo,
      nivel_riesgo: nivel,
      color_foto: input.colorFoto,
      foto_url: input.fotoUrl ?? null,
    })
    .select('*')
    .single();
  if (error) throw error;
  return mapearComida(data as FilaComida);
}

export async function agregarSintoma(input: { tipo: TipoSintoma; intensidad: 1 | 2 | 3 }): Promise<Sintoma> {
  const supabase = crearClienteSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('No autenticado');
  const { data, error } = await supabase
    .from('sintomas')
    .insert({ user_id: user.id, tipo: input.tipo, intensidad: input.intensidad })
    .select('*')
    .single();
  if (error) throw error;
  return mapearSintoma(data as FilaSintoma);
}

export async function eliminarComida(id: string): Promise<void> {
  const supabase = crearClienteSupabase();
  const { error } = await supabase.from('comidas').delete().eq('id', id);
  if (error) throw error;
}

export const COMIDAS_PRESET: { nombreComida: string; descripcion: string; ingredientes: string[]; colorFoto: [string, string] }[] = [
  { nombreComida: 'Desayuno', descripcion: 'Yogur con arándanos', ingredientes: ['yogur', 'arándanos'], colorFoto: ['#d8d3e0', '#8a7fa3'] },
  { nombreComida: 'Almuerzo', descripcion: 'Arroz con pollo y zanahoria', ingredientes: ['arroz', 'pollo', 'zanahoria'], colorFoto: ['#e4c98a', '#a37b34'] },
  { nombreComida: 'Almuerzo', descripcion: 'Sándwich de pan de trigo con queso', ingredientes: ['trigo', 'queso', 'lechuga'], colorFoto: ['#e0c48f', '#93702f'] },
  { nombreComida: 'Cena', descripcion: 'Salmón con espárragos', ingredientes: ['salmón', 'espárragos'], colorFoto: ['#d4a68a', '#7a4f38'] },
  { nombreComida: 'Cena', descripcion: 'Tacos con cebolla y cilantro', ingredientes: ['tortilla de maíz', 'cebolla', 'cilantro'], colorFoto: ['#dba25c', '#8a5a24'] },
  { nombreComida: 'Snack', descripcion: 'Manzana con crema de maní', ingredientes: ['manzana', 'maní'], colorFoto: ['#cdd8a0', '#6f8a45'] },
];

export const ETIQUETA_SINTOMA: Record<TipoSintoma, string> = {
  hinchazon: 'Hinchazón',
  dolor: 'Dolor abdominal',
  urgencia: 'Urgencia / diarrea',
};

export const ETIQUETA_RIESGO: Record<NivelRiesgo, string> = {
  bajo: 'Bajo',
  medio: 'Medio',
  alto: 'Alto',
};
