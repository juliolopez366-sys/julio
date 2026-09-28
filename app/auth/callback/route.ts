// Callback de OAuth (Google) — Supabase manda aquí el `code` a cambiar por sesión.
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/hoy';

  if (code) {
    const supabase = await crearClienteSupabaseServidor();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      redirect(next);
    }
  }

  redirect('/entrar?error=enlace_invalido');
}
