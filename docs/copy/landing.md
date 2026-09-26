# Copy marcado — Página de ventas FoodScan

> Cada pieza se traza a FICHA-AVATAR.md (Valeria — SII/FODMAP). Marcadores: `[acento]…[/acento]`
> resalta la palabra que vende, `[b]…[/b]` marca peso semántico secundario.
> Modelo de monetización: **onboarding-first registrado** (registro gratis → onboarding →
> paywall) — decisión técnica, documentada en ESTADO.md. CTA → `/onboarding`.

## 1. Hero
- h1Marked: `Encuentra tu [acento]detonante real[/acento] en días, no en años`
- subtitleMarked: `Toma una foto de tu comida y descubre [b]tu patrón real[/b] en 48 horas.`
- ctaLabel: `Encontrar mi detonante gratis`
- socialProof: `7 días gratis · cancela cuando quieras`
- visualPlaceholderSugerencia: `captura de la pantalla principal mostrando el riesgo de una comida`

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
- antesDespues: labelAntes `Antes` · antes `Un diario de papel con meses de datos sin ninguna conclusión.`
  · labelDespues `Después` · despues `Un patrón claro, con el ingrediente exacto y el nivel de confianza.`

## 5. La app por dentro
- tituloMarked: `Tu próxima comida, [acento]sin miedo[/acento]`
- frames (con captura real, recortada de vista-previa-app.html — FICHA-ARTE.md):
  1. `Así empiezas` · Bienvenida (/carrusel-1-onboarding.png)
  2. `Fotografías tu plato` · La IA analiza (/carrusel-2-mecanismo.png)
  3. `Tu detonante más probable` · Panel de patrones (/hero-mockup.png)
  4. `Prueba gratis antes de pagar` · Planes (/carrusel-4-planes.png)
- ctaLabel: `Encontrar mi detonante gratis`

## 6. Oferta
- tituloMarked: `Empieza gratis. Sigue por [acento]$0.14 al día[/acento]`
- trialDias: `7`
- stack:
  - Acceso completo al Motor de Detonante Real (12 meses) · `$84`
  - Reportes ilimitados para tu médico · `$29`
  - Guía "Entiende tus resultados FODMAP" · `$19`
  - totalTachado: `$132` · nota: `Hoy: $4.17/mes (se cobra $49.99/año)`
- anual: badge `MÁS POPULAR` · precioMes `$4.17` · totalAnual `Se cobra $49.99/año`
  · ahorro `2 meses gratis` · descomposicionDia `menos de $0.14 al día`
  · ctaLabel `Encontrar mi detonante gratis` (mismo verbo del hero, regla del kit)
  · features: `Foto → riesgo instantáneo con IA` · `Registro de síntomas en un toque`
    · `Motor de correlación de 48 horas` · `Reportes para tu médico`
- mensual: precioMes `$6.99` · ctaLabel `Elegir mensual` · mismas features + `Cancelas cuando quieras`

## 7. Garantía
- nombre: `la Garantía del Primer Patrón`
- condicionMarked: `Si en 7 días no ves un patrón más claro sobre tu detonante, escribes un correo y te devolvemos todo. Sin preguntas.`
- pisoLegal: `Respaldada por la garantía Hotmart de 7 días`

## 8. FAQ
1. `¿La IA realmente va a acertar con comidas de restaurante?` → `Con platos compuestos (como una salsa con ajo oculto), el Motor marca el riesgo probable y tú confirmas en un toque — [b]nunca te deja a ciegas[/b].`
2. `¿Voy a perder más tiempo corrigiendo a la IA que registrando yo misma?` → `Corregir un ingrediente toma un toque. No vuelves a escribir la comida completa como en un diario tradicional.`
3. `¿En qué se diferencia de Cara Care o mySymptoms?` → `Ellas registran; nosotros [b]cruzamos tus síntomas con tus comidas de las últimas 48 horas[/b] para mostrarte el patrón, no solo una lista plana.`
4. `¿Cuánto tardo en ver mi primer patrón?` → `Desde el primer día ves el riesgo de cada comida. El patrón con confianza estadística aparece cuando acumulas unos días de registro.`
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
