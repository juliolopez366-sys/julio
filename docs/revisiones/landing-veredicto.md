# VEREDICTO revisor-visual — landing
Fecha: 2026-10-14 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 33/40
Craft: 16/20
Copy (si vende): 18/20
Fidelidad (si hubo referencia): FIEL
Veredicto: NO LISTA
Top defectos:
1. [§2 Problema + §3 Agitación, de "¿Te suena?" a "En 6 meses, si nada cambia"] Nueve cards seguidas con la misma forma (fondo crema, chip apagado, texto a la izquierda) en el mismo plano elevado. A 375px es una pared repetitiva que el usuario recorre sin jerarquía, y el gate de "texto por bloque ≤3-4 líneas" falla también en la Big Idea (unas 5 líneas) y en el PS del CTA final (unas 7). → Quitar las 2 mini-cards "Hoy / En 6 meses" (repiten la frase 1 de Agitación), pasar las 3 frases de Agitación a texto suelto sin card (o a una sola card con divisores) y recortar el PS a 3 líneas.
2. [§5 La app por dentro — frames 2 "Fotografías tu plato" y 3 "El riesgo de tu comida, antes de comer"] Las dos capturas siguen mostrando la zona de la foto vacía (rectángulo beige). Que sea el estado actual de FotoComida explica el origen, pero quien visita ve una pantalla a medio cargar en la sección cuyo trabajo es probar el producto. → Recapturar con una foto de comida ya cargada (estado con datos, no el estado vacío) o, si la app todavía no la pinta, reemplazar esos dos frames por el DemoAnalisis del hero recortado a 9:19.5. El placeholder vacío en la pantalla principal de la app es un defecto aparte de esa pantalla.
3. [§1 Hero — subtítulo] El mecanismo bautizado ya aparece unificado en Solución y en Oferta ("Motor de Detonante Real"), pero no en el hero. El subtítulo lo describe ("Cruzamos cada síntoma con tus últimas 48 horas") sin nombrarlo, y la ficha pide "mecanismo al frente" para un mercado sofisticado. → "Solo tomas la foto. El Motor de Detonante Real cruza cada síntoma con tus [b]últimas 48 horas[/b]." (14 palabras, no se trunca).
4. [Titulares con [acento] — H1 "detonante real", H2 de Solución, Oferta y App por dentro] El verde #47593A contra el carbón #2C2A1E da ≈1.9:1 entre sí: las palabras clave casi no se separan del resto al entrecerrar los ojos (eje de jerarquía 3). → Dar al acento del titular un tratamiento que no dependa solo del tono, por ejemplo itálica de Fraunces (como ya hace el CTA final) o subrayado orgánico en crema hundido #E9DFC6 bajo la palabra.
5. [§7 Garantía — DECISIÓN DEL USUARIO, no defecto del constructor] Sigue siendo ambiguo desde cuándo corren los "7 días" de la Garantía del Primer Patrón, si los 7 días de prueba no tienen cobro. Penaliza el eje de oferta del copy (3/4). Queda anotado como decisión explícita del usuario y no se pide cambio.

## Verificación de los cambios declarados
- Carrusel sin doble marco: VERIFICADO (AppPorDentro.tsx, línea 102: sin `border-[5px]` ni `borderColor`; la captura muestra un solo bisel). El label 3 es "El riesgo de tu comida, antes de comer", coherente con lo que muestra el frame. Capturas 2-3 sin recapturar → defecto 2.
- Plan arrastrado: VERIFICADO. app/page.tsx 106/118 → `/onboarding?plan=anual|mensual`; app/onboarding/page.tsx 44-47 guarda `foodscan_plan`; app/paywall/page.tsx 60-61 lo lee y preselecciona. No hay middleware que redirija y pierda el query.
- Ejemplo 48 h: VERIFICADO (Cruce48h.tsx 91: "Arriba ves 2 de ellas. Sumando tus semanas de registro, 4 de tus 5…"). La cifra ya es honesta respecto de lo visible.
- Un solo nombre + frases del avatar: VERIFICADO. Features de oferta: "Motor de Detonante Real (cruce de 48 horas)". Problema: "ansiedad del baño" y "hacer tarea". Agitación: "datos reales, no adivinanzas". Falta solo en el hero (defecto 3).
- Garantía: sin cambios por decisión del usuario (defecto 5, informativo).

## Detalle (formato del revisor)

VEREDICTO: NO LISTA
USABILIDAD: 33/40  (detalle: h1:3 h2:4 h3:3 h4:3 h5:4 h6:4 h7:3 h8:3 h9:3 h10:3)
CRAFT:      16/20  (detalle: jerarquía:3 profundidad:3 identidad:3 movimiento:3 encaje:4)
COPY:       18/20  (detalle: idea:3 especificidad:4 emoción:4 oferta:3 acción:4)
FIDELIDAD:  FIEL (0 de 6 fallos)

Gate de carga cognitiva: 1 fallo (bloques de más de 4 líneas: Big Idea y PS). El fallo de "recordar entre pantallas" quedó resuelto.
CTA héroe vivo: PASA los 4 (6.8:1 · whileTap 0.97 · nunca disabled · 52px a ancho completo).
Movimiento (código): stagger, conteo del precio, escaneo del hero, tap 0.97 y acordeón OK. La línea de 48 h de Cruce48h sigue estática. reduced-motion respetado.
Sub-checks copy: garantía nombrada cerca del CTA de compra PASA · message-match N/A (sin dato del creativo de origen).
Bloqueo único del gate: usabilidad 33/40 < 36. Craft 16/20 y copy 18/20 ya pasan. Los defectos 1 y 2 son los que mueven h8 y h10 hacia 4.
