'use client';

// "Tu Patrón" — la sección que vende la promesa central (Motor de Detonante Real).
// Muestra el resultado del motor de correlación con su evidencia (17-VISUALIZACION-DATOS.md:
// dato héroe + gráfico de apoyo + insight interpretado, nunca solo el número).

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { MordiscoAncho } from '@/components/app/mordisco-ancho';
import {
  asegurarSemilla,
  getComidas,
  getSintomas,
  calcularCorrelacion,
  type Comida,
  type Correlacion,
} from '@/lib/foodscan-data';
import { FilaComida } from '@/components/app/fila-comida';
import { SheetDetalleComida } from '@/components/app/sheet-detalle-comida';

function usePorcentajeAnimado(valor: number) {
  const [mostrado, setMostrado] = useState(0);
  useEffect(() => {
    let raf: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 900);
      setMostrado(Math.round(valor * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [valor]);
  return mostrado;
}

export default function PatronPage() {
  const [comidas, setComidas] = useState<Comida[] | null>(null);
  const [correlacion, setCorrelacion] = useState<Correlacion | null | undefined>(undefined);
  const [detalle, setDetalle] = useState<Comida | null>(null);
  const reduce = useReducedMotion();
  const router = useRouter();

  function recargar() {
    const cs = getComidas();
    const ss = getSintomas();
    setComidas(cs);
    setCorrelacion(calcularCorrelacion(cs, ss));
  }

  useEffect(() => {
    asegurarSemilla();
    recargar();
  }, []);

  const confianzaPct = Math.round((correlacion?.confianza ?? 0) * 100);
  const confianzaAnimada = usePorcentajeAnimado(correlacion ? confianzaPct : 0);

  if (!comidas || correlacion === undefined) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-5 pt-8">
        <div className="h-8 w-44 animate-pulse rounded-full bg-[var(--surface)]" />
        <div className="h-48 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface)]" />
      </div>
    );
  }

  const comidasRelacionadas = correlacion ? comidas.filter((c) => correlacion.comidasRelacionadas.includes(c.id)) : [];
  const circunferencia = 2 * Math.PI * 42;

  return (
    <div className="flex flex-1 flex-col gap-6 px-5 pb-28 pt-6">
      <h1 className="text-[28px] font-bold leading-[1.1] [font-family:var(--font-display)]">Tu Patrón</h1>

      {correlacion ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] bg-[var(--chip-bg)] p-6 text-center shadow-[0_4px_16px_color-mix(in_oklab,var(--accent)_10%,transparent)]"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">Sospechoso principal</p>
            <div aria-hidden="true" className="relative flex size-28 items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="color-mix(in oklab, var(--alerta) 16%, transparent)" strokeWidth="9" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--alerta)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={circunferencia}
                  initial={{ strokeDashoffset: circunferencia }}
                  animate={{ strokeDashoffset: circunferencia - (circunferencia * confianzaPct) / 100 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <span className="text-[26px] font-bold tabular-nums [font-family:var(--font-display)]">{confianzaAnimada}%</span>
            </div>
            <h2 className="text-[18px] font-bold capitalize [font-family:var(--font-display)] text-[var(--accent)]">{correlacion.ingrediente}</h2>
            <p className="max-w-[32ch] text-[15px] leading-relaxed text-[var(--text-secondary)]">
              {correlacion.vecesConSintoma} de {correlacion.vecesComido} veces que comiste algo con {correlacion.ingrediente}, tuviste síntomas dentro de las siguientes 48 horas.
            </p>
            <p role="status" aria-live="polite" className="sr-only">
              {correlacion.ingrediente}, {confianzaPct}% de confianza como tu detonante principal.
            </p>
          </motion.div>

          <MordiscoAncho color="var(--surface-2)" />

          <div className="rounded-[var(--radius-card)] bg-[var(--surface-2)] p-4 shadow-[inset_0_2px_6px_color-mix(in_oklab,var(--text-primary)_10%,transparent)]">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">La evidencia detrás de tu patrón</p>
            <div className="flex flex-col gap-3">
              {comidasRelacionadas.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.25, delay: reduce ? 0 : i * 0.06 }}
                  className="relative"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-2 -top-2 z-10 flex size-6 items-center justify-center rounded-full bg-[var(--accent)] text-[12px] font-bold tabular-nums text-[var(--bg)] shadow-[0_2px_6px_color-mix(in_oklab,var(--accent)_35%,transparent)]"
                  >
                    {i + 1}
                  </span>
                  <FilaComida comida={c} onClick={setDetalle} />
                </motion.div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-1 flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] bg-[var(--surface)] p-8 text-center"
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-[var(--chip-bg)]">
            <Sparkles size={24} className="text-[var(--accent)]" aria-hidden="true" />
          </span>
          <h2 className="text-[18px] font-bold [font-family:var(--font-display)]">Todavía estamos aprendiendo</h2>
          <p className="max-w-[32ch] text-[15px] text-[var(--text-secondary)]">
            Sigue registrando tus comidas y síntomas — necesitamos ver el mismo ingrediente repetirse junto a un síntoma para aislar tu detonante real.
          </p>
          <button
            type="button"
            onClick={() => router.push('/hoy')}
            className="mt-2 text-[15px] font-semibold text-[var(--accent)] underline underline-offset-2"
          >
            Registrar una comida
          </button>
        </motion.div>
      )}

      <SheetDetalleComida comida={detalle} onCerrar={() => setDetalle(null)} onEliminar={recargar} />
    </div>
  );
}
