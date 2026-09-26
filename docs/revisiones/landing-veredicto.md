# VEREDICTO revisor-visual — landing
Fecha: 2026-09-25 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 32/40
Craft: 15/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): FIEL
Veredicto: NO LISTA
Top defectos:
1. [Garantia.tsx:47-55] El mordisco de esta sección sigue siendo el ÚNICO de las 7 repeticiones de contenido que NO comparte tamaño/color con las demás: viewBox 120x14 renderizado a 120x10px con stroke al 35% de opacidad, contra el estándar ya unificado de 56x14 → 44x12px a opacidad plena que usan Problema, Agitacion, Faq, Solucion, Oferta y CtaFinal. Es el último cabo suelto de la consistencia del dispositivo ownable (h4, eje3/eje5 de craft). Fix: copiar el mismo `<svg>` (viewBox="0 0 56 14" className="h-[12px] w-[44px]" stroke="var(--accent)") que usan las otras 6 secciones.
2. [Oferta.tsx:153 vs CtaFinal.tsx:82] Los 2 "momentos de mayor énfasis" que reemplazaron la jerarquía caótica de la pasada anterior NO comparten tamaño entre sí: Oferta = 34px/46px, CtaFinal = 32px/44px — una diferencia de solo 2px que en un screenshot de 375px no se lee como "dos climax con matiz propio" sino como un tercer tamaño arbitrario sin razón narrativa (el mismo síntoma del defecto original, en menor escala). Fix: unificar ambos al mismo valor (ej. 32px/44px en los dos) para dejar exactamente 2 tamaños de H2 en toda la página: base (26/32) y climax (32/44).
3. [Hero.tsx:131-136] El placeholder del visual del hero — la zona de MÁXIMA visibilidad de toda la página — muestra el texto literal "Sugerencia: captura de la pantalla principal mostrando el riesgo de una comida" a cualquier visitante real. Un usuario común lo nota sin buscarlo (no necesita lupa): lee una instrucción dirigida al equipo de desarrollo, no un mensaje de marca. Baja h8 (estético/minimalista — "cada elemento se gana su lugar") de 3 a 2 y es el defecto de mayor riesgo de conversión de los tres, porque vive en el primer scroll. Fix: montar el screenshot real de la app (ya aprobado en el tour de `vista-previa-app.html`) o, mientras tanto, reemplazar el copy del fallback por una frase de marca en 2ª/3ª persona (nunca "Sugerencia:").

RESUELTO desde la pasada anterior (verificado en código + screenshot):
- [Problema.tsx, Faq.tsx, Solucion.tsx, AppPorDentro.tsx, Garantia.tsx] H2 de sección colapsados a un tamaño base único (26px/32px) — la jerarquía de 6 tamaños sin lógica de la 6ª pasada ya no existe; ahora hay 2 niveles (base + climax), con el matiz residual del defecto #2 arriba.
- [Problema.tsx:49, Agitacion.tsx:59, Faq.tsx:54, CtaFinal.tsx:71] El mordisco ya vive en 9/9 secciones de contenido (antes 4/9 faltaban) — verificado con grep, cobertura completa.
- [Problema.tsx, Agitacion.tsx, Faq.tsx, Solucion.tsx, Oferta.tsx, CtaFinal.tsx] El mordisco compacto se agrandó de 22x10px a 44x12px de forma consistente en 6 de las 7 repeticiones — Garantia queda como el único caso sin actualizar (ver defecto #1).

NOTA DE CIERRE: los 3 defectos de esta pasada son baratos (copiar un SVG, igualar dos números, cambiar una frase de copy) y no dependen de la Sesión 5 (app real) salvo el punto 3, que ya tiene el asset aprobado esperando montarse. Con los 3 resueltos, usabilidad y craft deberían cruzar o acercarse mucho al umbral (36/40 y 16/20) — no se requiere una 9ª ronda de refinamiento estético, solo cerrar estos 3 puntos concretos.
