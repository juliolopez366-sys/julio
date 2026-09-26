# VEREDICTO revisor-visual — onboarding
Fecha: 2026-09-25 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 27/40
Craft: 8/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. Fondo crema pergamino + tinta verde bosque + serif display, sin ningún dispositivo ownable visible en esta pantalla (el "mordisco" no aparece aquí) — coincide peligrosamente con la familia vetada "papel cálido + tinta verde" del banco de ejemplos canónicos → riesgo de clon; agregar el mordisco/textura propia en esta pantalla y re-chequear contra la paleta exacta de Capítulo.
2. Bajo los 4 chips queda ~45% de la pantalla vacío hasta el pie (visible en el screenshot), sin ancla ni contenido → viola "cero vacío muerto"; centrar verticalmente el bloque de pregunta+chips o repartir el aire sobrante en vez de dejarlo abajo.
3. app/onboarding/page.tsx y components/onboarding/funnel-ui.tsx no usan useReducedMotion en ningún punto (verificado por grep) pese a múltiples animaciones motion/react (transición de paso, check del chip, barra de progreso, anillo de carga, punto pulsante) → gate de accesibilidad incumplido; envolver cada animación con el patrón de 10-DESIGN-TOKENS.md.
4. El titular "¿Qué es lo que más te preocupa de tu SII?" (y el resto de h1 del wizard) es bold plano sin ninguna palabra clave resaltada en color de acento → falla el gate de conversión de titular con énfasis (55); resaltar 1-3 palabras clave con text-[var(--accent)].
5. Inconsistencia de íconos dentro de la misma lista de opciones: en paso 3 solo "Sí, y las abandoné" lleva ícono (las otras 2 no) y en paso 6 "Otro" queda sin ícono mientras el resto sí — el texto arranca en distinta posición horizontal entre chips del mismo grupo; dar ícono a todas las opciones de una lista o a ninguna, nunca mixto.
