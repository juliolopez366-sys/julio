import { type NivelRiesgo, ETIQUETA_RIESGO } from '@/lib/foodscan-data';

const COLOR: Record<NivelRiesgo, string> = {
  bajo: 'var(--accent)',
  medio: 'var(--alerta)',
  alto: 'var(--alerta)',
};

export function BadgeRiesgo({ nivel }: { nivel: NivelRiesgo }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-white"
      style={{ backgroundColor: COLOR[nivel] }}
    >
      <span className="size-1.5 rounded-full bg-white/80" aria-hidden="true" />
      {ETIQUETA_RIESGO[nivel]}
    </span>
  );
}
