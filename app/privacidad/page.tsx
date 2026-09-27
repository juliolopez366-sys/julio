import { LegalPage } from '@/components/legal/legal-page';

export const metadata = { title: 'Privacidad | FoodScan' };

export default function PrivacidadPage() {
  return (
    <LegalPage titulo="Aviso de Privacidad" actualizado="27 de septiembre de 2026">
      <p>
        FoodScan trata datos sobre tu salud digestiva (comidas, síntomas y los patrones que calculamos a partir de
        ellos). Nos tomamos esto en serio: esta página explica qué guardamos, para qué, y qué control tienes.
      </p>
      <h2>Qué datos guardamos</h2>
      <ul>
        <li>Tu correo, para identificar tu cuenta.</li>
        <li>Las comidas que registras (foto o descripción, ingredientes, nivel de riesgo estimado).</li>
        <li>Los síntomas que registras (tipo, intensidad, hora).</li>
        <li>El patrón de correlación que calculamos entre tus comidas y tus síntomas.</li>
      </ul>
      <h2>Para qué los usamos</h2>
      <p>
        Únicamente para operar el producto: mostrarte tu riesgo por comida, calcular tu patrón, y enviarte los
        correos de tu cuenta (bienvenida, aviso de cobro, recuperación de acceso). No vendemos tus datos de salud
        ni los compartimos con anunciantes.
      </p>
      <h2>Dónde viven tus datos</h2>
      <p>
        Tus datos se guardan en una base de datos con reglas de seguridad que hacen que solo tú puedas verlos o
        modificarlos — ni otros usuarios ni nosotros accedemos a ellos salvo para brindarte soporte cuando tú lo
        pides.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes pedirnos en cualquier momento una copia de tus datos o que los borremos por completo, escribiendo a{' '}
        <a href="mailto:soporte@foodscan.app">soporte@foodscan.app</a>. Al eliminar tu cuenta, borramos tus
        comidas, síntomas y patrones de forma permanente.
      </p>
      <h2>IA</h2>
      <p>
        Usamos inteligencia artificial para analizar tus fotos de comida — ver el{' '}
        <a href="/aviso-ia">Aviso de IA</a> para más detalle.
      </p>
    </LegalPage>
  );
}
