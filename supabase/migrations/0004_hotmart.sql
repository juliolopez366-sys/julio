-- FoodScan — webhook de Hotmart (Sesión 6, paso 7). Ver docs/sistema/18-VENTA-HOTMART.md.
-- Agrega a perfiles los campos de suscripción real y las tablas de seguridad del
-- webhook (idempotencia, observabilidad, ledger económico). Reutiliza la columna
-- `plan` existente ('pro' | 'free' | null) — no se duplica.

alter table public.perfiles
  add column if not exists hotmart_subscriber_code text unique,
  add column if not exists estado_suscripcion text
    check (estado_suscripcion in ('prueba', 'activo', 'atrasado', 'cancelado', 'expirado', 'reembolsado', 'contracargo')),
  add column if not exists primer_pago_en timestamptz,
  add column if not exists prueba_termina_en timestamptz,
  add column if not exists acceso_hasta timestamptz,
  add column if not exists periodo_gracia_hasta timestamptz;

-- Idempotencia técnica: Hotmart reenvía eventos si el endpoint tarda o falla.
create table if not exists public.eventos_procesados (
  event_id text primary key,
  event_type text not null,
  payload_hash text,
  procesado_en timestamptz not null default now()
);

-- Observabilidad: TODO intento (éxito y fallo), para el backoffice y la alerta de
-- "sin webhooks hace N horas".
create table if not exists public.webhook_log (
  id bigserial primary key,
  event_id text,
  tipo text,
  resultado text not null check (resultado in ('applied', 'duplicate', 'illegal', 'unauthorized', 'error', 'no_user')),
  recibido_en timestamptz not null default now()
);
create index if not exists webhook_log_recibido_idx on public.webhook_log (recibido_en desc);
create index if not exists webhook_log_resultado_idx on public.webhook_log (resultado, recibido_en desc);

-- Ledger económico: dedupe por transacción real (APPROVED + COMPLETE de la misma
-- compra no deben contar como dos ingresos).
create table if not exists public.transacciones_pago (
  provider text not null,
  transaction_id text not null,
  tipo text not null check (tipo in ('venta', 'reembolso', 'contracargo')),
  product_id text,
  offer_id text,
  monto_centavos bigint,
  moneda text check (moneda ~ '^[A-Z]{3}$'),
  ocurrido_en timestamptz not null default now(),
  raw_event_id text not null,
  primary key (provider, transaction_id, tipo)
);

-- Busca el user_id de auth.users por email — de solo lectura, sin efectos, se puede
-- llamar las veces que haga falta antes de decidir si hay que crear la cuenta.
create or replace function public.buscar_usuario_id_por_email(p_email text)
returns uuid
language plpgsql security definer set search_path = ''
as $$
declare v_user_id uuid;
begin
  select id into v_user_id from auth.users where email = p_email limit 1;
  return v_user_id;
end; $$;
revoke execute on function public.buscar_usuario_id_por_email(text) from anon, authenticated;

-- Aplica un evento de Hotmart de forma atómica: idempotencia + transición legal +
-- actualización del perfil, todo en una sola transacción (si algo falla, no queda
-- nada a medias). p_user_id SIEMPRE debe venir resuelto (el handler ya creó la
-- cuenta de auth si hacía falta) — ver "Pagó y no entra" en 18-VENTA-HOTMART.md.
create or replace function public.aplicar_evento_hotmart(
  p_event_id text, p_event_type text, p_payload_hash text,
  p_user_id uuid, p_subscriber_code text, p_nuevo_estado text
) returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare v_actual text; v_plan text;
begin
  -- (a) idempotencia técnica: si el event_id ya existe, salir sin tocar nada.
  begin
    insert into public.eventos_procesados (event_id, event_type, payload_hash)
    values (p_event_id, p_event_type, p_payload_hash);
  exception when unique_violation then
    return jsonb_build_object('status', 'duplicate');
  end;

  select estado_suscripcion into v_actual from public.perfiles where user_id = p_user_id;

  -- (b) transición ilegal: nunca resucitar un reembolso/contracargo con un evento
  -- de acceso reentregado (ej. un PURCHASE_APPROVED viejo reenviado tarde).
  if v_actual in ('reembolsado', 'contracargo') and p_nuevo_estado in ('activo', 'prueba') then
    return jsonb_build_object('status', 'illegal_transition', 'from', v_actual);
  end if;

  v_plan := case when p_nuevo_estado in ('prueba', 'activo', 'atrasado', 'cancelado') then 'pro' else 'free' end;

  update public.perfiles set
    plan = v_plan,
    estado_suscripcion = p_nuevo_estado,
    hotmart_subscriber_code = coalesce(p_subscriber_code, hotmart_subscriber_code),
    -- fija primer_pago_en SOLO la primera vez que llega un cobro real (prueba→pago)
    primer_pago_en = coalesce(primer_pago_en, case when p_nuevo_estado = 'activo' then now() end)
  where user_id = p_user_id;

  return jsonb_build_object('status', 'applied', 'new_status', p_nuevo_estado);
end; $$;
revoke execute on function public.aplicar_evento_hotmart(text, text, text, uuid, text, text) from anon, authenticated;
