'use client';

// Paywall de FoodScan — Sesión 4 (50-DISENO-ONBOARDING-PAYWALL.md, sección C).
// Timeline de trial (C4, patrón Blinkist) + inversión visible + cards ancladas.
// Precio/prueba/garantía = FICHA-MERCADO.md (cosa juzgada): 7 días prueba, 15 garantía.
// Backend de pago no existe aún (Sesión 6) — el CTA simula el flujo con estado local (C3ter).

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { X, Lock } from 'lucide-react';
import { Mordisco, CtaPrimario, PantallaFunnel } from '@/components/onboarding/funnel-ui';

type Respuestas = { preocupacion?: string; momento?: string; intentos?: string; diasMeta: number; canal?: string };

const N_RESPUESTAS = 5;

export default function PaywallPage() {
  const [plan, setPlan] = useState<'anual' | 'mensual'>('anual');
  const [respuestas, setRespuestas] = useState<Respuestas | null>(null);
  const [checkoutPendiente, setCheckoutPendiente] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('foodscan_onboarding');
    if (raw) setRespuestas(JSON.parse(raw));
  }, []);

  const precio = plan === 'anual' ? '$4.17' : '$6.99';

  return (
    <PantallaFunnel>
      <div className="mx-auto flex w-full max-w-[500px] flex-1 flex-col px-5 pb-6 pt-4">
        <div className="flex h-11 items-center justify-between">
          <a
            href="/onboarding"
            aria-label="Cerrar"
            className="flex size-11 items-center justify-center rounded-full text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <X size={22} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center gap-2">
            <Mordisco />
            <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">Tu plan está listo</span>
          </div>
          <h1 className="text-balance text-[28px] font-bold leading-[1.1] [font-family:var(--font-display)]">
            Tu <span className="text-[var(--accent)]">Motor de Detonante Real</span> está configurado
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)]">Hecho con tus {N_RESPUESTAS} respuestas — ajustado a tu meta de {respuestas?.diasMeta ?? 5} días/semana.</p>
        </motion.div>

        {/* Timeline del trial (C4) — visual default con trial */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="mt-6 rounded-[var(--radius-card)] bg-[var(--surface)] p-5"
        >
          <TimelineTrial />
        </motion.div>

        {/* Cards de plan */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.16 }} className="mt-6 flex flex-col gap-3">
          <button type="button" onClick={() => setPlan('anual')} className="relative text-left">
            <span className="absolute -top-[10px] left-4 z-10 rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--bg)]">
              Más popular · 2 meses gratis
            </span>
            <div
              className={`rounded-[var(--radius-card)] p-4 pt-5 transition-colors ${
                plan === 'anual' ? 'border-[1.5px] border-[var(--accent)] bg-[var(--chip-bg)]' : 'border border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] bg-[var(--surface)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[16px] font-semibold">Anual</span>
                <span className="text-[22px] font-bold tabular-nums [font-family:var(--font-display)]">
                  $4.17<span className="text-[13px] font-normal text-[var(--text-secondary)]">/mes</span>
                </span>
              </div>
              <p className="mt-1 text-[13px] text-[var(--text-secondary)]">Se cobra $49.99/año</p>
            </div>
          </button>

          <button type="button" onClick={() => setPlan('mensual')} className="text-left">
            <div
              className={`rounded-[var(--radius-card)] p-4 transition-colors ${
                plan === 'mensual' ? 'border-[1.5px] border-[var(--accent)] bg-[var(--chip-bg)]' : 'border border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] bg-[var(--surface)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[16px] font-semibold">Mensual</span>
                <span className="text-[22px] font-bold tabular-nums [font-family:var(--font-display)]">
                  $6.99<span className="text-[13px] font-normal text-[var(--text-secondary)]">/mes</span>
                </span>
              </div>
            </div>
          </button>
        </motion.div>

        <div className="mt-6 flex flex-col gap-3">
          <CtaPrimario onClick={() => setCheckoutPendiente(true)}>
            Empezar mis 7 días gratis
          </CtaPrimario>
          {checkoutPendiente && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="rounded-[var(--radius-button)] bg-[var(--surface)] px-4 py-3 text-center text-[13px] text-[var(--text-secondary)]"
            >
              El checkout de Hotmart se conecta en la Sesión 6 — por ahora esta pantalla queda lista
              con el precio y el copy reales.
            </motion.p>
          )}
          <p className="text-center text-[13px] text-[var(--text-secondary)]">
            Hoy no pagas nada · te avisamos 1 día antes del cobro · cancela en 1 tap
          </p>
          <div className="flex items-center justify-center gap-4 text-[14px] text-[var(--text-secondary)]">
            <a href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">Ahora no</a>
            <span aria-hidden="true">·</span>
            <a href="/entrar" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">Restaurar compra</a>
          </div>
          <p className="flex items-center justify-center gap-1.5 text-[12px] text-[var(--text-tertiary)]">
            <Lock size={14} aria-hidden="true" /> Pago seguro por Hotmart · Garantía de 15 días
          </p>
        </div>
      </div>
    </PantallaFunnel>
  );
}

function TimelineTrial() {
  const nodos = [
    { titulo: 'Hoy — acceso completo', detalle: 'Todo tu plan, sin límites', activo: true },
    { titulo: 'Día 5 — te avisamos', detalle: 'Correo antes de cualquier cobro', activo: true },
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
            <p className="text-[15px] font-semibold text-[var(--text-primary)]">{n.titulo}</p>
            <p className="text-[13px] text-[var(--text-secondary)]">{n.detalle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
