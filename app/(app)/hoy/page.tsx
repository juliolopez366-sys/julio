'use client';

// Pantalla principal (M0) — Sesión 5. Composición ya aprobada por el usuario en
// vista-previa-app.html (vista 3): foto de la última comida + mordisco + resultado
// de riesgo + insight del Motor de Detonante Real.

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { Camera, Flame, Plus, RotateCcw } from 'lucide-react';
import { FotoComida } from '@/components/app/foto-comida';
import { MordiscoAncho } from '@/components/app/mordisco-ancho';
import { FilaComida } from '@/components/app/fila-comida';
import { SheetNuevaComida } from '@/components/app/sheet-nueva-comida';
import { SheetSintoma } from '@/components/app/sheet-sintoma';
import { SheetDetalleComida } from '@/components/app/sheet-detalle-comida';
import {
  asegurarSemilla,
  getComidas,
  getSintomas,
  getPerfil,
  calcularCorrelacion,
  agregarComida,
  agregarSintoma,
  ETIQUETA_RIESGO,
  type Comida,
  type Perfil,
  type Correlacion,
} from '@/lib/foodscan-data';

function esHoy(iso: string) {
  const fecha = new Date(iso);
  const hoy = new Date();
  return fecha.toDateString() === hoy.toDateString();
}

/** Recuerda la última racha mostrada entre montajes de esta pestaña — solo anima
 * cuando el valor REALMENTE cambió, nunca como ruido decorativo al revisitar la pantalla. */
let ultimaRachaMostrada: number | null = null;

/** Cuenta desde el valor anterior al nuevo (baseline #2 — nunca un número estático). */
function useContadorAnimado(valor: number, duracionMs = 600) {
  const [mostrado, setMostrado] = useState(ultimaRachaMostrada ?? valor);
  const anterior = useRef(ultimaRachaMostrada ?? valor);
  useEffect(() => {
    if (ultimaRachaMostrada === valor) return;
    const inicio = anterior.current;
    const fin = valor;
    const t0 = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duracionMs);
      setMostrado(Math.round(inicio + (fin - inicio) * p));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        anterior.current = fin;
        ultimaRachaMostrada = fin;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [valor, duracionMs]);
  return mostrado;
}

export default function HoyPage() {
  const [comidas, setComidas] = useState<Comida[] | null>(null);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [correlacion, setCorrelacion] = useState<Correlacion | null>(null);
  const [sheetComida, setSheetComida] = useState(false);
  const [sheetSintoma, setSheetSintoma] = useState(false);
  const [detalle, setDetalle] = useState<Comida | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const rachaAnimada = useContadorAnimado(perfil?.rachaActual ?? 0);

  useEffect(() => {
    asegurarSemilla();
    recargar();
  }, []);

  function recargar() {
    const cs = getComidas();
    const ss = getSintomas();
    setComidas(cs);
    setPerfil(getPerfil());
    setCorrelacion(calcularCorrelacion(cs, ss));
  }

  if (!comidas || !perfil) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="h-[210px] animate-pulse rounded-[var(--radius-card)] bg-[var(--surface)]" />
        <div className="h-24 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface)]" />
        <div className="h-14 animate-pulse rounded-[var(--radius-button)] bg-[var(--surface)]" />
      </div>
    );
  }

  const ultima = comidas[0];
  const comidasHoy = comidas.filter((c) => esHoy(c.registradoEn));
  const colorResultado = ultima.nivelRiesgo === 'bajo' ? 'var(--accent)' : 'var(--alerta)';

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative h-[200px] shrink-0 overflow-hidden" style={{ background: 'linear-gradient(160deg, color-mix(in oklab, var(--accent) 78%, white 22%), var(--accent) 70%)' }}>
        <div className="flex items-center justify-between px-5 pt-5">
          <span className="text-[15px] font-semibold text-white [font-family:var(--font-display)]">FoodScan</span>
          <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold tabular-nums text-white">
            <Flame size={14} aria-hidden="true" /> {rachaAnimada} días
          </span>
        </div>
        <FotoComida colores={ultima.colorFoto} className="absolute inset-x-5 top-14 bottom-0 rounded-t-[var(--radius-card)]" />
      </div>
      <MordiscoAncho />

      <div className="flex flex-1 flex-col gap-5 px-5 pb-28 pt-1">
        {perfil.rachaActual > 0 && perfil.rachaActual % 7 === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 20 }}
            className="flex items-center justify-center gap-2 self-center rounded-full bg-[var(--chip-bg)] px-4 py-2"
          >
            <Flame size={16} className="text-[var(--alerta)]" aria-hidden="true" />
            <span className="text-[12px] font-semibold text-[var(--accent)]">¡{perfil.rachaActual} días seguidos! Vas muy bien.</span>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">Riesgo de tu {ultima.nombreComida.toLowerCase()}</p>
          <h2 className="mt-1 text-[28px] font-bold [font-family:var(--font-display)]" style={{ color: colorResultado }}>
            {ETIQUETA_RIESGO[ultima.nivelRiesgo]}
            {ultima.ingredientesRiesgo[0] ? ` · ${ultima.ingredientesRiesgo[0]}` : ''}
          </h2>
          <p className="text-[15px] text-[var(--text-secondary)]">{ultima.descripcion}</p>
        </motion.div>

        {correlacion && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="rounded-[var(--radius-card)] bg-[var(--chip-bg)] p-4 shadow-[0_4px_16px_color-mix(in_oklab,var(--accent)_10%,transparent)]"
          >
            <p className="text-[15px] leading-relaxed text-[var(--text-primary)]">
              <b className="font-semibold text-[var(--accent)]">El {correlacion.ingrediente} vuelve a aparecer.</b>{' '}
              {correlacion.vecesConSintoma} de tus últimos {correlacion.vecesComido} registros con este ingrediente terminaron en síntomas.{' '}
              <span className="text-[var(--text-secondary)]">Todavía es poca muestra — sigue registrando para confirmarlo.</span>
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--accent)_16%,transparent)]">
              <motion.div
                className="h-full rounded-full bg-[var(--accent)]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.round((correlacion.vecesConSintoma / correlacion.vecesComido) * 100)}%` }}
                transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.14 }} className="flex flex-col gap-3">
          <motion.button
            type="button"
            whileTap={reduce ? undefined : { scale: 0.97 }}
            onClick={() => setSheetComida(true)}
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_28%,transparent)] transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            <Camera size={20} aria-hidden="true" /> Escanear mi próxima comida
          </motion.button>
          <button
            type="button"
            onClick={() => {
              agregarComida(ultima);
              recargar();
              setAviso(`Agregado: ${ultima.descripcion}`);
              setTimeout(() => setAviso(null), 2200);
            }}
            className="flex min-h-11 items-center justify-center gap-1.5 self-center px-3 text-[12px] font-medium text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <RotateCcw size={14} aria-hidden="true" /> Repetir &ldquo;{ultima.descripcion}&rdquo;
          </button>
          <motion.button
            type="button"
            whileTap={reduce ? undefined : { scale: 0.97 }}
            onClick={() => setSheetSintoma(true)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--surface-2)] text-[15px] font-semibold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <Plus size={18} aria-hidden="true" /> Registrar un síntoma
          </motion.button>
        </motion.div>

        <div className="rounded-[var(--radius-card)] bg-[var(--surface-2)] p-4 shadow-[inset_0_2px_6px_color-mix(in_oklab,var(--text-primary)_10%,transparent)]">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
            Hoy registraste {comidasHoy.length} comida{comidasHoy.length === 1 ? '' : 's'}
          </p>
          {comidasHoy.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <p className="text-[15px] text-[var(--text-secondary)]">Nada registrado todavía hoy.</p>
              <button type="button" onClick={() => setSheetComida(true)} className="text-[15px] font-semibold text-[var(--accent)] underline underline-offset-2">
                Escanear tu primera comida del día
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {comidasHoy.map((c) => (
                <FilaComida key={c.id} comida={c} onClick={setDetalle} />
              ))}
            </div>
          )}
        </div>
      </div>

      <SheetNuevaComida
        abierto={sheetComida}
        onCerrar={() => setSheetComida(false)}
        onElegir={(preset) => {
          agregarComida(preset);
          setSheetComida(false);
          recargar();
        }}
      />
      <SheetSintoma
        abierto={sheetSintoma}
        onCerrar={() => setSheetSintoma(false)}
        onGuardar={(input) => {
          agregarSintoma(input);
          setSheetSintoma(false);
          recargar();
        }}
      />
      <SheetDetalleComida comida={detalle} onCerrar={() => setDetalle(null)} onEliminar={recargar} />

      <AnimatePresence>
        {aviso && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-[92px] z-50 mx-auto w-fit max-w-[90%] rounded-full bg-[var(--text-primary)] px-4 py-2 text-[12px] font-medium text-[var(--bg)] shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          >
            {aviso}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
