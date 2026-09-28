-- FoodScan — IA real (Sesión 6, paso 3).
-- ai_calls: registro de cada llamada a la IA (31-EVALS-OBSERVABILIDAD-OPERACION.md) —
-- alimenta el circuit-breaker de costo diario y, más adelante, el panel de admin.
-- NO guarda el prompt en crudo (solo un hash), por privacidad (47-LEGAL §3).
create table if not exists public.ai_calls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  feature text not null default 'analizar_comida',
  modelo text not null,
  tokens_entrada integer not null default 0,
  tokens_salida integer not null default 0,
  costo_usd numeric(10, 6) not null default 0,
  estado text not null default 'ok' check (estado in ('ok', 'error', 'moderado')),
  creado_en timestamptz not null default now()
);
create index if not exists ai_calls_user_id_idx on public.ai_calls (user_id);
create index if not exists ai_calls_creado_en_idx on public.ai_calls (creado_en);

alter table public.ai_calls enable row level security;

create policy "ai_calls: dueño lee lo suyo" on public.ai_calls
  for select
  using ((select auth.uid()) = user_id);

-- Solo el servidor (service_role, que ignora RLS) inserta filas aquí — un usuario
-- normal jamás debe poder escribir su propio costo de IA.

-- Bucket privado para las fotos de comida. Nunca público: cada usuario solo accede
-- a la suya vía política de Storage + URL firmada de corta duración.
insert into storage.buckets (id, name, public)
values ('comidas-fotos', 'comidas-fotos', false)
on conflict (id) do nothing;

create policy "comidas-fotos: el dueño sube a su propia carpeta"
  on storage.objects for insert
  with check (
    bucket_id = 'comidas-fotos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );

create policy "comidas-fotos: el dueño lee su propia carpeta"
  on storage.objects for select
  using (
    bucket_id = 'comidas-fotos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );

create policy "comidas-fotos: el dueño borra su propia carpeta"
  on storage.objects for delete
  using (
    bucket_id = 'comidas-fotos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );
