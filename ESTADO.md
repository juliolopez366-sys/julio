# ESTADO.md — Memoria del proyecto

## Fase actual
FLUJO B — B3 Constitución del Producto (validación aprobada por el usuario 2026-09-23)

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

## Decisión de posicionamiento — APROBADA por el usuario (2026-09-23)
Diferenciador real no es "foto vs. texto" sino el MOTOR DE CORRELACIÓN INTELIGENTE:
cruzar cada síntoma con las comidas de las 8-48h previas y aislar el patrón real
(confianza / frecuencia), algo que Cara Care, mySymptoms y FODMAP Snap no resuelven bien
según las propias quejas de usuarios reales. Este ángulo se mantiene fiel a la
"Versión 1" de propuesta de valor del usuario pero se refuerza con el análisis temporal
como el verdadero mecanismo-wow, no solo la cámara.

Promesa central (borrador): "Ayudo a mujeres con Intestino Irritable a encontrar su
detonante real cruzando cada síntoma con lo que comieron en las últimas 48 horas, sin
tener que teclear ni adivinar."

## Constitución del Producto (B3) — en progreso
- Primera victoria APROBADA: registrar la primera comida con foto y ver al instante el
  nivel de riesgo FODMAP (aunque aún no haya datos suficientes para el patrón completo).
- MVP APROBADO (3 funciones):
  1. Foto → riesgo instantáneo (IA identifica ingredientes y nivel de riesgo FODMAP)
  2. Registro de síntoma con un toque (tipo + hora, sin formularios largos)
  3. Motor de correlación (cruza síntomas con comidas de 8-48h previas — el diferenciador)
- Fuera del MVP (a V2, no se construye ahora): recetas, plan de comidas, chat con
  nutricionista, comunidad.

- Límites APROBADOS ("la app nunca"): (1) nunca reemplaza al médico ni sugiere
  medicamentos, (2) nunca inventa un patrón sin evidencia suficiente — dice "aún no hay
  datos suficientes" en vez de adivinar, (3) nunca usa tono de culpa/regaño, (4) nunca
  comparte datos de salud del usuario con nadie.

Promesa central FINAL: "Ayudo a mujeres con Intestino Irritable a encontrar su
detonante real cruzando cada síntoma con lo que comieron en las últimas 48 horas —sin
teclear, sin adivinar y sin que su app las trate como un experimento científico
agotador."

B3 — CONSTITUCIÓN DEL PRODUCTO: COMPLETA.

## Próximo paso
B4 — Referencias visuales: hacer LA PREGUNTA DE REFERENCIA (PASO 0 del 54) antes de
proponer cualquier diseño.

## Decisiones técnicas (criterio del agente, no requieren aprobación del usuario)
(pendiente — se define en Sesión 1: framework, monetización, stack)
