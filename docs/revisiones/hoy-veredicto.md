# VEREDICTO revisor-visual — Hoy (M0)
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/hoy-375.png
Usabilidad: 25/40
Craft: 12/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): FIEL
Veredicto: NO LISTA

Top defectos:
1. CTA "Escanear mi próxima comida" y "Registrar un síntoma" (app/(app)/hoy/page.tsx L110-123) sin whileTap/estado de respuesta al tacto → agregar `whileTap={{ scale: 0.97 }}` (falla ancla #2 del CTA héroe vivo).
2. Resultado de riesgo de la comida (page.tsx L84-92) perdió el titular Fraunces 19px que el mockup aprobado usaba como héroe de la pantalla ("Medio · ajo", vista-previa-app.html L163) — quedó solo badge 12px + texto body de 15px, sin nivel jerárquico 1 → agregar un título en `--font-display` con el resultado antes/junto al badge.
3. El handle del bottom sheet (components/app/bottom-sheet.tsx L42) es una barra decorativa sin lógica de swipe-to-dismiss ni botón de cierre visible → el usuario puede intentar arrastrar y no pasa nada (anti-patrón: elemento interactivo falso) → implementar drag real con Motion o reemplazar por un botón "Cerrar"/X visible.
4. Tarjeta de insight (page.tsx L95-107) presenta "4 de tus últimos 4 registros" como 100% de confianza sin matiz de tamaño de muestra, en una app de salud digestiva → se siente un hallazgo demasiado categórico y poco creíble → agregar matiz ("con solo 4 registros, sigue confirmando" o un indicador de confianza n=4) en vez de presentarlo como certeza.
5. Badge de racha "6 días" (page.tsx L74-76) es un número estático, sin conteo animado ni celebración de hito — dos de las 7 animaciones baseline obligatorias no aplicadas a esta pantalla → animar el conteo al montar y disparar celebración en hitos (ej. 7 días).
