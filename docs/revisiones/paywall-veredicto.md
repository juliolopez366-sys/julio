# VEREDICTO revisor-visual — paywall
Fecha: 2026-09-25 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 26/40
Craft: 12/20
Copy (si vende): 15/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos: 1) [Escala tipografica de toda la pantalla] se usan 7 tamanos distintos (12/13/14/15/16/22/28px) sin alinear a los 4 niveles declarados en FICHA-ARTE.md (display 26-34 / title 18 / body 15 / label 12) -> title deberia ser 18px y no repartirse en 15-16px entre timeline, cards y CTA; consolidar a los tokens de la ficha. 2) [Mensaje tras tocar "Empezar mis 7 dias gratis"] "Ya casi - estamos activando el pago seguro. Vuelve pronto..." es un callejon sin salida: no ofrece reintento, no dice cuanto tardar ni da una accion siguiente -> agregar una salida clara (aviso por correo, volver, o un tiempo estimado). 3) [El mismo mensaje, en codigo] el <motion.p> que aparece tras el tap no lleva aria-live="polite" -> un lector de pantalla no anuncia el cambio de estado -> agregarlo. 4) [Fondo general vs. cards de timeline/planes] el tono de "surface" es casi identico al "bg" de la pantalla (cremas muy proximos), la profundidad declarada en FICHA-ARTE ("sombra sutil tintada de verde bajo elementos flotantes") no se aplico a las cards, solo al CTA -> subir el contraste tonal bg/surface o anadir la sombra tintada a las cards. 5) [Icono "mordisco" junto al overline] el dispositivo ownable de la ficha (la curva scallop) queda reducido a un trazo de 44x12px casi invisible, sin protagonismo real en esta pantalla -> darle mas presencia (p.ej. como separador entre el timeline y las cards) o no forzarlo aqui.
