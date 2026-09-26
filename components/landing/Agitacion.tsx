'use client';

// KIT DE LANDING — §3 AGITACIÓN (blueprint: 55 §3)
// El costo de seguir igual, visible. El tipo de `frases` es string[] a propósito:
// es IMPOSIBLE pasarle un párrafo de 72 palabras — cada frase es corta (máx 2
// líneas; warn a las 18 palabras). El NÚMERO del costo va en [b]/[acento] desde
// el copy marcado (es el dato héroe de la sección). MISMO fondo elevado que §2
// (un solo movimiento visual, sin separador). Cero decoración de miedo.

import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { IconChip, SectionShell, useReveal, VIEWPORT_ONCE } from './ui';
import { MarkedCopy, warnCopy, warnRango } from './MarkedCopy';

export interface FraseAgitacion {
  /** Ícono de costo/urgencia de Lucide (TrendingDown, Repeat, CalendarClock…) — jamás emoji. */
  icon: LucideIcon;
  /** Copy MARCADO — corta (máx 18 palabras). */
  textoMarked: string;
}

export interface AgitacionProps {
  /** 2-4 frases MARCADAS y cortas, cada una con su ícono — el array es el contrato: nada de párrafos. */
  frases: FraseAgitacion[];
  /** Mini-card opcional "hoy vs en 6 meses" (55 §3). */
  contraste?: {
    labelHoy: string;
    hoy: string;
    labelFuturo: string;
    futuro: string;
  };
  id?: string;
}

export function Agitacion({ frases, contraste, id }: AgitacionProps) {
  warnRango('Agitación → frases', frases.length, 2, 4);
  frases.forEach((f, i) => warnCopy(`Agitación → frase ${i + 1}`, f.textoMarked, 18));
  const { contenedor, item } = useReveal();

  return (
    <SectionShell id={id} elevacion="elevada" flush="top" ariaLabel="El costo de seguir igual">
      <motion.div
        variants={contenedor}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="mx-auto max-w-[620px]"
      >
        <div className="flex flex-col gap-4">
          {frases.map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              className="flex items-start gap-4 rounded-[var(--radius-card)] bg-[var(--bg)] p-4 shadow-[var(--shadow-1)]"
            >
              <IconChip icon={f.icon} tone="muted" />
              <p className="pt-2 text-[16px] leading-snug text-[var(--text-secondary)]">
                <MarkedCopy text={f.textoMarked} />
              </p>
            </motion.div>
          ))}
        </div>

        {contraste && (
          <>
            {/* Dispositivo ownable "mordisco" (FICHA-ARTE.md), como separador */}
            <motion.svg
              variants={item}
              aria-hidden="true"
              viewBox="0 0 56 14"
              className="mt-8 h-[12px] w-[44px]"
            >
              <path
                d="M0,0 L18,0 C21,0 22,14 28,14 C34,14 35,0 38,0 L56,0"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </motion.svg>
            <motion.div variants={item} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] bg-[var(--bg)] p-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                {contraste.labelHoy}
              </p>
              <p className="mt-2 text-[15px] leading-snug text-[var(--text-primary)]">{contraste.hoy}</p>
            </div>
            {/* "si nada cambia": más apagado/frío — el peso lo pone el copy, no el rojo */}
            <div className="rounded-[var(--radius-card)] bg-[var(--surface-2)] p-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                {contraste.labelFuturo}
              </p>
              <p className="mt-2 text-[15px] leading-snug text-[var(--text-secondary)]">{contraste.futuro}</p>
            </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </SectionShell>
  );
}
