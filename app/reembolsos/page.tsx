import { LegalPage } from '@/components/legal/legal-page';

export const metadata = { title: 'Reembolsos | FoodScan' };

export default function ReembolsosPage() {
  return (
    <LegalPage titulo="Garantía y reembolsos" actualizado="27 de septiembre de 2026">
      <h2>La Garantía del Primer Patrón</h2>
      <p>
        Si dentro de tus primeros <strong>7 días</strong> de prueba gratis sientes que FoodScan no te está
        ayudando a ver un patrón más claro sobre tu detonante, escríbenos y te devolvemos el dinero de tu
        suscripción, sin preguntas.
      </p>
      <h2>Cómo funciona el cobro</h2>
      <ul>
        <li>Tus primeros 7 días son gratis — no se te cobra nada al empezar.</li>
        <li>Te avisamos por correo 2 días antes de que termine tu prueba.</li>
        <li>Si no cancelas antes, se cobra tu plan elegido (mensual o anual) a través de Hotmart.</li>
      </ul>
      <h2>Cómo pedir tu reembolso</h2>
      <p>
        Escríbenos a <a href="mailto:soporte@foodscan.app">soporte@foodscan.app</a> con el correo que usaste para
        comprar. Hotmart, la plataforma que procesa tu pago, tiene su propia política de reembolso (hasta 7 días
        de derecho de retracto según tu país) — nuestra Garantía del Primer Patrón la complementa, no la reemplaza.
      </p>
      <h2>Cancelar tu suscripción</h2>
      <p>
        Puedes cancelar cuando quieras desde tu cuenta o escribiéndonos; dejas de pagar a partir del siguiente
        ciclo y conservas el acceso hasta que termine el período ya pagado.
      </p>
    </LegalPage>
  );
}
