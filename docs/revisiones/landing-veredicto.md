# VEREDICTO revisor-visual — landing
Fecha: 2026-09-24 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 32/40
Craft: 14/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Solución (chip del mecanismo), Oferta (cards), Garantía, CtaFinal] El dispositivo ownable "mordisco" que se sumó al Hero y a los 4 frames del carrusel sigue sin aparecer en el resto de la página — 4 de 9 bloques de contenido (Solución, Oferta, Garantía, CtaFinal) siguen siendo papel cálido + tinta verde sin ningún elemento firma → repetirlo como borde/esquina en al menos la card de Garantía o en el chip del mecanismo bautizado; no depende de la app real, es corregible hoy. Mantiene el eje 3 (identidad) en 2/4.
2. [AppPorDentro.tsx, marco del teléfono en el carrusel] El radio del marco usa `rounded-[30px]` hardcodeado en vez de `var(--radius-card)` (26px), que es el radio que usa el resto de la página (cards, hairlines, chips) → cambiarlo a la variable del kit para que el radio sea idéntico en toda la pantalla (eje 5, encaje óptico).
3. [H2 de Solución y de AppPorDentro] De las 5 secciones secundarias, 3 ya se diferenciaron (Problema y FAQ bajaron a 26/34, Oferta subió a 32/46), pero Solución y AppPorDentro quedaron exactamente iguales entre sí (30px/40px) — es el remanente del defecto de jerarquía plana de la pasada anterior → bajar o subir una de las dos (ej. Solución a 28px/38px) para que ninguna sección comparta tamaño exacto con su vecina inmediata.
4. [ui.tsx, StickyCtaMobile — barra fija inferior mobile] El CTA de la barra sticky no lleva las clases `focus-visible` que sí se agregaron al `CtaButton` y al botón outline de "Mensual" en Oferta → agregar el mismo anillo de foco para que los 4 lugares donde aparece un CTA en la página sean consistentes en accesibilidad de teclado (h4 consistencia).
5. [Hero, visual bajo el CTA / carrusel de "La app por dentro"] Ambos siguen siendo placeholders — ahora reforzados con el mordisco, lo cual mitiga parcialmente el riesgo de identidad genérica, pero ninguno es una captura real de producto. Aceptado como pendiente legítimo de Sesión 5, no accionable hoy.

RESUELTO desde la 2ª pasada:
- [H2 de Problema/FAQ vs Oferta] La jerarquía entre H2 dejó de ser un bloque de 5 tamaños idénticos: ahora hay 3 niveles distintos (26/34 en Problema y FAQ, 30/40 en Solución y AppPorDentro, 32/46 en Oferta) — sube h8 (estético/minimalista) y el eje 1 de craft (jerarquía), aunque el defecto #3 de arriba muestra que el trabajo quedó a medias entre las dos secciones de nivel medio.
- [Carrusel, 4 placeholders] Ya llevan el dispositivo ownable "mordisco" (antes solo vivía en el Hero) — sube parcialmente el eje 3 de identidad, aunque el defecto #1 de arriba muestra que el resto de la página sigue sin él.
- [CTAs — CtaButton y outline de Oferta] Ambos ya declaran `focus-visible` con anillo del acento — sube h1 (feedback de foco) y consistencia de accesibilidad, con la excepción señalada en el defecto #4 (StickyCtaMobile quedó afuera).

ACLARACIÓN DEL BLOQUEO: los tres cambios de esta pasada movieron el puntaje (31→32 usabilidad, 13→14 craft) pero no alcanzan el umbral (≥36/40 y ≥16/20). El motivo no es que falte la app real: de los 5 defectos de arriba, 4 son corregibles HOY sin depender de Sesión 5 (identidad extendida a más secciones, radio del carrusel, diferenciar Solución de AppPorDentro, focus-visible del sticky CTA). Solo el defecto #5 (placeholders del Hero y el carrusel) depende de que exista la app real. Resolver los 4 corregibles hoy debería acercar la pantalla al umbral en la próxima pasada; los placeholders seguirán quedando anotados como pendiente aceptado de Sesión 5 y no deberían, por sí solos, bloquear el veredicto si el resto pasa.
