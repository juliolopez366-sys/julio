'use client';

// Error Boundary de la app interna (Regla UX 18: la app nunca muestra pantalla
// blanca). Cubre las 4 secciones (Hoy/Historial/Tu Patrón/Cuenta) — la nav sigue
// visible porque layout.tsx no se desmonta, así que la persona puede salir del error.

import { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

export default function ErrorAppInterna({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-[var(--chip-bg)]">
        <AlertTriangle size={24} className="text-[var(--error)]" aria-hidden="true" />
      </span>
      <h1 className="text-[18px] font-bold [font-family:var(--font-display)]">Algo no cargó bien</h1>
      <p className="max-w-[32ch] text-[15px] text-[var(--text-secondary)]">
        Puede ser tu conexión o algo de nuestro lado. Tus comidas y síntomas registrados están a salvo.
      </p>
      <motion.button
        type="button"
        whileTap={reduce ? undefined : { scale: 0.97 }}
        onClick={() => reset()}
        className="mt-2 flex h-11 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] px-6 text-[15px] font-semibold text-[var(--bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        Reintentar
      </motion.button>
    </div>
  );
}
