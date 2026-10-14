'use client';

// Foto de la comida. Si hay foto real (URL firmada del bucket privado) se muestra
// esa; mientras carga, o si no hay foto (presets) o falla la carga, queda el
// degradado radial de respaldo — nunca un hueco vacío.

import { useState } from 'react';

export function FotoComida({
  colores,
  src,
  alt = '',
  className = '',
}: {
  colores: [string, string];
  /** URL firmada de la foto real; sin ella se ve solo el degradado. */
  src?: string | null;
  /** Texto alternativo si la foto aporta información (vacío = decorativa). */
  alt?: string;
  className?: string;
}) {
  // Se recuerda QUÉ URL falló: si llega una URL nueva (re-firmada), se vuelve a intentar.
  const [srcFallido, setSrcFallido] = useState<string | null>(null);
  const mostrarFoto = !!src && src !== srcFallido;

  return (
    <div
      aria-hidden={mostrarFoto && alt ? undefined : true}
      className={`overflow-hidden bg-[radial-gradient(circle_at_50%_38%,var(--c1),var(--c2)_70%)] ${className}`}
      style={{ ['--c1' as string]: colores[0], ['--c2' as string]: colores[1] }}
    >
      {mostrarFoto && (
        // eslint-disable-next-line @next/next/no-img-element -- URL firmada temporal de Supabase, no pasa por el optimizador
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setSrcFallido(src ?? null)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
