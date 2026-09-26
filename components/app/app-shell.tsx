'use client';

// Shell de la app interna (Sesión 5) — nav en píldora flotante verde (FICHA-ARTE.md,
// dispositivo "nav en píldora" ya aprobado en vista-previa-app.html).

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Home, History, Sparkles, User } from 'lucide-react';
import { type ReactNode } from 'react';

const DESTINOS = [
  { href: '/hoy', label: 'Hoy', icon: Home },
  { href: '/historial', label: 'Historial', icon: History },
  { href: '/patron', label: 'Tu Patrón', icon: Sparkles },
  { href: '/cuenta', label: 'Cuenta', icon: User },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-dvh flex-col bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <main className="mx-auto flex w-full max-w-[500px] flex-1 flex-col overflow-y-auto">{children}</main>
      <nav
        aria-label="Navegación principal"
        className="sticky bottom-0 z-20 mx-auto mb-3 flex h-[52px] w-[calc(100%-24px)] max-w-[476px] shrink-0 items-center justify-around rounded-full bg-[var(--accent)] shadow-[0_12px_32px_-12px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
      >
        {DESTINOS.map(({ href, label, icon: Icon }) => {
          const activo = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={activo ? 'page' : undefined}
              className="relative flex h-full flex-1 items-center justify-center focus-visible:outline-none"
            >
              {activo && (
                <motion.span
                  layoutId="nav-activo"
                  className="absolute inset-1.5 rounded-full bg-[color-mix(in_oklab,white_18%,transparent)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <Icon size={20} strokeWidth={2} className="relative text-white" style={{ opacity: activo ? 1 : 0.6 }} aria-hidden="true" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
