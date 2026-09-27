// Cliente de Supabase para Server Components / Server Actions / Route Handlers.
// Lee y escribe las cookies de sesión — necesario para que auth.uid() funcione
// en las policies de RLS cuando se consulta desde el servidor.
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function crearClienteSupabaseServidor() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // Falla en Server Components (no pueden escribir cookies) — el
          // middleware ya se encarga de refrescar la sesión en cada request.
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // ignorar
          }
        },
      },
    }
  );
}
