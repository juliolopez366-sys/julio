-- Permite registrar en webhook_log los eventos de Hotmart que el endpoint no mapea
-- (resultado 'ignored'). Sin esto, un evento con un nombre inesperado (p. ej. el de
-- inicio de prueba, que es un placeholder sin verificar) se descartaba en silencio y
-- era imposible saber qué estaba mandando Hotmart realmente.
alter table public.webhook_log drop constraint if exists webhook_log_resultado_check;
alter table public.webhook_log add constraint webhook_log_resultado_check
  check (resultado in ('applied', 'duplicate', 'illegal', 'unauthorized', 'error', 'no_user', 'ignored'));
