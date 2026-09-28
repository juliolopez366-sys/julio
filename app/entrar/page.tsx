'use client';

// Login de FoodScan — Sesión 6, paso 2 (50-DISENO-ONBOARDING-PAYWALL.md, sección E;
// 26-AUTH-MODERNO.md). Magic link real por Supabase Auth (primario) + Google OAuth
// (secundario). Los correos los envía Supabase (SMTP propio llega en el paso 5/Resend).

import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail } from 'lucide-react';
import { CtaPrimario, PantallaFunnel } from '@/components/onboarding/funnel-ui';
import { crearClienteSupabase } from '@/lib/supabase/client';

type Estado = 'inicial' | 'enviando' | 'enviado' | 'error';

export default function EntrarPage() {
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState<Estado>('inicial');
  const [countdown, setCountdown] = useState(0);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const supabase = crearClienteSupabase();

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !aceptaTerminos || estado === 'enviando') return;
    setEstado('enviando');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/confirm?next=/hoy` },
    });
    if (error) {
      setEstado('error');
      return;
    }
    setEstado('enviado');
    setCountdown(60);
    const tick = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(tick);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const conGoogle = async () => {
    if (!aceptaTerminos) return;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/hoy` },
    });
  };

  return (
    <PantallaFunnel>
      <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center px-5 py-10">
        <a href="/" className="mb-8 flex items-center gap-2 self-start text-[16px] font-semibold text-[var(--text-primary)]">
          <span aria-hidden="true" className="size-6 rounded-[8px] bg-[var(--accent)]" />
          FoodScan
        </a>

        {estado === 'error' ? (
          <motion.div
            key="error"
            role="alert"
            aria-live="assertive"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-3 rounded-[var(--radius-button)] bg-[var(--surface-2)] px-4 py-6 text-center"
          >
            <p className="text-[15px] font-medium text-[var(--text-primary)]">
              No pudimos enviar el enlace. Puede ser tu conexión o algo de nuestro lado.
            </p>
            <button
              type="button"
              onClick={() => setEstado('inicial')}
              className="text-[14px] font-semibold text-[var(--accent)] underline underline-offset-2"
            >
              Reintentar
            </button>
          </motion.div>
        ) : estado !== 'enviado' ? (
          <motion.div key="form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <h1 className="text-balance text-[26px] font-bold leading-[1.15] [font-family:var(--font-display)]">
              Entra a tu plan
            </h1>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
              Para guardarlo y verlo en cualquier dispositivo. Si compraste por Hotmart, usa el
              correo con el que hiciste la compra.
            </p>

            <form onSubmit={enviar} className="mt-6 flex flex-col gap-3">
              <label htmlFor="email" className="sr-only">
                Correo electrónico
              </label>
              <div className="flex h-[52px] items-center gap-2.5 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] px-4">
                <Mail size={18} className="shrink-0 text-[var(--text-tertiary)]" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full bg-transparent text-[16px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
                />
              </div>
              <label className="flex items-start gap-2.5 py-1 text-left">
                <input
                  type="checkbox"
                  checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
                />
                <span className="text-[13px] leading-snug text-[var(--text-secondary)]">
                  Acepto los <a href="/terminos" target="_blank" className="font-medium text-[var(--accent)] underline underline-offset-2">Términos</a> y el{' '}
                  <a href="/privacidad" target="_blank" className="font-medium text-[var(--accent)] underline underline-offset-2">Aviso de Privacidad</a>
                </span>
              </label>

              <CtaPrimario type="submit" disabled={!email || !aceptaTerminos || estado === 'enviando'}>
                {estado === 'enviando' ? 'Enviando…' : 'Enviarme mi enlace de acceso'}
              </CtaPrimario>
            </form>

            <button
              type="button"
              onClick={conGoogle}
              disabled={!aceptaTerminos}
              className="mt-3 flex h-[52px] w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] text-[15px] font-medium text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:opacity-50"
            >
              <GoogleIcon />
              Continuar con Google
            </button>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[13px] text-[var(--text-tertiary)]">
              <Lock size={13} aria-hidden="true" /> Sin contraseñas: te llegará un enlace de un solo uso
            </p>

            <p className="mt-6 text-center text-[13px] text-[var(--text-secondary)]">
              ¿Compraste y no te llega nada?{' '}
              <a href="mailto:soporte@foodscan.app" className="font-medium text-[var(--accent)] underline underline-offset-2">
                Escríbenos
              </a>
            </p>
          </motion.div>
        ) : (
          <motion.div key="enviado" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="text-center">
            <span className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-[var(--chip-bg)]">
              <Mail size={26} className="text-[var(--accent)]" aria-hidden="true" />
            </span>
            <h1 className="text-[22px] font-bold [font-family:var(--font-display)]">Revisa tu correo</h1>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Te enviamos el enlace a <span className="font-medium text-[var(--text-primary)]">{email}</span>
            </p>
            <button
              type="button"
              disabled={countdown > 0}
              onClick={enviar}
              className="mt-6 rounded-[var(--radius-button)] text-[14px] font-medium text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:text-[var(--text-tertiary)]"
            >
              {countdown > 0 ? `Reenviar en ${countdown}s` : 'Reenviar enlace'}
            </button>
          </motion.div>
        )}
      </div>
    </PantallaFunnel>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.85.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33Z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z" />
    </svg>
  );
}
