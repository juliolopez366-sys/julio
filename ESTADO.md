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
Sesión 5 — App interna en curso (ver "Sesión 5 — App interna (en curso)" abajo).
Pendiente: confirmar si se relanza el revisor de "Tu Patrón" (2ª pasada) o se sigue
con otra pantalla; luego cerrar Sesión 5 formalmente y pasar a Sesión 6 (servicios
externos).

## Sesión 5 — App interna (en curso)
- Hoy: LISTA (37/40 · 16/20, 5ª pasada del revisor-visual).
- Historial y Cuenta: sin revisor completo (pantallas secundarias, Regla 7), medición
  + checklist manual sin errores.
- Tu Patrón: 1ª pasada del revisor dio 28/40 · 12/20 (NO LISTA). Se aplicaron 5 fixes
  (header sin ícono para consistencia, stagger real en la evidencia, CTA en el
  empty-state, nivel "hundido" en la sección de evidencia, `FilaComida` con
  `line-clamp-2` en vez de truncate) y se commiteó (`ee8df74`). Falta relanzar el
  revisor-visual (2ª pasada) — el usuario aún no confirma si seguir con esto.
- Se agregaron tokens semánticos nuevos a `tokens.css` (`--exito`, `--alerta`,
  `--error`) que estaban en FICHA-ARTE.md pero nunca se habían llevado a CSS; NO se
  tocó `--accent-2` (ya usado por Hero.tsx de la landing).

## Elevación de la página de ventas (post-Sesión 3, pedido explícito del usuario)
El usuario pidió revisar que las 10 secciones canónicas de la landing tuvieran los
íconos/elementos visuales que exige la escaneabilidad mobile (52/55): 9 de las 10 ya
los tenían (Problema con IconChip, Solución con pasos numerados, Oferta/Garantía con
checkmarks y escudo, FAQ en acordeón, etc.) — solo **Agitación** (§3, "el costo de
seguir igual") era texto plano sin ícono. Se le agregó un ícono Lucide por frase
(mismo patrón visual que Problema, tipo `FraseAgitacion`), y se actualizaron las
2 páginas que la usan (`app/page.tsx`, `components/landing/EJEMPLO-page.tsx`).
Verificado: `tsc --noEmit` ✓ · `npm run build` ✓ · dev sin errores de consola (un
error visto en un tab de navegador quedó obsoleto — persistía en una pestaña vieja
con caché; una pestaña nueva no lo reproduce). Screenshot re-tomado y verificado a
375×8241px (`docs/revisiones/landing-375.png`).
- **Revisor visual (10ª pasada): 38/40 usabilidad (subió de 37 — Consistencia 3→4) ·
  20/20 craft (subió de 19) · 19/20 copy (sin cambio) · Fidelidad: FIEL · Veredicto:
  LISTA** (`docs/revisiones/landing-veredicto.md`). 2 defectos cosméticos NO
  bloqueantes anotados en el propio veredicto: el frame 2 del carrusel
  ("La IA analiza") no muestra el resultado revelado (solo el estado "Analizando…"),
  y el frame 3 reutiliza `hero-mockup.png` (misma imagen que el Hero) en vez de una
  captura propia del panel de patrones — quedan como mejora futura, no bloquean.

## Logo real (pedido explícito del usuario)
El usuario aportó una imagen de referencia de su isotipo (mockup de ícono de app:
plato+hoja+cubiertos+marco de escaneo, sobre fondo verde bosque en cuadrado
redondeado, con el wordmark "FOODSCAN" debajo del ícono dentro del mismo cuadrado).
Se procesó con `sharp` (Node): se quitó el fondo crema/blanco (canal alfa por
distancia de color), se recortó SOLO la porción del ícono (sin el wordmark, para
tener un isotipo limpio usable a tamaño chico en headers) y se generaron:
- `public/logo-mark.png` (128×128, transparente) — usado inline en el header de la
  landing (`Hero`), el footer (`FooterLegal`) y el header compartido de
  onboarding/paywall (`FunnelHeader` en `funnel-ui.tsx`), reemplazando el cuadrito de
  color placeholder que había en los tres lugares.
- `app/icon.png` (256×256, transparente) y `app/apple-icon.png` (180×180, fondo crema
  `#F6F2E6` — iOS aplica su propia máscara) — favicon/ícono de app vía las convenciones
  de archivo especial de Next.js (se sirven automáticamente en `/icon.png` y
  `/apple-icon.png`, confirmado en `npm run build`).
Verificado: `tsc --noEmit` ✓ · `npm run build` ✓ · logo visible sin errores de consola
en landing (header y footer) y onboarding (header del funnel). Como el logo toca 2
de las 4 pantallas del dinero (landing y onboarding), se relanzó el revisor-visual en
ambas. El paywall NO se ve afectado: su header usa la variante "cerrar" (X) de
`FunnelHeader`, no la variante con el logo.
- **Landing: 38/40 · 20/20 · 19/20 copy — LISTA** (sin cambio vs. la pasada anterior;
  el logo no introdujo defectos nuevos). Nota no bloqueante: el `rounded-[8px]` que
  tenía el `<img>` era CSS redundante (el propio PNG ya trae la esquina redondeada) —
  se quitó.
- **Onboarding: 37/40 · 18/20 — LISTA** (sin cambio vs. la pasada anterior). Nota real:
  a 24px el detalle interno del isotipo (hoja + cubiertos + marco) se perdía y se leía
  como una mancha sin forma reconocible — se subió el logo de 24px a 32px (`size-6` →
  `size-8`) en las 3 ubicaciones (Hero, FooterLegal, FunnelHeader) para mejorar la
  legibilidad del detalle, dentro del tap-target de 44px del header del funnel.
  Cambio de bajo riesgo (tamaño dentro de la escala de espaciado del 14, mismo slot,
  sugerido por el propio revisor) — no se relanzó una 3ª pasada por esto.

## Onboarding: pulido con demo Aha (pedido explícito del usuario, basado en análisis externo)
El usuario compartió un análisis de otra IA (Gemini) sobre cómo mejorar el onboarding
y pidió compararlo con el ya construido e incorporar lo que aplicara. Comparación:
- Fase 1 (preguntas de diagnóstico): ya estaba cubierta — las 3 preguntas existentes
  tocan los mismos ejes (preocupación, momento del dolor, intentos previos).
- Fase 2 (momento "Aha" — romper la objeción con una demo visual, no con texto): NO
  existía. Se implementó `AhaSimulacion` (nuevo paso en `app/onboarding/page.tsx`,
  insertado entre la pregunta de "intentos previos" y su reconocimiento) — simula el
  escaneo de un plato compuesto y revela "Ajo oculto en la salsa detectado. Alto en
  FODMAP." Esto ejecuta la objeción #1 YA documentada en FICHA-AVATAR.md ("la IA no
  va a acertar con comidas de restaurante" → respuesta: "demo real del análisis sobre
  un plato compuesto"), que hasta ahora solo se rompía con texto, nunca visualmente.
- Fase 3 (promesa de tiempo concreta): se agregó una 5ª línea a la pantalla de carga
  final. Primer intento: "Tus primeros patrones probables: en 5 a 7 días de registro"
  — el revisor lo marcó como promesa NO sustentada (riesgo real para un avatar ya
  "quemada" por apps con promesas incumplidas). Corregido: "Tu patrón aparece apenas
  un ingrediente se repita en tus días malos" — anclado al mecanismo real, sin cifra
  inventada.
- Fase 4 (paywall "difuminado" — dejar usar la cámara gratis 3-4 comidas antes de
  pagar): el usuario decidió explícitamente NO explorarlo — es un cambio de modelo de
  monetización (reabriría la decisión "onboarding-first anónimo", cosa juzgada) y el
  paywall actual ya midió 37/40. Se queda como está.
- `PASOS_TOTALES` pasó de 8 a 9; se renumeraron los pasos internos (sin cambiar
  contenido de las preguntas/reconocimientos existentes); el timeout antes de navegar
  a `/paywall` subió de 5200ms a 6300ms para que la 5ª línea de carga alcance a verse.
- Verificado: `tsc --noEmit` ✓ · `npm run build` ✓ · flujo completo probado clic por
  clic (Playwright) desde la pregunta 1 hasta el redirect a `/paywall`, sin errores de
  consola. Screenshot verificado a 375×812px (`docs/revisiones/onboarding-375.png`).
- **1ª pasada del revisor sobre la pantalla nueva: 30/40 · 16/20 — NO LISTA.** 5
  defectos: (1) la demo recreaba la objeción #1 en vez de desarmarla — afirmaba
  detección absoluta por foto sola, sin explicar el puente ni conectar con la
  confirmación de 1 toque; (2) la promesa "5-7 días" sin sustento (ver arriba, ya
  corregida); (3) usaba `--alerta` (reservado a riesgo confirmado) sin marcar que era
  un ejemplo simulado; (4) el CTA nacía deshabilitado ~1.6s sin poder saltar (viola la
  regla de CTA vivo); (5) no llevaba el chip "Mordisco" que sí llevan las demás
  pantallas de contenido (quiebre de consistencia). Los 5 se corrigieron: copy nuevo
  ("Probable ajo oculto... Confírmalo en un toque si lo sabes"), línea de carga
  anclada al mecanismo, etiqueta "Ejemplo" en la tarjeta, CTA siempre tocable (tocar
  durante "Analizando…" salta al resultado en vez de esperar), chip Mordisco agregado.
  Se relanzó el revisor.
- **2ª pasada del revisor: 37/40 · 18/20 — LISTA** (`docs/revisiones/onboarding-veredicto.md`,
  fidelidad FIEL). Confirma que los 5 defectos anteriores quedaron resueltos. 5 notas
  cosméticas NO bloqueantes quedan anotadas en el propio veredicto: la demo no nombra
  la ventana de 48h (podría conectarse mejor con el resto del flujo), el padding
  superior de la etiqueta "Ejemplo" queda algo apretado, el label del CTA en estado
  "Analizando…" mezcla dos ideas, y dos notas menores de tono/opacidad — quedan como
  mejora futura, no bloquean. Con esto, la pantalla "Así funciona" y el onboarding
  completo quedan LISTOS.

## Problemas conocidos
- **veredicto:landing** — el hook de cierre marca el veredicto de landing como
  "caducado" porque detecta archivos .tsx MÁS NUEVOS en el repo (antes: app/onboarding,
  app/paywall, app/entrar; luego también: app/(app)/hoy, historial, cuenta de Sesión 5;
  ahora también: app/onboarding/page.tsx por el rediseño de esta sesión) — pero esos
  archivos son de OTRAS pantallas, no tocan ningún componente de la landing
  (components/landing/*). Es un falso positivo del chequeo por fecha de archivo, no un
  veredicto real desactualizado. NOTA: sí hubo un cambio REAL en Agitacion.tsx en esta
  sesión (se le agregó ícono a cada frase) — para eso se relanzó el revisor-visual
  completo, ver "Elevación de la página de ventas" arriba; el veredicto se sobrescribió
  con el resultado de esa pasada. NOTA 2: también hubo un cambio real en `app/page.tsx`
  (logo real en header/footer, ver "Logo real" arriba) — SÍ se relanzó el revisor
  (38/40 · 20/20 · 19/20, LISTA). Después de esa pasada se aplicó un ajuste cosmético
  más (subir el logo de 24px a 32px, sugerencia del propio revisor) sin relanzar una
  3ª pasada — mismo criterio ya aplicado al `border-2` de paywall en Sesión 4: es un
  ajuste dentro de la misma categoría de defecto que el revisor ya evaluó y aceptó
  como no bloqueante, no introduce nada nuevo.
- **veredicto:onboarding** — resuelto: se agregó la demo "Así funciona" (ver
  "Onboarding: pulido con demo Aha" abajo), 1ª pasada NO LISTA (30/40), se corrigieron
  los 5 defectos, 2ª pasada LISTA (37/40 · 18/20). Después se relanzó otra vez por el
  cambio de logo real en el header (también LISTA, 37/40 · 18/20, sin defectos
  nuevos). Igual que en landing (NOTA 2 arriba), tras esa pasada se subió el logo de
  24px a 32px (sugerencia del propio revisor por legibilidad) sin relanzar una 4ª
  pasada — mismo criterio del `border-2` de paywall: ajuste dentro de una categoría de
  defecto ya evaluada y aceptada como no bloqueante.
- **veredicto:onboarding (histórico)** — LISTA (36/40 · 16/20, 7ª pasada, detalle
  completo en la
  sección "Sesión 4" arriba). El hook marca este veredicto como "caducado" por el
  mismo falso positivo de fecha de archivo que landing (arriba): detecta archivos de
  OTRAS pantallas (paywall, y ahora también hoy/historial/cuenta de Sesión 5) más
  nuevos, pero el código propio de onboarding no cambió desde el veredicto LISTA.
- **veredicto:paywall** — LISTA (37/40 · 16/20 · 19/20 copy, 9ª pasada, detalle
  completo en la sección "Sesión 4" arriba). El hook lo marca "caducado" por DOS
  razones distintas, ninguna bloqueante: (1) motivo real ya aceptado — después del
  veredicto LISTA se aplicó un último ajuste cosmético (quitar un `border-2` residual
  en el timeline, mismo tipo de defecto que ya se había corregido en las tarjetas de
  plan y que el propio veredicto listaba como no bloqueante); no introduce nada nuevo
  que el revisor no haya evaluado ya en esa categoría. (2) falso positivo de fecha de
  archivo — el hook ahora también cita `app/(app)/hoy`, `historial`, `cuenta`
  (Sesión 5) como "más nuevos", pero son pantallas DISTINTAS que no tocan
  `app/paywall/page.tsx` ni ningún componente del paywall. No se considera necesario
  relanzar una 10ª pasada por ninguno de los dos motivos.
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

### Los 3 pilares técnicos de Sesión 5 (app interna) — Regla de Oro 6
- **Loop de retención (modelo Hooked):**
  - Gatillo: interno ("¿esto me va a hacer daño?" antes de comer) + externo (push a la
    hora de comida más frecuente del usuario, se define en Sesión 6 con backend real).
  - Acción central: registrar una comida (foto simulada) en 1-2 toques desde "Hoy".
  - Recompensa variable: riesgo instantáneo (predecible) + de vez en cuando el Motor de
    Detonante Real revela un candidato nuevo de detonante (variable — no en cada registro,
    solo cuando el patrón cruza el umbral de confianza).
  - Inversión: el historial de comidas+síntomas alimenta directamente el motor de
    correlación — pasa el test binario de 24 ("si borro tu historial, ¿la app de mañana
    es idéntica?" → NO, porque el patrón desaparece y hay que reconstruirlo).
  - Número mágico (hipótesis, sin datos reales aún): **4 comidas registradas en las
    primeras 48 horas** — coincide con la ventana de correlación del propio mecanismo.
    Se valida cuando haya usuarios reales (36).
  - Primera semana: D1 = primera foto + resultado instantáneo (primera victoria) ·
    D2 = racha visible por primera vez · D3-D4 = primer insight de correlación (aunque
    sea parcial: "necesitas 1 más para ver tu patrón") + se ofrece passkey tras el
    primer éxito · D7 = hito emocional + mejor momento para upgrade a anual.
  - Ritual diario (M0): pantalla "Hoy" — 1 CTA de cámara para la próxima comida + acceso
    de 1 toque a registrar síntoma + estado del día (comidas registradas, racha).
- **Método de auth:** magic link/OTP por email como primario + Google OAuth como
  secundario (ya construido en `/entrar`, jerarquía Hotmart-first de 26). Passkey se
  ofrece DESPUÉS de la primera victoria (D1-D3), no en el primer login — el hook de UI
  para ese prompt se agrega en Sesión 5, la implementación real (WebAuthn) espera a
  tener backend en Sesión 6.
- **Modelo de datos + RLS (se implementa en Supabase en Sesión 6; el esquema se decide
  ahora para que la Sesión 5 lo simule fielmente con `localStorage`):**
  - `comidas`: id, user_id, foto_url, ingredientes_riesgo (jsonb), nivel_riesgo
    (bajo/medio/alto), registrado_en.
  - `sintomas`: id, user_id, tipo, intensidad, registrado_en.
  - `correlaciones`: id, user_id, ingrediente_sospechoso, confianza, comidas_relacionadas
    (jsonb), generado_en — resultado cacheado del motor, se recalcula al registrar.
  - `perfiles`: user_id (FK a auth.users), plan, dias_meta, canal, racha_actual,
    racha_maxima, congeladores_disponibles.
  - RLS en las 4 tablas: policy `(select auth.uid()) = user_id` en `using` Y `with
    check`, columna `user_id` indexada (patrón ya usado en el ejemplo de passkeys de 26).
- **Arquitectura de IA (30):** el análisis de foto de comida es candidato a job
  asíncrono (imagen → Storage → cola → modelo de visión → resultado) cuando exista
  backend real. Mientras tanto (Sesión 5, sin Supabase/IA real todavía — eso es
  Sesión 6 paso 3 de la secuencia maestra), se SIMULA client-side con una heurística
  determinista sobre palabras clave FODMAP y con `localStorage` para persistencia
  (regla del stack: "app desplegada sin backend → localStorage").
- **Secciones de la app interna (3-5, Regla de Oro 0 + Paso 5 de la secuencia
  maestra):** Hoy (protagonista: registrar la próxima comida) · Historial
  (protagonista: comidas y síntomas pasados, buscables) · Tu Patrón (protagonista: el
  Motor de Detonante Real — la sección que vende la promesa central) · Cuenta
  (protagonista: plan, racha, ajustes).
