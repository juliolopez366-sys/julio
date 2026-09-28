// Confirma el magic link (OTP por correo) — Supabase manda aquí el token_hash.
// Ver 26-AUTH-MODERNO.md: verificación de sesión en el servidor, nunca solo en el cliente.
import { type EmailOtpType } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/hoy';

  if (token_hash && type) {
    const supabase = await crearClienteSupabaseServidor();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      redirect(next);
    }
  }

  redirect('/entrar?error=enlace_invalido');
}
