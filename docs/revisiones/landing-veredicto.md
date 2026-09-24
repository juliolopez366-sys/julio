# VEREDICTO revisor-visual — landing
Fecha: 2026-09-24 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 31/40
Craft: 13/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [H2 de Problema/Solución/AppPorDentro/Oferta/FAQ] Las 5 secciones secundarias siguen con el mismo tamaño/peso de título (30-40px bold), sin variación entre secciones de distinto peso argumentativo → esto NO depende de la app real ni de Sesión 5: es el mayor bloqueo activo tanto de usabilidad (h8 estético/minimalista) como de craft (eje 1 jerarquía); variar tamaño/kicker/tratamiento en 1-2 secciones (ej. Oferta, FAQ) antes de la próxima revisión.
2. [Sección "Tu próxima comida, sin miedo" / carrusel de 4 frames] Siguen siendo placeholders grises sin ninguna prueba visual — pendiente legítimo hasta que exista la app real (Sesión 5), pero el dispositivo ownable "mordisco" que sí se sumó al Hero NO se extendió aquí; sumarlo como motivo de scallop entre frames (no requiere captura real) recuperaría algo del eje de identidad hoy mismo.
3. [Hero, visual bajo el CTA] Sigue siendo un placeholder (ahora con la curva "mordisco" recortando la caja) — mitiga parcialmente el riesgo de identidad genérica pero NO resuelve el defecto: sigue sin ser una captura real. Aceptado como pendiente de Sesión 5, no accionable hoy.
4. [Identidad visual, resto de la página fuera del Hero] El dispositivo ownable "mordisco" vive solo en el Hero; el resto de la página (AppPorDentro, Oferta, Garantía) sigue siendo papel cálido + tinta verde sin ningún elemento firma, manteniendo el riesgo de coincidencia conceptual con la dirección "Capítulo" vetada del banco → repetir el motivo del mordisco como separador o esquina de al menos 1-2 secciones más.
5. [CTAs, toda la página] Foco de teclado no verificado en el código (CtaButton/enlaces no declaran estado `:focus-visible` propio más allá del default del navegador) → agregar anillo de foco visible con el acento del kit para no depender del default del user-agent.

RESUELTO desde la revisión anterior:
- [Oferta, CTA de la card Anual] Ya usa "Encontrar mi detonante gratis", igual que el resto de la página. Defecto #5 anterior cerrado — sube h4 (consistencia) y el eje 5 de copy (una sola acción, repetida).

Nota (no penalizada): los enlaces del footer y los destinos de los CTA (/onboarding, /entrar) siguen sin resolver a páginas reales — pendiente esperado de sesiones posteriores, no defecto de esta pantalla.

ACLARACIÓN DEL BLOQUEO (pedida explícitamente): el bloqueo NO es solo por los placeholders honestos (#2 y #3). El defecto #1 (jerarquía plana entre H2) es independiente de que exista o no la app real, es corregible hoy mismo, y por sí solo mantiene tanto usabilidad (31/40) como craft (13/20) por debajo del umbral (≥36/40 y ≥16/20). Los placeholders SÍ son el bloqueo dominante del eje de craft "identidad" y "encaje" (el carrusel y el hero son las piezas visuales más grandes de la página), y esos dos sí se pueden documentar como pendiente aceptado de Sesión 5. Pero declarar la pantalla lista requeriría, como mínimo, resolver el defecto #1 (jerarquía) primero — eso no depende de tener la app construida.
