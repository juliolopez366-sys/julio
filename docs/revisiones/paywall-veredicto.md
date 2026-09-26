# VEREDICTO revisor-visual — paywall
Fecha: 2026-09-25 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 32/40
Craft: 14/20
Copy (si vende): 16/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Detalle usabilidad: h1:3 h2:3 h3:3 h4:3 h5:3 h6:3 h7:3 h8:3 h9:2 h10:3
Detalle craft: jerarquía:3 profundidad:2 identidad:3 movimiento:3 encaje:3
Detalle copy: idea:3 especificidad:3 emoción:3 oferta:3 acción:4

Verificación de los 5 fixes reportados de la 3ra ronda:
1. CTA sin resolución (h1) → RESUELTO. La máquina de 3 estados (`inicial`/`procesando`/`confirmado`,
   L14/23/31-35) resuelve el spinner infinito en 1400ms y muestra un panel `role="status"
   aria-live="polite"` con mensaje + link de contacto (L133-147). Ya no hay callejón sin salida.
2. Ausencia de "Garantía de 15 días" en copy → ACEPTADO POR REGLA DE NEGOCIO, no se penaliza.
   Verificado contra FICHA-MERCADO.md §4: la regla dura ("no se declara un número distinto en el
   copy de marketing") es cosa juzgada y está bien aplicada — el copy usa correctamente "7 días
   gratis" (L150, L154) sin el número de garantía. No es un defecto.
3. Headline mecanismo-primero → RESUELTO. H1 ahora es la escena de dolor de FICHA-AVATAR.md
   ("Se acabó cancelar planes por miedo a un mal día", L61-63) con el mecanismo como refuerzo
   subordinado (L64-66). Sube el eje emoción de copy a 3/4.
4. Inconsistencia de tamaños (14/15/16px) → RESUELTO. Body unificado a 15px, títulos de timeline
   y nombres de plan a 18px, labels a 12px — coincide con la escala de FICHA-ARTE.md línea 42
   (verificado en L60,64,102,107,123,141,144,153-163,189-190). Sube jerarquía de craft a 3/4.
5. Mordisco aislado → nota aceptada tal cual, no se penaliza como defecto grave (sigue siendo un
   ícono reconocible y consistente entre onboarding/paywall/login); pesa levemente sobre el eje
   identidad pero no lo baja de 3.

Los 4 fixes reales están bien resueltos y suben el puntaje (usabilidad 30→32, copy 15→16), pero
la pantalla SIGUE sin cruzar el umbral doble: usabilidad 32/40 (falta 4) y craft 14/20 (falta 2).
No es un problema de "afinar", son dos gaps nuevos/pendientes no cubiertos por esta ronda de fixes.

Top defectos:
1. [app/paywall/page.tsx L26-35, máquina EstadoCta] No existe rama de error en el flujo de pago:
   la máquina solo tiene `inicial → procesando → confirmado`, sin manejar un rechazo/timeout real
   (que SÍ va a pasar con pagos reales de Hotmart — tarjeta rechazada, red caída). Heurística 9
   (errores claros y con solución) queda en 2/4 porque el estado no existe ni siquiera simulado.
   Fix: agregar un cuarto estado `'error'` con mensaje qué-pasó + qué-hacer ("No pudimos procesar
   el pago — revisa los datos de tu tarjeta o intenta de nuevo") y CTA de reintento.
2. [app/paywall/page.tsx L154 vs L172-174, TimelineTrial] Inconsistencia entre el timeline
   ("Día 5 — te avisamos") y el texto bajo el CTA ("te avisamos 1 día antes del cobro" = día 6):
   son dos días distintos para el mismo evento. Baja claridad de oferta y consistencia. Fix:
   unificar al mismo día en ambos textos (si el aviso es el día 5, decir "te avisamos 2 días antes
   del cobro"; si es 1 día antes, cambiar el nodo del timeline a "Día 6 — te avisamos").
3. [componentes globales, eje profundidad] Falta el nivel "hundido" de los 3 niveles de
   profundidad que exige la rúbrica (base con tinte + elevado + hundido): en toda la pantalla solo
   hay fondo con gradiente radial (base) y cards con sombra tintada (elevado); ningún área luce
   hundida/inset. Fix: usar un contenedor con sombra interior sutil para el detalle "Se cobra
   $49.99/año" (L107) o el resumen del plan seleccionado, para completar el sistema de 3 niveles.
4. [app/paywall/page.tsx, sección de planes L86-129] La oferta no lista qué incluye el acceso
   ("todo tu plan, sin límites" es la única mención, dentro del timeline, no junto al plan). Un
   paywall de venta necesita 2-3 bullets de beneficios con chips SVG (no emoji) cerca de las cards
   de plan para que "qué recibo" sea instantáneo sin tener que inferirlo del timeline. Fix: agregar
   una mini-lista de 2-3 beneficios (ej. "Registro por foto", "Tu detonante en días, no meses",
   "Reporte para tu doctor") entre el timeline y las cards de plan.
5. [app/paywall/page.tsx L93] El badge "MÁS POPULAR · 2 MESES GRATIS" está en 11px, fuera de la
   escala de labels de FICHA-ARTE (12px) — inconsistencia menor mm de escala tipográfica que un
   ojo entrenado detecta al medir. Fix: subir a 12px o documentar la excepción de badge en
   FICHA-ARTE si se necesita más chico por espacio.
