# VEREDICTO revisor-visual — landing
Fecha: 2026-09-25 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 37/40
Craft: 19/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): FIEL
Veredicto: LISTA
Top defectos:
1. [AppPorDentro.tsx, frame 2 "La IA analiza" — carrusel-2-mecanismo.png] La captura muestra un rectángulo degradado casi vacío con solo la píldora "Analizando ingredientes..." — es la única de las 4 capturas que no exhibe ningún resultado ni dato del mecanismo (a diferencia de frame 1 con la pregunta real, frame 3 con el riesgo "Medio · ajo" y frame 4 con el paywall completo). Un ojo entrenado nota que es el eslabón más débil del carrusel justo en el paso que vende el mecanismo de IA. Fix: si existe un frame posterior del tour con el resultado ya revelado (ingredientes detectados + nivel de riesgo), úsalo en vez del estado "analizando"; si no existe, es aceptable dejarlo (representa honestamente el estado de carga) pero no es prioritario corregir antes de publicar.
2. [AppPorDentro.tsx, frame 3 "Panel de patrones"] Reutiliza hero-mockup.png (la misma imagen del Hero) en vez de una captura distinta del panel de patrones/historial que promete el label ("Tu detonante más probable" ya se vio arriba en el Hero) — un usuario que mira el Hero y luego el carrusel puede notar la repetición exacta de imagen. No bloquea el umbral, pero es la única duplicación de asset en toda la página.
