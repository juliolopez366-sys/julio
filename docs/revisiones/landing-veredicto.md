# VEREDICTO revisor-visual — landing
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 38/40
Craft: 20/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): FIEL
Veredicto: LISTA
Top defectos:
1. [AppPorDentro.tsx, frame 2 "La IA analiza" — carrusel-2-mecanismo.png] Sigue siendo la única de las 4 capturas del carrusel que no muestra ningún resultado del mecanismo (solo la píldora "Analizando ingredientes..."), a diferencia de frame 1/3/4 que sí exhiben dato o pantalla completa. No bloquea el umbral.
2. [AppPorDentro.tsx, frame 3 "Panel de patrones"] Reutiliza hero-mockup.png (la misma imagen del Hero) en vez de una captura del panel de patrones/historial que promete el label — única duplicación de asset en toda la página. No bloquea el umbral.

Nota sobre el cambio evaluado (logo real en header y footer — app/page.tsx const LOGO,
components/landing/Hero.tsx, components/landing/FooterLegal.tsx):

Se reemplazó el placeholder (cuadrito sólido bg-[var(--accent)] de 24px) por
`<img src="/logo-mark.png" alt="" className="size-6 rounded-[8px]" width={24} height={24} />`,
usado como prop `logo` TANTO en `Hero` (header, junto a "FoodScan") COMO en `FooterLegal`
(footer, junto a "FoodScan"). Mismo componente, misma constante, mismo tamaño (24px) en ambos
lugares — cero variantes accidentales (heurística 4 intacta).

Verificación del asset (public/logo-mark.png, visto a resolución nativa): isotipo real —
plato con hoja, cubiertos y marco de escaneo sobre fondo verde bosque en cuadrado
redondeado, fondo transparente fuera de la forma. Coincide con el sistema de FICHA-ARTE.md
(acento `#47593A` verde bosque, sin 2º acento, sistema duotono verde+crema) — no introduce
ningún color ni forma ajena a la ficha. A resolución nativa el recorte es limpio: sin halo
blanco ni resto de fondo mal cortado en el borde de la forma.

A 24px (tamaño real en pantalla, header y footer): el ícono se lee como una mancha verde
bosque con forma reconocible de app-icon; los detalles finos (líneas del tenedor, nervadura
de la hoja, esquinas del marco de escaneo) se pierden por la propia escala — comportamiento
esperado y aceptable para un logomark de 24px junto a texto, igual que cualquier favicon.
No hay distorsión de aspecto (width=24 height=24 explícitos evitan cualquier estiramiento y
fijan el espacio para CLS=0, igual que el placeholder anterior). El `rounded-[8px]` en el
`<img>` es más agresivo que el radio ya horneado en el propio PNG, pero como el margen fuera
de la forma horneada ya es transparente, ese recorte adicional cae sobre píxeles transparentes
— no se ve doble curva ni corte del ícono. No se detecta desalineación vertical: el logo
comparte la misma caja flex `items-center gap-2` que el placeholder anterior, así que el
baseline con el texto "FoodScan" no cambió.

Alt text `alt=""` es correcto (decorativo): el nombre "FoodScan" ya está en texto adyacente
inmediato en ambos usos, duplicarlo en el alt sería ruido redundante para lector de pantalla.

Efecto en el puntaje: el cambio es un refinamiento de identidad (Eje 3 — ya estaba en máximo
por el dispositivo ownable de la curva "mordisco" y la paleta papel+tinta verde; el logo real
refuerza esa identidad pero no la crea, así que el eje se mantiene en 4/4, craft 20/20). No
toca copy, oferta, garantía, FAQ ni CTA (copy se mantiene 19/20). No introduce fricción de
usabilidad ni inconsistencia (usabilidad se mantiene 38/40). El resto de las 10 secciones no
se tocó desde la 10ª pasada.

La pantalla completa SIGUE SIENDO LISTA: 38/40 ≥ 36, 20/20 ≥ 16, 19/20 ≥ 16.
