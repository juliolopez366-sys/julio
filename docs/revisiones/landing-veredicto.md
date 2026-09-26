# VEREDICTO revisor-visual — landing
Fecha: 2026-09-25 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 30/40
Craft: 14/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): FIEL
Veredicto: NO LISTA
Top defectos:
1. [Solucion.tsx — chip "el Motor de Detonante Real", Oferta.tsx — cards Anual/Mensual, CtaFinal.tsx, Problema.tsx, Agitacion.tsx, Faq.tsx] El dispositivo ownable "mordisco" solo vive en 3 de 10 secciones (Hero, AppPorDentro, Garantía, esta última corregida en esta pasada) — el resto de la página sigue siendo papel cálido + tinta verde sin ningún elemento firma → repetirlo como borde superior del chip del mecanismo en Solución y como detalle en la card Anual de Oferta. Accionable hoy, no depende de Sesión 5. Mantiene el eje 3 (identidad) en 2/4.
2. [Oferta.tsx — Precio(), cifras "$4.17"/"$6.99", "7 días gratis"] Ningún número héroe de la página cuenta al entrar en viewport (baseline de movimiento #2 ausente) — useReveal ya monta el stagger pero el precio aparece estático → animar con un count-up de 300-500ms sincronizado con el reveal. Accionable hoy.
3. [Oferta.tsx, botón outline "Elegir mensual", línea ~192] El anillo de foco usa `focus-visible:ring-offset-[var(--bg)]` pero el botón vive sobre `--surface` (fondo de la card mensual) — el resto de los CTAs (CtaButton, StickyCtaMobile) sí calculan el offset contra su propio fondo → corregir el token de offset para que el foco no se vea "cortado" contra el borde de la card. Accionable hoy (h4 consistencia).
4. [H2 de Problema/Faq 26px, Solucion/AppPorDentro 28-30px, Oferta 32px] La escalera de 4 tamaños ya existe (se corrigió que Solución y AppPorDentro compartieran tamaño exacto) pero los saltos de apenas 2px entre niveles siguen sin leerse al entrecerrar los ojos → separar más la escala (ej. 24/28/34/42) para que los 4 niveles sean nítidos sin medir en devtools. Accionable hoy.
5. [Hero.tsx — visual bajo el CTA, AppPorDentro.tsx — 4 frames del carrusel] Ambos siguen siendo placeholders honestos (reforzados con el mordisco desde la pasada anterior) — ninguno es una captura real de producto. Depende de que exista la app real (Sesión 5), no accionable hoy.

RESUELTO desde la pasada anterior (verificado en código):
- [Garantia.tsx, líneas 45-55] Se agregó el trazo del mordisco arriba del ícono del escudo — la identidad ya no vive solo en Hero y AppPorDentro.
- [AppPorDentro.tsx, línea 104] El marco del carrusel pasó de `rounded-[30px]` hardcodeado a `var(--radius-card)` — el radio ya es idéntico en toda la pantalla (26px en tokens.css), sube el eje 5 (encaje óptico).
- [Solucion.tsx línea 67 vs AppPorDentro.tsx línea 87] El H2 de Solución bajó a 28px/38px mientras AppPorDentro se quedó en 30px/40px — ya no comparten tamaño exacto con su vecina inmediata.
- [ui.tsx, StickyCtaMobile línea 237] El CTA de la barra sticky ya declara `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]` igual que el resto de los CTAs de la página.

ACLARACIÓN DEL BLOQUEO: los 4 cambios de esta pasada estaban bien dirigidos y los 4 se verifican en el código (no son promesas sin evidencia), pero solo resuelven 1 de los 5 defectos de fondo que bloquean el umbral (el radio del carrusel). El defecto de identidad (mordisco ausente en 6 de 10 secciones) sigue siendo el techo del craft — con solo 3 secciones portando el dispositivo, el eje 3 no puede subir de 2/4, y eso solo mantiene el craft total en 14/20 pese a la mejora de encaje. En usabilidad, esta pasada no tocó ningún criterio que estuviera bloqueando fuerte (los 4 fixes eran craft/consistencia, no las brechas de fondo en flexibilidad o prevención de errores), así que el puntaje de usabilidad se mantiene lejos del umbral de 36. Ninguno de los 4 defectos nuevos de arriba (#1-#4) depende de Sesión 5 — son accionables hoy. Solo el #5 (placeholders del Hero y el carrusel) espera a la app real.
