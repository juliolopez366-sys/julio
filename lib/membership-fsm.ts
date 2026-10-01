// Máquina de estados de la membresía de Hotmart — Sesión 6, paso 7 (18-VENTA-HOTMART.md).
// Traduce el evento que manda Hotmart al estado de suscripción de `perfiles`. El
// cambio de estado real (atómico, con idempotencia) vive en la función de Postgres
// `aplicar_evento_hotmart` (supabase/migrations/0004_hotmart.sql) — este archivo solo
// decide QUÉ estado corresponde a cada evento y si el acceso debe ser completo.
export type EstadoSuscripcion =
  | 'prueba'
  | 'activo'
  | 'atrasado'
  | 'cancelado'
  | 'expirado'
  | 'reembolsado'
  | 'contracargo';

// ⚠️ PLACEHOLDER — verificar con una compra sandbox CON prueba activada antes de
// confiar en la métrica prueba→pago (ver "OPERACIONES DE SUSCRIPCIÓN" en 18). Es
// posible que tu cuenta mande PURCHASE_APPROVED con valor 0 al iniciar la prueba en
// vez de un evento propio — si es así, hay que mapear ESE caso a 'prueba', no a
// 'activo', o first_paid_at queda mal fijado desde el día 0.
const EVENTO_INICIO_PRUEBA = 'SUBSCRIPTION_TRIAL_START'; // (verificar en el panel real)

const EVENTO_A_ESTADO: Record<string, EstadoSuscripcion> = {
  [EVENTO_INICIO_PRUEBA]: 'prueba',
  PURCHASE_APPROVED: 'activo',
  PURCHASE_COMPLETE: 'activo',
  PURCHASE_DELAYED: 'atrasado',
  SUBSCRIPTION_CANCELLATION: 'cancelado',
  PURCHASE_EXPIRED: 'expirado',
  PURCHASE_REFUNDED: 'reembolsado',
  PURCHASE_CHARGEBACK: 'contracargo',
};

// Cambio de plan nativo mensual↔anual: NO transiciona el estado de la suscripción
// (sigue en prueba/activo) — se maneja aparte en el handler, actualizando el plan
// elegido sin tocar estado_suscripcion.
export const EVENTO_CAMBIO_DE_PLAN = 'SWITCH_PLAN';

const ESTADOS_TERMINALES_NEGATIVOS: EstadoSuscripcion[] = ['reembolsado', 'contracargo'];
const ACCESO_COMPLETO: EstadoSuscripcion[] = ['prueba', 'activo'];

export function estadoParaEvento(evento: string): EstadoSuscripcion | null {
  return EVENTO_A_ESTADO[evento] ?? null;
}

/** ¿Es legal pasar de `desde` a `hacia`? Bloquea reactivar un reembolso/contracargo
 * con un evento viejo de acceso reentregado. */
export function transicionValida(desde: EstadoSuscripcion | null, hacia: EstadoSuscripcion): boolean {
  if (desde === null) return true;
  if (ESTADOS_TERMINALES_NEGATIVOS.includes(desde) && (hacia === 'activo' || hacia === 'prueba')) return false;
  return true;
}

export function tieneAccesoCompleto(
  estado: EstadoSuscripcion,
  ahora: Date,
  accesoHasta?: Date | null,
  periodoGraciaHasta?: Date | null
): boolean {
  if (ACCESO_COMPLETO.includes(estado)) return true;
  if (estado === 'cancelado') return !!accesoHasta && ahora < accesoHasta;
  if (estado === 'atrasado') return !!periodoGraciaHasta && ahora < periodoGraciaHasta;
  return false;
}
