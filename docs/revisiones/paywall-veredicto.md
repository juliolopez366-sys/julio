# VEREDICTO revisor-visual — paywall
Fecha: 2026-09-26 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 33/40
Craft: 15/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Top defectos:
1. [Tarjetas de plan Anual/Mensual + divisor de la card de beneficios] FICHA-ARTE.md es explícita y es cosa juzgada: "Bordes: ninguno — todo por color plano y curvas, no por líneas" y en el brand kit final "sin bordes" — pero el código dibuja `border-[1.5px] border-[var(--accent)]` en el plan seleccionado, `border` gris en el no seleccionado, y una línea divisoria (`h-px bg-...`) entre el timeline y la lista de beneficios. → Fix: quitar los bordes; diferenciar el plan activo solo con fondo `--chip-bg` + sombra tintada + un check, tal como exige la réplica fiel de la referencia.
2. [Titular, "Se acabó cancelar planes por miedo a un mal día"] Se resaltan en acento 4 palabras incluida una preposición ("cancelar planes por miedo"), violando la regla de énfasis de conversión (1-3 palabras clave, nunca artículos/preposiciones). → Fix: acotar el resalte a la palabra núcleo del dolor, ej. solo "miedo" o "cancelar planes".
3. [Card combinada timeline + "qué incluye"] 6 filas (3 nodos de timeline + 3 ítems de beneficios) conviven en un solo bloque separadas solo por un hairline sutil, sin un rótulo que distinga "cuándo te cobran" de "qué obtienes" — un usuario que escanea rápido puede leerlo como una sola lista de 6 puntos y perder el dato del día de cobro. → Fix: anteponer un micro-título ("Qué incluye tu plan") antes de la lista de beneficios para separar los dos bloques de información.
4. [Texto secundario en toda la pantalla: "Todo tu plan, sin límites", "Se cobra $49.99/año", subtítulo] `--text-secondary` (#6B6B54) sobre `--surface`/`--bg` (#F1E8D4/#F6F2E6) da ~4.3:1, por debajo del mínimo AA de 4.5:1 para texto de 15px (no es "texto grande"). → Fix: oscurecer `--text-secondary` o subir el texto a ≥18px/bold donde deba quedarse en ese tono.
5. [Enlaces "Ahora no" / "Restaurar compra" vs "¿No llega? Escríbenos" / "Reintentar"] Todos son acciones de texto de igual jerarquía funcional, pero solo "Escríbenos" y "Reintentar" llevan `underline`; "Ahora no" y "Restaurar compra" no tienen ninguna señal de interactividad más que el color, rompiendo la consistencia de "mismo componente = misma apariencia" (heurística 4). → Fix: aplicar el mismo tratamiento (underline u otra affordance) a los cuatro enlaces de texto.
