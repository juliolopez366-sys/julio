# VEREDICTO revisor-visual — landing
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 38/40
Craft: 20/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): FIEL
Veredicto: LISTA
Top defectos:
1. [AppPorDentro.tsx, frame 2 "La IA analiza" — carrusel-2-mecanismo.png] Sigue siendo la única de las 4 capturas del carrusel que no muestra ningún resultado del mecanismo (solo la píldora "Analizando ingredientes..."), a diferencia de frame 1/3/4 que sí exhiben dato o pantalla completa. No bloquea el umbral; corregir solo si existe un frame posterior del tour con el resultado ya revelado.
2. [AppPorDentro.tsx, frame 3 "Panel de patrones"] Reutiliza hero-mockup.png (la misma imagen del Hero) en vez de una captura del panel de patrones/historial que promete el label — única duplicación de asset en toda la página. No bloquea el umbral.

Nota sobre el cambio evaluado (§3 Agitación — components/landing/Agitacion.tsx):
Se agregó IconChip(tone="muted") a cada fila, idéntico al patrón ya usado en §2 Problema
(mismo componente compartido de ui.tsx: chip 44px, ícono SVG Lucide 22px, jamás emoji). El
cambio MEJORA el craft: antes §2 tenía ícono+card y §3 (inmediatamente después, mismo fondo
elevado, "un solo movimiento visual" por diseño) era párrafo de texto plano sin ícono — una
inconsistencia real entre dos secciones contiguas y visualmente hermanadas (heurística 4). Con
el cambio, §2 y §3 ahora comparten exactamente la misma fila (chip + texto + card elevada +
shadow-1), reforzando la lectura de "un solo bloque problema→costo" que el propio comentario
del componente busca. En el screenshot a 375px las filas se ven alineadas, sin recorte de
ícono, con el mismo radio de card y el mismo tono muted que en Problema — no se detectan
desencajes. Efecto en el puntaje: sube heurística 4 (Consistencia) de 3 a 4 y el eje 5
(Encaje óptico) de 4 a 4 confirmado sin nuevas fricciones; el total de usabilidad sube de
37/40 a 38/40 y craft se redondea a 20/20. El resto de las 10 secciones no se tocó y no
presenta cambios respecto a la revisión anterior (9ª pasada): el copy, la oferta, la garantía,
el FAQ y el CTA final se mantienen idénticos, por lo que el puntaje de copy no varía (19/20).
La pantalla completa SIGUE SIENDO LISTA: 38/40 ≥ 36, 20/20 ≥ 16, 19/20 ≥ 16.
