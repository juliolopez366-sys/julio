'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { Camera, Loader2, RotateCcw } from 'lucide-react';
import { BottomSheet } from './bottom-sheet';
import { FotoComida } from './foto-comida';
import { COMIDAS_PRESET, agregarComida, type NivelRiesgo } from '@/lib/foodscan-data';
import { crearClienteSupabase } from '@/lib/supabase/client';

type Analisis = {
  descripcion: string;
  ingredientes: string[];
  ingredientes_riesgo: string[];
  nivel_riesgo: NivelRiesgo;
};

const COLOR_FOTO_IA: [string, string] = ['var(--chip-bg)', 'var(--accent)'];

function leerComoBase64(archivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve((lector.result as string).split(',')[1] ?? '');
    lector.onerror = reject;
    lector.readAsDataURL(archivo);
  });
}

export function SheetNuevaComida({
  abierto,
  onCerrar,
  onElegir,
  onGuardado,
}: {
  abierto: boolean;
  onCerrar: () => void;
  onElegir: (preset: (typeof COMIDAS_PRESET)[number]) => void;
  onGuardado: () => void;
}) {
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [analisis, setAnalisis] = useState<Analisis | null>(null);
  const [estado, setEstado] = useState<'elegir' | 'analizando' | 'revisar' | 'guardando' | 'error'>('elegir');
  const [error, setError] = useState<string | null>(null);

  function reiniciar() {
    setArchivo(null);
    setAnalisis(null);
    setEstado('elegir');
    setError(null);
  }

  async function analizarFoto(archivoElegido: File) {
    setArchivo(archivoElegido);
    setEstado('analizando');
    setError(null);
    try {
      const imagenBase64 = await leerComoBase64(archivoElegido);
      const respuesta = await fetch('/api/analizar-comida', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagenBase64, mediaType: archivoElegido.type || 'image/jpeg' }),
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.error ?? 'No pudimos analizar la foto.');
      setAnalisis(datos as Analisis);
      setEstado('revisar');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No pudimos analizar la foto. Intenta de nuevo.');
      setEstado('error');
    }
  }

  async function confirmarGuardado() {
    if (!analisis || !archivo) return;
    setEstado('guardando');
    try {
      const supabase = crearClienteSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('No autenticado');

      const extension = archivo.type === 'image/png' ? 'png' : 'jpg';
      const ruta = `${user.id}/${crypto.randomUUID()}.${extension}`;
      const { error: errorSubida } = await supabase.storage.from('comidas-fotos').upload(ruta, archivo);
      if (errorSubida) throw errorSubida;

      await agregarComida({
        nombreComida: 'Foto',
        descripcion: analisis.descripcion,
        ingredientes: analisis.ingredientes,
        ingredientesRiesgo: analisis.ingredientes_riesgo,
        nivelRiesgo: analisis.nivel_riesgo,
        colorFoto: COLOR_FOTO_IA,
        fotoUrl: ruta,
      });
      onGuardado();
      onCerrar();
      reiniciar();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No pudimos guardar tu comida. Intenta de nuevo.');
      setEstado('error');
    }
  }

  return (
    <BottomSheet
      abierto={abierto}
      onCerrar={() => {
        onCerrar();
        reiniciar();
      }}
      titulo="¿Qué acabas de comer?"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) analizarFoto(f);
          e.target.value = '';
        }}
      />

      <AnimatePresence mode="wait">
        {estado === 'elegir' && (
          <motion.div key="elegir" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <motion.button
              type="button"
              whileTap={reduce ? undefined : { scale: 0.97 }}
              onClick={() => inputRef.current?.click()}
              className="mt-1 flex h-[52px] w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_28%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              <Camera size={20} aria-hidden="true" /> Tomar o subir una foto
            </motion.button>

            <p className="mb-3 mt-5 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">O elige un ejemplo rápido</p>
            <div className="flex flex-col gap-3">
              {COMIDAS_PRESET.map((preset, i) => (
                <motion.button
                  key={preset.descripcion}
                  type="button"
                  initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.2, delay: reduce ? 0 : i * 0.04 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  onClick={() => onElegir(preset)}
                  className="flex items-center gap-3 rounded-[var(--radius-card)] bg-[var(--surface)] p-3 text-left shadow-[0_2px_10px_color-mix(in_oklab,var(--accent)_8%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <FotoComida colores={preset.colorFoto} className="size-12 shrink-0 rounded-[var(--radius-button)]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold text-[var(--text-primary)]">{preset.descripcion}</p>
                    <p className="truncate text-[12px] text-[var(--text-secondary)]">{preset.ingredientes.join(', ')}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {estado === 'analizando' && (
          <motion.div key="analizando" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3 py-10 text-center">
            <Loader2 size={28} className="animate-spin text-[var(--accent)]" aria-hidden="true" />
            <p role="status" aria-live="polite" className="text-[15px] text-[var(--text-secondary)]">
              Analizando tu foto…
            </p>
          </motion.div>
        )}

        {estado === 'revisar' && analisis && (
          <motion.div key="revisar" initial={{ opacity: 0, y: reduce ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 rounded-[var(--radius-card)] bg-[var(--surface)] p-3 shadow-[0_2px_10px_color-mix(in_oklab,var(--accent)_8%,transparent)]">
              <FotoComida colores={COLOR_FOTO_IA} className="size-12 shrink-0 rounded-[var(--radius-button)]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold text-[var(--text-primary)]">{analisis.descripcion}</p>
                <p className="truncate text-[12px] text-[var(--text-secondary)]">{analisis.ingredientes.join(', ')}</p>
              </div>
            </div>
            {analisis.ingredientes_riesgo.length > 0 && (
              <p className="text-[13px] text-[var(--text-secondary)]">
                Riesgo <b className="text-[var(--text-primary)]">{analisis.nivel_riesgo}</b> por: {analisis.ingredientes_riesgo.join(', ')}
              </p>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={reiniciar}
                className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-[var(--radius-button)] bg-[var(--surface-2)] text-[15px] font-semibold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <RotateCcw size={16} aria-hidden="true" /> Repetir foto
              </button>
              <motion.button
                type="button"
                whileTap={reduce ? undefined : { scale: 0.97 }}
                onClick={confirmarGuardado}
                className="flex h-12 flex-1 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[15px] font-semibold text-[var(--bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                Guardar
              </motion.button>
            </div>
          </motion.div>
        )}

        {estado === 'guardando' && (
          <motion.div key="guardando" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3 py-10 text-center">
            <Loader2 size={28} className="animate-spin text-[var(--accent)]" aria-hidden="true" />
            <p role="status" aria-live="polite" className="text-[15px] text-[var(--text-secondary)]">
              Guardando…
            </p>
          </motion.div>
        )}

        {estado === 'error' && (
          <motion.div key="error" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3 py-6 text-center">
            <p className="text-[15px] text-[var(--error)]">{error}</p>
            <button type="button" onClick={reiniciar} className="text-[15px] font-semibold text-[var(--accent)] underline underline-offset-2">
              Volver a intentar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </BottomSheet>
  );
}
