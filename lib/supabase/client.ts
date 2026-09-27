// Cliente de Supabase para Client Components (navegador). Usa la anon key —
// segura de exponer: la seguridad real la da RLS (supabase/migrations/0001_init.sql).
import { createBrowserClient } from '@supabase/ssr';

export function crearClienteSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
