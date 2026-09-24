'use client';

import { AlertCircle, Clock, XCircle, UtensilsCrossed } from 'lucide-react';
import { Hero } from '@/components/landing/Hero';
import { Problema } from '@/components/landing/Problema';
import { Agitacion } from '@/components/landing/Agitacion';
import { Solucion } from '@/components/landing/Solucion';
import { AppPorDentro } from '@/components/landing/AppPorDentro';
import { Oferta } from '@/components/landing/Oferta';
import { Garantia } from '@/components/landing/Garantia';
import { Faq } from '@/components/landing/Faq';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { FooterLegal } from '@/components/landing/FooterLegal';
import { StickyCtaMobile } from '@/components/landing/ui';

// Modelo onboarding-first registrado (decisión técnica, ver ESTADO.md): el CTA
// lleva a /onboarding, nunca directo al checkout.
const CTA_HREF = '/onboarding';
const CTA_LABEL = 'Encontrar mi detonante gratis';

export default function LandingFoodScan() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      {/* 1. HERO */}
      <Hero
        appName="FoodScan"
        loginHref="/entrar"
        h1Marked="Encuentra tu [acento]detonante real[/acento] en días, no en años"
        subtitleMarked="Toma una foto de tu comida y descubre [b]tu patrón real[/b] en 48 horas."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        socialProof={<span>7 días gratis · cancela cuando quieras</span>}
        visualPlaceholderSugerencia="captura de la pantalla principal mostrando el riesgo de una comida"
      />

      {/* 2. PROBLEMA */}
      <Problema
        titulo="¿Te suena?"
        preguntas={[
          { icon: AlertCircle, textoMarked: '¿Te hinchas de la nada sin saber qué lo causó?' },
          { icon: Clock, textoMarked: '¿Cancelas planes por miedo a no llegar a un baño?' },
          { icon: XCircle, textoMarked: '¿Ya probaste apps de registro y las abandonaste enseguida?' },
          { icon: UtensilsCrossed, textoMarked: '¿Sientes que comer se volvió un experimento agotador?' },
        ]}
      />

      {/* 3. AGITACIÓN */}
      <Agitacion
        frases={[
          'Cada mes sigues sin saber qué alimento te ataca, aunque comas "con cuidado".',
          'En un año, seguirás en el mismo punto: [acento]meses de datos que nadie sabe usar[/acento].',
          'Otra app de registro manual no lo arregla: [b]más tecleo no es más respuesta[/b].',
        ]}
        contraste={{
          labelHoy: 'Hoy',
          hoy: 'Comidas "seguras" que ya no lo son, y ningún patrón claro.',
          labelFuturo: 'En 6 meses, si nada cambia',
          futuro: 'Seguirás adivinando y cancelando planes por miedo.',
        }}
      />

      {/* 4. SOLUCIÓN */}
      <Solucion
        tituloMarked="Tu patrón, [acento]resuelto en días[/acento]"
        mecanismo="el Motor de Detonante Real"
        bigIdeaMarked="No te faltan datos: te falta quien los cruce. El Motor de Detonante Real conecta cada síntoma con lo que comiste en las [b]últimas 48 horas[/b]."
        pasos={[
          { titulo: 'Toma la foto', detalle: 'Fotografías tu plato — la IA identifica los ingredientes de riesgo al instante.' },
          { titulo: 'Registra el síntoma', detalle: 'Un toque cuando algo te ataca: tipo y hora, sin formularios largos.' },
          { titulo: 'Descubre tu patrón', detalle: 'El Motor cruza tus últimas 48 horas y te muestra tu detonante real.' },
        ]}
        antesDespues={{
          labelAntes: 'Antes',
          antes: 'Un diario de papel con meses de datos sin ninguna conclusión.',
          labelDespues: 'Después',
          despues: 'Un patrón claro, con el ingrediente exacto y el nivel de confianza.',
        }}
      />

      {/* 5. LA APP POR DENTRO */}
      <AppPorDentro
        tituloMarked="Tu próxima comida, [acento]sin miedo[/acento]"
        frames={[
          { label: 'Tu primera foto', nombrePantalla: 'Registro de comida' },
          { label: 'Tu detonante más probable', nombrePantalla: 'Panel de patrones' },
          { label: 'Registra un síntoma en 2 segundos', nombrePantalla: 'Registro rápido' },
          { label: 'Lo que le muestras a tu doctor', nombrePantalla: 'Reporte para tu médico' },
        ]}
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
      />

      {/* 6. OFERTA */}
      <Oferta
        tituloMarked="Empieza gratis. Sigue por [acento]$0.14 al día[/acento]"
        trialDias={7}
        stack={{
          lineas: [
            { resultado: 'Acceso completo al Motor de Detonante Real (12 meses)', valor: '$84' },
            { resultado: 'Reportes ilimitados para tu médico', valor: '$29' },
            { resultado: 'Guía «Entiende tus resultados FODMAP»', valor: '$19' },
          ],
          totalTachado: '$132',
          nota: 'Hoy: $4.17/mes (se cobra $49.99/año)',
        }}
        anual={{
          nombre: 'Anual',
          badge: 'MÁS POPULAR',
          precioMes: '$4.17',
          totalAnual: 'Se cobra $49.99/año',
          ahorro: '2 meses gratis',
          descomposicionDia: 'menos de $0.14 al día',
          ctaLabel: 'Empezar mis 7 días gratis',
          ctaHref: CTA_HREF,
          features: [
            'Foto → riesgo instantáneo con IA',
            'Registro de síntomas en un toque',
            'Motor de correlación de 48 horas',
            'Reportes para tu médico',
          ],
        }}
        mensual={{
          nombre: 'Mensual',
          precioMes: '$6.99',
          ctaLabel: 'Elegir mensual',
          ctaHref: CTA_HREF,
          features: [
            'Foto → riesgo instantáneo con IA',
            'Registro de síntomas en un toque',
            'Motor de correlación de 48 horas',
            'Cancelas cuando quieras',
          ],
        }}
      />

      {/* 7. GARANTÍA */}
      <Garantia
        nombre="la Garantía del Primer Patrón"
        condicionMarked="Si en 7 días no ves un patrón más claro sobre tu detonante, escribes un correo y te devolvemos todo. Sin preguntas."
        pisoLegal="Respaldada por la garantía Hotmart de 7 días"
      />

      {/* 8. FAQ */}
      <Faq
        items={[
          {
            pregunta: '¿La IA realmente va a acertar con comidas de restaurante?',
            respuestaMarked:
              'Con platos compuestos (como una salsa con ajo oculto), el Motor marca el riesgo probable y tú confirmas en un toque — [b]nunca te deja a ciegas[/b].',
          },
          {
            pregunta: '¿Voy a perder más tiempo corrigiendo a la IA que registrando yo misma?',
            respuestaMarked:
              'Corregir un ingrediente toma un toque. No vuelves a escribir la comida completa como en un diario tradicional.',
          },
          {
            pregunta: '¿En qué se diferencia de Cara Care o mySymptoms?',
            respuestaMarked:
              'Ellas registran; nosotros [b]cruzamos tus síntomas con tus comidas de las últimas 48 horas[/b] para mostrarte el patrón, no solo una lista plana.',
          },
          {
            pregunta: '¿Cuánto tardo en ver mi primer patrón?',
            respuestaMarked:
              'Desde el primer día ves el riesgo de cada comida. El patrón con confianza estadística aparece cuando acumulas unos días de registro.',
          },
          {
            pregunta: '¿Qué pasa si no me sirve?',
            respuestaMarked:
              'Tienes 7 días de prueba gratis y la Garantía del Primer Patrón: [b]un correo y te devolvemos todo[/b].',
          },
        ]}
      />

      {/* 9. CTA FINAL */}
      <CtaFinal
        h2Marked="Vuelve a confiar en tu [acento]cuerpo[/acento]"
        futurePacingMarked="Imagina aceptar una cena sin pánico, tomar la foto, y saber en segundos si es segura para ti."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        recap="Garantía del Primer Patrón · 7 días gratis"
        psMarked="PS: cruzamos cada síntoma con lo que comiste en las últimas 48 horas para encontrar tu detonante real — no otra lista de alimentos «seguros» que dejan de serlo. Hoy entras con 7 días gratis y la Garantía del Primer Patrón."
      />

      {/* 10. FOOTER LEGAL */}
      <FooterLegal
        appName="FoodScan"
        soporteEmail="soporte@foodscan.app"
        enlaces={[
          { label: 'Privacidad', href: '/privacidad' },
          { label: 'Términos y Condiciones', href: '/terminos' },
          { label: 'Reembolsos', href: '/reembolsos' },
          { label: 'Aviso de IA', href: '/aviso-ia' },
        ]}
      />

      <StickyCtaMobile labelComercial={CTA_LABEL} href={CTA_HREF} />
    </div>
  );
}
