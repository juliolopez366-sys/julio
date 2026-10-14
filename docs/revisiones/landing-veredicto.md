# VEREDICTO revisor-visual — landing
Fecha: 2026-10-14 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 36/40
Craft: 17/20
Copy (si vende): 18/20
Fidelidad (si hubo referencia): FIEL
Veredicto: LISTA
Top defectos:
1. [§5 La app por dentro — frame 3 "El riesgo de tu comida, antes de comer" (public/carrusel-3-hoy.webp)] El frame muestra la pantalla Hoy con la foto del plato, pero el coordinador confirma que en la app real Hoy todavía pinta un degradado en lugar de la foto guardada. La landing enseña un estado que la compradora no va a ver: es un claim visual falso y baja la especificidad del copy a 3. → CONDICIÓN DE PUBLICACIÓN: corregir FotoComida en la app para que Hoy muestre la foto guardada ANTES de publicar la landing; si no da tiempo, cambiar el frame 3 por una captura del estado real.
2. [§7 Garantía — h2 "Garantía del Primer Patrón"] Como Accent ahora aplica itálica a todo lo que envuelve dentro de h1/h2, y Garantia.tsx envuelve el nombre completo, este es el único titular entero en itálica. Rompe la regla "1-3 palabras clave en acento" que siguen los demás h2. → En Garantia.tsx envolver con <Accent> solo "Primer Patrón", o pintar el nombre en acento sin itálica.
3. [§7 Garantía — card] La card es `--surface` dentro de una sección `--surface` (SectionShell elevada): solo la separan la hairline y la sombra de 1px, y a 375px se funde con su sección (eje de profundidad 3). → Pasar la Hairline a `surface="bg"` para que la card se lea como hoja sobre la franja.
4. [§4 Solución — Cruce48h.tsx, línea vertical de la ventana de 48 h] La línea es un span estático. Es el único gráfico del mecanismo y no cumple el baseline "barras que se dibujan" (eje de movimiento 3). → Convertirla en motion.span con `scaleY` de 0 a 1, `origin-top`, 0.6s ease-out en whileInView, y sin escala con reduced-motion.
5. [§7 Garantía + FAQ 5 — DECISIÓN DEL USUARIO, no defecto del constructor] Sigue sin decir desde cuándo corren los 7 días de la garantía si la prueba de 7 días no tiene cobro. Mantiene el eje de oferta del copy en 3/4. Anotado como decisión explícita del usuario.

## Verificación de los cambios declarados
- Problema como lista tipográfica: VERIFICADO (Problema.tsx 52-63: `divide-y` con hairline al 22%, ícono Lucide de 20px en `--text-secondary`, sin card ni chip). En el screenshot se leen 4 filas limpias.
- Agitación en texto corrido: VERIFICADO (Agitacion.tsx 51-65: párrafos sin card ni ícono, la última frase en `text-lg` medium y color primario). El contraste "Hoy / En 6 meses" ya no se pasa desde app/page.tsx: no se renderiza.
- Big Idea en 2 frases (app/page.tsx 66) y PS en 3 frases cortas (línea 168): VERIFICADO. Caben en 3-4 líneas a 375px.
- Carrusel: VERIFICADO al abrir cada webp. Frame 1 muestra la pregunta 2 de 5 del onboarding; frame 2, el visor con los tacos y "Analizando ingredientes…"; frame 3, Hoy con la foto, "Alto · ajo y cebolla" y "4 de tus 5 comidas con ajo terminaron en síntoma". Riesgo y cifra quedan alineados con el hero y con Cruce48h. Ver defecto 1 sobre el frame 3.
- Subtítulo del hero: VERIFICADO. "Solo fotos: el [b]Motor de Detonante Real[/b] cruza cada síntoma con 48 horas previas." tiene 14 palabras, sin truncado. El mecanismo ya está bautizado en hero, solución y oferta.
- Acento en itálica: VERIFICADO (ui.tsx 18: `[h1_&]:italic [h2_&]:italic`). En el screenshot "detonante real", "resuelto en días", "sin miedo", "$0.14 al día" y "cuerpo" salen en itálica de Fraunces y se separan del texto aunque el tono sea parecido. Efecto colateral: defecto 2.
- Garantía: sin cambios por decisión del usuario (defecto 5).

## Detalle (formato del revisor)

VEREDICTO: LISTA (con la condición de publicación del defecto 1)
USABILIDAD: 36/40  (detalle: h1:3 h2:4 h3:3 h4:4 h5:4 h6:4 h7:3 h8:4 h9:3 h10:4)
CRAFT:      17/20  (detalle: jerarquía:4 profundidad:3 identidad:3 movimiento:3 encaje:4)
COPY:       18/20  (detalle: idea:4 especificidad:3 emoción:4 oferta:3 acción:4)
FIDELIDAD:  FIEL (0 de 6 fallos)

Gate de carga cognitiva: 0 fallos. Listas de 4 o menos, una sola acción primaria, plan arrastrado entre pantallas, bloques de 4 líneas o menos (la FAQ 4 abierta llega a unas 5, pero está cerrada por defecto).
CTA héroe vivo: PASA los 4 (6.8:1 · whileTap 0.97 · nunca disabled · 52px a ancho completo).
Anclas de conversión: titular bold con acento en itálica y color OK · 3 hairlines y chips SVG sin emojis OK · secciones alternadas OK (Problema y Agitación unidas a propósito como un solo movimiento) · AA OK.
Sub-checks copy: garantía nombrada cerca del CTA de compra PASA · message-match N/A (sin dato del creativo de origen).
Gate doble: 36/40 ≥ 36 y 17/20 ≥ 16; copy 18/20 ≥ 16 sin ningún eje ≤ 2 → LISTA. El margen en usabilidad es cero: cualquier regresión la devuelve a NO LISTA.
