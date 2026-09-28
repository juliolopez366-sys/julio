// Gate de sesión (26-AUTH-MODERNO.md): verificado EN EL SERVIDOR, no solo ocultando
// la ruta — sin esto cualquiera podía entrar a /hoy, /historial, /patron, /cuenta
// escribiendo la URL directo (hallazgo crítico de la auditoría de seguridad).
import { redirect } from 'next/navigation';
import { AppShell } from '@/components/app/app-shell';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';

export default async function AppInternaLayout({ children }: { children: React.ReactNode }) {
  const supabase = await crearClienteSupabaseServidor();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/entrar');
  }

  return <AppShell>{children}</AppShell>;
}
