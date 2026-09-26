# VEREDICTO revisor-visual — paywall
Fecha: 2026-09-25 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 36/40
Craft: 15/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Detalle usabilidad: h1:4 h2:4 h3:4 h4:3 h5:4 h6:4 h7:3 h8:3 h9:4 h10:3
Detalle craft: jerarquía:3 profundidad:3 identidad:3 movimiento:3 encaje:3
Detalle copy: idea:4 especificidad:3 emoción:4 oferta:4 acción:4

Verificación de los 5 fixes reportados de la 4ta ronda:
1. Rama de error del CTA → RESUELTO de verdad. `EstadoCta` ahora tiene 4 estados
   (`inicial`/`procesando`/`confirmado`/`error`, L14), con panel `role="alert" aria-live="assertive"`
   (L171-189), mensaje qué-pasó ("No pudimos activar tu prueba gratis...") + qué-hacer (botón
   "Reintentar" que vuelve a `procesando`, L184-187). Sube h9 de 2 a 4/4.
2. Inconsistencia Día 5 vs "1 día antes" → RESUELTO. Timeline dice "Correo 2 días antes del cobro"
   (L215) y el footer dice "te avisamos antes del cobro" sin número (L196) — cero contradicción
   posible porque ya no hay dos números que puedan desalinearse. Bien resuelto.
3. Nivel "hundido" ausente → RESUELTO. El pill "Se cobra $49.99/año" usa
   `shadow-[inset_0_1px_3px_...]` (L128) sobre `bg-[var(--bg)]`, una sombra hacia adentro real y
   visible en el screenshot (el pill se ve levemente hundido respecto a la card que lo contiene).
   Sube profundidad de 2 a 3/4 — no a 4 porque es la ÚNICA instancia de "hundido" en toda la
   pantalla; un sistema "ejemplar" repetiría el recurso en al menos un segundo lugar (ej. el resumen
   del plan seleccionado antes del CTA) para que se lea como sistema y no como parche puntual.
4. Lista de beneficios → RESUELTA y bien ejecutada: 3 bullets con chips Lucide (Camera/Activity/
   ClipboardCheck) en contenedores de 40px con `chip-bg` (L87-98), cero emojis, radius consistente
   con el resto del kit. Sube identidad de 3 a 3 (se mantiene: ayuda a la claridad de oferta más que
   a la identidad ownable — el "mordisco" sigue siendo el único dispositivo realmente distintivo).
5. Badge a 12px → RESUELTO, verificado en L114 (`text-[12px]`), coincide con la escala de labels de
   FICHA-ARTE. Sube encaje de 3 a 3 (ya no hay el defecto puntual, pero no sube más porque persiste
   el eje 3 de abajo).

Los 5 fixes están genuinamente resueltos — no son maquillaje. Usabilidad cruza el umbral por primera
vez (36/40) y copy sube a 19/20 (ningún eje ≤2). El bloqueo que queda es CRAFT: 15/20, todavía 1
punto bajo el mínimo de 16. No es un problema nuevo grave — es el mismo patrón de las rondas
anteriores (varias eje quedan en "bien, ojo entrenado" sin que ninguno llegue a "ejemplar"), y esta
vez el gate lo decide un solo punto.

Top defectos (los que faltan para cruzar el gate de craft):
1. [eje movimiento, toda la pantalla] Fuera del stagger de entrada (delays 0.08/0.12/0.16) y el
   `whileTap` de los botones, no hay NINGUNA otra animación baseline: los precios "$4.17" y "$6.99"
   aparecen estáticos (podrían contar de 0 al valor, animación baseline #2), el ahorro del plan
   anual no se anima ni se destaca con movimiento, y no hay ninguna transición que distinga el
   momento en que cambia el plan seleccionado (el `transition-colors` es instantáneo en la lógica
   pero no hay ningún micro-feedback extra al tocar una card que no sea el scale genérico). Fix:
   anima el precio del plan seleccionado con un conteo corto (150-250ms) al montar y al cambiar de
   plan, para que el eje de movimiento deje de depender solo de la entrada de página.
2. [eje jerarquía, timeline vs cards de plan] Los títulos del timeline ("Hoy — acceso completo",
   "Día 5 — te avisamos") y los nombres de plan ("Anual", "Mensual") comparten el mismo tamaño/peso
   (18px semibold) — al entrecerrar los ojos, el timeline compite visualmente con las cards de plan
   por el rol de "segundo nivel", cuando el objeto que de verdad importa en un paywall es la
   decisión de plan. Fix: bajar los títulos del timeline a 16px o quitarles el semibold, dejando el
   18px semibold reservado para los nombres de plan (el objeto dominante real de la pantalla).
3. [components/onboarding/funnel-ui.tsx vs app/paywall/page.tsx L40-48, consistencia] El paywall
   NO usa el `FunnelHeader` compartido (logo-link o back-arrow + barra de progreso) que sí usan
   onboarding y login — construye su propio header inline con un botón `X` custom. Visualmente el
   botón de 44px en círculo es similar, pero es un componente distinto mantenido por separado: si
   mañana cambia el estilo del header del funnel, este archivo no lo hereda. Fix: agregar una
   variante `variant="cerrar"` a `FunnelHeader` (ícono X + sin barra de progreso) y usarla aquí en
   vez de duplicar el markup.
4. [copy, badge "MÁS POPULAR · 2 MESES GRATIS" L114-116 vs precios L124-149] La matemática del
   badge no reconcilia con los precios mostrados: $6.99/mes × 12 = $83.88/año a precio mensual;
   pagar $49.99/año equivale a ahorrarse ~4.8 meses, no "2 meses gratis" (el claim en realidad
   SUBESTIMA el ahorro real, pero un usuario que hace la cuenta con la calculadora del celular
   encuentra un número que no cuadra, y eso resta credibilidad al mismo nivel que si lo
   sobrestimara). Fix: cambiar el copy a algo verificable con la matemática real, ej. "Ahorra 40%"
   o "$4.17/mes vs $6.99/mes" (ya está, dejar que el número hable) sin el claim de "2 meses gratis".
5. [estructura general, fullPage] El contenido total (header + hero + timeline + 3 beneficios + 2
   cards de plan + CTA + 3 líneas de microcopy + link de soporte) ocupa casi el doble de un viewport
   de 812px — es contenido justificado (no hay relleno), pero un usuario promedio hace scroll largo
   antes de llegar al CTA y a "Ahora no"/"Restaurar compra". No es un defecto de "aire muerto" sino
   de densidad acumulada entre rondas de fixes (cada fix agregó un bloque). Fix: evaluar comprimir
   timeline + beneficios en un único bloque visual (ej. el timeline ya implica "acceso completo hoy"
   — los 3 bullets de beneficios podrían vivir DENTRO de la card del timeline en vez de ser una
   sección aparte) para acortar el scroll sin quitar información.
