'use client';

import { motion, useReducedMotion } from 'motion/react';
import { BottomSheet } from './bottom-sheet';
import { FotoComida } from './foto-comida';
import { COMIDAS_PRESET } from '@/lib/foodscan-data';

export function SheetNuevaComida({
  abierto,
  onCerrar,
  onElegir,
}: {
  abierto: boolean;
  onCerrar: () => void;
  onElegir: (preset: (typeof COMIDAS_PRESET)[number]) => void;
}) {
  const reduce = useReducedMotion();
  return (
    <BottomSheet abierto={abierto} onCerrar={onCerrar} titulo="¿Qué acabas de comer?">
      <p className="mt-1 text-[15px] text-[var(--text-secondary)]">Elige la que más se parezca — analizamos sus ingredientes al instante.</p>
      <div className="mt-4 flex flex-col gap-3">
        {COMIDAS_PRESET.map((preset, i) => (
          <motion.button
            key={preset.descripcion}
            type="button"
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.2, delay: reduce ? 0 : i * 0.04 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            onClick={() => onElegir(preset)}
            className="flex items-center gap-3 rounded-[var(--radius-card)] bg-[var(--surface)] p-3 text-left shadow-[0_2px_10px_color-mix(in_oklab,var(--accent)_8%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <FotoComida colores={preset.colorFoto} className="size-12 shrink-0 rounded-[var(--radius-button)]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold text-[var(--text-primary)]">{preset.descripcion}</p>
              <p className="truncate text-[12px] text-[var(--text-secondary)]">{preset.ingredientes.join(', ')}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </BottomSheet>
  );
}
