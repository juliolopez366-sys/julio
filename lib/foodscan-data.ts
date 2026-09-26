// Modelo de datos de la app interna (Sesión 5). Simula con localStorage el esquema
// que ESTADO.md define para Supabase (comidas/sintomas/correlaciones/perfiles) —
// se conecta al backend real en Sesión 6 (30-INTEGRACION-IA.md, arquitectura async).

export type NivelRiesgo = 'bajo' | 'medio' | 'alto';

export interface Comida {
  id: string;
  nombreComida: string;
  descripcion: string;
  ingredientes: string[];
  ingredientesRiesgo: string[];
  nivelRiesgo: NivelRiesgo;
  colorFoto: [string, string];
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

const CLAVE_COMIDAS = 'foodscan_comidas';
const CLAVE_SINTOMAS = 'foodscan_sintomas';
const CLAVE_PERFIL = 'foodscan_perfil';

function crearSemilla(ahora: number) {
  const dia = 86_400_000;
  const hora = 3_600_000;

  const base: { id: string; nombreComida: string; descripcion: string; ingredientes: string[]; registradoEn: string; colorFoto: [string, string] }[] = [
    { id: 'c1', nombreComida: 'Desayuno', descripcion: 'Avena con plátano', ingredientes: ['avena', 'plátano'], registradoEn: new Date(ahora - 10 * dia - 6 * hora).toISOString(), colorFoto: ['#dcd0a8', '#a9925f'] },
    { id: 'c2', nombreComida: 'Almuerzo', descripcion: 'Pasta con ajo y tomate', ingredientes: ['pasta', 'ajo', 'tomate', 'aceite de oliva'], registradoEn: new Date(ahora - 10 * dia).toISOString(), colorFoto: ['#e2b98a', '#8f5a34'] },
    { id: 'c3', nombreComida: 'Desayuno', descripcion: 'Huevo revuelto con espinaca', ingredientes: ['huevo', 'espinaca'], registradoEn: new Date(ahora - 7 * dia - 4 * hora).toISOString(), colorFoto: ['#e8d9a0', '#b89b4e'] },
    { id: 'c4', nombreComida: 'Cena', descripcion: 'Pollo con cebolla salteada', ingredientes: ['pollo', 'cebolla', 'pimiento'], registradoEn: new Date(ahora - 7 * dia + 10 * hora).toISOString(), colorFoto: ['#d7a373', '#7d4f2a'] },
    { id: 'c5', nombreComida: 'Almuerzo', descripcion: 'Ensalada con pollo y espinaca', ingredientes: ['pollo', 'espinaca', 'pepino'], registradoEn: new Date(ahora - 6 * dia - 4 * hora).toISOString(), colorFoto: ['#bcd0a0', '#5f7a45'] },
    { id: 'c6', nombreComida: 'Cena', descripcion: 'Hummus de garbanzo con ajo', ingredientes: ['garbanzo', 'ajo', 'limón'], registradoEn: new Date(ahora - 6 * dia + 11 * hora).toISOString(), colorFoto: ['#d9c48a', '#8c752f'] },
    { id: 'c7', nombreComida: 'Cena', descripcion: 'Sopa de miso con ajo', ingredientes: ['ajo', 'miso', 'fideos'], registradoEn: new Date(ahora - 5 * dia + 19 * hora).toISOString(), colorFoto: ['#c9ad7a', '#71592b'] },
    { id: 'c8', nombreComida: 'Almuerzo', descripcion: 'Pizza con ajo y masa de trigo', ingredientes: ['trigo', 'ajo', 'queso'], registradoEn: new Date(ahora - 1 * dia).toISOString(), colorFoto: ['#dba25c', '#7a4a1f'] },
    { id: 'c9', nombreComida: 'Desayuno', descripcion: 'Pan tostado con miel', ingredientes: ['trigo', 'miel'], registradoEn: new Date(ahora - 3 * hora).toISOString(), colorFoto: ['#e6c98f', '#a3763a'] },
  ];

  const comidas: Comida[] = base.map((c) => {
    const { nivel, ingredientesRiesgo } = calcularRiesgo(c.ingredientes);
    return { ...c, nivelRiesgo: nivel, ingredientesRiesgo };
  });

  const sintomas: Sintoma[] = [
    { id: 's1', tipo: 'dolor', intensidad: 2, registradoEn: new Date(ahora - 10 * dia + 6 * hora).toISOString() },
    { id: 's2', tipo: 'hinchazon', intensidad: 3, registradoEn: new Date(ahora - 6 * dia + 15 * hora).toISOString() },
    { id: 's3', tipo: 'urgencia', intensidad: 2, registradoEn: new Date(ahora - 1 * dia + 10 * hora).toISOString() },
  ];

  const perfil: Perfil = { diasMeta: 5, rachaActual: 7, rachaMaxima: 7, congeladoresDisponibles: 1 };

  return { comidas, sintomas, perfil };
}

function leerJSON<T>(clave: string): T | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(clave);
  return raw ? (JSON.parse(raw) as T) : null;
}

function escribirJSON(clave: string, valor: unknown) {
  window.localStorage.setItem(clave, JSON.stringify(valor));
}

export function asegurarSemilla() {
  if (typeof window === 'undefined') return;
  if (window.localStorage.getItem(CLAVE_COMIDAS)) return;
  const { comidas, sintomas, perfil } = crearSemilla(Date.now());
  escribirJSON(CLAVE_COMIDAS, comidas);
  escribirJSON(CLAVE_SINTOMAS, sintomas);
  escribirJSON(CLAVE_PERFIL, perfil);
}

export function getComidas(): Comida[] {
  return (leerJSON<Comida[]>(CLAVE_COMIDAS) ?? []).sort((a, b) => new Date(b.registradoEn).getTime() - new Date(a.registradoEn).getTime());
}

export function getSintomas(): Sintoma[] {
  return (leerJSON<Sintoma[]>(CLAVE_SINTOMAS) ?? []).sort((a, b) => new Date(b.registradoEn).getTime() - new Date(a.registradoEn).getTime());
}

export function getPerfil(): Perfil {
  return leerJSON<Perfil>(CLAVE_PERFIL) ?? { diasMeta: 5, rachaActual: 0, rachaMaxima: 0, congeladoresDisponibles: 0 };
}

export function agregarComida(input: { nombreComida: string; descripcion: string; ingredientes: string[]; colorFoto: [string, string] }): Comida {
  const { nivel, ingredientesRiesgo } = calcularRiesgo(input.ingredientes);
  const comida: Comida = {
    id: `c${Date.now()}`,
    nombreComida: input.nombreComida,
    descripcion: input.descripcion,
    ingredientes: input.ingredientes,
    ingredientesRiesgo,
    nivelRiesgo: nivel,
    colorFoto: input.colorFoto,
    registradoEn: new Date().toISOString(),
  };
  const comidas = [...getComidas(), comida];
  escribirJSON(CLAVE_COMIDAS, comidas);
  return comida;
}

export function agregarSintoma(input: { tipo: TipoSintoma; intensidad: 1 | 2 | 3 }): Sintoma {
  const sintoma: Sintoma = { id: `s${Date.now()}`, tipo: input.tipo, intensidad: input.intensidad, registradoEn: new Date().toISOString() };
  const sintomas = [...getSintomas(), sintoma];
  escribirJSON(CLAVE_SINTOMAS, sintomas);
  return sintoma;
}

export function eliminarComida(id: string) {
  escribirJSON(CLAVE_COMIDAS, getComidas().filter((c) => c.id !== id));
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
