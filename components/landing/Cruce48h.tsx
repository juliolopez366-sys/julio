'use client';

// Solución: el Motor de Detonante Real, MOSTRADO y no solo contado.
// Un ejemplo con la misma regla que lib/foodscan-data.ts → calcularCorrelacion:
// cada comida con un ingrediente de riesgo cuenta si hubo síntoma en las 48 h
// siguientes; el candidato necesita ≥2 apariciones y ≥50 % de coincidencia.
// Ejemplo ilustrativo (rotulado como tal) — no son datos de usuarias reales.

import { motion } from 'motion/react';
import { useReveal, VIEWPORT_ONCE } from './ui';

type Fila =
  | { tipo: 'comida'; cuando: string; plato: string; riesgo: string[] }
  | { tipo: 'sintoma'; cuando: string; sintoma: string };

const FILAS: Fila[] = [
  { tipo: 'comida', cuando: 'Lun 13:10', plato: 'Tacos con salsa cremosa', riesgo: ['ajo', 'cebolla'] },
  { tipo: 'comida', cuando: 'Lun 20:30', plato: 'Arroz con pollo', riesgo: [] },
  { tipo: 'comida', cuando: 'Mar 08:00', plato: 'Avena con fresas', riesgo: [] },
  { tipo: 'comida', cuando: 'Mar 13:30', plato: 'Pasta al pomodoro', riesgo: ['ajo', 'trigo'] },
  { tipo: 'sintoma', cuando: 'Mar 19:00', sintoma: 'Hinchazón fuerte' },
];

const SOSPECHOSO = 'ajo';

export function Cruce48h() {
  const { contenedor, item } = useReveal(0.09);

  return (
    <figure className="rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)] md:p-8">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-lg font-semibold text-[var(--text-primary)]">Un síntoma, sus últimas 48 horas</span>
        <span className="text-[12px] text-[var(--text-secondary)]">Ejemplo</span>
      </figcaption>

      <motion.ol
        variants={contenedor}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="relative mt-6 flex flex-col gap-4 pl-8"
      >
        {/* La ventana: una línea que baja desde 48 h antes hasta el síntoma */}
        <span
          aria-hidden="true"
          className="absolute bottom-8 left-3 top-2 w-0.5 sm:bottom-4 -translate-x-1/2 rounded-full bg-[color-mix(in_oklab,var(--accent)_28%,transparent)]"
        />
        {FILAS.map((f) => (
          <motion.li key={f.cuando} variants={item} className="relative">
            <span
              aria-hidden="true"
              className={`absolute -left-8 top-1 flex size-6 items-center justify-center rounded-full ${
                f.tipo === 'sintoma' ? 'bg-[var(--alerta)]' : 'bg-[var(--bg)]'
              }`}
            >
              <span
                className={`size-2 rounded-full ${f.tipo === 'sintoma' ? 'bg-[var(--bg)]' : 'bg-[color-mix(in_oklab,var(--accent)_55%,transparent)]'}`}
              />
            </span>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="w-24 shrink-0 text-sm tabular-nums text-[var(--text-secondary)]">{f.cuando}</span>
              {f.tipo === 'comida' ? (
                <span className="text-base text-[var(--text-primary)]">
                  {f.plato}
                  {f.riesgo.length > 0 && (
                    <span className="text-[var(--text-secondary)]">
                      {' · '}
                      {f.riesgo.map((r, i) => (
                        <span key={r}>
                          {i > 0 && ', '}
                          {r === SOSPECHOSO ? <b className="font-semibold text-[var(--accent)]">{r}</b> : r}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              ) : (
                <span className="text-base font-semibold text-[var(--text-primary)]">{f.sintoma}</span>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ol>

      {/* El resultado: la misma cuenta que hace el Motor */}
      <div className="mt-8 flex flex-col gap-4 rounded-[var(--radius-button)] bg-[var(--bg)] p-5 sm:flex-row sm:items-center sm:gap-6">
        <p className="shrink-0 text-[32px] font-bold leading-none tabular-nums text-[var(--accent)] [font-family:var(--font-display)]">
          4 de 5
        </p>
        <p className="text-base leading-snug text-[var(--text-primary)]">
          Arriba ves 2 de ellas. Sumando tus semanas de registro, 4 de tus 5 comidas con{' '}
          <b className="font-semibold">ajo</b> terminaron en síntoma dentro de las 48 horas siguientes. Tu detonante más
          probable: <b className="font-semibold text-[var(--accent)]">ajo</b>, con confianza de 80 %.
        </p>
      </div>
      <p className="mt-3 text-[12px] text-[var(--text-secondary)]">
        El Motor solo muestra un patrón cuando un ingrediente se repite. Orientación de IA, no un diagnóstico.
      </p>
    </figure>
  );
}
