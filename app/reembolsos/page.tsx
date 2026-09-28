import { LegalPage } from '@/components/legal/legal-page';

export const metadata = { title: 'Garantía, reembolsos y cómo cancelar | FoodScan' };

export default function ReembolsosPage() {
  return (
    <LegalPage titulo="Garantía, reembolsos y cómo cancelar" actualizado="27 de septiembre de 2026">
      <h2>La Garantía del Primer Patrón</h2>
      <p>
        Si dentro de tus primeros <strong>7 días</strong> de prueba gratis sientes que FoodScan no te está
        ayudando a ver un patrón más claro sobre tu detonante, escríbenos y te devolvemos el dinero, sin preguntas.
      </p>
      <p>
        Como respaldo adicional, Hotmart (quien procesa tu pago) tiene configurada una ventana de reembolso de{' '}
        <strong>15 días desde la fecha en que te registraste</strong> — más amplia que nuestra garantía de 7 días,
        así que si tu primer cobro ya ocurrió y aun así no te convence, todavía tienes unos días extra para
        pedirlo.
      </p>
      <h2>Cómo funciona el cobro</h2>
      <ul>
        <li>Tus primeros 7 días son gratis — no se te cobra nada al empezar.</li>
        <li>Te avisamos por correo 2 días antes de que termine tu prueba.</li>
        <li>
          Si no cancelas antes, tu plan (mensual o anual) <strong>se renueva automáticamente</strong> y se cobra a
          través de Hotmart. Antes de cada renovación anual, te avisamos con anticipación por correo.
        </li>
      </ul>
      <h2>Cómo pedir tu reembolso</h2>
      <p>
        Escríbenos a <a href="mailto:soporte@foodscan.app">soporte@foodscan.app</a> con el correo que usaste para
        comprar, dentro de la ventana correspondiente. Procesamos la devolución a través de Hotmart.
      </p>
      <h2>Cómo cancelar tu suscripción</h2>
      <p>Cancelar es tan fácil como suscribirte — dos formas de hacerlo:</p>
      <ul>
        <li>
          Desde la app: ve a <strong>Cuenta</strong> y escríbenos desde ahí; cancelamos tu renovación el mismo día
          y conservas el acceso hasta que termine el período que ya pagaste.
        </li>
        <li>
          Directamente en Hotmart: una vez conectemos el checkout real, aquí aparecerá el enlace directo a tu
          portal de compra de Hotmart, donde puedes cancelar sin escribirnos. Por ahora, usa el correo de arriba.
        </li>
      </ul>
      <p className="text-[13px] text-[var(--text-tertiary)]">
        No hay penalización ni pasos ocultos por cancelar — dejas de pagar a partir del siguiente ciclo.
      </p>
    </LegalPage>
  );
}
