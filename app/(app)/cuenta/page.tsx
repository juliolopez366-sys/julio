'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Flame, Bell, LogOut, ChevronRight, Snowflake } from 'lucide-react';
import { asegurarSemilla, getPerfil, type Perfil } from '@/lib/foodscan-data';

const ENLACES_LEGALES = [
  { label: 'Privacidad', href: '/privacidad' },
  { label: 'Términos y condiciones', href: '/terminos' },
  { label: 'Reembolsos', href: '/reembolsos' },
  { label: 'Aviso de IA', href: '/aviso-ia' },
];

export default function CuentaPage() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [notificaciones, setNotificaciones] = useState(true);
  const [plan, setPlan] = useState<'anual' | 'mensual'>('anual');
  const reduce = useReducedMotion();

  useEffect(() => {
    asegurarSemilla();
    setPerfil(getPerfil());
    const planGuardado = sessionStorage.getItem('foodscan_plan');
    if (planGuardado === 'anual' || planGuardado === 'mensual') setPlan(planGuardado);
  }, []);

  if (!perfil) {
    return (
      <div className="flex flex-1 flex-col gap-3 p-5 pt-8">
        <div className="h-8 w-32 animate-pulse rounded-full bg-[var(--surface)]" />
        <div className="h-32 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface)]" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 px-5 pb-28 pt-6">
      <h1 className="text-[28px] font-bold leading-[1.1] [font-family:var(--font-display)]">Tu cuenta</h1>

      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-[var(--radius-card)] bg-[var(--chip-bg)] p-5 shadow-[0_4px_16px_color-mix(in_oklab,var(--accent)_10%,transparent)]"
      >
        <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">Tu plan</p>
        <p className="mt-1 text-[18px] font-bold text-[var(--text-primary)]">
          Prueba gratis · plan {plan === 'anual' ? 'anual' : 'mensual'} después
        </p>
        <div className="mt-4 flex gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-[var(--radius-button)] bg-[var(--bg)] px-3 py-2.5">
            <Flame size={18} className="text-[var(--alerta)]" aria-hidden="true" />
            <div>
              <p className="text-[16px] font-bold leading-none">{perfil.rachaActual}</p>
              <p className="text-[12px] text-[var(--text-secondary)]">días de racha</p>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-[var(--radius-button)] bg-[var(--bg)] px-3 py-2.5">
            <Snowflake size={18} className="text-[var(--accent)]" aria-hidden="true" />
            <div>
              <p className="text-[16px] font-bold leading-none">{perfil.congeladoresDisponibles}</p>
              <p className="text-[12px] text-[var(--text-secondary)]">congeladores</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div>
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">Ajustes</p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-[var(--radius-card)] bg-[var(--surface)] p-4">
            <Bell size={20} className="text-[var(--accent)]" aria-hidden="true" />
            <span className="flex-1 text-[15px] font-medium text-[var(--text-primary)]">Recordatorio diario</span>
            <button
              type="button"
              role="switch"
              aria-checked={notificaciones}
              onClick={() => setNotificaciones((v) => !v)}
              className="relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              style={{ backgroundColor: notificaciones ? 'var(--accent)' : 'var(--surface-2)' }}
            >
              <motion.span
                className="absolute top-1 size-5 rounded-full bg-white"
                animate={{ left: notificaciones ? 22 : 4 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
              />
            </button>
          </div>

          {ENLACES_LEGALES.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              className="flex items-center gap-3 rounded-[var(--radius-card)] bg-[var(--surface)] p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <span className="flex-1 text-[15px] font-medium text-[var(--text-primary)]">{enlace.label}</span>
              <ChevronRight size={18} className="text-[var(--text-tertiary)]" aria-hidden="true" />
            </a>
          ))}

          <a
            href="/"
            className="flex items-center gap-3 rounded-[var(--radius-card)] bg-[var(--surface)] p-4 text-[var(--error)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <LogOut size={20} aria-hidden="true" />
            <span className="text-[15px] font-medium">Cerrar sesión</span>
          </a>
        </div>
      </div>

      <p className="text-center text-[12px] text-[var(--text-tertiary)]">FoodScan · v0.1 (beta)</p>
    </div>
  );
}
