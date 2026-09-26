# VEREDICTO revisor-visual — onboarding (paso 1/8, "¿Qué es lo que más te preocupa de tu SII?")
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 36/40
Craft: 16/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA

Top defectos:
1. [Chip no seleccionado — `Chip` en funnel-ui.tsx, `bg-[var(--surface-2)]`] Verificado explícitamente el riesgo de esta ronda: sin `border`, el chip se distingue del fondo SOLO por color (#e9dfc6 vs #f6f2e6 del `--bg`, una diferencia tonal pequeña) + `SOMBRA_FLOTANTE`. En el screenshot la sombra tintada hace el trabajo y el borde del chip se lee nítido — no hay pérdida de legibilidad. No es un defecto nuevo, pero es el punto más frágil de este cambio: si algún día se reduce/quita la sombra, el chip se fundiría con el fondo. No bloquea el veredicto.
2. [Identidad — FICHA-ARTE.md, verde bosque `#47593A` + crema `#F1E8D4` + Fraunces] Se mantiene el mismo techo de EJE 3 ya documentado en rondas previas: familia cercana al ejemplo vetado "Capítulo" (papel cálido + tinta verde). No dispara el veto automático (tipografía y hex distintos, decisión ya aprobada por el usuario vía referencia real). Ajeno al cambio de esta ronda.
3. [Jerarquía tipográfica] Sigue habiendo 4 tamaños en pantalla (12/14/16/28px) en vez del máximo de 3 recomendado — perceptible solo al entrecerrar los ojos. Ajeno al cambio de esta ronda.
4. [Profundidad] Esta pantalla no muestra una superficie "hundida", solo base con gradiente + elementos elevados — coherente para una pantalla de selección, techo del EJE 2. Ajeno al cambio de esta ronda.

Resumen: el único cambio de código desde el veredicto anterior fue quitar `border` del componente `Chip` (compartido con el paywall) para cumplir la regla de FICHA-ARTE.md "sin bordes — todo por color plano y curvas". Revisado con criterio fresco: el chip NO seleccionado sigue siendo perfectamente distinguible del fondo en el screenshot — la diferencia de tono entre `--surface-2` (#e9dfc6) y `--bg` (#f6f2e6), sumada a la sombra tintada de acento (`SOMBRA_FLOTANTE`), define el borde visual sin necesidad de un `border` real. El check circular en el chip seleccionado sigue siendo inequívoco. No se detecta ninguna regresión de usabilidad ni de craft: los 4 puntos listados arriba son continuidad de rondas anteriores (identidad, jerarquía, profundidad), ninguno causado por este cambio, y de hecho el cambio corrige una desviación real contra la ficha que antes pasó desapercibida. Usabilidad 36/40 y Craft 16/20 siguen cruzando el gate doble (≥36/40 y ≥16/20). La pantalla se mantiene LISTA.
