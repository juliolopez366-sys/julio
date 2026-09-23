# ESTADO.md — Memoria del proyecto

## Fase actual
FLUJO B — Validación de idea (B2 completado, avanzando a B3 Constitución del Producto)

## Idea del usuario
Rastreador de detonantes digestivos con IA para personas con Síndrome del Intestino
Irritable (SII) / dieta FODMAP. El usuario toma una foto de su comida, la IA identifica
ingredientes de riesgo y los cruza con el registro de síntomas para encontrar el
alimento que causa el dolor.

Fuente: el usuario trajo un documento propio (PDF) con investigación ya hecha:
- Ficha de avatar completa: "Valeria, 32 años", Gerente de Proyectos con SII.
- 10 dolores, 10 deseos, objeciones, lenguaje exacto del cliente, competidores que
  probó y odió (Cara Care, mySymptoms, Monash, diarios de papel).
- Propuesta de valor (3 versiones + ganadora), 3 razones dominantes de compra con copy.
- Precio propuesto en el doc original: US$6.99/mes o US$49.99/año.

## Validación de mercado hecha por el agente (WebSearch, 2026-09-23)
- **Cara Care**: gratis, ~4.5-4.8★, miles de reseñas. Queja real: no exporta CSV, pierde
  datos al reinstalar, requiere tecleo manual.
- **mySymptoms**: 4.2★, +1M usuarios, de pago (trial 7 días). Tecleo manual, análisis de
  patrones pero sin fotos.
- **Monash FODMAP**: $7.99-12.99 pago único, 4.31★. Es una base de datos de alimentos,
  no un tracker de síntomas con IA.
- ⚠️ **HALLAZGO CLAVE — el mecanismo "foto + IA" YA EXISTE y YA ESTÁ EN ESPAÑOL:**
  - **FODMAP Snap / FODMAP Dieta Tracker** (App Store, disponible en español): foto, voz
    o texto → desglose de FODMAPs al instante + registro de síntomas con un toque.
  - **BiteRight** (inglés, gratis, 4.8★, 2800+ reseñas): IA detecta FODMAP en fotos y
    "tracks symptom patterns" para IBS/gut health.
  → Esto significa que "sacas una foto en vez de teclear" YA NO es el diferenciador
    ganador por sí solo — hay competencia directa haciendo exactamente eso, incluso en
    español. El verdadero hueco de mercado, según el propio avatar que trajo el usuario,
    es que esas apps "muestran los mismos alimentos en días buenos y malos" — es decir,
    fallan en el MOTOR DE CORRELACIÓN (cruzar comida de hace 24-48h con el síntoma de
    hoy, con confianza estadística, no solo mostrar una lista plana).

## Decisión de posicionamiento (a confirmar con el usuario en el reporte)
Diferenciador real no es "foto vs. texto" sino el MOTOR DE CORRELACIÓN INTELIGENTE:
cruzar cada síntoma con las comidas de las 8-48h previas y aislar el patrón real
(confianza / frecuencia), algo que Cara Care, mySymptoms y FODMAP Snap no resuelven bien
según las propias quejas de usuarios reales. Este ángulo se mantiene fiel a la
"Versión 1" de propuesta de valor del usuario pero se refuerza con el análisis temporal
como el verdadero mecanismo-wow, no solo la cámara.

## Próximo paso
Presentar Reporte de Validación (B2) al usuario → si aprueba, pasar a B3 (Constitución
del Producto: primera victoria, MVP, límites, promesa central).

## Decisiones técnicas (criterio del agente, no requieren aprobación del usuario)
(pendiente — se define en Sesión 1: framework, monetización, stack)
