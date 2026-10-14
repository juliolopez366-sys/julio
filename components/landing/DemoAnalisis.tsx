'use client';

// Visual del Hero: el análisis REAL de la app sobre un plato compuesto (objeción
// #1 de FICHA-AVATAR: "la IA no va a adivinar el ajo escondido en la salsa").
// Refleja lo que hace app/api/analizar-comida: descripción + ingredientes +
// riesgo + ingredientes de riesgo, marcando los ocultos de forma conservadora.
// No muestra funciones que la app no tiene (no hay "corregir en un toque").
// La curva "mordisco" (FICHA-ARTE) vive aquí en su lugar canónico: donde la
// foto se encuentra con la hoja crema.

import { motion, useReducedMotion } from 'motion/react';

const INGREDIENTES = ['pollo', 'tortilla de maíz', 'salsa cremosa', 'cebolla', 'cilantro', 'limón', 'ajo'];
const RIESGO = ['ajo', 'cebolla'];

export function DemoAnalisis() {
  const reduce = useReducedMotion();

  return (
    <figure className="relative mx-auto w-full max-w-100">
      <div className="overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface)] shadow-[var(--shadow-2)]">
        {/* Foto del plato con el marco de escaneo del isotipo */}
        <div className="relative aspect-[5/4] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- el kit se mantiene portable */}
          <img
            src="/hero-tacos-560.webp"
            srcSet="/hero-tacos-560.webp 560w, /hero-tacos.webp 928w"
            sizes="(min-width: 768px) 400px, calc(100vw - 40px)"
            alt="Foto de tres tacos con salsa cremosa, cebolla y cilantro"
            width={928}
            height={1152}
            fetchPriority="high"
            className="h-full w-full object-cover object-[50%_42%]"
          />
          <MarcoEscaneo />
          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[12%] top-[14%] h-0.5 rounded-full bg-[var(--bg)] shadow-[0_0_14px_2px_color-mix(in_oklab,var(--bg)_70%,transparent)]"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: [0, 170, 170], opacity: [0, 0.9, 0] }}
              transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1], times: [0, 0.8, 1] }}
            />
          )}
        </div>

        {/* La mordida: la foto se encuentra con la hoja crema */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 28"
          preserveAspectRatio="none"
          className="relative -mt-7 block h-7 w-full"
        >
          <path d="M0,0 L150,0 C172,0 178,28 200,28 C222,28 228,0 250,0 L400,0 L400,28 L0,28 Z" fill="var(--surface)" />
        </svg>

        <figcaption className="relative -mt-px px-5 pb-5 pt-2 text-left md:px-6 md:pb-6">
          <p className="text-[12px] text-[var(--text-secondary)]">Así se ve un análisis</p>
          <p className="mt-1 text-xl font-semibold leading-tight text-[var(--text-primary)] [font-family:var(--font-display)]">
            Tacos de pollo con salsa cremosa
          </p>
          <p className="mt-1.5 text-sm leading-snug text-[var(--text-secondary)]">{INGREDIENTES.join(', ')}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[color-mix(in_oklab,var(--alerta)_16%,transparent)] px-3 py-1 text-sm font-semibold text-[var(--error)]">
              Riesgo alto
            </span>
            <span className="text-sm text-[var(--text-primary)]">
              por <b>{RIESGO.join(' y ')}</b>
            </span>
          </div>

          <p className="mt-3 text-sm leading-snug text-[var(--text-primary)]">
            La salsa no dice «ajo». La IA lo marca igual: prefiere avisarte de más que dejarte a ciegas.
          </p>
          <a
            href="/aviso-ia"
            className="mt-3 inline-block text-[12px] text-[var(--text-secondary)] underline decoration-[color-mix(in_oklab,var(--text-secondary)_45%,transparent)] underline-offset-4"
          >
            Orientación de IA, no un diagnóstico
          </a>
        </figcaption>
      </div>
    </figure>
  );
}

/* Las 4 esquinas del marco de escaneo — el mismo gesto del isotipo de FoodScan,
   dibujadas como trazo (no como bordes de caja). */
function MarcoEscaneo() {
  const esquinas = [
    'M2,26 L2,10 Q2,2 10,2 L26,2',
    'M74,2 L90,2 Q98,2 98,10 L98,26',
    'M98,74 L98,90 Q98,98 90,98 L74,98',
    'M26,98 L10,98 Q2,98 2,90 L2,74',
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-[10%] h-[80%] w-[80%] opacity-90"
    >
      {esquinas.map((d) => (
        <path key={d} d={d} fill="none" stroke="var(--bg)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
