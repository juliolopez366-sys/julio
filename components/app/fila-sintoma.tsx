import { AlertTriangle } from 'lucide-react';
import { ETIQUETA_SINTOMA, type Sintoma } from '@/lib/foodscan-data';

const ETIQUETA_INTENSIDAD = { 1: 'Leve', 2: 'Moderado', 3: 'Fuerte' } as const;

function formatearHora(iso: string) {
  return new Date(iso).toLocaleTimeString('es', { hour: 'numeric', minute: '2-digit' });
}

export function FilaSintoma({ sintoma }: { sintoma: Sintoma }) {
  return (
    <div className="flex items-center gap-3 rounded-[var(--radius-card)] bg-[var(--surface-2)] p-3">
      <span className="flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-button)]" style={{ backgroundColor: 'color-mix(in oklab, var(--alerta) 16%, transparent)' }}>
        <AlertTriangle size={22} className="text-[var(--alerta)]" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-[var(--text-primary)]">{ETIQUETA_SINTOMA[sintoma.tipo]}</p>
        <p className="text-[12px] text-[var(--text-secondary)]">{ETIQUETA_INTENSIDAD[sintoma.intensidad]} · {formatearHora(sintoma.registradoEn)}</p>
      </div>
    </div>
  );
}
