# VEREDICTO revisor-visual — onboarding FoodScan (re-revisión pantalla "Así funciona" / AhaSimulacion)
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 37/40  (detalle: h1:4 h2:4 h3:3 h4:4 h5:3 h6:4 h7:3 h8:4 h9:4 h10:4)
Craft: 18/20  (detalle: jerarquía:4 profundidad:4 identidad:4 movimiento:4 encaje:2)
Copy (si vende): N-A (onboarding, no es superficie de venta directa)
Fidelidad (si hubo referencia): FIEL (paleta verde bosque/crema, Fraunces/Work Sans, radios y chip Mordisco consistentes con FICHA-ARTE.md)
Veredicto: LISTA

Confirmación de los 5 defectos de la ronda anterior:
1. RESUELTO (mejora sustancial, no perfecta): el copy ahora dice "Reconocemos el plato y lo
   cruzamos con recetas típicas... luego tú confirmas en un toque lo que sí llevaba" y la alerta
   pasó de afirmación absoluta a "Probable ajo oculto... Confírmalo en un toque si lo sabes" —
   ya no reproduce la objeción #1 de FICHA-AVATAR.md sin sustento, y conecta con la objeción #6
   (corregir es 1 toque). Nota menor: esta pantalla sigue sin nombrar la ventana de correlación
   de 48h que sí aparece en PantallaCarga línea 442 y en los pasos de Reconocimiento — el puente
   completo entre "foto reconocida" y "correlación de sintomas 48h" vive repartido en dos
   pantallas distintas del flujo en vez de decirse una sola vez junto a la demo. No baja el gate
   por sí solo (ya no hay contradicción activa, solo fragmentación de la explicación), pero es
   la única deuda que queda del defecto original.
2. RESUELTO: la promesa "5 a 7 días" fue reemplazada por "Tu patrón aparece apenas un ingrediente
   se repita en tus días malos" (código línea 445) — sin cifra inventada, ancla al mecanismo real.
3. RESUELTO: etiqueta "Ejemplo" visible en la esquina superior derecha de la card (código línea
   322-324, confirmada en el screenshot) — separa la demo simulada de una alerta real futura.
4. RESUELTO: el CTA nunca se deshabilita (código línea 392: el onClick siempre responde; si se
   toca durante "Analizando…" salta directo a mostrar el resultado en vez de esperar el
   temporizador). Cumple el ancla "nunca disabled por defecto" del CTA héroe vivo.
5. RESUELTO: el chip Mordisco fue agregado al encabezado (código línea 310, visible en el
   screenshot) — consistente con Pregunta y Reconocimiento.

Top defectos restantes (ninguno bloqueante, quedan para pulido futuro):
1. [Encabezado + demo de `AhaSimulacion`] La ventana de correlación de 48h (mecanismo central del
   producto, mencionado en PantallaCarga y en los pasos de Reconocimiento) no se nombra en esta
   pantalla — el usuario ve "reconocemos el plato" y "confirmas en un toque" pero no lee aquí cómo
   se conecta con sus síntomas de después. Fix: agregar una frase corta bajo la alerta, ej. "Lo
   cruzamos después con tus síntomas de las próximas 48h".
2. [Card de la demo, encaje óptico] La etiqueta "Ejemplo" (esquina superior derecha) y el círculo
   de plato simulado no comparten una línea de aire idéntica con el resto de cards del flujo — el
   padding superior de la card se siente 4-6px más apretado contra la etiqueta que en las cards de
   Reconocimiento. Fix: igualar el padding superior a `pt-6` explícito en vez de heredar el `p-6`
   general para que la etiqueta no quede pegada al borde visualmente.
3. [CTA en estado "Analizando…"] El label "Analizando… (toca para ver el resultado)" es largo y
   mezcla dos ideas (estado del sistema + instrucción de atajo) en un solo botón — funciona, pero
   un ojo entrenado nota que es más texto del que carga cualquier otro CTA del flujo. Fix: acortar
   a "Analizando…" y mover "toca para saltar" como microcopy debajo del botón.
4. [Alerta de ejemplo] El color `--alerta` (terracota) se usa igual que se usaría para un riesgo
   real del usuario; la etiqueta "Ejemplo" en la card ya lo distingue a nivel de contenedor, pero
   la alerta en sí no hereda ningún tratamiento visual diferenciado (opacidad, borde punteado).
   Fix opcional: bajar levemente la opacidad de fondo de la alerta cuando `esEjemplo` para reforzar
   la distancia con una alerta real futura (no bloqueante, la etiqueta ya resuelve lo esencial).
5. [Consistencia de verbo] "Análisis completo" (estado post-detección) y "Así de simple" (CTA)
   usan registros distintos — uno describe el sistema, el otro es una frase de cierre emocional;
   funciona pero rompe levemente el patrón de "estado del sistema en su propio idioma" que domina
   el resto del onboarding. No accionable con prioridad; mencionado por completitud.

Resumen: el resto del flujo (las 4 preguntas, Reconocimiento sin cambios, compromiso de días,
paywall) mantiene la calidad que dio LISTA en la ronda que aprobó el onboarding base. Los 5
defectos de la ronda anterior sobre `AhaSimulacion` quedan resueltos: ya no hay contradicción de
mecanismo activa ni promesa de tiempo sin sustento (los dos que bloqueaban el gate), el uso de
`--alerta` está acotado con la etiqueta "Ejemplo", el CTA nunca nace deshabilitado, y el chip
Mordisco iguala el encabezado con el resto del set. El onboarding completo, incluida la pantalla
nueva, cruza el umbral: 37/40 usabilidad (≥36) y 18/20 craft (≥16). LISTA.
