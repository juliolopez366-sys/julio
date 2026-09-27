-- FoodScan — esquema inicial (Sesión 6, paso 2).
-- Espejo del modelo simulado en lib/foodscan-data.ts (localStorage), decidido en
-- ESTADO.md bajo "Decisiones técnicas". RLS en las 4 tablas: policy por
-- (select auth.uid()) = user_id en USING y WITH CHECK, columna user_id indexada
-- (patrón de 25-BASE-DE-DATOS.md / 26-AUTH-MODERNO.md).

create table if not exists public.perfiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  plan text,
  canal text,
  dias_meta smallint not null default 5,
  racha_actual smallint not null default 0,
  racha_maxima smallint not null default 0,
  congeladores_disponibles smallint not null default 1,
  creado_en timestamptz not null default now()
);

create table if not exists public.comidas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  nombre_comida text not null,
  descripcion text not null,
  ingredientes text[] not null default '{}',
  ingredientes_riesgo text[] not null default '{}',
  nivel_riesgo text not null check (nivel_riesgo in ('bajo', 'medio', 'alto')),
  color_foto text[2],
  foto_url text,
  registrado_en timestamptz not null default now()
);
create index if not exists comidas_user_id_idx on public.comidas (user_id);

create table if not exists public.sintomas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tipo text not null check (tipo in ('hinchazon', 'dolor', 'urgencia')),
  intensidad smallint not null check (intensidad between 1 and 3),
  registrado_en timestamptz not null default now()
);
create index if not exists sintomas_user_id_idx on public.sintomas (user_id);

create table if not exists public.correlaciones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  ingrediente text not null,
  confianza numeric(4, 3) not null,
  veces_comido smallint not null,
  veces_con_sintoma smallint not null,
  comidas_relacionadas uuid[] not null default '{}',
  generado_en timestamptz not null default now()
);
create index if not exists correlaciones_user_id_idx on public.correlaciones (user_id);

alter table public.perfiles enable row level security;
alter table public.comidas enable row level security;
alter table public.sintomas enable row level security;
alter table public.correlaciones enable row level security;

create policy "perfiles: dueño lee/escribe" on public.perfiles
  for all
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "comidas: dueño lee/escribe" on public.comidas
  for all
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "sintomas: dueño lee/escribe" on public.sintomas
  for all
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "correlaciones: dueño lee/escribe" on public.correlaciones
  for all
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Crea el perfil automáticamente cuando alguien se registra (auth.users),
-- para que /hoy nunca encuentre a un usuario nuevo sin fila en perfiles.
create or replace function public.crear_perfil_nuevo_usuario()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.perfiles (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.crear_perfil_nuevo_usuario();
