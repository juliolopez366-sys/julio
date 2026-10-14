'use client';

// KIT DE LANDING — §9 CTA FINAL EMOCIONAL + PS (blueprint: 55 §9)
// El bloque de MÁXIMO contraste de la página: bloque verde bosque (--accent)
// con texto crema (--bg) — el mismo dúo de FICHA-ARTE, sin degradados.
// H2 emocional ≤8 palabras (warn) · future pacing 1-2 líneas en presente y 2ª
// persona · CTA ≥56px con el MISMO verbo del hero (42) · recap riesgo/urgencia
// SOLO con datos reales · PS estilo carta (itálica, sin borde de color) — el
// segundo texto más leído de la página (19 §9). Nada se interpone entre el PS
// y el footer.

import { motion } from 'motion/react';
import { CtaButton, useReveal, VIEWPORT_ONCE } from './ui';
import { MarkedCopy, warnCopy } from './MarkedCopy';

export interface CtaFinalProps {
  /** Copy MARCADO — headline emocional, máx 8 palabras (warn). */
  h2Marked: string;
  /** Copy MARCADO — future pacing 1-2 líneas, presente, 2ª persona (warn a 24). */
  futurePacingMarked: string;
  /** MISMO texto y verbo del CTA héroe (42). */
  ctaLabel: string;
  ctaHref: string;
  /** Recap riesgo/urgencia bajo el CTA — cupo SOLO si es real (19). */
  recap?: string;
  /** El PS de la oferta Hormozi — máx 4 líneas (~55 palabras, warn). */
  psMarked?: string;
  /** default 'cta-final' — lo observa StickyCtaMobile para ocultarse. */
  id?: string;
}

export function CtaFinal({
  h2Marked,
  futurePacingMarked,
  ctaLabel,
  ctaHref,
  recap,
  psMarked,
  id = 'cta-final',
}: CtaFinalProps) {
  warnCopy('CtaFinal → h2', h2Marked, 8);
  warnCopy('CtaFinal → future pacing', futurePacingMarked, 24);
  if (psMarked !== undefined) warnCopy('CtaFinal → PS', psMarked, 55);
  const { contenedor, item } = useReveal();

  return (
    <section
      id={id}
      aria-label="Empieza hoy"
      className="relative overflow-hidden py-20 md:py-24"
      style={{ background: 'var(--accent)' }}
    >
      <motion.div
        variants={contenedor}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="relative mx-auto flex max-w-[680px] flex-col items-center px-5 text-center"
      >
        {/* Dispositivo ownable "mordisco" (FICHA-ARTE.md): su único eco fuera del Hero, en crema sobre el verde */}
        <motion.svg variants={item} aria-hidden="true" viewBox="0 0 56 14" className="mb-4 h-[12px] w-[44px]">
          <path
            d="M0,0 L18,0 C21,0 22,14 28,14 C34,14 35,0 38,0 L56,0"
            fill="none"
            stroke="var(--bg)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.svg>
        <motion.h2
          variants={item}
          className="text-balance text-[32px] font-bold leading-[1.15] [font-family:var(--font-display)] md:text-[44px] [&_span]:italic"
          // La palabra [acento] va en itálica y crema hundido sobre el verde (nunca verde sobre verde)
          style={{ color: 'var(--bg)', ['--accent' as string]: 'var(--surface-2)' }}
        >
          <MarkedCopy text={h2Marked} />
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-4 max-w-[520px] text-[17px] leading-relaxed"
          style={{ color: 'color-mix(in oklab, var(--bg) 88%, transparent)' }}
        >
          <MarkedCopy text={futurePacingMarked} />
        </motion.p>

        <motion.div variants={item} className="mt-8 w-full sm:w-auto">
          {/* Crema sobre verde = el máximo contraste de la página */}
          <CtaButton href={ctaHref} alto={56} tono="invertido">
            {ctaLabel}
          </CtaButton>
        </motion.div>

        {recap && (
          <motion.p
            variants={item}
            className="mt-3 text-[13px]"
            style={{ color: 'color-mix(in oklab, var(--bg) 82%, transparent)' }}
          >
            {recap}
          </motion.p>
        )}

        {psMarked !== undefined && (
          <motion.p
            variants={item}
            className="mt-10 max-w-[520px] text-left text-[15px] italic leading-[1.6]"
            style={{ color: 'color-mix(in oklab, var(--bg) 88%, transparent)' }}
          >
            <MarkedCopy text={psMarked} />
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
