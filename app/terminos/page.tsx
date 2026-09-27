import { LegalPage } from '@/components/legal/legal-page';

export const metadata = { title: 'Términos y Condiciones | FoodScan' };

export default function TerminosPage() {
  return (
    <LegalPage titulo="Términos y Condiciones" actualizado="27 de septiembre de 2026">
      <h2>Qué es FoodScan</h2>
      <p>
        FoodScan es una app que te ayuda a identificar posibles detonantes digestivos cruzando tus comidas
        registradas con tus síntomas. Al usar FoodScan aceptas estos términos.
      </p>
      <h2>Qué no es FoodScan</h2>
      <p>
        FoodScan no reemplaza el diagnóstico ni el tratamiento de un profesional de la salud. La orientación que
        genera nuestra IA puede tener errores, especialmente con comidas compuestas de restaurante — ver el{' '}
        <a href="/aviso-ia">Aviso de IA</a>.
      </p>
      <h2>Tu cuenta</h2>
      <ul>
        <li>Debes darnos un correo válido y mantener tu acceso seguro.</li>
        <li>Eres responsable de la exactitud de lo que registras (comidas y síntomas).</li>
        <li>Puedes cancelar o eliminar tu cuenta cuando quieras.</li>
      </ul>
      <h2>Precio y cobro</h2>
      <p>
        FoodScan se ofrece con 7 días de prueba gratis y luego un plan mensual o anual, cobrado a través de
        Hotmart. Ver <a href="/reembolsos">Garantía y reembolsos</a> para la política completa.
      </p>
      <h2>Límites del servicio</h2>
      <p>
        Podemos actualizar, pausar o descontinuar funciones de la app para mejorarla. Si eso afecta materialmente
        tu plan pagado, te avisaremos con anticipación razonable.
      </p>
      <h2>Contacto</h2>
      <p>
        Para cualquier duda sobre estos términos: <a href="mailto:soporte@foodscan.app">soporte@foodscan.app</a>.
      </p>
    </LegalPage>
  );
}
