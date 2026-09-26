# VEREDICTO revisor-visual — Hoy (M0, app interna FoodScan)
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/hoy-375.png
Usabilidad: 30/40
Craft: 15/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): FIEL
Veredicto: NO LISTA

Detalle usabilidad: h1:3 h2:4 h3:2 h4:2 h5:3 h6:4 h7:3 h8:3 h9:3 h10:3
Detalle craft: jerarquía:3 profundidad:3 identidad:3 movimiento:3 encaje:3

## Verificación de los 5 defectos de la 2da pasada

1. Filas tappable sin acción → RESUELTO en esta pantalla. `FilaComida` ahora acepta `onClick`;
   en `hoy/page.tsx` se pasa `onClick={setDetalle}` y abre `SheetDetalleComida` (foto, badge,
   ingredientes con los de riesgo resaltados en terracota). Verificado en código y en el sheet
   (`bottom-sheet.tsx` con cierre por X, backdrop y swipe). PERO genera un defecto NUEVO de
   consistencia — ver Top Defectos #1: la misma fila se ve IDÉNTICA en Historial y Tu Patrón
   pero ahí NO tiene `onClick` (grep confirma `<FilaComida comida={c} />` sin handler en
   `historial/page.tsx:96` y `patron/page.tsx:111`), así que no responde al tap.
2. Empty state "Nada registrado todavía hoy" + CTA "Escanear tu primera comida del día" →
   RESUELTO, visible en código dentro del contenedor `surface-2`, condicionado a
   `comidasHoy.length === 0`.
3. Tercer nivel hundido → RESUELTO en código: el contenedor "Hoy registraste" usa
   `bg-[var(--surface-2)]` (`#e9dfc6`), distinto de `--chip-bg` (accent 10% sobre `#f6f2e6`)
   de la card de insight y de `--bg` (`#f6f2e6`) del fondo general. En el screenshot el
   contraste entre el card de insight y el bloque hundido es real pero SUTIL — un ojo no
   entrenado puede no notar que son dos niveles distintos (ver Top Defectos #3).
4. Atajo "Repetir" → RESUELTO: existe el link `↺ Repetir "[última comida]"` entre los 2 CTA,
   llama a `agregarComida(ultima)` + `recargar()` en un tap. Introduce un efecto colateral no
   comunicado (ver Top Defectos #4).
5. Racha no se reanima en cada montaje → RESUELTO: variable de módulo `ultimaRachaMostrada` +
   `useContadorAnimado` solo interpola cuando `ultimaRachaMostrada !== valor`; si no cambió, se
   muestra directo sin animación. Verificado en código, lógica correcta.

## Gate de carga cognitiva
Pasa en esta pantalla: ≤5 ítems visibles, 1 acción primaria + 2 secundarias, sin campos que
recordar, texto por bloque ≤4 líneas, "qué sigue" obvio. No se cuenta como falla crítica.

## Top Defectos

1. [Historial y Tu Patrón, listas de comidas] `FilaComida` se ve pixel-idéntica (mismo padding,
   sombra, radio) en las 3 pantallas, pero solo en Hoy tiene `onClick`; en Historial/Patrón el
   mismo componente no responde al tap → agregar el mismo `onClick={setDetalle}` (o equivalente)
   en esas dos pantallas, o dar una apariencia visualmente distinta a las filas no interactivas
   (sin sombra/sin whileTap) para no prometer algo que no hacen.
2. [Toda la app] No existe ninguna función de eliminar o editar una comida/síntoma (confirmado
   por grep en `lib/foodscan-data.ts` — cero `eliminar`/`borrar`/`undo`). El atajo nuevo
   "Repetir" agrega en 1 tap sin confirmación, así que un tap equivocado queda registrado para
   siempre y contamina el cálculo de correlación → agregar snackbar "Agregado — Deshacer" tras
   repetir/registrar, o un botón de eliminar dentro de `SheetDetalleComida`.
3. [Card de insight vs bloque "Hoy registraste"] Los tonos de `--chip-bg` y `--surface-2` son
   próximos a simple vista en el screenshot; el 3er nivel de profundidad existe en código pero
   se percibe débil → aumentar el contraste tonal (oscurecer `--surface-2` o aclarar `--chip-bg`)
   para que la jerarquía elevado/hundido se lea sin entrecerrar los ojos.
4. [Link "Repetir"] Al tocarlo, la card superior (riesgo/foto/título) cambia silenciosamente
   porque la comida repetida pasa a ser `ultima` — no hay ningún aviso de "agregado" cerca del
   punto de tap, así que el salto del héroe puede sentirse como un glitch en vez de una
   confirmación → mostrar un toast breve o resaltar momentáneamente la fila añadida en la lista.
5. [Card de insight "El ajo vuelve a aparecer..."] El dato de confianza (3 de 4) se comunica solo
   en texto; pierde la oportunidad Tufte de mostrar una mini-barra o proporción visual que se
   reconozca de un vistazo (heurística 6) y que cumpla la baseline de movimiento #3 (barra que se
   dibuja) → agregar una barra de proporción simple junto al texto.
