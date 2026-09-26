// Placeholder de foto de comida (gradiente radial, mismo tratamiento que
// vista-previa-app.html — no hay cámara real hasta Sesión 6/30-INTEGRACION-IA.md).

export function FotoComida({ colores, className = '' }: { colores: [string, string]; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-[radial-gradient(circle_at_50%_38%,var(--c1),var(--c2)_70%)] ${className}`}
      style={{ ['--c1' as string]: colores[0], ['--c2' as string]: colores[1] }}
    />
  );
}
