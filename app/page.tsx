'use client';

import { AlertCircle, Clock, XCircle, UtensilsCrossed, CalendarClock, TrendingDown, Repeat } from 'lucide-react';
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
import { DemoAnalisis } from '@/components/landing/DemoAnalisis';
import { Cruce48h } from '@/components/landing/Cruce48h';

// Modelo onboarding-first registrado (decisión técnica, ver ESTADO.md): el CTA
// lleva a /onboarding, nunca directo al checkout.
const CTA_HREF = '/onboarding';
const CTA_LABEL = 'Encontrar mi detonante gratis';

/* eslint-disable-next-line @next/next/no-img-element -- logo real, se mantiene portable como el resto del kit */
const LOGO = <img src="/logo-mark.png" alt="" className="size-8" width={32} height={32} />;

export default function LandingFoodScan() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      {/* 1. HERO */}
      <Hero
        appName="FoodScan"
        logo={LOGO}
        loginHref="/entrar"
        h1Marked="Encuentra tu [acento]detonante real[/acento] en días, no en años"
        subtitleMarked="Solo fotos: el [b]Motor de Detonante Real[/b] cruza cada síntoma con 48 horas previas."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        socialProof={<span>7 días gratis · cancela cuando quieras</span>}
        visual={<DemoAnalisis />}
      />

      {/* 2. PROBLEMA */}
      <Problema
        titulo="¿Te suena?"
        preguntas={[
          { icon: AlertCircle, textoMarked: '¿Te hinchas de la nada sin saber qué lo causó?' },
          { icon: Clock, textoMarked: '¿Cancelas planes por la [b]ansiedad del baño[/b]?' },
          { icon: XCircle, textoMarked: '¿Ya probaste apps de registro y las abandonaste enseguida?' },
          { icon: UtensilsCrossed, textoMarked: '¿Sientes que cada comida es [b]hacer tarea[/b]?' },
        ]}
      />

      {/* 3. AGITACIÓN */}
      <Agitacion
        frases={[
          { icon: CalendarClock, textoMarked: 'Cada mes sigues sin saber qué alimento te ataca, aunque comas "con cuidado".' },
          { icon: TrendingDown, textoMarked: 'En un año, seguirás en el mismo punto: [acento]meses de datos que nadie sabe usar[/acento].' },
          { icon: Repeat, textoMarked: 'Otra app de registro manual no lo arregla: más tecleo no es más respuesta. Necesitas [b]datos reales, no adivinanzas[/b].' },
        ]}
      />

      {/* 4. SOLUCIÓN */}
      <Solucion
        tituloMarked="Tu patrón, [acento]resuelto en días[/acento]"
        mecanismo="el Motor de Detonante Real"
        bigIdeaMarked="No te faltan datos: te falta quien los cruce. Cada síntoma, contra tus [b]últimas 48 horas[/b] de comidas."
        pasos={[
          { titulo: 'Toma la foto', detalle: 'Fotografías tu plato — la IA identifica los ingredientes de riesgo al instante.' },
          { titulo: 'Registra el síntoma', detalle: 'Un toque cuando algo te ataca: tipo y hora, sin formularios largos.' },
          { titulo: 'Descubre tu patrón', detalle: 'El Motor cruza tus últimas 48 horas y te muestra tu detonante real.' },
        ]}
        visual={<Cruce48h />}
      />

      {/* 5. LA APP POR DENTRO */}
      <AppPorDentro
        tituloMarked="Tu próxima comida, [acento]sin miedo[/acento]"
        frames={[
          { label: 'Así empiezas', nombrePantalla: 'Bienvenida', src: '/carrusel-1-onboarding.webp' },
          { label: 'Fotografías tu plato', nombrePantalla: 'La IA analiza', src: '/carrusel-2-mecanismo.webp' },
          { label: 'El riesgo de tu comida, antes de comer', nombrePantalla: 'Hoy', src: '/carrusel-3-hoy.webp' },
        ]}
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
      />

      {/* 6. OFERTA */}
      <Oferta
        tituloMarked="Empieza gratis. Sigue por [acento]$0.14 al día[/acento]"
        trialDias={7}
        anual={{
          nombre: 'Anual',
          badge: 'RECOMENDADO',
          precioMes: '$4.17',
          totalAnual: 'Se cobra $49.99/año',
          ahorro: 'Casi 5 meses gratis (ahorras 40%)',
          descomposicionDia: 'menos de $0.14 al día',
          // Más corto que el CTA del hero para que no se parta en dos líneas dentro de la card
          ctaLabel: 'Empezar mis 7 días gratis',
          ctaHref: `${CTA_HREF}?plan=anual`,
          features: [
            'Foto → riesgo instantáneo con IA',
            'Registro de síntomas en un toque',
            'Motor de Detonante Real (cruce de 48 horas)',
            'Tu historial de comidas y síntomas, siempre guardado',
          ],
        }}
        mensual={{
          nombre: 'Mensual',
          precioMes: '$6.99',
          ctaLabel: 'Elegir mensual',
          ctaHref: `${CTA_HREF}?plan=mensual`,
          features: [
            'Foto → riesgo instantáneo con IA',
            'Registro de síntomas en un toque',
            'Motor de Detonante Real (cruce de 48 horas)',
            'Cancelas cuando quieras',
          ],
        }}
        notaPago="Pago seguro con Hotmart · no se cobra nada durante los 7 días de prueba"
      />

      {/* 7. GARANTÍA */}
      <Garantia
        nombre="Garantía del [acento]Primer Patrón[/acento]"
        condicionMarked="Si en 7 días no ves un patrón más claro sobre tu detonante, escribes un correo y te devolvemos todo. Sin preguntas."
        pisoLegal="Además, Hotmart te respalda con 15 días de garantía desde tu compra"
      />

      {/* 8. FAQ */}
      <Faq
        items={[
          {
            pregunta: '¿La IA realmente va a acertar con comidas de restaurante?',
            respuestaMarked:
              'Con platos compuestos, la IA marca como riesgo probable lo que suele esconderse en salsas, como ajo o cebolla en polvo: [b]prefiere avisarte de más que dejarte a ciegas[/b].',
          },
          {
            pregunta: '¿Voy a perder más tiempo con la app que con un diario?',
            respuestaMarked:
              'No escribes nada: tomas la foto, revisas el resultado y lo guardas con un toque. Si la foto no salió bien, la repites.',
          },
          {
            pregunta: '¿En qué se diferencia de Cara Care o mySymptoms?',
            respuestaMarked:
              'Ellas registran; nosotros [b]cruzamos tus síntomas con tus comidas de las últimas 48 horas[/b] para mostrarte el patrón, no solo una lista plana.',
          },
          {
            pregunta: '¿Cuánto tardo en ver mi primer patrón?',
            respuestaMarked:
              'El riesgo de cada comida lo ves desde la primera foto. El patrón aparece cuando un ingrediente se repite: lo comiste al menos 2 veces y en la mitad o más hubo síntomas en las [b]48 horas siguientes[/b].',
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
        psMarked="PS: no es otra lista de alimentos «seguros». Es tu detonante real, con datos tuyos. Entras con 7 días gratis."
      />

      {/* 10. FOOTER LEGAL */}
      <FooterLegal
        appName="FoodScan"
        logo={LOGO}
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
