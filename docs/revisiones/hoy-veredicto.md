# VEREDICTO revisor-visual — Hoy (M0, app interna FoodScan)
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/hoy-375.png
Usabilidad: 31/40
Craft: 15/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): FIEL
Veredicto: NO LISTA

Detalle usabilidad: h1:3 h2:4 h3:2 h4:4 h5:2 h6:4 h7:3 h8:3 h9:3 h10:3
Detalle craft: jerarquía:3 profundidad:3 identidad:3 movimiento:3 encaje:3

## Verificación de los 5 defectos de la 3ra pasada

1. [GENUINO] `FilaComida` ahora recibe `onClick` en las 3 pantallas: `hoy/page.tsx:194`,
   `historial/page.tsx:104`, `patron/page.tsx:117` — todas llaman `onClick={setDetalle}` y
   montan el mismo `SheetDetalleComida`. Consistencia real, verificado en código.
2. [PARCIAL] Se agregó `eliminarComida(id)` en `lib/foodscan-data.ts:170-172` y el botón
   "Eliminar este registro" en `sheet-detalle-comida.tsx:46-58` (visible cuando se pasa
   `onEliminar`, que las 3 pantallas pasan). "Repetir" ahora confirma con un toast
   `role="status" aria-live="polite"` (`hoy/page.tsx:222-234`). Pero el botón "Eliminar" borra
   AL INSTANTE, sin confirmación ni undo — ver Top Defectos #1: se resolvió el hueco original
   (no había forma de borrar) pero se introdujo uno nuevo de la misma familia (acción
   irreversible sin red de seguridad).
3. [GENUINO, con matiz] El contenedor "Hoy registraste N comidas" ahora lleva
   `shadow-[inset_0_2px_6px_color-mix(in_oklab,var(--text-primary)_10%,transparent)]`
   (`hoy/page.tsx:180`) además del cambio de tono `surface-2`. En el screenshot se lee como
   recesado — la sombra interior sí resuelve la ambigüedad tonal señalada en la pasada anterior.
4. [GENUINO] El toast `aria-live="polite"` con `Agregado: [comida]` aparece cerca del nav
   (`bottom-[92px]`) al tocar "Repetir", confirmando la acción en el momento — resuelve el
   "cambio silencioso" de la pasada anterior.
5. [GENUINO] La barra `mt-3 h-1.5 w-full ... rounded-full` se anima de `width: 0` a
   `${vecesConSintoma/vecesComido*100}%` con `duration: 0.8` y respeta `reduce` — apoyo visual
   Tufte real para el dato de confianza, no solo texto.

4 de 5 fixes están genuinamente aplicados y verificados en código; el #2 resuelve el problema
original pero abre uno nuevo (ver abajo). Ninguno es un fix cosmético o simulado.

## Gate de carga cognitiva
Pasa: ≤5 ítems visibles, 1 acción primaria + 2 secundarias, sin campos que recordar entre
pantallas, texto por bloque ≤4 líneas, "qué sigue" obvio, header/CTA/nav sin elementos muertos.

## Top Defectos

1. [Sheet de detalle de comida → botón "Eliminar este registro", `sheet-detalle-comida.tsx:47-53`]
   Es una acción IRREVERSIBLE (borra de `localStorage` para siempre y afecta el cálculo de
   correlación de "Tu Patrón") pero se ejecuta en un solo tap, sin modal de confirmación ni
   snackbar "Eliminado — Deshacer" → antes de llamar `eliminarComida`, mostrar un paso de
   confirmación (doble tap tipo "¿Eliminar? Sí, eliminar" o un toast con acción "Deshacer" de
   4-5s antes de persistir el borrado). Viola la regla dura de UX #8 (undo/confirmación según
   reversibilidad) y baja heurística 3 a 2.
2. [Link "Repetir "..."" bajo el CTA principal, `hoy/page.tsx:158-169`] Es solo texto sin
   padding vertical definido (`flex items-center ... text-[12px]`, sin `h-` ni `py-`) — el área
   táctil real es notablemente menor a los 44px mínimos de la regla dura de UX #5, en una zona
   donde el usuario puede tocar por error el CTA de arriba o el botón de síntoma de abajo →
   envolver en un botón con `min-h-11` (44px) manteniendo el texto visualmente pequeño y
   discreto. Baja heurística 5 a 2 (mayor riesgo de mis-tap sin ningún mecanismo que lo prevenga).
3. [Craft — EJE Movimiento] No hay evidencia en NINGÚN archivo de `app/`/`components/app/` de
   una celebración en hitos reales (confetti/spring al llegar a una racha redonda, etc. — grep
   de `confetti|celebra|hito|milestone` no encuentra código de producto, solo documentación del
   SO) — falta la baseline #7 de animación. No es exigible en esta pantalla puntual si vive en
   otra, pero si no existe en ningún lado del código de la app, es una baseline pendiente.
4. [Card de insight "El ajo vuelve a aparecer...", `hoy/page.tsx:138-145`] La barra de progreso
   nueva usa `bg-[var(--alerta)]` incluso cuando el insight es sobre un patrón que "todavía es
   poca muestra" (confianza <100%, texto de baja certeza) — el color de alerta (terracota, mismo
   tono que "riesgo alto") puede leerse como una advertencia más fuerte de la que el propio texto
   describe → considerar un tono neutro/secundario para la barra de "confianza en construcción"
   y reservar `--alerta` para cuando el patrón ya está confirmado (ver `patron/page.tsx` que sí
   usa `--alerta` correctamente para un patrón YA confirmado).
5. [Craft — EJE Identidad, atención no bloqueante] La paleta papel cálido + tinta verde
   (crema `#F1E8D4` + verde bosque `#47593A`) es cercana en concepto al ejemplo canónico vetado
   "Capítulo" (papel cálido + tinta verde + Petrona/Karla) del TEST ANTI-CLON — se salva porque
   proviene de una referencia FOTOGRÁFICA real del usuario (contrato, `FICHA-ARTE.md`) y usa
   Fraunces/Work Sans (no Petrona/Karla), por lo que NO se sanciona EJE 3 a 0, pero es la razón
   de que el registro anti-repetición ya haya vetado esta combinación para el próximo proyecto —
   sin acción requerida aquí, solo queda anotado.
