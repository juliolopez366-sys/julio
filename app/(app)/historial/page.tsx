'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { getComidas, getSintomas, type Comida, type Sintoma } from '@/lib/foodscan-data';
import { FilaComida } from '@/components/app/fila-comida';
import { FilaSintoma } from '@/components/app/fila-sintoma';
import { SheetDetalleComida } from '@/components/app/sheet-detalle-comida';

type Filtro = 'todas' | 'comidas' | 'sintomas' | 'riesgo';

const FILTROS: { id: Filtro; etiqueta: string }[] = [
  { id: 'todas', etiqueta: 'Todas' },
  { id: 'comidas', etiqueta: 'Comidas' },
  { id: 'sintomas', etiqueta: 'Síntomas' },
  { id: 'riesgo', etiqueta: 'Alto riesgo' },
];

type Evento = { tipo: 'comida'; dato: Comida } | { tipo: 'sintoma'; dato: Sintoma };

function formatearDia(iso: string) {
  const fecha = new Date(iso);
  const hoy = new Date();
  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);
  if (fecha.toDateString() === hoy.toDateString()) return 'Hoy';
  if (fecha.toDateString() === ayer.toDateString()) return 'Ayer';
  return fecha.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' });
}

export default function HistorialPage() {
  const [comidas, setComidas] = useState<Comida[] | null>(null);
  const [sintomas, setSintomas] = useState<Sintoma[] | null>(null);
  const [filtro, setFiltro] = useState<Filtro>('todas');
  const [detalle, setDetalle] = useState<Comida | null>(null);
  const reduce = useReducedMotion();

  async function recargar() {
    const [cs, ss] = await Promise.all([getComidas(), getSintomas()]);
    setComidas(cs);
    setSintomas(ss);
  }

  useEffect(() => {
    recargar();
  }, []);

  const grupos = useMemo(() => {
    if (!comidas || !sintomas) return [];
    const eventos: Evento[] = [
      ...comidas.filter((c) => filtro !== 'sintomas' && (filtro !== 'riesgo' || c.nivelRiesgo !== 'bajo')).map((dato): Evento => ({ tipo: 'comida', dato })),
      ...sintomas.filter((s) => filtro === 'todas' || filtro === 'sintomas').map((dato): Evento => ({ tipo: 'sintoma', dato })),
    ].sort((a, b) => new Date(b.dato.registradoEn).getTime() - new Date(a.dato.registradoEn).getTime());

    const porDia = new Map<string, Evento[]>();
    for (const ev of eventos) {
      const dia = formatearDia(ev.dato.registradoEn);
      porDia.set(dia, [...(porDia.get(dia) ?? []), ev]);
    }
    return Array.from(porDia.entries());
  }, [comidas, sintomas, filtro]);

  if (!comidas || !sintomas) {
    return (
      <div className="flex flex-1 flex-col gap-3 p-5 pt-8">
        <div className="h-8 w-40 animate-pulse rounded-full bg-[var(--surface)]" />
        <div className="h-20 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface)]" />
        <div className="h-20 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface)]" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-5 px-5 pb-28 pt-6">
      <h1 className="text-[28px] font-bold leading-[1.1] [font-family:var(--font-display)]">Tu historial</h1>

      <div className="flex flex-wrap gap-2">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFiltro(f.id)}
            className={`h-9 rounded-full px-4 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
              filtro === f.id ? 'bg-[var(--accent)] text-white' : 'bg-[var(--surface-2)] text-[var(--text-secondary)]'
            }`}
          >
            {f.etiqueta}
          </button>
        ))}
      </div>

      {grupos.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-[var(--radius-card)] bg-[var(--surface)] p-8 text-center">
          <p className="text-[15px] text-[var(--text-secondary)]">No hay registros con este filtro todavía.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {grupos.map(([dia, eventos], gi) => (
            <motion.div key={dia} initial={{ opacity: 0, y: reduce ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.2, delay: reduce ? 0 : gi * 0.05 }}>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">{dia}</p>
              <div className="flex flex-col gap-3">
                {eventos.map((ev) =>
                  ev.tipo === 'comida' ? (
                    <FilaComida key={ev.dato.id} comida={ev.dato} onClick={setDetalle} />
                  ) : (
                    <FilaSintoma key={ev.dato.id} sintoma={ev.dato} />
                  )
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <SheetDetalleComida comida={detalle} onCerrar={() => setDetalle(null)} onEliminar={recargar} />
    </div>
  );
}
