# ESTADO.md — Memoria del proyecto

## Fase actual
Sesión 4 (Onboarding, paywall, login/auth) COMPLETA y verificada. Próximo: Sesión 5
(app interna).

## Idea del usuario — FoodScan
Rastreador de detonantes digestivos con IA para personas con Síndrome del Intestino
Irritable (SII) / dieta FODMAP. El usuario toma una foto de su comida, la IA identifica
ingredientes de riesgo y los cruza con el registro de síntomas para encontrar el
alimento que causa el dolor.

Fuente: documento propio del usuario con investigación de mercado, avatar (Valeria, 32,
Gerente de Proyectos con SII), 10 dolores, 10 deseos, objeciones, lenguaje del cliente,
competidores probados y odiados (Cara Care, mySymptoms, Monash, diarios de papel).
Precio original del documento: US$6.99/mes o US$49.99/año.

## Posicionamiento — APROBADO (2026-09-23)
Diferenciador real: el MOTOR DE CORRELACIÓN (cruza cada síntoma con las comidas de las
últimas 48h y aísla el patrón real), no solo "foto en vez de texto" — eso ya lo hacen
FODMAP Snap y BiteRight. Ver investigación completa en el historial de commits.

Promesa central: "Ayudo a mujeres con Intestino Irritable a encontrar su detonante real
cruzando cada síntoma con lo que comieron en las últimas 48 horas — sin teclear, sin
adivinar y sin que su app las trate como un experimento científico agotador."

## Constitución del Producto — COMPLETA
- Primera victoria: foto de la primera comida → riesgo FODMAP instantáneo.
- MVP (3 funciones): (1) Foto → riesgo instantáneo, (2) Registro de síntoma en un toque,
  (3) Motor de correlación 8-48h. Fuera del MVP: recetas, plan de comidas, chat con
  nutricionista, comunidad.
- Límites ("la app nunca"): no reemplaza al médico/sugiere medicamentos · no inventa un
  patrón sin evidencia suficiente · no usa tono de culpa · no comparte datos de salud.

## Identidad visual — FICHA-ARTE.md APROBADA (2026-09-24), cosa juzgada
El usuario mandó una imagen de referencia real (app de recetas: verde bosque + crema,
curva orgánica, nav en píldora) → protocolo de RÉPLICA FIEL (16).
- Paleta: verde bosque `#47593A` (acento único) + crema `#F1E8D4` + fondo `#F6F2E6`
- Tipografía: Fraunces (display) + Work Sans (body)
- Dispositivo ownable: la curva "mordisco" + nav en píldora flotante
- Réplica en `replica-fiel.html`, tour en `vista-previa-app.html`, referencia archivada
  en `docs/referencias/referencia-usuario-1.webp`

## Avatar — FICHA-AVATAR.md APROBADA (2026-09-24), cosa juzgada
Basada en el documento de investigación del usuario (no en entrevistas directas — ver
Problemas conocidos). Nivel de consciencia: consciente de la solución / mercado
sofisticado. Objeción #1: "la IA no va a acertar con comidas de restaurante".

## App modelo — FICHA-MODELO.md APROBADA (2026-09-24)
**Cara Care** — revenue probado por 2 señales: financiamiento $16M (Series A $7M,
JJDC + Asabys) y adquisición por Bayer. Queja #1 de sus usuarios (que resolvemos):
"me muestra lo mismo en mis días buenos y malos" — de ahí nace el motor de correlación.

## Mercado — FICHA-MERCADO.md APROBADA (2026-09-24)
Precio $6.99/mes · $49.99/año. Pasarela: Hotmart. **Prueba: 7 días · Garantía: 15 días**
(15 > 7 ✓, verificado contra la política real de Hotmart: 7/15/21/30 días configurables).

## Sesión 3 — Página de ventas: COMPLETA ✅
- Nombre de la app: **FoodScan** (decisión del usuario)
- Stack: Next.js 16 (App Router) + TypeScript + Tailwind v4 + motion + lucide-react
  (decisión técnica — landing con SEO). Proyecto scaffoldeado en la raíz.
- Modelo de monetización: **onboarding-first anónimo** (decisión técnica — CTA →
  `/onboarding`, no directo a checkout; corregido en Sesión 4, ver Decisiones técnicas).
- Landing construida desde el KIT canónico (`plantillas-codigo/landing/` →
  `components/landing/`), tokens.css tematizado con FICHA-ARTE.md, copy marcado en
  `docs/copy/landing.md` (10 secciones, trazado a FICHA-AVATAR.md), compuesta en
  `app/page.tsx`.
- Hero y las 4 pantallas del carrusel "La app por dentro" usan capturas REALES
  recortadas de `vista-previa-app.html` (ya aprobado): `public/hero-mockup.png`,
  `public/carrusel-1-onboarding.png`, `public/carrusel-2-mecanismo.png`,
  `public/carrusel-4-planes.png`. Sin placeholders en toda la página.
- Verificado: `tsc --noEmit` ✓ · `npm run build` ✓ · dev server arranca limpio ✓ ·
  screenshot completo a 375px en `docs/revisiones/landing-375.png`.
- **Revisor visual: 37/40 usabilidad · 19/20 diseño · 19/20 copy · Veredicto: LISTA**
  (`docs/revisiones/landing-veredicto.md`, 2026-09-25 — 9ª pasada tras resolver 14
  defectos: jerarquía de títulos, dispositivo ownable repetido en las 9 secciones,
  focus-visible en todos los CTA, conteo animado de precios, capturas reales).
  2 notas cosméticas no bloqueantes quedan anotadas en el propio veredicto (frame
  "analizando" sin resultado revelado, y una imagen repetida entre Hero y carrusel).

## Sesión 4 — Onboarding, paywall, login/auth: COMPLETA ✅
- Rutas creadas: `app/onboarding/page.tsx` (8 pasos: 4 preguntas + 3 reconocimientos +
  pantalla de carga), `app/paywall/page.tsx`, `app/entrar/page.tsx` (login con magic
  link + Google OAuth, mock — backend real en Sesión 6). UI compartida en
  `components/onboarding/funnel-ui.tsx` (FunnelHeader, Chip, Mordisco, CtaPrimario,
  PantallaFunnel).
- Flujo: quiz de onboarding (anónimo) → paywall → login (`/entrar`) para persistir
  la compra. Ver corrección de la etiqueta de monetización abajo.
- **Onboarding — Revisor visual: 36/40 usabilidad · 16/20 craft · Veredicto: LISTA**
  (`docs/revisiones/onboarding-veredicto.md`, 7ª pasada — 6 rondas de fondo +1 de
  regresión tras un fix a un componente compartido). Historial: mordisco desbordando
  su badge, vacío vertical asimétrico, fondo plano sin profundidad, chips sin
  contraste, bordes contra la regla "sin bordes" de FICHA-ARTE, y un falso positivo
  real (el indicador de dev de Next.js contaminaba los screenshots — corregido con
  `devIndicators: false` en next.config.ts). Techo de craft aceptado: la paleta
  verde+crema es cosa juzgada (referencia real del usuario) y queda cerca de un
  ejemplo vetado del test anti-clon — no se puede subir más sin reabrir esa decisión.
- **Paywall — Revisor visual: 37/40 usabilidad · 16/20 craft · 19/20 copy ·
  Veredicto: LISTA** (`docs/revisiones/paywall-veredicto.md`, 9ª pasada). Historial:
  spinner de pago sin resolución (se agregó máquina de estados inicial/procesando/
  confirmado/error con reintento), inconsistencia de días entre el timeline y el
  footer, falta de nivel "hundido" de profundidad, sin lista de beneficios, jerarquía
  tipográfica sin alinear a la escala de FICHA-ARTE (26-34/18/15/12), tarjetas de
  plan con `border` contra la regla "sin bordes", titular con resalte de más de una
  palabra. Tras el veredicto LISTA se aplicó un pulido cosmético más (quitar un
  último `border-2` residual en un punto del timeline) sin relanzar el revisor —
  cambio puramente visual ya cubierto por los defectos no-bloqueantes que el propio
  veredicto listó.
  ⚠️ **Hallazgo de proceso importante**: tras un corte de sesión por límite de uso,
  el navegador de Playwright perdió el viewport de 375px al reiniciarse y 2 capturas
  se tomaron sin querer a ~1024px (escritorio). Un veredicto "LISTA" se emitió sobre
  esa evidencia inválida y se DESCARTÓ por completo al detectarse verificando las
  dimensiones reales del PNG. Lección para el futuro: tras cualquier reinicio de
  sesión/navegador, verificar el ANCHO REAL del archivo (no asumir) antes de invocar
  al revisor — un veredicto sobre evidencia incorrecta no cuenta aunque diga "LISTA".
- **Login (`/entrar`)** — sin revisor (pantalla secundaria, Regla 7). Medición +
  checklist completos: screenshots reales a 375px de los estados inicial y "enviado"
  (`docs/revisiones/entrar-375.png`, `entrar-enviado-375.png`), estado de error con
  reintento agregado (faltaba), foco de teclado agregado al botón "Reenviar".
- Verificado en las 3 pantallas: `tsc --noEmit` ✓ · `npm run build` ✓ · dev server
  limpio ✓.

## Próximo paso
Sesión 5 — App interna: `SECUENCIA-MAESTRA-CONSTRUCCION.md` (siguiente etapa) +
`03-PRINCIPIOS-APP-EXITOSA.md` + `15-PATRONES-UX.md`. Antes de codear, definir los
3 pilares técnicos (loop de retención, método de auth, modelo de datos + RLS) según
la Regla de Oro 6 de CLAUDE.md.

## Problemas conocidos
- **veredicto:landing** — el hook de cierre marca el veredicto de landing como
  "caducado" porque detecta archivos .tsx MÁS NUEVOS en el repo (app/onboarding,
  app/paywall, app/entrar) — pero esos archivos son de OTRAS pantallas (Sesión 4),
  no tocan ningún componente de la landing (components/landing/*, app/page.tsx no
  cambiaron desde el veredicto LISTA de landing). Es un falso positivo del chequeo
  por fecha de archivo, no un veredicto real desactualizado. Si se quiere limpiar la
  señal, re-lanzar el revisor sobre landing sin cambios reales no aporta nada nuevo.
- Los enlaces del footer (/privacidad, /terminos, /reembolsos, /aviso-ia) aún no
  existen como páginas — se construyen en Sesión 6 (legal) y Sesión 4 (auth/onboarding
  para /entrar y /onboarding). Esperado en esta etapa, no un bug.
- FICHA-MODELO.md: los campos de Meta Ads Library y Sensor Tower (MRR/top-grossing)
  quedaron NO ENCONTRADO — requieren búsqueda manual con acceso que esta sesión no tiene.
  No bloquea el avance; se completa si se decide invertir en ads pagados (34).
- FICHA-AVATAR.md no viene de entrevistas directas (44), sino del documento de research
  de mercado del usuario + reseñas públicas de competidores. Es evidencia real y citable,
  pero si en el futuro hay usuarias reales, conviene reforzarla con sus entrevistas.

## Decisiones técnicas (criterio del agente)
- Framework: Next.js 16 App Router (landing con SEO — regla del stack de 51).
- Monetización: **onboarding-first anónimo** en la práctica — el quiz de onboarding
  no pide registro, va directo a paywall; el registro/login (`/entrar`) ocurre
  DESPUÉS de elegir plan, para persistir la compra (corrige la etiqueta "registrado"
  usada al cerrar la Sesión 3, que no coincidía con el flujo construido).
- Idioma UI: español latino neutro, mono-idioma.
