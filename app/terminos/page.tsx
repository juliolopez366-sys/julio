import { LegalPage } from '@/components/legal/legal-page';

export const metadata = { title: 'Términos y Condiciones | FoodScan' };

export default function TerminosPage() {
  return (
    <LegalPage titulo="Términos y Condiciones" actualizado="27 de septiembre de 2026">
      <p>
        FoodScan es operado por <strong>Julio López</strong> (persona natural) desde Estados Unidos. Al crear tu
        cuenta aceptas estos términos y nuestro <a href="/privacidad">Aviso de Privacidad</a>.
      </p>
      <h2>Qué es FoodScan</h2>
      <p>
        FoodScan es una app que te ayuda a identificar posibles detonantes digestivos cruzando tus comidas
        registradas con tus síntomas.
      </p>
      <h2>Qué NO es FoodScan</h2>
      <p>
        <strong>FoodScan no reemplaza el diagnóstico, consejo ni tratamiento de un profesional de la salud.</strong>{' '}
        La orientación que genera nuestra IA puede tener errores, especialmente con comidas compuestas de
        restaurante. Tú decides bajo tu propia responsabilidad qué hacer con esa información — ver el{' '}
        <a href="/aviso-ia">Aviso de IA</a> para el detalle completo.
      </p>
      <h2>Edad mínima</h2>
      <p>Debes tener 18 años o más para usar FoodScan.</p>
      <h2>Tu cuenta y tus datos</h2>
      <ul>
        <li>Debes darnos un correo válido y mantener tu acceso seguro.</li>
        <li>Eres responsable de la exactitud de lo que registras (comidas y síntomas).</li>
        <li>Los datos, patrones y reportes que la app genera sobre ti son tuyos — puedes pedir una copia o su eliminación en cualquier momento.</li>
        <li>Podemos suspender o cerrar cuentas que usen la app de forma abusiva, fraudulenta o que intenten vulnerar su seguridad.</li>
      </ul>
      <h2>Precio, prueba y renovación automática</h2>
      <p>
        FoodScan se ofrece con 7 días de prueba gratis y luego un plan mensual ($6.99/mes) o anual ($49.99/año),
        que <strong>se renuevan automáticamente</strong> salvo que canceles antes. Te avisamos por correo antes de
        cada cobro. El pago se procesa a través de Hotmart. Ver{' '}
        <a href="/reembolsos">Garantía, reembolsos y cómo cancelar</a> para el detalle completo.
      </p>
      <h2>Limitación de responsabilidad</h2>
      <p>
        FoodScan se ofrece "tal cual". No garantizamos que la identificación de ingredientes o el patrón calculado
        sean siempre exactos. En la medida permitida por la ley, no somos responsables por decisiones de salud que
        tomes basándote en la orientación de la app — para eso está tu médico.
      </p>
      <h2>Ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de Estados Unidos. Si tienes una disputa con nosotros, primero
        intentaremos resolverla directamente — escríbenos a{' '}
        <a href="mailto:soporte@foodscan.app">soporte@foodscan.app</a>.
      </p>
      <h2>Cambios a estos términos</h2>
      <p>
        Si hacemos un cambio material, te avisamos por correo antes de que entre en vigor. La fecha de "última
        actualización" arriba siempre refleja la versión vigente.
      </p>
      <h2>Contacto</h2>
      <p>
        Para cualquier duda sobre estos términos: <a href="mailto:soporte@foodscan.app">soporte@foodscan.app</a>.
      </p>
    </LegalPage>
  );
}
