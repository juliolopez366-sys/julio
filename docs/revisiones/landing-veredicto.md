# VEREDICTO revisor-visual — landing
Fecha: 2026-09-25 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 34/40
Craft: 19/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): FIEL
Veredicto: NO LISTA
Top defectos:
1. [AppPorDentro.tsx / seccion "Así se ve por dentro"] Los 4 frames del carrusel son placeholders grises con solo el nombre de la pantalla ("Registro de comida", "Panel de patrones"...) mientras el Hero, 3 secciones arriba, ya muestra un screenshot real y pulido de la app. Un visitante de trafico pagado que llega justo a la seccion diseñada para darle PRUEBA del producto encuentra 4 tarjetas vacias de contenido real, justo despues de haber visto que el Hero si tenia una imagen real: la inconsistencia de nivel de acabado es visible sin buscarla y es el unico bloque que sigue pareciendo "en construccion" en toda la pagina. Fix: recortar 4 capturas reales de vista-previa-app.html (el mismo tour ya aprobado en FICHA-ARTE.md) del mismo modo que se hizo para el Hero, y montarlas via el prop `src` de cada `FrameCarrusel`.
