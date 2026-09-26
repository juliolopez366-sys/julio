'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BottomSheet } from './bottom-sheet';
import { ETIQUETA_SINTOMA, type TipoSintoma } from '@/lib/foodscan-data';

const TIPOS = Object.keys(ETIQUETA_SINTOMA) as TipoSintoma[];
const INTENSIDADES: { valor: 1 | 2 | 3; etiqueta: string }[] = [
  { valor: 1, etiqueta: 'Leve' },
  { valor: 2, etiqueta: 'Moderado' },
  { valor: 3, etiqueta: 'Fuerte' },
];

export function SheetSintoma({
  abierto,
  onCerrar,
  onGuardar,
}: {
  abierto: boolean;
  onCerrar: () => void;
  onGuardar: (input: { tipo: TipoSintoma; intensidad: 1 | 2 | 3 }) => void;
}) {
  const reduce = useReducedMotion();
  const [tipo, setTipo] = useState<TipoSintoma | null>(null);
  const [intensidad, setIntensidad] = useState<1 | 2 | 3 | null>(null);

  return (
    <BottomSheet
      abierto={abierto}
      onCerrar={() => {
        onCerrar();
        setTipo(null);
        setIntensidad(null);
      }}
      titulo="¿Qué sientes?"
    >
      <div className="flex flex-col gap-3">
        {TIPOS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTipo(t)}
            className={`flex h-14 w-full items-center rounded-[var(--radius-button)] px-4 text-left text-[16px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
              tipo === t ? 'bg-[var(--chip-bg)] text-[var(--text-primary)] shadow-[0_6px_20px_color-mix(in_oklab,var(--accent)_20%,transparent)]' : 'bg-[var(--surface-2)] text-[var(--text-primary)] shadow-[0_2px_10px_color-mix(in_oklab,var(--accent)_8%,transparent)]'
            }`}
          >
            {ETIQUETA_SINTOMA[t]}
          </button>
        ))}
      </div>

      {tipo && (
        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="mt-5">
          <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">Intensidad</p>
          <div className="flex gap-2">
            {INTENSIDADES.map((op) => (
              <button
                key={op.valor}
                type="button"
                onClick={() => setIntensidad(op.valor)}
                className={`flex h-11 flex-1 items-center justify-center rounded-[var(--radius-button)] text-[15px] font-semibold transition-colors ${
                  intensidad === op.valor ? 'bg-[var(--alerta)] text-white' : 'bg-[var(--surface-2)] text-[var(--text-primary)]'
                }`}
              >
                {op.etiqueta}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <button
        type="button"
        disabled={!tipo || !intensidad}
        onClick={() => {
          if (tipo && intensidad) {
            onGuardar({ tipo, intensidad });
            setTipo(null);
            setIntensidad(null);
          }
        }}
        className="mt-6 flex h-[52px] w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] transition-opacity disabled:opacity-40"
      >
        Guardar registro
      </button>
    </BottomSheet>
  );
}
