# VEREDICTO revisor-visual — Hoy (M0, app interna FoodScan)
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/hoy-375.png
Usabilidad: 28/40
Craft: 14/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): FIEL
Veredicto: NO LISTA

Top defectos:
1. [Lista "Hoy registraste 1 comida" — FilaComida] Las filas usan la MISMA tarjeta visual (mismo radius, mismo shadow, mismo padding) que los botones de preset de SheetNuevaComida, que SÍ son tappables — pero FilaComida es un `<div>` sin onClick ni rol de botón (fila-comida.tsx). El usuario aprende en el sheet que esa tarjeta se toca y luego la encuentra "muerta" en Hoy → viola la regla 11 (todo elemento con apariencia interactiva hace algo) y h4 consistencia. Fix: si no hay acción de detalle todavía, quitarle el shadow/hover de tarjeta interactiva o darle un onClick real (ver detalle de la comida).
2. [Sección "Hoy registraste 0 comidas" — estado no visible en el screenshot pero sí en código, page.tsx L149-158] Cuando `comidasHoy.length === 0` solo queda el label y una lista vacía sin ilustración ni CTA — pantalla parcialmente muda en ese estado (h10). Fix: agregar 1 línea de empty-state ("Aún no registras nada hoy — tu próxima comida aparecerá aquí").
3. [Área "hoja" crema, todo el contenido bajo el mordisco] El fondo de esta sección es `var(--bg)` totalmente plano — no hay el 3er nivel "hundido" que pide el sistema de profundidad de FICHA-ARTE (solo hay base plano + tarjetas elevadas, falta una superficie hundida real en esta pantalla). Baja EJE 2 (profundidad) a 2/4. Fix: dar a la card de insight o a la lista un tono `--hundido` sutil en vez de compartir el mismo `--chip-bg`/`--surface` que los botones elevados.
4. [CTA secundario "Registrar un síntoma" + presets de comida] No hay ningún atajo de "repetir la última comida" pese a ser una app de registro diario de alta frecuencia — cada registro obliga a re-elegir entre 6 presets o recordar ingredientes. Baja h7 (flexibilidad/eficiencia) a 2/4. Fix: agregar un chip "Repetir: Pan tostado con miel" sobre los 2 CTA para el caso de uso más común (mismo desayuno).
5. [Header con racha "6 días"] El contador anima de 0→6 en cada montaje de la pantalla (useContadorAnimado usa `anterior.current = 0` fijo al montar, no solo en el primer registro global) — cada vez que el usuario vuelve a "Hoy" ve la racha "recalcularse" desde cero, lo cual con el tiempo se siente como ruido/decoración vacía más que como feedback real de un cambio de estado (roza h1 sobreactuado). Fix: animar solo cuando `rachaActual` cambie respecto al valor previamente persistido (ej. en localStorage), no en cada mount.
