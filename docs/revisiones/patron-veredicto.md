# VEREDICTO revisor-visual — Tu Patrón
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/patron-375.png
Usabilidad: 32/40
Craft: 19/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): FIEL
Veredicto: NO LISTA

Top defectos:
1. [Card "Sospechoso principal", texto de ayuda expandido — ver patron-ayuda-375.png] El nuevo texto que explica "confianza" y "alto" introduce un término técnico SIN definir: `"Alto" es un ingrediente ya conocido como fuerte en FODMAP.` "FODMAP" es jerga dietética/médica (acrónimo en inglés) que el fix debía eliminar, no sumar — exactamente el defecto que la heurística 2 prohíbe. → Reemplazar "fuerte en FODMAP" por lenguaje llano, ej.: "Alto es un ingrediente que suele causar molestias digestivas en mucha gente." (heurística 2, baja de 4/4 a 3/4).
2. [Botón `Info` junto a "SOSPECHOSO PRINCIPAL", `app/(app)/patron/page.tsx:88-96`] El área táctil real del botón es `size-5` = 20×20px sin padding extra — muy por debajo del mínimo de 44×44px que exige la propia regla dura del sistema ("botones ≥44px"). Es el único elemento nuevo interactivo de esta pasada y nace ya con un riesgo de mis-tap. → Envolver el ícono en un botón de `min-h-11 min-w-11` (o `p-2.5` sobre el `size-5` actual) manteniendo el ícono visual en 14px (heurística 5, baja a 3/4).
3. [Sección "La evidencia detrás de tu patrón", las 4 tarjetas] Los 4 badges "ALTO" siguen siendo visualmente idénticos — correcto dado que los datos no tienen grados reales (persiste sin cambios desde la 2da pasada; NO es fabricable sin inventar variación falsa). Heurística 8 se mantiene en 3/4.
4. [Sheet de detalle, flujo de error] Sigue sin existir evidencia de un estado de fallo propio para `eliminarComida()` (solo el `error.tsx` genérico de la ruta) — no verificado para este flujo exacto. Es de bajo riesgo real (localStorage síncrono) pero un `try/catch` con un toast corto de 1 línea es defensa razonable, no sobre-ingeniería. Heurística 9 se mantiene en 3/4.
5. [Heurística 7 — flexibilidad] Sigue sin existir acceso rápido a esta pantalla para el usuario frecuente (ej. desde un resumen en Hoy/Home). No bloqueante por naturaleza de pantalla de solo-lectura; persiste en 2/4 sin cambios desde la 2da pasada.

## Verificación del fix de ayuda contextual (heurística 10, defecto TOP #1 de la 5ta pasada)
IMPLEMENTADO Y VERIFICADO — botón `Info` (Lucide, 14px) junto a "SOSPECHOSO PRINCIPAL" con
`aria-expanded`, `aria-label="¿Qué significa esto?"` y `focus-visible:ring`; al activarlo despliega
(`AnimatePresence`, `height: 0 → auto`, respeta `useReducedMotion`) el texto: `"Confianza" es cuántas
veces síntomas y este ingrediente coincidieron dentro de 48 horas. "Alto" es un ingrediente ya
conocido como fuerte en FODMAP.` Visible y correctamente posicionado en `patron-ayuda-375.png`
(aparece justo debajo de la etiqueta, antes del anillo — no rompe la jerarquía ni desplaza el
badge "ALTO" de las tarjetas). Esto SÍ sube heurística 10 de 2/4 a 3/4 — bien resuelto, con un
único matiz de "ojo entrenado": (a) el propio texto de ayuda introduce el término sin definir
"FODMAP" (ver defecto TOP #1) y (b) solo cubre el término una vez, en la card superior, no
junto a cada badge "ALTO" repetido en la lista de evidencia (aceptable, redundancia innecesaria
si ya se explicó arriba). No alcanza 4/4 por (a).

## Por qué el puntaje de usabilidad BAJÓ en vez de subir (33/40 → 32/40)
El fix de heurística 10 es real y sube esa heurística (+1). Pero esta pasada, al re-evaluar los
10 criterios completos con criterio estricto e independiente sobre el código y ambos screenshots
nuevos, aparecen DOS defectos NUEVOS que introdujo el propio parche y que una pasada anterior no
pudo ver porque el código no existía:
- El texto de ayuda resuelve la ambigüedad de "confianza" y "alto" pero introduce "FODMAP" sin
  glosar — jerga que la heurística 2 (lenguaje del usuario) prohíbe explícitamente. (h2: 4→3, -1)
- El botón `Info` nuevo tiene un área táctil de 20×20px, por debajo del mínimo de 44px que las
  reglas duras de este mismo sistema exigen para cualquier elemento tocable en mobile. (h5: 4→3, -1)
Neto: +1 (h10) -1 (h2) -1 (h5) = -1 sobre el total anterior. Esto es exactamente lo que exige la
instrucción "ante la duda, el problema baja el puntaje": un fix bien intencionado que no se verificó
con la misma rigurosidad que el defecto original queda, en esta pasada, como regresión neta.
Gate doble NO se cumple (32/40 < 36/40; craft 19/20 ≥ 16/20 sí). Veredicto: NO LISTA.

## ¿Es alcanzable ≥36/40 sin fabricar datos ni sobre-ingenierizar, o el techo real está por debajo?
ALCANZABLE — el techo de esta pantalla concreta (dado su contenido de solo-lectura y sus datos)
está POR ENCIMA de 36/40, no por debajo. La proyección honesta, con fixes que NO fabrican variación
falsa ni sobre-ingenierizan:
```
h1=4 h2=4* h3=3 h4=4 h5=4* h6=4 h7=2 h8=3 h9=4** h10=4*  →  36/40
```
- h2=4*: reemplazar "fuerte en FODMAP" por lenguaje llano (1 línea de copy, cero riesgo).
- h5=4*: agrandar el hit-area del botón `Info` a ≥44px sin cambiar el ícono visual de 14px
  (1 línea de clases Tailwind, cero riesgo).
- h10=4*: consecuencia directa de resolver h2 — el mismo texto de ayuda, sin el término sin
  glosar, pasa de "bien" a "ejemplar".
- h9=4**: un `try/catch` alrededor de `eliminarComida()` con un toast corto de 1 línea
  ("No se pudo eliminar — intenta de nuevo") es manejo defensivo estándar, NO sobre-ingeniería
  (es exactamente lo que pide la heurística 9), aunque el escenario de fallo real sea raro.
h3 (3/4, afford de deshacer solo dentro del modal) y h7 (2/4, sin atajos) y h8 (3/4, badges
idénticos por datos reales) NO se tocan — moverlos exigiría fabricar variación falsa en los
badges o inventar un caso de uso de "usuario power" que esta pantalla de solo-lectura no tiene;
eso SÍ violaría las reglas del SO. Con los 3 fixes de arriba (todos triviales, ningún dato falso,
ninguna sobre-ingeniería) el puntaje llega exactamente a 36/40, cruzando el umbral. El craft ya
lo cruza (19/20 ≥ 16/20) desde hace varias rondas y no requiere cambios adicionales — solo
corregir el hit-area del botón `Info` cuando se toque el código de nuevo.
