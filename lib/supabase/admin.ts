// Cliente de Supabase con la service_role key — SOLO para uso en el servidor
// (Route Handlers), NUNCA importar desde un componente de cliente. Se usa
// exclusivamente para registrar el uso de IA en ai_calls (RLS solo permite
// SELECT al dueño; el INSERT lo hace el servidor para que nadie pueda
// falsear su propio registro de costo y burlar el circuit-breaker).
import { createClient } from '@supabase/supabase-js';

export function crearClienteSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
