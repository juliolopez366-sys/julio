import { LegalPage } from '@/components/legal/legal-page';

export const metadata = { title: 'Privacidad | FoodScan' };

export default function PrivacidadPage() {
  return (
    <LegalPage titulo="Aviso de Privacidad" actualizado="27 de septiembre de 2026">
      <p>
        FoodScan es operado por <strong>Julio López</strong> (persona natural), desde Estados Unidos. FoodScan trata
        datos sobre tu salud digestiva (comidas, síntomas y los patrones que calculamos a partir de ellos). Nos
        tomamos esto en serio: esta página explica qué guardamos, para qué, con quién lo compartimos, y qué
        control tienes.
      </p>
      <h2>Qué datos guardamos</h2>
      <ul>
        <li>Tu correo, para identificar tu cuenta e iniciar tu sesión.</li>
        <li>Las comidas que registras (foto o descripción, ingredientes, nivel de riesgo estimado).</li>
        <li>Los síntomas que registras (tipo, intensidad, hora).</li>
        <li>El patrón de correlación que calculamos entre tus comidas y tus síntomas.</li>
      </ul>
      <p>
        No pedimos tu ubicación, fecha de nacimiento, teléfono ni datos financieros — tu pago lo procesa
        directamente Hotmart, nosotros nunca vemos ni guardamos tu número de tarjeta.
      </p>
      <h2>Con quién compartimos tus datos</h2>
      <p>Solo con los proveedores que hacen funcionar la app, cada uno con una función concreta:</p>
      <ul>
        <li><strong>Supabase</strong> — donde vive tu base de datos y tu inicio de sesión (activo hoy).</li>
        <li>
          <strong>Un proveedor de inteligencia artificial</strong> — para analizar tus fotos de comida. Todavía no
          está conectado; en cuanto lo esté, nombraremos aquí al proveedor exacto y el país donde procesa tus
          datos (probablemente Estados Unidos), porque eso es una transferencia internacional de datos y tienes
          derecho a saberlo antes de que ocurra.
        </li>
        <li><strong>Vercel</strong> — donde vive la aplicación (pendiente de conectar).</li>
        <li><strong>Resend</strong> — para enviarte correos de tu cuenta (pendiente de conectar).</li>
        <li><strong>Hotmart</strong> — procesa tu pago y tu suscripción (pendiente de conectar).</li>
      </ul>
      <p>No usamos herramientas de publicidad ni analítica de terceros — hoy no hay ninguna cookie que te rastree.</p>
      <h2>Cookies</h2>
      <p>
        Usamos únicamente la cookie esencial que crea Supabase para mantener tu sesión iniciada. No usamos cookies
        de publicidad ni de analítica. Si eso cambia en el futuro, actualizaremos este aviso y te pediremos tu
        consentimiento antes de instalar cualquier cookie no esencial.
      </p>
      <h2>Dónde viven tus datos</h2>
      <p>
        Tus datos se guardan en una base de datos con reglas de seguridad (RLS) que hacen que solo tú puedas verlos
        o modificarlos — ni otros usuarios ni nosotros accedemos a ellos salvo para brindarte soporte cuando tú lo
        pides.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes pedirnos en cualquier momento una copia de tus datos, corregirlos, u ordenar que los borremos por
        completo (incluidos los registros que haya generado la IA), escribiendo a{' '}
        <a href="mailto:soporte@foodscan.app">soporte@foodscan.app</a>. Al día de hoy este proceso es manual (te
        respondemos por correo); a medida que crezcamos lo automatizaremos con un botón dentro de la app.
      </p>
      <h2>Si vives en Brasil, Colombia, México, Argentina o Chile</h2>
      <p>
        Aunque operamos desde Estados Unidos, si resides en uno de estos países tienes protecciones adicionales
        bajo su propia ley de datos:
      </p>
      <ul>
        <li><strong>Brasil (LGPD):</strong> derecho de acceso, corrección, eliminación y portabilidad de tus datos.</li>
        <li>
          <strong>Colombia (Ley 1581 de 2012):</strong> tu autorización para tratar tus datos es libre, previa y
          expresa — te la pedimos con una casilla sin marcar por defecto antes de crear tu cuenta.
        </li>
        <li><strong>México (LFPDPPP):</strong> este mismo aviso funciona como tu Aviso de Privacidad.</li>
        <li><strong>Argentina (Ley 25.326) y Chile (Ley 21.719):</strong> derechos equivalentes de acceso, rectificación y eliminación.</li>
      </ul>
      <h2>Menores de edad</h2>
      <p>FoodScan es para personas de 18 años o más. No recopilamos a sabiendas datos de menores de edad.</p>
      <h2>IA</h2>
      <p>
        Usamos inteligencia artificial para analizar tus fotos de comida — ver el{' '}
        <a href="/aviso-ia">Aviso de IA</a> para más detalle.
      </p>
      <h2>Contacto</h2>
      <p>
        Para cualquier duda sobre este aviso: <a href="mailto:soporte@foodscan.app">soporte@foodscan.app</a>.
        Actualizamos esta página con fecha visible; si el cambio es material, te avisamos por correo.
      </p>
    </LegalPage>
  );
}
