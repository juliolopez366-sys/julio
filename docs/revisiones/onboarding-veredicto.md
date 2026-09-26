# VEREDICTO revisor-visual — onboarding (paso 1/8, "¿Qué es lo que más te preocupa de tu SII?")
Fecha: 2026-09-25 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 36/40
Craft: 16/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA

Top defectos:
1. [Badge "mordisco" — funnel-ui.tsx, componente `Mordisco`] Sigue siendo una forma abstracta idéntica en las 4 preguntas, sin relación temática con el contenido (hinchazón, ansiedad, etc.). Ya está documentado como dispositivo de marca deliberado (nota 5, cosa juzgada) — no bloquea el veredicto, pero si en el futuro se reabre FICHA-ARTE, vale la pena explorar una variante mínima por categoría de pregunta.
2. [Identidad — FICHA-ARTE.md, verde bosque `#47593A` + crema `#F1E8D4` + Fraunces] Riesgo de familia cercana al ejemplo vetado "Capítulo" (papel cálido + tinta verde + Petrona/Karla) del test anti-clon. No dispara el veto automático (tipografía distinta: Fraunces ≠ Petrona/Karla, hex distintos) y es decisión ya aprobada por el usuario vía referencia real — pero es el techo de EJE 3 (identidad) en 2/4: el "mordisco" es el único dispositivo verdaderamente ownable de la pantalla, sin textura/grano/tratamiento adicional que lo aleje más del arquetipo papel+tinta-verde.
3. [Jerarquía tipográfica] La pantalla usa 4 tamaños distintos (12px eyebrow/footer, 14px microcopy, 16px chip, 28px título) en vez del máximo de 3 recomendado — un ojo entrenado lo nota al entrecerrar los ojos, aunque no rompe la lectura. No urgente.
4. [Profundidad] No hay una superficie "hundida" en esta pantalla (solo base con gradiente + elementos elevados con sombra tintada) — coherente para una pantalla de pregunta simple, pero es la razón de que EJE 2 no llegue a 4/4.

Resumen: los 3 defectos accionables de la 5ª ronda están genuinamente resueltos. (1) El hueco vertical asimétrico se corrigió cambiando `justify-center` por `pt-8` fijo — el screenshot confirma una distribución predecible, sin el vacío de ~150px arriba que se veía antes; el aire remanente bajo el footer es normal para una pantalla de selección sin CTA explícito (auto-avance al elegir), no un defecto de layout. (2) El segundo radial sutil (6%, 15% 65%) sí extiende la sensación de profundidad hacia la zona de chips en vez de cortarse en el tercio superior — visible en el screenshot como un degradé continuo, no una franja. (3) La navegación por teclado con `role="radiogroup"` + flechas arriba/abajo sobre los chips (que ya eran `<button>` nativos con Tab/Enter) cierra el hueco de heurística 7 verificado en `app/onboarding/page.tsx` líneas 246-257. Los defectos 4 y 5 de rondas previas quedan anotados como riesgo conocido y decisión de marca ya aprobada (cosa juzgada de FICHA-ARTE.md) — no son accionables sin reabrir una decisión del usuario, y su impacto real en el screenshot es menor (no hay coincidencia exacta con los ejemplos vetados). Usabilidad 36/40 y Craft 16/20 cruzan el gate doble (≥36/40 y ≥16/20). La pantalla queda LISTA; los 4 puntos de esta lista son notas de pulido opcional, no bloqueantes.
