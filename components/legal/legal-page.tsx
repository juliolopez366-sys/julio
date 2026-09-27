import type { ReactNode } from 'react';

// Layout compartido para las 4 páginas legales del footer (47-LEGAL-FISCAL-Y-PRIVACIDAD.md).
// Pantallas secundarias (Regla 7) — sin revisor-visual, solo medición + checklist manual.
export function LegalPage({ titulo, actualizado, children }: { titulo: string; actualizado: string; children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="mx-auto w-full max-w-[680px] px-5 py-12">
        <a href="/" className="text-[14px] font-medium text-[var(--text-tertiary)] underline-offset-4 hover:underline">
          ← Volver a FoodScan
        </a>
        <h1 className="mt-6 text-[28px] font-bold leading-tight [font-family:var(--font-display)]">{titulo}</h1>
        <p className="mt-2 text-[13px] text-[var(--text-tertiary)]">Última actualización: {actualizado}</p>
        <div className="mt-8 flex flex-col gap-5 text-[15px] leading-relaxed text-[var(--text-secondary)] [&_h2]:mt-6 [&_h2]:text-[18px] [&_h2]:font-semibold [&_h2]:text-[var(--text-primary)] [&_strong]:font-semibold [&_strong]:text-[var(--text-primary)] [&_a]:text-[var(--accent)] [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
          {children}
        </div>
      </div>
    </div>
  );
}
