# Copy marcado — Página de ventas FoodScan

> Cada pieza se traza a FICHA-AVATAR.md (Valeria — SII/FODMAP). Marcadores: `[acento]…[/acento]`
> resalta la palabra que vende, `[b]…[/b]` marca peso semántico secundario.
> Modelo de monetización: **onboarding-first registrado** (registro gratis → onboarding →
> paywall) — decisión técnica, documentada en ESTADO.md. CTA → `/onboarding`.

## 1. Hero
- h1Marked: `Encuentra tu [acento]detonante real[/acento] en días, no en años`
- subtitleMarked: `Solo tomas la foto. Cruzamos cada síntoma con tus [b]últimas 48 horas[/b] de comidas.` (48 h es la ventana que revisa el Motor, no el tiempo hasta ver un patrón)
- ctaLabel: `Encontrar mi detonante gratis`
- socialProof: `7 días gratis · cancela cuando quieras`
- visual: `<DemoAnalisis />` — foto de tacos con salsa cremosa (`public/hero-tacos*.webp`, generada con IA) + el análisis tal como lo devuelve `/api/analizar-comida`: «Así se ve un análisis» · `Tacos de pollo con salsa cremosa` · ingredientes · `Riesgo alto` por `ajo y cebolla` · `La salsa no dice «ajo». La IA lo marca igual: prefiere avisarte de más que dejarte a ciegas.` · `Orientación de IA, no un diagnóstico` (→ /aviso-ia)

## 2. Problema
- titulo: `¿Te suena?`
- preguntas (icon Lucide · textoMarked):
  1. AlertCircle · `¿Te hinchas de la nada sin saber qué lo causó?`
  2. Clock · `¿Cancelas planes por miedo a no llegar a un baño?`
  3. XCircle · `¿Ya probaste apps de registro y las abandonaste enseguida?`
  4. UtensilsCrossed · `¿Sientes que comer se volvió un experimento agotador?`

## 3. Agitación
- frases:
  1. `Cada mes sigues sin saber qué alimento te ataca, aunque comas "con cuidado".`
  2. `En un año, seguirás en el mismo punto: [acento]meses de datos que nadie sabe usar[/acento].`
  3. `Otra app de registro manual no lo arregla: [b]más tecleo no es más respuesta[/b].`
- contraste: labelHoy `Hoy` · hoy `Comidas "seguras" que ya no lo son, y ningún patrón claro.`
  · labelFuturo `En 6 meses, si nada cambia` · futuro `Seguirás adivinando y cancelando planes por miedo.`

## 4. Solución
- tituloMarked: `Tu patrón, [acento]resuelto en días[/acento]`
- mecanismo: `el Motor de Detonante Real`
- bigIdeaMarked: `No te faltan datos: te falta quien los cruce. El Motor de Detonante Real conecta cada síntoma con lo que comiste en las [b]últimas 48 horas[/b].`
- pasos (exactamente 3):
  1. Toma la foto · `Fotografías tu plato — la IA identifica los ingredientes de riesgo al instante.`
  2. Registra el síntoma · `Un toque cuando algo te ataca: tipo y hora, sin formularios largos.`
  3. Descubre tu patrón · `El Motor cruza tus últimas 48 horas y te muestra tu detonante real.`
- visual: `<Cruce48h />` (reemplaza el antes/después) — EJEMPLO rotulado de un síntoma y sus 48 h previas:
  Lun 13:10 Tacos con salsa cremosa · ajo, cebolla / Lun 20:30 Arroz con pollo / Mar 08:00 Avena con fresas /
  Mar 13:30 Pasta al pomodoro · ajo, trigo / Mar 19:00 Hinchazón fuerte → `4 de 5` comidas con ajo terminaron en
  síntoma dentro de las 48 horas siguientes · confianza 80 % (misma regla que `calcularCorrelacion`: ≥2 veces, ≥50 %).

## 5. La app por dentro
- tituloMarked: `Tu próxima comida, [acento]sin miedo[/acento]`
- frames (con captura real, recortada de vista-previa-app.html — FICHA-ARTE.md):
  1. `Así empiezas` · Bienvenida (/carrusel-1-onboarding.png)
  2. `Fotografías tu plato` · La IA analiza (/carrusel-2-mecanismo.png)
  3. `Tu día de un vistazo` · Hoy (/hero-mockup.png)
  (se quitó el frame de Planes: la captura mostraba $4.99, un precio que no existe)
- ctaLabel: `Encontrar mi detonante gratis`

## 6. Oferta
- tituloMarked: `Empieza gratis. Sigue por [acento]$0.14 al día[/acento]`
- trialDias: `7`
- stack: ELIMINADO (2026-10-14) — vendía reportes y una guía que no existen, con valores inventados.
- anual: badge `RECOMENDADO` (no "MÁS POPULAR": no hay usuarios todavía) · precioMes `$4.17`
  · totalAnual `Se cobra $49.99/año` · ahorro `Casi 5 meses gratis (ahorras 40%)` (coincide con el paywall)
  · descomposicionDia `menos de $0.14 al día`
  · ctaLabel `Empezar mis 7 días gratis` (más corto: el del hero se partía en 2 líneas dentro de la card)
  · features: `Foto → riesgo instantáneo con IA` · `Registro de síntomas en un toque`
    · `Motor de correlación de 48 horas` · `Tu historial de comidas y síntomas, siempre guardado`
- mensual: precioMes `$6.99` · ctaLabel `Elegir mensual` · mismas features + `Cancelas cuando quieras`
- notaPago: `Pago seguro con Hotmart · no se cobra nada durante los 7 días de prueba`

## 7. Garantía
- nombre: `Garantía del Primer Patrón`
- condicionMarked: `Si en 7 días no ves un patrón más claro sobre tu detonante, escribes un correo y te devolvemos todo. Sin preguntas.`
- pisoLegal: `Además, Hotmart te respalda con 15 días de garantía desde tu compra` (15 días = lo configurado en Hotmart, FICHA-MERCADO)

## 8. FAQ
1. `¿La IA realmente va a acertar con comidas de restaurante?` → `Con platos compuestos, la IA marca como riesgo probable lo que suele esconderse en salsas, como ajo o cebolla en polvo: [b]prefiere avisarte de más que dejarte a ciegas[/b].` (la app NO tiene "confirmar/corregir en un toque")
2. `¿Voy a perder más tiempo con la app que con un diario?` → `No escribes nada: tomas la foto, revisas el resultado y lo guardas con un toque. Si la foto no salió bien, la repites.`
3. `¿En qué se diferencia de Cara Care o mySymptoms?` → `Ellas registran; nosotros [b]cruzamos tus síntomas con tus comidas de las últimas 48 horas[/b] para mostrarte el patrón, no solo una lista plana.`
4. `¿Cuánto tardo en ver mi primer patrón?` → `El riesgo de cada comida lo ves desde la primera foto. El patrón aparece cuando un ingrediente se repite: lo comiste al menos 2 veces y en la mitad o más hubo síntomas en las [b]48 horas siguientes[/b].`
5. `¿Qué pasa si no me sirve?` → `Tienes 7 días de prueba gratis y la Garantía del Primer Patrón: [b]un correo y te devolvemos todo[/b].`

## 9. CTA final
- h2Marked: `Vuelve a confiar en tu [acento]cuerpo[/acento]`
- futurePacingMarked: `Imagina aceptar una cena sin pánico, tomar la foto, y saber en segundos si es segura para ti.`
- ctaLabel: `Encontrar mi detonante gratis`
- recap: `Garantía del Primer Patrón · 7 días gratis`
- psMarked: `PS: cruzamos cada síntoma con lo que comiste en las últimas 48 horas para encontrar tu detonante real — no otra lista de alimentos "seguros" que dejan de serlo. Hoy entras con 7 días gratis y la Garantía del Primer Patrón.`

## 10. Footer legal
- appName: `FoodScan`
- soporteEmail: `soporte@foodscan.app` (placeholder — se define el dominio real en Sesión 6)
- enlaces: Privacidad `/privacidad` · Términos y Condiciones `/terminos` · Reembolsos `/reembolsos`
  · Aviso de IA `/aviso-ia`
