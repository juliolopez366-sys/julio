-- Corrige 2 hallazgos reales del linter de seguridad tras 0004_hotmart.sql:
-- (1) las 3 tablas nuevas quedaron sin RLS (expuestas por PostgREST por defecto);
-- (2) el `revoke ... from anon, authenticated` no bastó — Postgres también concede
--     EXECUTE a PUBLIC al crear una función, y anon/authenticated heredan de PUBLIC.

alter table public.eventos_procesados enable row level security;
alter table public.webhook_log enable row level security;
alter table public.transacciones_pago enable row level security;
-- Sin políticas a propósito: son tablas internas del webhook, solo el service_role
-- (que ignora RLS) las toca. Ningún usuario normal debe poder leerlas ni escribirlas.

revoke execute on function public.buscar_usuario_id_por_email(text) from public;
revoke execute on function public.aplicar_evento_hotmart(text, text, text, uuid, text, text) from public;
