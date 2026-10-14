'use client';

// KIT DE LANDING — §4 SOLUCIÓN (blueprint: 55 §4)
// Vuelve al fondo BASE (el alivio también es visual). Título + el MECANISMO
// BAUTIZADO en su chip con <Accent> y hairline + Big Idea + el mecanismo
// MOSTRADO (slot `visual`) + EXACTAMENTE 3 pasos con number chip 44px (tupla en
// el tipo: ni 2 ni 4). Sin kicker: el título carga su propio peso. Pasos entran
// escalonados (whileInView + stagger, reduced-motion respetado).

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Accent, Hairline, SectionShell, useReveal, VIEWPORT_ONCE } from './ui';
import { MarkedCopy, warnCopy } from './MarkedCopy';

export interface PasoMecanismo {
  /** Título del paso — 16px/600. */
  titulo: string;
  /** UNA línea (warn a las 14 palabras). */
  detalle: string;
}

export interface SolucionProps {
  /** Copy MARCADO del título de sección (máx 8 palabras). */
  tituloMarked: string;
  /** Nombre PROPIO del mecanismo bautizado (19) — se pinta en el chip con <Accent>. */
  mecanismo: string;
  /** Big Idea en 1-2 líneas, copy MARCADO. */
  bigIdeaMarked: string;
  /** Los 3 pasos del mecanismo — la tupla obliga a que sean exactamente 3. */
  pasos: [PasoMecanismo, PasoMecanismo, PasoMecanismo];
  /** El mecanismo MOSTRADO (ej. <Cruce48h />) — va entre la Big Idea y los pasos. */
  visual?: ReactNode;
  id?: string;
}

export function Solucion({
  tituloMarked,
  mecanismo,
  bigIdeaMarked,
  pasos,
  visual,
  id,
}: SolucionProps) {
  warnCopy('Solución → título', tituloMarked, 8);
  warnCopy('Solución → Big Idea', bigIdeaMarked, 30);
  pasos.forEach((p, i) => warnCopy(`Solución → paso ${i + 1}`, p.detalle, 14));
  const { contenedor, item } = useReveal();

  return (
    <SectionShell id={id} elevacion="base" ariaLabel="Cómo funciona">
      <motion.div
        variants={contenedor}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="mx-auto max-w-[780px]"
      >
        <motion.div variants={item}>
          <h2 className="text-balance text-[26px] font-bold leading-[1.15] text-[var(--text-primary)] [font-family:var(--font-display)] md:text-[32px]">
            <MarkedCopy text={tituloMarked} />
          </h2>
        </motion.div>

        {/* El chip del mecanismo bautizado — hairline + <Accent> (55 §4) */}
        <motion.div variants={item} className="mt-4">
          <Hairline surface="bg" className="w-fit">
            <span className="flex items-center gap-2 px-4 py-2 text-[15px] font-semibold">
              <Accent>{mecanismo}</Accent>
            </span>
          </Hairline>
        </motion.div>

        <motion.p variants={item} className="mt-5 max-w-[620px] text-[17px] leading-relaxed text-[var(--text-secondary)] md:text-[18px]">
          <MarkedCopy text={bigIdeaMarked} />
        </motion.p>

        {visual && (
          <motion.div variants={item} className="mt-10">
            {visual}
          </motion.div>
        )}

        {/* 3 pasos: filas apiladas en mobile, 3 columnas en desktop */}
        <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pasos.map((p, i) => (
            <motion.li key={i} variants={item} className="flex items-start gap-4 md:flex-col">
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)] text-[17px] font-bold tabular-nums text-[var(--accent)]"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="pt-1 md:pt-0">
                <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">{p.titulo}</h3>
                <p className="mt-1 text-[15px] leading-snug text-[var(--text-secondary)]">{p.detalle}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </SectionShell>
  );
}
