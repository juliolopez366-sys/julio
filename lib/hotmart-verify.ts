// Verificación del webhook de Hotmart — Sesión 6, paso 7 (18-VENTA-HOTMART.md).
// El hottok es un secreto compartido por cuenta; la comparación debe ser en tiempo
// constante (nunca === / !==) para no filtrar por timing cuántos bytes acertó un
// atacante. Fail-secure: si falta la variable de entorno, la app no arranca.
import crypto from 'node:crypto';

const HOTTOK = process.env.HOTMART_HOTTOK;
if (!HOTTOK) throw new Error('FALTA HOTMART_HOTTOK — el webhook no puede operar de forma segura');

function timingSafeEqualStr(a: string, b: string): boolean {
  const ba = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export function verificarHotmart(hottok: string | undefined): boolean {
  if (!hottok) return false;
  return timingSafeEqualStr(hottok, HOTTOK!);
}
