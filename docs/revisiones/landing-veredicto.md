# VEREDICTO revisor-visual — landing
Fecha: 2026-10-14 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 31/40
Craft: 15/20
Copy (si vende): 16/20
Fidelidad (si hubo referencia): FIEL
Veredicto: NO LISTA
Top defectos:
1. [§5 La app por dentro — frames 2 "Fotografías tu plato" y 3 "Tu día de un vistazo" (carrusel-2-mecanismo.png, hero-mockup.png)] Las dos capturas muestran la zona de la foto VACÍA (rectángulo beige degradado, sin comida); el frame 3 enseña una sola comida, no "tu día"; y los PNG ya traen su propio bisel de teléfono oscuro al que AppPorDentro.tsx le suma `border-[5px]` → doble marco. La sección de prueba visual parece sin terminar. → Recapturar ambas pantallas con una foto de comida real cargada y el resultado visible, recortar el bisel del PNG (o quitar el border del componente) y renombrar el label 3 a lo que de verdad muestra ("Tu riesgo, comida por comida").
2. [§6 Oferta — CTAs "Empezar mis 7 días gratis" y "Elegir mensual" (app/page.tsx, ambos `ctaHref: CTA_HREF` = `/onboarding`)] La elección de plan se pierde: quien toca "Elegir mensual" llega al mismo onboarding que el anual y tiene que volver a elegir en el paywall (falla el gate "no recordar nada de una pantalla a otra"). → Usar `/onboarding?plan=anual` y `/onboarding?plan=mensual` y preseleccionar ese plan en el paywall.
3. [§7 Garantía + FAQ 5] "Si en 7 días no ves un patrón… te devolvemos todo" se solapa con los 7 días de prueba en los que "no se cobra nada": no queda claro qué se devuelve ni desde cuándo cuentan los 7 días. → Fijar el arranque: "Si en los 7 días siguientes a tu primer cobro no ves un patrón más claro, un correo y te devolvemos todo", igual en FAQ 5 y en el recap del CTA final.
4. [§4 Solución — Cruce48h.tsx, resultado "4 de 5"] La línea de tiempo muestra 1 síntoma y solo 2 comidas con ajo, pero el resultado dice "4 de 5 comidas con ajo terminaron en síntoma": la cifra no se deriva de lo que se ve, y el carrusel usa otra métrica ("4 de tus últimos 5 días malos"). La prueba central se lee como inventada. → Añadir bajo la línea "+ otros 3 síntomas de las últimas 2 semanas" (o mostrar "2 de 2" sobre lo visible) y alinear la métrica del mockup con la misma frase.
5. [Copy — Hero, Solución, Oferta, Problema] El mecanismo tiene dos nombres ("Motor de Detonante Real" en Solución, "Motor de correlación de 48 horas" en las features de Oferta) y no aparece en el hero. Además faltan las frases que FICHA-AVATAR exige ("ansiedad del baño", "hacer tarea", "datos reales, no adivinanzas"): grep en app/page.tsx = 0 coincidencias. → Unificar en "Motor de Detonante Real" (hero, sub, feature de oferta) y reescribir Problema 2 como "¿La ansiedad del baño te hace cancelar planes?" y Agitación 3 como "…registrar a mano es hacer tarea cada vez que comes".

## Detalle (formato del revisor)

VEREDICTO: NO LISTA
USABILIDAD: 31/40  (detalle: h1:3 h2:4 h3:3 h4:3 h5:4 h6:3 h7:3 h8:3 h9:3 h10:2)
CRAFT:      15/20  (detalle: jerarquía:3 profundidad:3 identidad:3 movimiento:3 encaje:3)
COPY:       16/20  (detalle: idea:3 especificidad:3 emoción:3 oferta:3 acción:4)
FIDELIDAD:  FIEL (0 de 6 fallos: modo claro, acento verde bosque, display serif, radios 26/16, densidad aireada, sombras sutiles)

Gate de carga cognitiva: 2 fallos (elección de plan no se arrastra entre pantallas; bloques de más de 4 líneas a 375px: PS del CTA final de unas 7 líneas y Big Idea de unas 5). No llega a sobrecarga crítica.

CTA héroe vivo: PASA los 4 (crema #F6F2E6 sobre #47593A = 6.8:1 · whileTap 0.97 · nunca disabled · 52px de alto a ancho completo).

Anclas de conversión: titular bold con acento OK, aunque el verde #47593A contra el carbón #2C2A1E (≈1.9:1 entre sí) hace que "detonante real" resalte poco (eje 1 = 3) · 3 hairlines (chip del mecanismo, plan anual, garantía) y chips SVG sin emojis OK · alternancia base/elevada OK; la card de garantía es `--surface` sobre una sección `--surface` y se funde: solo la separan la hairline y la sombra.

Contraste verificado: texto secundario #636349 = 5.5:1 sobre --bg y 4.6:1 sobre --surface-2 (AA).

Movimiento (código): stagger de entrada OK · conteo del precio OK · línea de escaneo del hero OK · tap 0.97 OK · acordeón con altura animada OK · la línea de 48 h de Cruce48h es estática (no se dibuja) · reduced-motion respetado en todo.

Sub-checks copy: garantía nombrada cerca del CTA de compra PASA (sección contigua + recap del CTA final) · message-match N/A (no hay dato del creativo de origen).
