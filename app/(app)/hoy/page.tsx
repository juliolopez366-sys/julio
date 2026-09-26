'use client';

// Pantalla principal (M0) — Sesión 5. Composición ya aprobada por el usuario en
// vista-previa-app.html (vista 3): foto de la última comida + mordisco + resultado
// de riesgo + insight del Motor de Detonante Real.

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Camera, Flame, Plus } from 'lucide-react';
import { FotoComida } from '@/components/app/foto-comida';
import { MordiscoAncho } from '@/components/app/mordisco-ancho';
import { BadgeRiesgo } from '@/components/app/badge-riesgo';
import { FilaComida } from '@/components/app/fila-comida';
import { SheetNuevaComida } from '@/components/app/sheet-nueva-comida';
import { SheetSintoma } from '@/components/app/sheet-sintoma';
import {
  asegurarSemilla,
  getComidas,
  getSintomas,
  getPerfil,
  calcularCorrelacion,
  agregarComida,
  agregarSintoma,
  type Comida,
  type Perfil,
  type Correlacion,
} from '@/lib/foodscan-data';

function esHoy(iso: string) {
  const fecha = new Date(iso);
  const hoy = new Date();
  return fecha.toDateString() === hoy.toDateString();
}

export default function HoyPage() {
  const [comidas, setComidas] = useState<Comida[] | null>(null);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [correlacion, setCorrelacion] = useState<Correlacion | null>(null);
  const [sheetComida, setSheetComida] = useState(false);
  const [sheetSintoma, setSheetSintoma] = useState(false);
  const reduce = useReducedMotion();

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

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative h-[200px] shrink-0 overflow-hidden" style={{ background: 'linear-gradient(160deg, color-mix(in oklab, var(--accent) 78%, white 22%), var(--accent) 70%)' }}>
        <div className="flex items-center justify-between px-5 pt-5">
          <span className="text-[15px] font-semibold text-white [font-family:var(--font-display)]">FoodScan</span>
          <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold text-white">
            <Flame size={14} aria-hidden="true" /> {perfil.rachaActual} días
          </span>
        </div>
        <FotoComida colores={ultima.colorFoto} className="absolute inset-x-5 top-14 bottom-0 rounded-t-[var(--radius-card)]" />
      </div>
      <MordiscoAncho />

      <div className="flex flex-1 flex-col gap-5 px-5 pb-28 pt-1">
        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
            Tu {ultima.nombreComida.toLowerCase()} · {ultima.descripcion}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <BadgeRiesgo nivel={ultima.nivelRiesgo} />
            {ultima.ingredientesRiesgo.length > 0 && (
              <span className="text-[15px] text-[var(--text-secondary)]">por {ultima.ingredientesRiesgo.join(', ')}</span>
            )}
          </div>
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
              {correlacion.vecesConSintoma} de tus últimos {correlacion.vecesComido} registros con este ingrediente terminaron en síntomas.
            </p>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.14 }} className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setSheetComida(true)}
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_28%,transparent)] transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            <Camera size={20} aria-hidden="true" /> Escanear mi próxima comida
          </button>
          <button
            type="button"
            onClick={() => setSheetSintoma(true)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--surface-2)] text-[15px] font-semibold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <Plus size={18} aria-hidden="true" /> Registrar un síntoma
          </button>
        </motion.div>

        <div>
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
            Hoy registraste {comidasHoy.length} comida{comidasHoy.length === 1 ? '' : 's'}
          </p>
          <div className="flex flex-col gap-3">
            {comidasHoy.map((c) => (
              <FilaComida key={c.id} comida={c} />
            ))}
          </div>
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
    </div>
  );
}
