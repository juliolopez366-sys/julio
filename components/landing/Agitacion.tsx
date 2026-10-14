'use client';

// KIT DE LANDING — §3 AGITACIÓN (blueprint: 55 §3)
// El costo de seguir igual, visible. El tipo de `frases` es string[] a propósito:
// es IMPOSIBLE pasarle un párrafo de 72 palabras — cada frase es corta (máx 2
// líneas; warn a las 18 palabras). El NÚMERO del costo va en [b]/[acento] desde
// el copy marcado (es el dato héroe de la sección). MISMO fondo elevado que §2
// (un solo movimiento visual, sin separador). Cero decoración de miedo.
// Texto corrido sin tarjetas ni íconos: el peso lo pone el copy, la última frase
// (la salida) va más fuerte.

import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { SectionShell, useReveal, VIEWPORT_ONCE } from './ui';
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
        <div className="flex flex-col gap-3 pt-4">
          {frases.map((f, i) => (
            <motion.p
              key={i}
              variants={item}
              className={`text-pretty leading-relaxed ${
                i === frases.length - 1
                  ? 'text-lg font-medium text-[var(--text-primary)]'
                  : 'text-base text-[var(--text-secondary)]'
              }`}
            >
              <MarkedCopy text={f.textoMarked} />
            </motion.p>
          ))}
        </div>

        {contraste && (
          <motion.p variants={item} className="mt-6 text-base leading-relaxed text-[var(--text-secondary)]">
            <b className="font-semibold text-[var(--text-primary)]">{contraste.labelHoy}:</b> {contraste.hoy}{' '}
            <b className="font-semibold text-[var(--text-primary)]">{contraste.labelFuturo}:</b> {contraste.futuro}
          </motion.p>
        )}
      </motion.div>
    </SectionShell>
  );
}
