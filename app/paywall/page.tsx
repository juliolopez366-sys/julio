'use client';

// Paywall de FoodScan — Sesión 4 (50-DISENO-ONBOARDING-PAYWALL.md, sección C).
// Timeline de trial (C4, patrón Blinkist) + inversión visible + cards ancladas.
// Precio/prueba/garantía = FICHA-MERCADO.md (cosa juzgada): 7 días prueba, 15 garantía.
// Backend de pago no existe aún (Sesión 6) — el CTA simula el flujo con estado local (C3ter).

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X, Lock, Camera, Activity, ClipboardCheck } from 'lucide-react';
import { Mordisco, CtaPrimario, PantallaFunnel } from '@/components/onboarding/funnel-ui';

type Respuestas = { preocupacion?: string; momento?: string; intentos?: string; diasMeta: number; canal?: string };
type EstadoCta = 'inicial' | 'procesando' | 'confirmado' | 'error';

const N_RESPUESTAS = 5;
/** Toda salida del paywall va al mismo lugar (X y "Ahora no" — un solo modelo mental). */
const SALIDA_HREF = '/';

export default function PaywallPage() {
  const [plan, setPlan] = useState<'anual' | 'mensual'>('anual');
  const [respuestas, setRespuestas] = useState<Respuestas | null>(null);
  const [estadoCta, setEstadoCta] = useState<EstadoCta>('inicial');
  const reduce = useReducedMotion();

  useEffect(() => {
    const raw = sessionStorage.getItem('foodscan_onboarding');
    if (raw) setRespuestas(JSON.parse(raw));
  }, []);

  useEffect(() => {
    if (estadoCta !== 'procesando') return;
    const t = setTimeout(() => setEstadoCta('confirmado'), 1400);
    return () => clearTimeout(t);
  }, [estadoCta]);

  return (
    <PantallaFunnel>
      <div className="mx-auto flex w-full max-w-[500px] flex-1 flex-col px-5 pb-6 pt-4">
        <div className="flex h-11 items-center justify-between">
          <a
            href={SALIDA_HREF}
            aria-label="Cerrar"
            className="flex size-11 items-center justify-center rounded-full text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <X size={22} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-3 pt-1"
        >
          <span className="inline-flex w-fit items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)] px-4 py-3 shadow-[0_6px_20px_color-mix(in_oklab,var(--accent)_20%,transparent)]">
            <Mordisco size="lg" />
          </span>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">Tu plan está listo</span>
            <h1 className="text-balance text-[28px] font-bold leading-[1.1] [font-family:var(--font-display)]">
              Se acabó <span className="text-[var(--accent)]">cancelar planes por miedo</span> a un mal día
            </h1>
            <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Tu <span className="font-semibold text-[var(--text-primary)]">Motor de Detonante Real</span> queda configurado con tus {N_RESPUESTAS} respuestas — ajustado a tu meta de {respuestas?.diasMeta ?? 5} días/semana.
            </p>
          </div>
        </motion.div>

        {/* Timeline del trial (C4) — visual default con trial */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="mt-6 rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[0_4px_16px_color-mix(in_oklab,var(--accent)_10%,transparent)]"
        >
          <TimelineTrial />
        </motion.div>

        {/* Qué incluye el plan */}
        <motion.ul
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.12 }}
          className="mt-6 flex flex-col gap-3"
        >
          {[
            { icon: <Camera size={20} aria-hidden="true" />, texto: 'Escaneo de comidas sin límite' },
            { icon: <Activity size={20} aria-hidden="true" />, texto: 'Motor de Detonante Real activo' },
            { icon: <ClipboardCheck size={20} aria-hidden="true" />, texto: 'Registro de síntomas en 1 toque' },
          ].map((item) => (
            <li key={item.texto} className="flex items-center gap-3 text-[15px] text-[var(--text-primary)]">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)] text-[var(--accent)]">
                {item.icon}
              </span>
              {item.texto}
            </li>
          ))}
        </motion.ul>

        {/* Cards de plan */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.16 }}
          className="mt-6 flex flex-col gap-3"
        >
          <motion.button
            type="button"
            whileTap={reduce ? undefined : { scale: 0.97 }}
            onClick={() => setPlan('anual')}
            className="relative text-left"
          >
            <span className="absolute -top-[10px] left-4 z-10 rounded-full bg-[var(--accent)] px-3 py-1 text-[12px] font-bold uppercase tracking-[0.06em] text-[var(--bg)]">
              Más popular · 2 meses gratis
            </span>
            <div
              className={`rounded-[var(--radius-card)] p-4 pt-5 shadow-[0_4px_16px_color-mix(in_oklab,var(--accent)_10%,transparent)] transition-colors ${
                plan === 'anual' ? 'border-[1.5px] border-[var(--accent)] bg-[var(--chip-bg)]' : 'border border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] bg-[var(--surface)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[18px] font-semibold">Anual</span>
                <span className="text-[28px] font-bold tabular-nums [font-family:var(--font-display)]">
                  $4.17<span className="text-[12px] font-normal text-[var(--text-secondary)]">/mes</span>
                </span>
              </div>
              <p className="mt-1 inline-block rounded-full bg-[var(--bg)] px-3 py-1 text-[15px] text-[var(--text-secondary)] shadow-[inset_0_1px_3px_color-mix(in_oklab,var(--text-tertiary)_20%,transparent)]">
                Se cobra $49.99/año
              </p>
            </div>
          </motion.button>

          <motion.button
            type="button"
            whileTap={reduce ? undefined : { scale: 0.97 }}
            onClick={() => setPlan('mensual')}
            className="text-left"
          >
            <div
              className={`rounded-[var(--radius-card)] p-4 shadow-[0_4px_16px_color-mix(in_oklab,var(--accent)_10%,transparent)] transition-colors ${
                plan === 'mensual' ? 'border-[1.5px] border-[var(--accent)] bg-[var(--chip-bg)]' : 'border border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] bg-[var(--surface)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[18px] font-semibold">Mensual</span>
                <span className="text-[28px] font-bold tabular-nums [font-family:var(--font-display)]">
                  $6.99<span className="text-[12px] font-normal text-[var(--text-secondary)]">/mes</span>
                </span>
              </div>
            </div>
          </motion.button>
        </motion.div>

        <div className="mt-6 flex flex-col gap-3">
          {estadoCta === 'confirmado' ? (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2 rounded-[var(--radius-button)] bg-[var(--chip-bg)] px-4 py-4 text-center"
            >
              <p className="text-[15px] font-medium text-[var(--text-primary)]">
                Vas a recibir un correo para confirmar tu prueba gratis.
              </p>
              <a href="mailto:soporte@foodscan.app" className="text-[14px] font-medium text-[var(--accent)] underline underline-offset-2">
                ¿No llega? Escríbenos
              </a>
            </motion.div>
          ) : estadoCta === 'error' ? (
            <motion.div
              role="alert"
              aria-live="assertive"
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3 rounded-[var(--radius-button)] bg-[var(--surface-2)] px-4 py-4 text-center"
            >
              <p className="text-[15px] font-medium text-[var(--text-primary)]">
                No pudimos activar tu prueba gratis. Puede ser tu conexión o algo de nuestro lado.
              </p>
              <button
                type="button"
                onClick={() => setEstadoCta('procesando')}
                className="text-[14px] font-semibold text-[var(--accent)] underline underline-offset-2"
              >
                Reintentar
              </button>
            </motion.div>
          ) : (
            <CtaPrimario onClick={() => setEstadoCta('procesando')} loading={estadoCta === 'procesando'}>
              {estadoCta === 'procesando' ? 'Activando tu pago seguro…' : 'Empezar mis 7 días gratis'}
            </CtaPrimario>
          )}
          <p className="text-center text-[15px] text-[var(--text-secondary)]">
            Hoy no pagas nada · te avisamos antes del cobro · cancela en 1 tap
          </p>
          <div className="flex items-center justify-center gap-4 text-[15px] text-[var(--text-secondary)]">
            <a href={SALIDA_HREF} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">Ahora no</a>
            <span aria-hidden="true">·</span>
            <a href="/entrar" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">Restaurar compra</a>
          </div>
          <p className="flex items-center justify-center gap-1.5 text-[12px] text-[var(--text-tertiary)]">
            <Lock size={14} aria-hidden="true" /> Pago seguro por Hotmart
          </p>
        </div>
      </div>
    </PantallaFunnel>
  );
}

function TimelineTrial() {
  const nodos = [
    { titulo: 'Hoy — acceso completo', detalle: 'Todo tu plan, sin límites', activo: true },
    { titulo: 'Día 5 — te avisamos', detalle: 'Correo 2 días antes del cobro', activo: true },
    { titulo: 'Día 7 — primer cobro: $49.99/año', detalle: 'Cancela antes sin costo', activo: false },
  ];
  return (
    <div className="flex flex-col">
      {nodos.map((n, i) => (
        <div key={n.titulo} className="grid grid-cols-[16px_1fr] gap-x-3 pb-4 last:pb-0">
          <div className="relative flex justify-center">
            <span
              className={`mt-1 size-3 rounded-full ${n.activo ? 'bg-[var(--accent)]' : 'border-2 border-[color-mix(in_oklab,var(--text-tertiary)_45%,transparent)] bg-transparent'}`}
            />
            {i < nodos.length - 1 && (
              <span className="absolute top-4 h-full w-[2px]" style={{ background: n.activo ? 'var(--accent)' : 'color-mix(in oklab, var(--text-tertiary) 30%, transparent)' }} />
            )}
          </div>
          <div>
            <p className="text-[18px] font-semibold text-[var(--text-primary)]">{n.titulo}</p>
            <p className="text-[15px] text-[var(--text-secondary)]">{n.detalle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
