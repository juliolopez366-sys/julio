'use client';

// UI compartida del funnel de onboarding/paywall/login (50-DISENO-ONBOARDING-PAYWALL.md).
// Consume SOLO los tokens de components/landing/tokens.css — misma marca que la landing.

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, Check, X } from 'lucide-react';

/** Sombra tintada de acento para elementos flotantes (FICHA-ARTE.md — profundidad de 3 niveles). */
const SOMBRA_FLOTANTE =
  'shadow-[0_6px_20px_color-mix(in_oklab,var(--accent)_20%,transparent),0_1px_3px_color-mix(in_oklab,var(--accent)_14%,transparent)]';

/** Header de marca — logo + nombre, siempre presente, vuelve a "/" (regla de marca del 50). */
export function FunnelHeader({
  onBack,
  onCerrar,
  progreso,
}: {
  onBack?: () => void;
  /** Reemplaza el logo por una X que cierra el funnel (paywall). */
  onCerrar?: string;
  /** 0-100. Si se omite, no se pinta la barra (pantallas de loading/paywall no la usan). */
  progreso?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="mx-auto w-full max-w-[500px] px-4 pt-4">
      <div className="flex h-11 items-center gap-2">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Atrás"
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <ChevronLeft size={22} strokeWidth={2} aria-hidden="true" />
          </button>
        ) : onCerrar ? (
          <a
            href={onCerrar}
            aria-label="Cerrar"
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <X size={22} strokeWidth={2} aria-hidden="true" />
          </a>
        ) : (
          <a
            href="/"
            className="flex size-11 shrink-0 items-center justify-center gap-1.5 text-[var(--text-primary)]"
            aria-label="FoodScan — volver al inicio"
          >
            <span aria-hidden="true" className="size-6 rounded-[8px] bg-[var(--accent)]" />
          </a>
        )}
        {progreso !== undefined && (
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)]">
            <motion.div
              className="h-full rounded-full bg-[var(--accent)]"
              initial={false}
              animate={{ width: `${progreso}%` }}
              transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export interface ChipOpcion {
  icon?: ReactNode;
  label: string;
}

/** Chip de opción de ancho completo (A2 del 50) — selección única con auto-avance. */
export function Chip({
  label,
  icon,
  seleccionado,
  onClick,
  index = 0,
}: {
  label: string;
  icon?: ReactNode;
  seleccionado: boolean;
  onClick: () => void;
  /** Posición en la lista — dispara el stagger de entrada (50-80ms, animación baseline #1). */
  index?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.25, delay: reduce ? 0 : index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      onClick={onClick}
      className={`flex h-14 w-full items-center gap-3 rounded-[var(--radius-button)] border px-4 text-left text-[16px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${
        seleccionado
          ? `border-[var(--accent)] border-[1.5px] bg-[var(--chip-bg)] text-[var(--text-primary)] ${SOMBRA_FLOTANTE}`
          : `border-[color-mix(in_oklab,var(--text-tertiary)_28%,transparent)] bg-[var(--surface-2)] text-[var(--text-primary)] ${SOMBRA_FLOTANTE}`
      }`}
    >
      {icon && <span className="shrink-0 text-[var(--accent)]">{icon}</span>}
      <span className="flex-1">{label}</span>
      {seleccionado && (
        <motion.span
          initial={{ scale: reduce ? 1 : 0.5, opacity: reduce ? 1 : 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]"
        >
          <Check size={12} strokeWidth={3} color="var(--bg)" aria-hidden="true" />
        </motion.span>
      )}
    </motion.button>
  );
}

/** El "mordisco" (FICHA-ARTE.md), repetido también en el funnel para consistencia de marca. */
export function Mordisco({ color = 'var(--accent)', size = 'sm' }: { color?: string; size?: 'sm' | 'lg' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 56 14"
      className={size === 'lg' ? 'h-[18px] w-[72px] shrink-0' : 'h-[12px] w-[44px] shrink-0'}
    >
      <path
        d="M0,0 L18,0 C21,0 22,14 28,14 C34,14 35,0 38,0 L56,0"
        fill="none"
        stroke={color}
        strokeWidth={size === 'lg' ? 3 : 2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CtaPrimario({
  children,
  onClick,
  disabled,
  loading,
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  /** Estado de proceso EN el propio botón (h1 Nielsen: el CTA debe cambiar visualmente al tocarse). */
  loading?: boolean;
  type?: 'button' | 'submit';
}) {
  const reduce = useReducedMotion();
  const inactivo = disabled || loading;
  return (
    <motion.button
      type={type}
      whileTap={inactivo || reduce ? undefined : { scale: 0.97 }}
      onClick={onClick}
      disabled={inactivo}
      aria-busy={loading || undefined}
      className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-[var(--radius-button)] text-[16px] font-semibold transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] [touch-action:manipulation] ${
        inactivo ? 'cursor-not-allowed bg-[var(--accent)] opacity-[0.65] text-[var(--bg)]' : 'bg-[var(--accent)] text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_28%,transparent)]'
      }`}
    >
      {loading && (
        <motion.span
          aria-hidden="true"
          className="size-4 shrink-0 rounded-full border-2 border-[var(--bg)] border-t-transparent"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={reduce ? undefined : { duration: 0.7, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {children}
    </motion.button>
  );
}

/** Wrapper de pantalla del funnel: fondo, ancho, safe area, profundidad sutil (FICHA-ARTE.md). */
export function PantallaFunnel({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex min-h-dvh flex-col bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 600px 380px at 50% 0%, color-mix(in oklab, var(--accent) 24%, transparent), transparent 68%), radial-gradient(ellipse 500px 500px at 15% 65%, color-mix(in oklab, var(--accent) 6%, transparent), transparent 70%)',
      }}
    >
      {children}
    </div>
  );
}
