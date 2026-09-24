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

## Identidad visual (Sesión 2) — en progreso
El usuario eligió inicialmente "que el agente proponga" y se le presentó A/B/C
(`direcciones-abc.html`), PERO luego mandó una imagen de referencia real (mockup de
app de recetas: verde bosque + crema pergamino, curva orgánica, nav en píldora) diciendo
"me encanta este estilo". Por protocolo (16), una referencia dada por el usuario ES
CONTRATO y reemplaza el A/B/C: se hizo RÉPLICA FIEL, no interpretación libre.

FICHA-ARTE.md creada con la extracción completa (ver archivo). Resumen:
- Paleta: verde bosque #47593A (acento único) + crema pergamino #F1E8D4 + fondo #F6F2E6
- Tipografía: Fraunces (display) + Work Sans (body)
- Radio grande/orgánico, sombra casi ausente, sin bordes
- Dispositivo ownable: la curva "mordisco" entre la foto de comida y la hoja crema +
  nav inferior en píldora flotante
- Réplica construida en `replica-fiel.html` (raíz), imagen de referencia archivada en
  `docs/referencias/referencia-usuario-1.webp` e incrustada en base64 en la réplica
  para que se vea siempre sin depender de rutas locales.
- Encaja MUY bien con el mecanismo real de la app: el hero es literalmente la foto de
  comida que el usuario toma (el mecanismo del MVP), no una foto decorativa.

Se generó además EL TOUR DE LA APP (`vista-previa-app.html`): onboarding, mecanismo
(foto→IA), pantalla principal y paywall, con el mismo estilo. Screenshots guardados en
`docs/revisiones/replica-fiel-375.png` y `docs/revisiones/vista-previa-app-375.png`.
Se creó también `FICHA-MODELO.md` (app modelo: Cara Care — revenue probado por
financiamiento de $16M + adquisición por Bayer; ver ficha para el plano completo y el
eje de diferenciación).

FICHA-ARTE.md: APROBADA (2026-09-24) — réplica fiel + tour de 4 pantallas confirmados
por el usuario. Identidad visual es COSA JUZGADA desde ahora.

FICHA-AVATAR.md: creada y APROBADA (2026-09-24) con los datos del documento de
investigación original del usuario (Valeria, dolores, deseos, objeciones, VoC, nivel de
consciencia "consciente de la solución" / mercado sofisticado). Cosa juzgada.

## Sesión 3 — Página de ventas: EN PROGRESO
- Nombre de la app decidido por el usuario: **FoodScan**
- Stack: Next.js 16 (App Router) + TypeScript + Tailwind v4 + motion + lucide-react
  (decisión técnica — landing con SEO, ver 51-STACK-PINEADO.md). Proyecto scaffoldeado
  en la raíz (app/, components/, package.json).
- Landing construida desde el KIT canónico (`plantillas-codigo/landing/` →
  `components/landing/`), tokens.css tematizado con FICHA-ARTE.md, copy marcado en
  `docs/copy/landing.md` (10 secciones, trazado a FICHA-AVATAR.md), compuesta en
  `app/page.tsx`. Modelo de monetización: **onboarding-first registrado** (decisión
  técnica — CTA → `/onboarding`, no directo a checkout).
- Verificado: `tsc --noEmit` ✓ · `npm run build` ✓ · dev server arranca limpio ✓ ·
  screenshot completo a 375px en `docs/revisiones/landing-375.png`.
- Revisor visual (`revisor-visual`) invocado para landing (pantalla que vende, gate
  obligatorio) — veredicto pendiente en `docs/revisiones/landing-veredicto.md`.

## Próximo paso
Con el segundo veredicto del revisor: si sigue NO LISTA solo por los placeholders
honestos del hero/carrusel (ver Problemas conocidos), se acepta y se cierra la Sesión 3
igual — esos dos defectos dependen de que exista la app real (Sesión 5). Si aparece algo
NUEVO que sí sea corregible hoy, se corrige antes de cerrar. Luego → Sesión 4
(onboarding, paywall, login/auth).

## FICHA-MERCADO.md — creada (2026-09-24)
Precio $6.99/mes · $49.99/año (del documento original del usuario). Pasarela: Hotmart.
**Prueba elegida: 7 días · Garantía elegida: 15 días** (garantía 15 > prueba 7 ✓ — regla
dura del 18 cumplida, verificado contra la política real de Hotmart: 7/15/21/30 días
configurables). Resuelve el gate `garantia` del hook de cierre.

## Problemas conocidos (actualizado)
- Los enlaces del footer (/privacidad, /terminos, /reembolsos, /aviso-ia) y los
  destinos de los CTA (/onboarding, /entrar) aún no existen como páginas — se
  construyen en Sesión 4 y 6. Es esperado en esta etapa, no un bug.
- **veredicto:landing** — el revisor-visual marcó la landing como "NO LISTA" por 2
  defectos que dependen de la app real, todavía inexistente: (1) el visual del Hero es
  un placeholder honesto (no hay screenshot real de "foto de comida + riesgo detectado"
  porque la app interna no se ha construido — eso es la Sesión 5), y (2) el carrusel de
  "La app por dentro" (4 frames) son placeholders con solo el nombre de la pantalla por
  la misma razón. Se decide POSPONER ambos a la Sesión 5, cuando existan capturas reales
  que montar — es la secuencia correcta del SO (no se simulan screenshots falsos de una
  app que no existe). Sí se corrigieron los defectos accionables hoy: verbo de CTA
  unificado y dispositivo ownable "mordisco" agregado al placeholder del Hero para
  diferenciar la paleta de la dirección "Capítulo" vetada.

## Problemas conocidos
- FICHA-MODELO.md: los campos de Meta Ads Library y Sensor Tower (MRR/top-grossing)
  quedaron NO ENCONTRADO — requieren búsqueda manual con acceso que esta sesión no tiene.
  No bloquea el avance; se completa si se decide invertir en ads pagados (34).
- FICHA-AVATAR.md no viene de entrevistas directas (44), sino del documento de research
  de mercado del usuario + reseñas públicas de competidores. Es evidencia real y citable,
  pero si en el futuro hay usuarias reales, conviene reforzarla con sus entrevistas.

## Decisiones técnicas (criterio del agente, no requieren aprobación del usuario)
(pendiente — se define en Sesión 1: framework, monetización, stack)
