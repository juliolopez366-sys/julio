# VEREDICTO revisor-visual — paywall
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 37/40
Craft: 16/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA

Verificación del fix de esta ronda (componente compartido `Chip`,
`components/onboarding/funnel-ui.tsx` líneas ~100-104):
Confirmado en código — las clases `border-[1.5px] border-[var(--accent)]` (seleccionado) y
`border` gris (no seleccionado) fueron eliminadas. La selección ahora se marca solo con
`bg-[var(--chip-bg)]` + `shadow-[0_8px_24px_color-mix(...)]` + el check circular (línea 108-116),
mismo lenguaje visual que las tarjetas de plan del paywall (`app/paywall/page.tsx` líneas
133-155 y 164-183, que tampoco dibujan `border`). La inconsistencia de heurística 4 entre
onboarding y paywall queda resuelta: h4 sube de 3 a 4.
También se verificó el fix menor #2 de la ronda anterior (persistencia de plan): `setPlan`
escribe en `sessionStorage('foodscan_plan')` (línea 48-51) y se restaura en el `useEffect` de
montaje (línea 56-57) — el plan elegido sobrevive a una recarga/vuelta al paywall. h7 sube de 3
a 4.

Detalle usabilidad (h1-h10): 3, 4, 3, 4, 4, 4, 4, 3, 4, 4
- h1 Estado del sistema: 3 — spinner + copy dinámico en el CTA ("Activando tu pago seguro…"),
  conteo animado de precio al cambiar de plan, check + sombra al seleccionar. Sólido, no
  ejemplar (el cambio de plan no tiene ningún micro-delay/feedback adicional más allá del
  contador).
- h2 Lenguaje del usuario: 4 — cero inglés crudo, "Motor de Detonante Real" es término de marca
  ya establecido, no jerga técnica de checkout ("SKU", "billing cycle", etc.).
- h3 Control y libertad: 3 — X y "Ahora no" llevan al mismo sitio (un solo modelo mental, bien),
  "Restaurar compra" lleva a login. Correcto pero sin nada que un ojo entrenado no pueda pedir
  más (p. ej. un paso atrás real al onboarding en vez de salir del todo).
- h4 Consistencia: 4 — RESUELTO. `Chip` (onboarding) y las tarjetas de plan (paywall) comparten
  ahora el mismo lenguaje visual: sin `border`, selección por `chip-bg` + sombra + check. Único
  matiz residual (no penalizado, ver Top Defectos): `Chip` usa `surface-2` para el estado no
  seleccionado mientras las tarjetas de plan usan `surface` — tokens distintos para un estado
  visualmente casi idéntico.
- h5 Prevención de errores: 4 — CTA nunca deshabilitado por defecto, se deshabilita solo durante
  `loading`; no hay inputs que validar en esta pantalla.
- h6 Reconocer vs recordar: 4 — todo el contexto (respuestas, meta, precio, fechas de cobro)
  visible en pantalla, nada que memorizar de otra pantalla.
- h7 Flexibilidad: 4 — RESUELTO. Plan anual preseleccionado por defecto + selección de plan
  persistida en `sessionStorage` entre visitas al paywall (antes se perdía).
- h8 Estético/minimalista: 3 — una sola acción primaria, jerarquía limpia; la pantalla es larga
  (timeline + beneficios + 2 cards + CTA + fine print + restore + badge de seguridad) y aunque
  cada bloque se gana su lugar, un ojo entrenado nota que son bastantes bloques secuenciales sin
  respiro adicional entre ellos.
- h9 Errores con solución: 4 — el estado de error explica qué pasó (conexión o "de nuestro
  lado") y ofrece "Reintentar" en el mismo lugar.
- h10 Ayuda contextual: 4 — el timeline con fechas y montos reales enseña exactamente cuándo se
  cobra sin que el usuario tenga que inferirlo; la confirmación explica el siguiente paso
  (revisar correo).

Detalle craft (jerarquía, profundidad, identidad, movimiento, encaje): 3, 3, 4, 3, 3
- Jerarquía: 3 — headline 28px / plan-label 18px / body 15-16px / label 12px + el precio hero
  reutilizando 28px: son 4 tamaños netos operando en la pantalla, uno más del "máx 3" ideal
  (el precio comparte tamaño con el headline, lo cual mitiga pero no elimina el matiz).
- Profundidad: 3 — el gradiente radial de fondo (`--accent` a 24%/6% mezclado) es prácticamente
  imperceptible en el screenshot contra el crema base (se lee casi como fill plano); las
  sombras tintadas en tarjetas y el pill hundido ("Se cobra $49.99/año") sí muestran los otros
  2 niveles con claridad.
- Identidad: 4 — Mordisco (scallop SVG) como dispositivo ownable, duotono verde bosque/crema
  trazable a FICHA-ARTE.md, Fraunces/Work Sans (no Petrona/Karla, no Archivo) — no coincide con
  las paletas vetadas de "Capítulo" ni "Umbral" del test anti-clon.
- Movimiento: 3 — stagger de secciones (0.08/0.16s), conteo animado de precio al cambiar de
  plan, `whileTap` 0.97 en tarjetas y CTA, fade-in de confirmación/error, `useReducedMotion`
  respetado en todos los bloques verificados en código. No aplica anillos/barras (sin gráfico)
  ni celebración de hito (no es una pantalla de logro) — de las baseline aplicables a este tipo
  de pantalla, cumple la mayoría sin ser ejemplar en refinamiento (p. ej. el badge "Más
  popular · Ahorra 40%" aparece estático, sin entrada propia).
- Encaje óptico: 3 — radios de tarjeta/botón consistentes (`--radius-card`/`--radius-button`),
  números tabulares, padding simétrico visible; el pill "Se cobra $49.99/año" con sombra
  interior se ve ligeramente "flotando" dentro de la card en vez de abrazar el texto con la
  misma limpieza que el resto de chips de la pantalla.

Detalle copy (idea, especificidad, emoción, oferta, acción): 4, 4, 4, 4, 3
- Idea única: "vas a poder confiar en tu plan y dejar de cancelar por miedo" atada al mecanismo
  bautizado "Motor de Detonante Real" en hero + oferta.
- Especificidad: fechas y montos reales (Día 5, Día 7, $49.99/año, $4.17/mes), sin adjetivos
  huecos ("fácil", "la mejor").
- Emoción: nombra la escena exacta del avatar ("cancelar planes por miedo a un mal día"),
  coherente con FICHA-AVATAR.md.
- Oferta: precio, cuándo cobra, cómo cancelar — todo visible sin releer ni buscar letra chica.
- Acción: un solo tipo de CTA ("Empezar mis 7 días gratis", 1ª persona) — correcto, pero
  aparece una sola vez en el formato de paywall de una sola vista, por eso no llega a 4.
- Nota: se exime del sub-check "garantía nombrada" por mandato de FICHA-MERCADO.md §4 (prohíbe
  citar el plazo de garantía en copy de marketing) — no se penaliza.

Gate doble: 37/40 usabilidad (≥36 ✓) y 16/20 craft (≥16 ✓) → CRUZA el umbral. Copy 19/20, ningún
eje ≤2 → cumple el gate de venta. Veredicto: LISTA.

TOP DEFECTOS (residuales, no bloqueantes — quedan para pulido futuro, no impiden declarar lista):
1. [Fondo de `PantallaFunnel`, `components/onboarding/funnel-ui.tsx` línea 187-189] El gradiente
   radial de profundidad es casi invisible contra el crema base en el screenshot real → subir el
   mix de `--accent` en el primer radial de ~24% a ~32-36% para que el tinte se perciba sin
   dominar.
2. [Timeline, `TimelineTrial` en `app/paywall/page.tsx` línea 256] El nodo futuro ("Día 7") usa
   `border-2` para el círculo hueco, reintroduciendo un borde pese a que FICHA-ARTE.md fija
   "ningún borde — todo por color plano y curvas" → reemplazar el círculo hueco por un relleno
   sólido más claro (`bg-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)]`) sin trazo.
3. [Card "Anual", pill "Se cobra $49.99/año", línea 152-154] La sombra interior hace que el pill
   se vea "flotando" en vez de abrazar limpiamente el texto como el resto de chips de la
   pantalla → quitar el `shadow-[inset...]` y dejarlo como fill plano `bg-[var(--bg)]`, igual de
   limpio que los demás chips de la vista.
4. [`Chip` en onboarding vs. tarjetas de plan en paywall] Estado no-seleccionado usa tokens
   distintos (`surface-2` en Chip, `surface` en las cards de plan) para un mismo propósito
   visual → unificar a un solo token de "superficie no seleccionada" en ambos componentes.
5. [Badge "Más popular · Ahorra 40%"] Entra sin animación propia mientras el resto de la
   pantalla usa stagger → darle un fade+scale sutil (100-150ms, delay igual al de la card) para
   coherencia de movimiento.
