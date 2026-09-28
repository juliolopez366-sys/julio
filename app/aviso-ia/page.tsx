import { LegalPage } from '@/components/legal/legal-page';

export const metadata = { title: 'Aviso de IA | FoodScan' };

export default function AvisoIaPage() {
  return (
    <LegalPage titulo="Aviso sobre el uso de Inteligencia Artificial" actualizado="27 de septiembre de 2026">
      <p>
        FoodScan usa inteligencia artificial para analizar tus fotos de comida y estimar qué ingredientes de riesgo
        FODMAP podrían estar presentes, y para cruzar tus síntomas con tu historial de comidas.
      </p>
      <h2>Esto es orientación, no un diagnóstico</h2>
      <p>
        <strong>El resultado que ves en FoodScan es orientación generada por IA, no un consejo médico, diagnóstico
        ni tratamiento profesional. Puede ser incorrecta o incompleta, y tú decides bajo tu propia responsabilidad
        qué hacer con ella.</strong> La identificación de ingredientes desde una foto puede equivocarse,
        especialmente con platos compuestos donde un ingrediente no es visible (por ejemplo, ajo o cebolla en
        polvo dentro de una salsa). Por eso siempre puedes confirmar o corregir en un toque lo que la IA detectó.
      </p>
      <h2>No reemplaza a tu médico</h2>
      <p>
        FoodScan no sustituye la consulta con un gastroenterólogo, nutriólogo u otro profesional de la salud. Si
        tienes síntomas persistentes, dolor severo o cambios importantes en tu salud digestiva, consulta a un
        profesional. Los reportes que genera la app pueden servir como apoyo para esa conversación, no como
        reemplazo de ella.
      </p>
      <h2>Transferencia internacional de datos</h2>
      <p>
        Al día de hoy, FoodScan aún no está conectado a un proveedor de IA real (esa conexión llega en una etapa
        posterior de construcción). En cuanto lo esté, tus fotos y descripciones de comida se enviarán a los
        servidores de ese proveedor para procesarse — probablemente ubicados en Estados Unidos. Eso es una
        transferencia internacional de tus datos, y antes de activarla actualizaremos este aviso nombrando al
        proveedor exacto, y buscaremos que ese proveedor no use tus datos para entrenar sus modelos ni los retenga
        más de lo necesario para darte el resultado.
      </p>
      <h2>Cómo tratamos tus datos al usar la IA</h2>
      <p>
        No usamos tus datos de salud para entrenar modelos de terceros ni los compartimos con anunciantes. Si
        eliminas tu cuenta, también borramos los registros que la IA haya generado sobre ti, no solo tu perfil.
      </p>
      <p>
        Para dudas sobre este aviso, escríbenos a{' '}
        <a href="mailto:soporte@foodscan.app">soporte@foodscan.app</a>.
      </p>
    </LegalPage>
  );
}
