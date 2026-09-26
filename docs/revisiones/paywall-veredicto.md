# VEREDICTO revisor-visual — paywall
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 35/40
Craft: 16/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Verificación de los 5 fixes de la ronda anterior:
1. Bordes en tarjetas de plan / divisor de línea — RESUELTO. `app/paywall/page.tsx` ya no dibuja
   `border` en ninguna tarjeta; la selección se marca solo con `bg-[var(--chip-bg)]` + sombra
   tintada más fuerte + check circular (líneas 126-137, 157-168). El `h-px` entre timeline y
   beneficios fue reemplazado por el micro-título "Qué incluye tu plan" (línea 93).
2. Titular sobre-resaltado — RESUELTO. Línea 77: solo "miedo" queda en `text-[var(--accent)]`;
   "cancelar planes por" volvió a texto plano.
3. Falta de rótulo entre timeline y beneficios — RESUELTO. Micro-título uppercase de 12px
   "Qué incluye tu plan" antepuesto a la lista (línea 93).
4. Contraste del detalle del timeline — RESUELTO. El detalle de cada nodo pasó a
   `text-[var(--text-primary)] opacity-80` (línea 257); calculado sobre `--surface` (#F1E8D4)
   el contraste efectivo (~#534F42) da ≈6.6:1, muy por encima de 4.5:1.
5. Enlaces sin underline — RESUELTO. "Ahora no" y "Restaurar compra" llevan
   `underline underline-offset-2` (líneas 224, 226), igual que "Escríbenos"/"Reintentar".

Los 5 fixes están genuinamente aplicados, verificados en código y consistentes con lo que
muestra el screenshot actual.

Detalle usabilidad (h1-h10): 3, 4, 3, 3, 4, 4, 3, 3, 4, 4
- h1 Estado del sistema: 3 — spinner + copy dinámico en el CTA, conteo animado de precio al
  cambiar de plan, check + sombra al seleccionar. Sólido, no ejemplar.
- h2 Lenguaje del usuario: 4 — cero inglés crudo, "Motor de Detonante Real" es término de marca
  ya establecido, no jerga técnica.
- h3 Control y libertad: 3 — X y "Ahora no" llevan al mismo sitio (un solo modelo mental),
  "Restaurar compra" lleva a login. Ninguna acción destructiva sin salida.
- h4 Consistencia: 3 — dentro del paywall, consistente. Entre pantallas del funnel, NO: el
  componente `Chip` de `components/onboarding/funnel-ui.tsx` (usado en onboarding) sigue
  dibujando `border` (línea 100-104), contradiciendo el "sin bordes" que el paywall ya respeta.
- h5 Prevención de errores: 4 — CTA se deshabilita mientras `loading`, sin inputs que validar.
- h6 Reconocer vs recordar: 4 — todo el contexto (respuestas, meta, precio, fechas) visible en
  pantalla, nada que memorizar de otra pantalla.
- h7 Flexibilidad: 3 — el único gesto de eficiencia es el plan anual preseleccionado por
  defecto; no hay más atajos (aceptable para el tipo de pantalla, pero no ejemplar).
- h8 Estético/minimalista: 3 — una sola acción primaria, jerarquía limpia, cada bloque se gana
  su lugar.
- h9 Errores con solución: 4 — el estado de error explica qué pasó (conexión o "de nuestro
  lado") y ofrece "Reintentar".
- h10 Ayuda contextual: 4 — el timeline con fechas y montos reales enseña exactamente cuándo se
  cobra sin que el usuario tenga que inferirlo; la confirmación explica el siguiente paso.

Detalle craft (jerarquía, profundidad, identidad, movimiento, encaje): 3, 3, 4, 3, 3
- Jerarquía: headline 28px / body 15px / label 12px, 3 tamaños netos; el precio hero reutiliza
  el tamaño del headline (patrón esperado en precios, no rompe la escala).
- Profundidad: gradiente radial sutil de fondo + sombras tintadas en tarjetas (nivel elevado) +
  sombra interior en el pill "Se cobra $49.99/año" (nivel hundido) — 3 niveles presentes.
- Identidad: Mordisco (scallop) + duotono verde bosque/crema + Fraunces/Work Sans — sistema
  propio y trazable a FICHA-ARTE.md, no coincide con las paletas vetadas de Capítulo/Umbral.
- Movimiento: stagger de secciones (0.08/0.16s), conteo animado de precio, whileTap 0.97 en
  tarjetas y CTA, fade-in de confirmación/error, `useReducedMotion` respetado en todos los
  bloques. No hay anillos/barras (no aplica, no hay gráfico) ni celebración de hito (no aplica
  a un paywall).
- Encaje óptico: radios de tarjeta/botón consistentes (`--radius-card`/`--radius-button`),
  números tabulares, padding simétrico visible en el screenshot.

Detalle copy (idea, especificidad, emoción, oferta, acción): 4, 4, 4, 4, 3
- Idea única: "vas a poder confiar en tu plan y dejar de cancelar por miedo" atada al mecanismo
  bautizado "Motor de Detonante Real" en hero + oferta.
- Especificidad: fechas y montos reales (Día 5, Día 7, $49.99/año, $4.17/mes), sin adjetivos
  huecos.
- Emoción: nombra la escena exacta del avatar ("cancelar planes por miedo a un mal día"),
  coherente con FICHA-AVATAR.md.
- Oferta: precio, cuándo cobra, cómo cancelar — todo visible sin releer.
- Acción: un solo tipo de CTA ("Empezar mis 7 días gratis", 1ª persona), pero aparece una sola
  vez — correcto para el formato de paywall de una sola vista, no amerita 4.
- Nota: se exime del sub-check "garantía nombrada" por mandato de FICHA-MERCADO.md §4 (prohíbe
  citar el plazo de garantía en copy de marketing) — no se penaliza.

TOP DEFECTOS (máx 5):
1. [components/onboarding/funnel-ui.tsx, componente `Chip`, líneas 100-104 — usado en
   onboarding, parte del mismo funnel] Sigue dibujando `border-[1.5px] border-[var(--accent)]`
   (seleccionado) y `border` gris (no seleccionado), violando el "sin bordes — todo por color
   plano y curvas" de FICHA-ARTE.md que el paywall ya cumple en sus tarjetas de plan →
   inconsistencia de heurística 4 entre dos pantallas del mismo dinero. Fix: quitar las clases
   `border` del `Chip` y diferenciar selección solo con `bg-[var(--chip-bg)]` + sombra + check,
   igual que las tarjetas de plan de `app/paywall/page.tsx`.
2. [Tarjetas de plan Anual/Mensual] Más allá del plan anual preseleccionado por defecto, no hay
   ningún otro mecanismo de eficiencia (p. ej. recordar la última selección entre visitas al
   paywall) — heurística 7 se queda en "funcional pero no ejemplar". Fix: persistir `plan` en
   `sessionStorage` igual que se hace con `foodscan_onboarding`.
3. [CTA "Empezar mis 7 días gratis"] Aparece una sola vez en toda la vista; para el eje de
   "dirección a una acción" del copy de venta el ideal es que el mismo tipo de CTA se repita
   (aquí el formato de paywall de una sola pantalla lo limita de forma razonable, pero es lo
   único que le resta un punto al eje). Fix: si la pantalla llegara a crecer o requerir scroll,
   añadir un CTA sticky de refuerzo con el mismo texto.
