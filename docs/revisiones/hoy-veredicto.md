# VEREDICTO revisor-visual — Hoy (M0, FoodScan)
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/hoy-375.png
Usabilidad: 37/40
Craft: 16/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): FIEL
Veredicto: LISTA

## Verificación de los 4 fixes de la ronda anterior

1. Confirmación de borrado (2 pasos) — RESUELTO. `sheet-detalle-comida.tsx` L55-85: el primer
   tap solo activa `confirmando=true`; el borrado real (`eliminarComida`) ocurre únicamente en
   el segundo botón "Sí, eliminar", con "Cancelar" al lado. Cumple heurística 3 (control y
   libertad) y el patrón de confirmación para irreversibles.
2. Área táctil "Repetir" ≥44px — RESUELTO. `hoy/page.tsx` L178: `min-h-11` (44px) + `px-3`.
   Verificado también visualmente en el screenshot (el link tiene aire vertical suficiente).
3. Celebración en hito real (baseline #7) — RESUELTO. `hoy/page.tsx` L117-127: condición real
   `perfil.rachaActual > 0 && rachaActual % 7 === 0`, `motion.div` con spring
   (`stiffness:300, damping:20`), respeta `useReducedMotion`. Visible en el screenshot: chip
   "¡7 días seguidos! Vas muy bien." Dato semilla ajustado a racha=7, verificable sin fe de
   código.
4. Color de la barra de confianza (evidencia insuficiente) — RESUELTO. `hoy/page.tsx` L146,
   150-152: texto destacado y barra de progreso usan `var(--accent)` (verde), no
   `var(--alerta)`. Coherente con el mismo patrón en `patron/page.tsx`. Visible en el
   screenshot: barra verde, no terracota.

Los 4 fixes están genuinamente aplicados, no son cosméticos ni parciales.

## USABILIDAD 37/40
(h1:4 h2:4 h3:4 h4:4 h5:4 h6:4 h7:3 h8:3 h9:4 h10:3)

- h1 Estado del sistema: 4 — feedback en cada acción: skeleton en carga inicial, toast
  "Agregado: ..." con aria-live en "Repetir", contador de racha animado, barra de confianza que
  se dibuja, whileTap en botones. Nada se siente colgado.
- h2 Lenguaje del usuario: 4 — "Escanear mi próxima comida", "Vas muy bien", "Todavía es poca
  muestra" — cero jerga, cero inglés.
- h3 Control y libertad: 4 — borrado con confirmación de 2 pasos (verificado en código), sheets
  con drag-to-dismiss y botón cerrar explícito (`bottom-sheet.tsx` L44-46, L52-59).
- h4 Consistencia: 4 — mismo radius, mismos chips, mismo patrón de card elevada/hundida en
  `fila-comida.tsx` y `sheet-detalle-comida.tsx`; color de confianza ahora consistente con
  `patron/page.tsx`.
- h5 Prevención de errores: 4 — confirmación antes de borrar, badges de riesgo consistentes.
- h6 Reconocer vs recordar: 4 — la última comida, el riesgo y el insight están todos visibles
  sin que el usuario tenga que recordar nada de otra pantalla.
- h7 Flexibilidad (verificado en código): 3 — hay un atajo real ("Repetir" evita rehacer el
  flujo completo de escaneo), pero no hay más defaults/atajos de teclado; es aceptable para una
  app mobile-first, no ejemplar.
- h8 Estético y minimalista: 3 — una acción primaria clara (Escanear), pero la pantalla apila 4
  bloques de contenido antes del registro del día (celebración + riesgo + insight + 3 CTAs) —
  funciona, pero un ojo entrenado nota que son varios elementos compitiendo por atención antes
  del primer scroll.
- h9 Errores con solución: 4 — no se observaron mensajes de error en este flujo (nada que
  penalizar; los estados vistos son correctos).
- h10 Ayuda contextual: 3 — el empty state de "Nada registrado todavía hoy" con CTA está bien,
  pero el insight de correlación ("todavía es poca muestra") no explica cuántos registros se
  necesitan para confirmar — un usuario nuevo no sabe cuál es la meta.

Gate de carga cognitiva: pasa (≤5 ítems visibles, 1 acción primaria clara, campos no aplica,
bloques de texto cortos, "qué sigue" obvio con el CTA dominante).

## CRAFT 16/20
(jerarquía:3 profundidad:3 identidad:3 movimiento:4 encaje:3)

- Jerarquía: 3 — display "Alto · trigo" domina, label uppercase y body diferenciados; 4 niveles
  presentes, pero el body del insight (15px) y la descripción de la comida (15px) compiten en
  peso visual con el propio título — un ojo entrenado nota que el bloque de insight es casi tan
  prominente como el resultado principal.
- Profundidad: 3 — header con gradiente, card de insight elevada con sombra tintada, card de
  comidas de hoy con sombra interior (hundida) — 3 niveles reales, no un fill plano.
- Identidad: 3 — el dispositivo "mordisco" (scallop) es ownable y está presente en el screenshot;
  el sistema duotono verde bosque + crema con Fraunces/Work Sans se acerca a la familia vetada
  "Capítulo" (papel cálido + tinta verde), pero nace de una referencia del usuario documentada
  como CONTRATO en FICHA-ARTE.md y usa una pareja tipográfica distinta (Fraunces/Work Sans, no
  Petrona/Karla) — punto ya aceptado como no accionable en la ronda anterior, no se vuelve a
  penalizar como bloqueante.
- Movimiento: 4 — las 7 baseline verificadas en código: (1) stagger de entrada por bloque con
  delays 0/0.08/0.14, (2) contador de racha animado desde el valor anterior
  (`useContadorAnimado`), (3) barra de confianza que se dibuja (`width: 0→X%`, ease
  personalizado), (4) `whileTap scale 0.97/0.98` en CTAs y filas, (5) transición de sheets con
  drag-to-dismiss y easing, (6) aparición suave de modales (`bottom-sheet.tsx`, opacity+y con
  ease `[0.16,1,0.3,1]`), (7) celebración real en hito de racha. `useReducedMotion` respetado en
  cada uno de los puntos anteriores.
- Encaje óptico: 3 — chips abrazan su contenido, radios consistentes en todo el screenshot,
  padding simétrico en CTAs; el badge de racha en el header y el chip de celebración usan el
  mismo radius de píldora, correcto.

## FIDELIDAD: FIEL
Modo claro, verde bosque + crema, Fraunces/Work Sans, radios 26-28px en cards, mordisco visible
en el header tal como fija FICHA-ARTE.md — coincide con la réplica aprobada.

## TOP DEFECTOS (no bloqueantes — la pantalla cruza el umbral doble)
1. [Card de insight de correlación] Compite en peso visual con el resultado de riesgo principal
   (mismo tamaño de texto 15px, mismo nivel de prominencia) → reducir a 14px o mover el acento
   solo a la palabra clave, dejando el resto en `--text-secondary` desde el inicio del párrafo.
2. [Card de insight] No comunica la meta de confirmación ("sigue registrando" ¿hasta cuándo?) →
   agregar el número objetivo, ej. "te faltan 3 registros más para confirmarlo".
3. [Bloque completo antes del scroll] 4 elementos de contenido (celebración + riesgo + insight +
   3 CTAs) antes de "Hoy registraste..." → considerar colapsar la celebración de racha en el
   chip del header en vez de una card aparte, para bajar la densidad del primer scroll.
