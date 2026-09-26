'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

export function BottomSheet({
  abierto,
  onCerrar,
  titulo,
  children,
}: {
  abierto: boolean;
  onCerrar: () => void;
  titulo: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {abierto && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-[color-mix(in_oklab,black_45%,transparent)]"
            onClick={onCerrar}
          />
          <motion.div
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label={titulo}
            initial={{ y: reduce ? 0 : '100%', opacity: reduce ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduce ? 0 : '100%', opacity: reduce ? 0 : 1 }}
            transition={{ duration: reduce ? 0.15 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            drag={reduce ? false : 'y'}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80 || info.velocity.y > 500) onCerrar();
            }}
            className="fixed inset-x-0 bottom-0 z-40 mx-auto max-h-[80dvh] w-full max-w-[500px] overflow-y-auto rounded-t-[var(--radius-card)] bg-[var(--bg)] p-5 pb-8 shadow-[0_-12px_32px_-12px_color-mix(in_oklab,var(--accent)_30%,transparent)]"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)]" />
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-bold [font-family:var(--font-display)]">{titulo}</h2>
              <button
                type="button"
                onClick={onCerrar}
                aria-label="Cerrar"
                className="flex size-9 items-center justify-center rounded-full text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
