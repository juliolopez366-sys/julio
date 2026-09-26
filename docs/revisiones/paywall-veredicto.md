# VEREDICTO revisor-visual — paywall
Fecha: 2026-09-25 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 26/40
Craft: 14/20
Copy (si vende): 16/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos: 1) Trust row inferior dice "Garantía de 15 días", lo cual contradice explícitamente FICHA-MERCADO.md (que ordena NO declarar un número de garantía distinto de "7 días" en copy de marketing, para evitar confundir trial con garantía) -> quitar el número "15 días" del trust row. 2) El mensaje inline del CTA expone jerga interna ("se conecta en la Sesión 6") a copy que vera un usuario real -> reescribir en su idioma ("Ya casi, activando el pago seguro"). 3) El boton "X" superior navega a /onboarding mientras "Ahora no" navega a "/": dos salidas con destinos distintos confunden el modelo de "cerrar" -> unificar destino. 4) Las cards de plan (Anual/Mensual) son <button> planos sin whileTap, a diferencia del CTA -> envolver en motion.button con whileTap scale 0.97 como en Chip. 5) Ninguna animacion Motion respeta prefers-reduced-motion (solo scroll-behavior lo usa en tokens.css) -> aplicar useReducedMotion() a las transiciones.
