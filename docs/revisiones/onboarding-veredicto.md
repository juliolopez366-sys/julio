# VEREDICTO revisor-visual — onboarding FoodScan (re-revisión: logo real en FunnelHeader)
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/onboarding-logo-header-375.png
Usabilidad: 37/40  (detalle: h1:4 h2:4 h3:3 h4:4 h5:3 h6:4 h7:3 h8:4 h9:4 h10:4)
Craft: 18/20  (detalle: jerarquía:4 profundidad:4 identidad:4 movimiento:4 encaje:2)
Copy (si vende): N-A (onboarding, no es superficie de venta directa)
Fidelidad (si hubo referencia): FIEL (paleta verde bosque/crema, Fraunces/Work Sans, radios y chip Mordisco consistentes con FICHA-ARTE.md)
Veredicto: LISTA

Alcance de esta re-revisión: el ÚNICO cambio desde el veredicto anterior (37/40 · 18/20, mismo
archivo, pantalla "Así funciona") es el reemplazo del logo placeholder (cuadrito de color sólido
24px) por el isotipo real (`/logo-mark.png`: plato+hoja+cubiertos+marco de escaneo sobre verde
bosque redondeado) en `FunnelHeader` (components/onboarding/funnel-ui.tsx, línea 54), visible solo
en la variante "volver al inicio" del header — es decir, en la Pregunta 1, antes de que exista
botón Atrás. El resto del flujo (Preguntas 2-4, Reconocimiento, AhaSimulacion, compromiso, paywall)
no se tocó y conserva el veredicto de la ronda anterior.

Verificación puntual del logo (respondiendo lo pedido explícitamente):
- NITIDEZ: aceptable pero no ejemplar. A 24px el trazo general (plato redondo con marco de
  escaneo en las esquinas) se distingue sobre el fondo verde bosque, sin pixelado ni artefactos de
  compresión visibles en el screenshot. Sin embargo, el detalle fino del isotipo original (hoja +
  cubiertos, visible con claridad en `public/logo-mark.png` a tamaño completo) se pierde a este
  tamaño y se percibe como una mancha clara genérica dentro del cuadrado verde — un ojo entrenado
  nota que es "un ícono con textura interna" más que reconoce QUÉ dibuja. No es un defecto que un
  usuario cualquiera note sin buscarlo (nivel 3, no nivel 2): a simple vista solo lee "logo verde",
  que es lo esperado de un logo de header pequeño.
- ALINEACIÓN: correcta. El `<img>` de 24px está centrado dentro del contenedor `flex size-11
  items-center justify-center` (código línea 50), a la misma altura vertical que la barra de
  progreso y con el mismo tamaño de tap-target (44px) que el botón "Atrás" (ChevronLeft 22px) que
  lo reemplaza en pantallas siguientes — consistencia de posición mantenida entre variantes del
  header.
- DISTORSIÓN: ninguna visible. El PNG es cuadrado (proporción 1:1) y se renderiza en un contenedor
  también cuadrado (`size-6` = 24×24), sin estiramiento ni recorte evidente. El `rounded-[8px]`
  aplicado por CSS es redundante sobre un PNG que ya trae su propio fondo redondeado con esquinas
  transparentes, pero no introduce un doble borde visible a este tamaño — no accionable.

Impacto neto en la rúbrica: mejora conceptual sobre el placeholder (marca real vs cuadrito de color
sólido, sube identidad ownable) compensada por la pérdida de legibilidad del detalle interno a
24px (mantiene el eje encaje en 2/4, ya señalado en la ronda anterior por la card de AhaSimulacion
y ahora reforzado por este mismo patrón — "arte con mucho detalle forzado a un tamaño pequeño").
No hay regresión de ninguna heurística de usabilidad: el logo sigue siendo un enlace funcional a
"/" con aria-label correcto, mismo tap-target, mismo comportamiento. Los totales se mantienen:
37/40 usabilidad (≥36) y 18/20 craft (≥16). El onboarding completo sigue LISTA.

Top defectos (ninguno bloqueante — arrastrados de la ronda anterior + 1 nuevo menor del logo):
1. [Header, Pregunta 1 — logo de 24px] El detalle interno del isotipo (hoja, cubiertos, marco de
   escaneo) se pierde a este tamaño y se lee como mancha clara sin forma reconocible → simplificar
   el isotipo para el header a una versión "mark simplificado" de 1-2 trazos (ej. solo el marco de
   escaneo + una hoja), reservando el isotipo completo con detalle para usos ≥48px (favicon grande,
   splash, ícono de app).
2. [Encabezado + demo de `AhaSimulacion`] La ventana de correlación de 48h no se nombra en esa
   pantalla (arrastrado, ver ronda anterior) → agregar frase corta bajo la alerta de ejemplo.
3. [Card de la demo, encaje óptico] Padding superior de la card de `AhaSimulacion` 4-6px más
   apretado que en las cards de Reconocimiento (arrastrado) → igualar con `pt-6` explícito.
4. [CTA en estado "Analizando…"] Label largo que mezcla estado + instrucción de atajo (arrastrado)
   → acortar a "Analizando…" y mover "toca para saltar" a microcopy debajo del botón.
5. [Alerta de ejemplo] `--alerta` sin tratamiento visual diferenciado para el caso "Ejemplo"
   (arrastrado, no bloqueante) → opacidad reducida cuando `esEjemplo` es true.
