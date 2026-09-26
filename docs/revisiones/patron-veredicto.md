# VEREDICTO revisor-visual — Tu Patrón
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/patron-375.png
Usabilidad: 33/40
Craft: 19/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): FIEL
Veredicto: NO LISTA
Top defectos:
1. [Pantalla completa] No hay ningún ícono de ayuda/tooltip junto a "Sospechoso principal", el % o el badge que explique qué significa "detonante", "confianza" o el criterio detrás de "ALTO" — persiste sin corregir desde la 3ra pasada. → Agregar un ícono de info (Lucide `Info`, 14-16px) junto a "Sospechoso principal" y/o al primer badge "ALTO" con un popover de 1 línea (heurística 10, actualmente 2/4).
2. [Sección "La evidencia detrás de tu patrón", las 4 tarjetas] Los 4 badges "ALTO" siguen siendo visualmente idénticos sin variación tonal — persiste sin corregir desde la 2da pasada. → Si hay grados reales dentro de "ALTO" diferenciar con intensidad de color; si las 4 son objetivamente idénticas, está acotado por los datos, no bloqueante (heurística 8, actualmente 3/4).
3. [Heurística 7 — flexibilidad] Sigue sin existir ningún acceso rápido para el usuario frecuente (atajos, defaults, acceso directo a esta pantalla desde otro punto) — persiste sin corregir desde la 2da pasada, no bloqueante por naturaleza de la pantalla (heurística 7, actualmente 2/4).
4. [Sheet de detalle, flujo de error] No hay evidencia (código ni screenshot) de qué le muestra la app a la persona si `eliminarComida()` falla (ej. sin espacio, corrupción de localStorage) — solo existe el `error.tsx` genérico de la ruta, no un estado de fallo propio del borrado. → Si el riesgo real es bajo (localStorage síncrono), documentarlo como aceptado; si no, agregar un mensaje corto "No se pudo eliminar — intenta de nuevo" dentro del propio sheet (heurística 9, actualmente 3/4, sin verificar para este flujo específico).
5. [Sheet de detalle, estado "Registro eliminado"] El "Deshacer" es sólido y funciona (ver verificación abajo), pero vive únicamente dentro del propio sheet modal — si la persona cierra el sheet (X, swipe, tap en el fondo) antes de los 4.5s sin haber leído "Registro eliminado", pierde la referencia visual de que hay una ventana para arrepentirse (el borrado sigue su curso en silencio). No es un defecto que un usuario note "sin buscarlo" en el flujo normal (cerrar tras ver la confirmación es aceptar el resultado, no cancelarlo) — pero un patrón más robusto (toast persistente fuera del modal) lo dejaría a prueba de este borde. No baja la heurística por debajo de 3/4; queda como refinamiento, no como bloqueante.

## Verificación del fix de "deshacer real" (defecto TOP #1 de la 4ta pasada, 35/40 · 19/20 → NO LISTA)
RESUELTO — con evidencia de código y de comportamiento verificado. `sheet-detalle-comida.tsx:39-53`:
al tocar "Sí, eliminar" ya NO se borra el registro: `confirmarEliminar()` solo hace `setEliminado(true)`
(muestra "Registro eliminado" + botón "Deshacer" con `role="status" aria-live="polite"`, visible en
`patron-deshacer-375.png`) y programa `eliminarComida(comida.id)` + `onEliminar?.()` (refresco del
padre) + `onCerrar()` recién a los 4500ms via `setTimeout`. Si la persona toca "Deshacer" dentro de
esa ventana, `deshacerEliminar()` llama `clearTimeout(timeoutRef.current)` y revierte `eliminado` a
`false`, devolviendo la pantalla exactamente al estado previo (foto, ingredientes y botón "Eliminar
este registro" — el registro NUNCA llegó a borrarse). El reporte de la sesión confirma la prueba con
Playwright: tocar "Deshacer" y esperar 5s (más allá de la ventana de 4.5s) deja el ítem intacto en
la lista con el mismo % de confianza; dejar pasar el tiempo sin tocar nada sí ejecuta el borrado real.
Esto es un "deshacer" REAL (revierte el resultado, no solo una animación cosmética) y cumple
exactamente lo que pedía la heurística 3 ("¿toda acción destructiva tiene confirmación + undo?").
Heurística 3 sube de un valor bajo (confirmación presente pero sin reversibilidad real — fallaba en
lo básico) a 3/4 (bien implementado; el único matiz de nivel "ojo entrenado" es que el afordance de
deshacer vive solo dentro del modal, ver defecto #5 arriba, que no alcanza a bajarlo de 3).

## Por qué la pantalla SIGUE sin cruzar el umbral (33/40 < 36/40 requerido)
El fix de heurística 3 es real y queda confirmado — pero el gate de usabilidad no depende de un
solo criterio, y esta pasada además re-evalúa con criterio estricto e independiente los diez
criterios completos (no solo el que se tocó). Los puntos que faltan para llegar a 36/40 (faltan 3)
están concentrados en dos heurísticas que llevan SIN corregirse desde la 2da/3ra pasada:
- **Heurística 10 (ayuda contextual) = 2/4**: cero apoyo puntual (tooltip/ícono info) sobre
  "detonante", "confianza" o el criterio de "ALTO" — un usuario nuevo debe inferirlo solo del
  párrafo. Subir esto a 3/4 (+1 punto) es el fix de mayor apalancamiento y el más barato de
  implementar (un ícono `Info` + popover de 1 línea).
- **Heurística 7 (flexibilidad) = 2/4**: cero atajos/accesos rápidos para el usuario frecuente, sin
  cambios en 3 pasadas. Es la heurística más tolerada por el propio sistema para una pantalla de
  solo-lectura como esta (la rúbrica marca "no bloqueante" explícitamente), pero sigue restando 2
  puntos completos vs el máximo.
- **Heurística 8 (estético/minimalista) = 3/4**: los 4 badges "ALTO" idénticos sin variación tonal
  siguen restando un punto de pulido, sin cambios desde la 2da pasada.
- **Heurística 9 (errores con solución) = 3/4**: no hay evidencia de un estado de fallo específico
  del borrado (solo el error boundary genérico de la ruta) — no verificado para este flujo exacto.
Con esas 4 heurísticas resueltas o subidas un peldaño (en particular 10 y 8, las más accionables y
más baratas), la pantalla cruzaría 36/40 sin tocar nada más. El craft (19/20) YA cumple su umbral
(≥16/20) y no cambió en esta pasada — el bloqueo es puramente de usabilidad.
Gate doble NO se cumple (33/40 < 36/40; craft 19/20 ≥ 16/20 sí). Veredicto: NO LISTA.
