// Gate de sesión Y de plan (26-AUTH-MODERNO.md + 18-VENTA-HOTMART.md): verificados
// EN EL SERVIDOR, no solo ocultando la ruta. Sin el primero, cualquiera entraba a
// /hoy escribiendo la URL directo (hallazgo crítico de la auditoría de seguridad).
// Sin el segundo, cualquiera con un correo (sin haber pagado nunca) tenía acceso
// Pro completo — el mismo hallazgo, cerrado ahora que el webhook de Hotmart existe.
import { redirect } from 'next/navigation';
import { AppShell } from '@/components/app/app-shell';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';
import { tieneAccesoCompleto, type EstadoSuscripcion } from '@/lib/membership-fsm';

export default async function AppInternaLayout({ children }: { children: React.ReactNode }) {
  const supabase = await crearClienteSupabaseServidor();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/entrar');
  }

  const { data: perfil } = await supabase
    .from('perfiles')
    .select('estado_suscripcion, acceso_hasta, periodo_gracia_hasta')
    .eq('user_id', user.id)
    .single();

  const estado = perfil?.estado_suscripcion as EstadoSuscripcion | null;
  const tieneAcceso =
    !!estado &&
    tieneAccesoCompleto(
      estado,
      new Date(),
      perfil?.acceso_hasta ? new Date(perfil.acceso_hasta) : null,
      perfil?.periodo_gracia_hasta ? new Date(perfil.periodo_gracia_hasta) : null
    );

  if (!tieneAcceso) {
    redirect('/paywall');
  }

  return <AppShell>{children}</AppShell>;
}
