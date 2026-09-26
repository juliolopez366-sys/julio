'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Trash2 } from 'lucide-react';
import { BottomSheet } from './bottom-sheet';
import { FotoComida } from './foto-comida';
import { BadgeRiesgo } from './badge-riesgo';
import { eliminarComida, type Comida } from '@/lib/foodscan-data';

export function SheetDetalleComida({
  comida,
  onCerrar,
  onEliminar,
}: {
  comida: Comida | null;
  onCerrar: () => void;
  /** Se llama tras eliminar, para que la pantalla recargue sus datos. */
  onEliminar?: () => void;
}) {
  const [confirmando, setConfirmando] = useState(false);
  const [eliminado, setEliminado] = useState(false);
  const reduce = useReducedMotion();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!comida) {
      setConfirmando(false);
      setEliminado(false);
    }
  }, [comida]);

  // Al desmontar (navegar fuera de la app), si el borrado quedó pendiente, se ejecuta
  // igual — "deshacer" solo cancela mientras la persona sigue viendo el aviso.
  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  function confirmarEliminar() {
    if (!comida) return;
    setEliminado(true);
    timeoutRef.current = setTimeout(() => {
      eliminarComida(comida.id);
      onEliminar?.();
      onCerrar();
    }, 4500);
  }

  function deshacerEliminar() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setEliminado(false);
    setConfirmando(false);
  }

  return (
    <BottomSheet abierto={comida !== null} onCerrar={onCerrar} titulo={comida?.descripcion ?? ''}>
      {comida && eliminado && (
        <div role="status" aria-live="polite" className="flex flex-col items-center gap-3 py-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-[var(--chip-bg)]">
            <Check size={22} className="text-[var(--accent)]" aria-hidden="true" />
          </span>
          <p className="text-[15px] font-semibold text-[var(--text-primary)]">Registro eliminado</p>
          <motion.button
            type="button"
            whileTap={reduce ? undefined : { scale: 0.97 }}
            onClick={deshacerEliminar}
            className="text-[15px] font-semibold text-[var(--accent)] underline underline-offset-2"
          >
            Deshacer
          </motion.button>
        </div>
      )}
      {comida && !eliminado && (
        <div className="flex flex-col gap-4">
          <FotoComida colores={comida.colorFoto} className="h-32 w-full rounded-[var(--radius-card)]" />
          <div className="flex items-center gap-2">
            <BadgeRiesgo nivel={comida.nivelRiesgo} />
            <span className="text-[12px] text-[var(--text-secondary)]">{comida.nombreComida}</span>
          </div>
          <div>
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">Ingredientes</p>
            <div className="flex flex-wrap gap-2">
              {comida.ingredientes.map((ing) => {
                const esRiesgo = comida.ingredientesRiesgo.includes(ing);
                return (
                  <span
                    key={ing}
                    className="rounded-full px-3 py-1 text-[12px] font-medium capitalize"
                    style={{
                      backgroundColor: esRiesgo ? 'color-mix(in oklab, var(--alerta) 14%, transparent)' : 'var(--surface-2)',
                      color: esRiesgo ? 'var(--alerta)' : 'var(--text-primary)',
                    }}
                  >
                    {ing}
                  </span>
                );
              })}
            </div>
          </div>
          {onEliminar &&
            (confirmando ? (
              <div className="flex gap-2">
                <motion.button
                  type="button"
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  onClick={() => setConfirmando(false)}
                  className="flex h-11 flex-1 items-center justify-center rounded-[var(--radius-button)] bg-[var(--surface-2)] text-[15px] font-semibold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  onClick={confirmarEliminar}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--error)] text-[15px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <Trash2 size={16} aria-hidden="true" /> Sí, eliminar
                </motion.button>
              </div>
            ) : (
              <motion.button
                type="button"
                whileTap={reduce ? undefined : { scale: 0.97 }}
                onClick={() => setConfirmando(true)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--surface-2)] text-[15px] font-semibold text-[var(--error)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <Trash2 size={16} aria-hidden="true" /> Eliminar este registro
              </motion.button>
            ))}
        </div>
      )}
    </BottomSheet>
  );
}
