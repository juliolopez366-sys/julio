'use client';

import { motion, useReducedMotion } from 'motion/react';
import { FotoComida } from './foto-comida';
import { BadgeRiesgo } from './badge-riesgo';
import type { Comida } from '@/lib/foodscan-data';

function formatearHora(iso: string) {
  return new Date(iso).toLocaleTimeString('es', { hour: 'numeric', minute: '2-digit' });
}

export function FilaComida({ comida, onClick }: { comida: Comida; onClick?: (comida: Comida) => void }) {
  const reduce = useReducedMotion();
  const contenido = (
    <>
      <FotoComida colores={comida.colorFoto} className="size-14 shrink-0 rounded-[var(--radius-button)]" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-[var(--text-primary)]">{comida.descripcion}</p>
        <p className="text-[12px] text-[var(--text-secondary)]">
          {comida.nombreComida} · {formatearHora(comida.registradoEn)}
        </p>
      </div>
      <BadgeRiesgo nivel={comida.nivelRiesgo} />
    </>
  );

  if (!onClick) {
    return <div className="flex items-center gap-3 rounded-[var(--radius-card)] bg-[var(--surface)] p-3 shadow-[0_2px_10px_color-mix(in_oklab,var(--accent)_8%,transparent)]">{contenido}</div>;
  }

  return (
    <motion.button
      type="button"
      whileTap={reduce ? undefined : { scale: 0.98 }}
      onClick={() => onClick(comida)}
      className="flex w-full items-center gap-3 rounded-[var(--radius-card)] bg-[var(--surface)] p-3 text-left shadow-[0_2px_10px_color-mix(in_oklab,var(--accent)_8%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
    >
      {contenido}
    </motion.button>
  );
}
