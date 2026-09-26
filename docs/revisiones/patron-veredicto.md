# VEREDICTO revisor-visual — Tu Patrón
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/patron-375.png
Usabilidad: 36/40
Craft: 19/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): FIEL
Veredicto: LISTA

Top defectos:
1. [Heurística 3 — control y libertad, sin cambios] El "deshacer" solo existe dentro del sheet de detalle (no hay affordance de deshacer accesible desde fuera del modal si el usuario navega). Riesgo bajo, no bloqueante — persiste en 3/4 sin cambios desde pasadas previas.
2. [Heurística 7 — flexibilidad, sin cambios] Sigue sin existir acceso rápido a esta pantalla para el usuario frecuente (ej. resumen en Home). No aplicable de forma forzada a una pantalla de solo-lectura; persiste en 2/4.
3. [Heurística 8 — estético/minimalista, sin cambios] Los 4 badges "ALTO" en "La evidencia detrás de tu patrón" siguen siendo visualmente idénticos — correcto porque los datos reales no tienen grados; no es fabricable sin inventar variación falsa. Persiste en 3/4.
4. [Craft eje 5 — encaje óptico] El hit-area de 44×44px del botón `Info` (margen negativo `-m-3`) se solapa visualmente con la etiqueta "SOSPECHOSO PRINCIPAL" — funcional y verificado, pero un ojo entrenado nota que el área tocable invade texto no interactivo. No baja de nivel porque no genera confusión real (el único elemento tocable en la zona es el botón), pero es el matiz que impide craft 20/20.
5. Sin defectos nuevos detectados en esta pasada — los 3 fixes de la 6ª revisión se verificaron limpios (ver abajo).

## Verificación de los 3 fixes de la 6ª pasada (proyectados para cruzar el umbral)

1. **[Copy con jerga — heurística 2]** RESUELTO. `app/(app)/patron/page.tsx:107` ya no dice
   "fuerte en FODMAP"; dice `"Alto" es un ingrediente que suele causar molestias digestivas en
   mucha gente.` Confirmado en código y en `patron-ayuda-375.png`. Cero jerga técnica/inglés
   crudo restante en la pantalla. h2: 3→4.

2. **[Hit-area del botón Info — heurística 5]** RESUELTO. `app/(app)/patron/page.tsx:88-96`:
   el botón ahora usa `-m-3 flex min-h-11 min-w-11 items-center justify-center`, manteniendo el
   ícono visual en 14px (sin cambio de tamaño percibido — confirmado comparando `patron-375.png`
   con la versión anterior) mientras el área tocable real mide 44×44px (verificado con Playwright
   `getBoundingClientRect()`). Cumple el mínimo de accesibilidad táctil. h5: 3→4.

3. **[Manejo de fallo al eliminar — heurística 9]** RESUELTO. `components/app/sheet-detalle-comida.tsx:41-56`:
   el borrado diferido dentro del `setTimeout` ahora corre en `try/catch`; si `eliminarComida()`
   lanza, se hace `setEliminado(false)`, `setConfirmando(false)`, `setFallo(true)`, y se renderiza
   `role="alert"` con `"No se pudo eliminar — intenta de nuevo."` (línea 109-113) — dice qué pasó
   y qué hacer, sin código técnico, sin dejar a la persona en el estado "eliminado" fantasma. h9: 3→4.

**Consecuencia sobre heurística 10 (ayuda contextual):** al quedar limpio el texto de ayuda de
`h2`, el mismo contenido pasa de "bien, con un término sin glosar" a "ejemplar" — coincide
exactamente con la proyección de la pasada anterior. h10: 3→4.

## Regresiones — NINGUNA detectada
Se revisó el flujo completo tocado por los 3 fixes contra el screenshot de "Registro eliminado"
(`patron-deshacer-375.png`, sin cambios respecto a la pasada anterior) y el árbol de estados del
sheet (`confirmando` → `eliminado` → éxito, o `eliminado` → fallo → vista normal con alerta). El
`try/catch` no interfiere con el camino feliz (mismo `onEliminar?.()` + `onCerrar()` que antes), el
`clearTimeout` en el cleanup de desmontaje sigue intacto, y el nuevo margen negativo del botón
`Info` no desplaza ni tapa ningún otro elemento en el screenshot normal ni en el expandido. Los 5
defectos TOP de la 6ª pasada que NO se tocaron (h3, h7, h8, y los dos ya resueltos aquí) se
verificaron sin cambio de comportamiento.

## Puntaje final y gate doble
```
h1=4 h2=4 h3=3 h4=4 h5=4 h6=4 h7=2 h8=3 h9=4 h10=4  →  36/40
Craft: jerarquía:4 profundidad:4 identidad:4 movimiento:4 encaje:3 → 19/20
```
Gate doble: 36/40 ≥ 36 Y 19/20 ≥ 16 → **CUMPLE**. La proyección de la 6ª pasada era exacta: los 3
fixes puntuales, sin fabricar datos ni sobre-ingeniería, cruzan el umbral exactamente en 36/40.
Sin referencia nueva de usuario esta pasada — fidelidad se mantiene FIEL sobre la verificación
previa de FICHA-ARTE.md (paleta papel cálido/oliva/terracota, display serif, radios consistentes).

Veredicto: **LISTA**.
