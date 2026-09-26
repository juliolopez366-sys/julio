# VEREDICTO revisor-visual — onboarding
Fecha: 2026-09-25 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 30/40
Craft: 11/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Fondo y chips de toda la pantalla] Profundidad casi nula: el fondo es un fill plano de un solo tono y los chips solo se distinguen por un borde de 1px (sin sombra ni tinte), no hay superficie elevada ni hundida perceptible → agregar sombra sutil tintada de verde bajo el CTA/chip seleccionado y un tinte/gradiente muy leve detrás del bloque de título (coherente con "Profundidad: sombra sutil tintada de verde" de FICHA-ARTE.md, que hoy no se ve aplicada).
2. [Bloque de chips, paso 0-1-3-6] Los 4 chips aparecen todos juntos con la transición del contenedor padre, sin stagger individual (50-80ms entre ítems) → falta la animación baseline #1 ("entrada escalonada"); en Pregunta(), envolver cada Chip en su propio motion con `transition={{ delay: i * 0.06 }}`.
3. [Encima del título, cada pregunta] El "mordisco" (Mordisco en funnel-ui.tsx) mide 12×44px y usa el mismo verde del acento a bajo contraste con el fondo crema: en el screenshot se ve como un garabato suelto, no se lee como dispositivo de marca reconocible → agrandarlo (≥16px alto) o darle más contraste/posición para que funcione como firma visible, no como ruido.
4. [Zona superior e inferior de la pantalla, paso 0] Aun con `justify-center`, sigue habiendo ~165px de aire arriba (header→mordisco) y ~155px abajo (última opción→borde), casi 40% de los 797px totales sin ningún elemento de apoyo → sumar un elemento de contexto (micro-ilustración, dato o segunda línea de ayuda) en vez de solo repartir el vacío existente.
5. [Paleta de toda la app: verde bosque `#47593A` + crema `#F1E8D4`] Aunque la tipografía (Fraunces/Work Sans) difiere del ejemplo canónico vetado "Capítulo" (Petrona/Karla) y por eso no dispara el auto-cero de identidad, la familia cromática papel-cálido+tinta-verde queda muy cerca de esa referencia vetada → reforzar el mordisco (ver #3) y sumar una 2ª nota de color propia para blindar distintividad, tal como prevé la propia FICHA-ARTE.md.
