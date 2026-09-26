# VEREDICTO revisor-visual — paywall
Fecha: 2026-09-25 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 30/40
Craft: 14/20
Copy (si vende): 15/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Detalle usabilidad: h1:2 h2:4 h3:3 h4:3 h5:3 h6:4 h7:3 h8:3 h9:2 h10:3
Detalle craft: jerarquía:3 profundidad:3 identidad:2 movimiento:3 encaje:3
Detalle copy: idea:3 especificidad:3 emoción:3 oferta:2 acción:4

Top defectos:
1. [app/paywall/page.tsx L127-142, CtaPrimario] El CTA "Empezar mis 7 días gratis" entra en `loading` permanente sin timeout ni resolución: `checkoutPendiente` se pone en `true` y nunca vuelve a `false`, el botón queda deshabilitado con spinner infinito y el mensaje "Te avisamos por correo en cuanto puedas confirmar tu prueba gratis" contradice la promesa de "empezar" algo instantáneo (no hay backend aún, pero la copia visible no debería sonar a placeholder). Un usuario que espera >3-5s percibe que se colgó — sigue siendo un callejón sin salida, solo que ahora con mejor estética. Fix: simular con `setTimeout` una transición a una pantalla/estado de confirmación real en 1-2s (o redirigir a `/entrar` con mensaje "revisa tu correo"), nunca dejar el botón en loading sin fin.
2. [app/paywall/page.tsx — todo el archivo] La garantía de 15 días fijada en FICHA-MERCADO.md ("cosa juzgada") no aparece en ningún texto visible del paywall (grep confirma 0 menciones fuera del comentario de código en la línea 5). Esto es un sub-check binario de la Rúbrica 4 (COPY) y hace bajar el eje "claridad de oferta" a 2/4: falta la pieza "qué me protege". Fix: agregar una línea nombrada cerca del CTA (junto a L144-146), ej. "Garantía de 15 días si decides que no es para ti".
3. [components/onboarding/funnel-ui.tsx L111-127, Mordisco] El dispositivo ownable sigue leyéndose como un ícono genérico de "onda" dentro de un chip circular, no como el dispositivo de firma de FICHA-ARTE (la curva que conecta la foto de comida con la hoja crema). En el paywall no hay foto ni transición visual real que lo justifique — es decoración aislada, no un dispositivo reconocible. Fix: usarlo como separador/transición real entre secciones (ej. borde superior de la card del timeline) en vez de ícono suelto en un badge.
4. [app/paywall/page.tsx L58, L60, L101, L145, L181] Persisten 14px y 15px conviviendo como "cuerpo" sin diferencia funcional (L58 subtítulo en 15px, L60/101/145/181 en 14px), y el título del timeline (L180) quedó en 16px — un tamaño intermedio entre "body" y "title" (18px de los nombres de plan) que no está en la escala de FICHA-ARTE (26-34/18/15/12). Fix: colapsar todo el cuerpo secundario a un solo tamaño (14px) y usar 18px únicamente para textos con jerarquía real de "title".
5. [app/paywall/page.tsx L54-58] El headline sigue centrado en el mecanismo ("Tu Motor de Detonante Real está configurado") y la única línea emocional trazada a FICHA-AVATAR.md ("dejes de cancelar planes por miedo a un mal día") quedó subordinada como subtítulo secundario en vez de liderar. Sube el eje emoción de 2→3 pero no a 4. Fix: si se busca el eje completo, abrir con la escena de dolor (cancelar planes / ansiedad del baño) y usar el mecanismo como refuerzo debajo.
