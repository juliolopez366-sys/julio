# VEREDICTO revisor-visual — onboarding (paso 1/8)
Fecha: 2026-09-25 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 31/40
Craft: 11/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos: 1) Mordisco lg (78px) desborda su badge de 56px (funnel-ui.tsx:116 + page.tsx:225-227/258-260). 2) Paleta crema+verde+slab-serif coincide con el ejemplo vetado "Capítulo" del test anti-clon (riesgo de identidad no resuelto). 3) ~35-40% de la pantalla sigue vacía (gaps arriba del badge y debajo del último chip, page.tsx:223). 4) Gradiente radial de fondo (funnel-ui.tsx:174) imperceptible en el render — profundidad sigue plana a simple vista. 5) Sombra tintada de los chips (funnel-ui.tsx:11) casi no contrasta contra --chip-bg/--bg.
