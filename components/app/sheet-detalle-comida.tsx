import { Trash2 } from 'lucide-react';
import { BottomSheet } from './bottom-sheet';
import { FotoComida } from './foto-comida';
import { BadgeRiesgo } from './badge-riesgo';
import { eliminarComida, type Comida } from '@/lib/foodscan-data';

export function SheetDetalleComida({
  comida,
  onCerrar,
  onEliminar,
}: {
  comida: Comida | null;
  onCerrar: () => void;
  /** Se llama tras eliminar, para que la pantalla recargue sus datos. */
  onEliminar?: () => void;
}) {
  return (
    <BottomSheet abierto={comida !== null} onCerrar={onCerrar} titulo={comida?.descripcion ?? ''}>
      {comida && (
        <div className="flex flex-col gap-4">
          <FotoComida colores={comida.colorFoto} className="h-32 w-full rounded-[var(--radius-card)]" />
          <div className="flex items-center gap-2">
            <BadgeRiesgo nivel={comida.nivelRiesgo} />
            <span className="text-[12px] text-[var(--text-secondary)]">{comida.nombreComida}</span>
          </div>
          <div>
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">Ingredientes</p>
            <div className="flex flex-wrap gap-2">
              {comida.ingredientes.map((ing) => {
                const esRiesgo = comida.ingredientesRiesgo.includes(ing);
                return (
                  <span
                    key={ing}
                    className="rounded-full px-3 py-1 text-[12px] font-medium capitalize"
                    style={{
                      backgroundColor: esRiesgo ? 'color-mix(in oklab, var(--alerta) 14%, transparent)' : 'var(--surface-2)',
                      color: esRiesgo ? 'var(--alerta)' : 'var(--text-primary)',
                    }}
                  >
                    {ing}
                  </span>
                );
              })}
            </div>
          </div>
          {onEliminar && (
            <button
              type="button"
              onClick={() => {
                eliminarComida(comida.id);
                onCerrar();
                onEliminar();
              }}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--surface-2)] text-[15px] font-semibold text-[var(--error)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <Trash2 size={16} aria-hidden="true" /> Eliminar este registro
            </button>
          )}
        </div>
      )}
    </BottomSheet>
  );
}
