// Curva "mordisco" a todo el ancho — el dispositivo ownable de FICHA-ARTE.md, usado
// en la transición foto→hoja de la pantalla principal (vista-previa-app.html, vista 3).

export function MordiscoAncho({ color = 'var(--bg)' }: { color?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 260 28"
      preserveAspectRatio="none"
      className="block h-[22px] w-full"
    >
      <path d="M0,0 L98,0 C112,0 116,28 130,28 C144,28 148,0 162,0 L260,0 L260,28 L0,28 Z" fill={color} />
    </svg>
  );
}
