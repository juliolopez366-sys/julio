# ESTADO.md — Memoria del proyecto

## Fase actual
Sesión 6 (servicios externos) en curso. Paso 1/7 (GitHub) LISTO. Paso 2/7 (Supabase)
LISTO: base de datos + auth real + gate de sesión. Paso 7/7 (Hotmart, el webhook)
adelantado fuera de orden a pedido del usuario — ver bloque dedicado más abajo.
Paso 5 (Resend) y paso 6 (dominio propio) siguen pendientes; el usuario eligió
conectar Hotmart ya mismo y dejar Resend/dominio para después (el correo de acceso
funciona igual, solo con la plantilla genérica de Supabase hasta que Resend exista).

Paso 3/7 (IA real) LISTO en código y en producción (claves ya configuradas por el
usuario, tanto en `.env.local` como en Vercel): migración 0003 (ai_calls + bucket
privado comidas-fotos) aplicada; lib/supabase/admin.ts (cliente service_role, solo
servidor); app/api/analizar-comida (BFF con Claude Haiku 4.5, tool-use forzado,
circuit-breaker de 20 análisis/día/usuario); lib/foodscan-data.ts reescrito de
localStorage a Supabase real (se quitó la semilla falsa — un usuario nuevo ve estados
vacíos honestos); hoy/historial/patron/cuenta migrados a las funciones async;
components/app/sheet-nueva-comida.tsx ahora tiene el flujo real de foto (tomar/subir →
analizar → revisar → guardar en Storage + BD); cuenta/page.tsx cierra sesión de
verdad (antes solo redirigía sin signOut). tsc y build limpios.

Paso 4/7 (Vercel) LISTO: app publicada de verdad, ahora en **`foodscan-murex.vercel.app`**
(proyecto renombrado de "julio" a "foodscan"; dominio viejo `julio-murex.vercel.app`
sigue redirigiendo automático al nuevo — no se rompió nada). Verificado por mí mismo en
el navegador: landing y `/entrar` cargan sin errores en producción. Costó varias rondas
de diagnóstico: primero 0 despliegues (nunca se había subido el código de la sesión —
se hizo commit+push), luego el build falló 2 veces por variables de entorno no
guardadas para Production (confusión de UI con los campos Key/Value), luego el login
real falló por el Site URL/Redirect URLs de Supabase Auth todavía apuntando solo a
localhost (se agregaron las URLs de producción — primero las de `julio-murex`, luego se
repitió el mismo paso para `foodscan-murex` tras el cambio de nombre). ⚠️ Quedó un
proyecto Vercel DUPLICADO sin usar ("julio-ro5p") creado por accidente durante el
diagnóstico — nunca se le dio Deploy, se puede borrar cuando el usuario quiera
(Settings → General → Delete Project), no es urgente.

**Paywall conectado a Hotmart real:** el botón "Empezar mis 7 días gratis" en
app/paywall/page.tsx ya no simula nada — redirige de verdad a los links de checkout que
el usuario creó en Hotmart (mensual/anual), según el plan elegido. Se quitó el estado
`estadoCta` simulado (procesando/confirmado/error) por ser código muerto una vez
conectado el link real. tsc y build locales limpios.

**Incidente de seguridad (30 sep, repetido):** un comando de diagnóstico (`awk` sobre
`.env.local`) volvió a imprimir las 4 claves completas en texto plano — mismo tipo de
error que ya había pasado antes en la sesión. Causa raíz encontrada: `.env.local` había
perdido el prefijo `NOMBRE=` de sus 4 líneas (quedaron solo los valores pelados), por
eso además el build de Next.js fallaba (`@supabase/ssr: ... required`). Se reparó el
archivo con un script que reconstruye el nombre de cada variable por patrón (decodifica
el JWT para distinguir anon de service_role, detecta la URL y el prefijo `sk-ant-`) sin
volver a imprimir ningún valor. El usuario ya roto ANTHROPIC_API_KEY y
SUPABASE_SERVICE_ROLE_KEY (la anon key no hacía falta, es pública por diseño) y quedó
pendiente de actualizar esos dos valores nuevos tanto en `.env.local` como en las
Environment Variables de Vercel, y relanzar el deploy. **Próximo paso inmediato:**
confirmar que el usuario actualizó las claves rotadas en ambos lugares y que el
redeploy en Vercel quedó "Ready"; luego sí probar login + análisis de foto de punta a
punta en `foodscan-murex.vercel.app` desde su propio navegador.

**Bloqueante para probar login real en local (no es un bug del código):** el servidor de
desarrollo (`localhost:3000`) solo es alcanzable desde el navegador embebido de Claude,
NO desde el navegador real del usuario en su propio Windows — por eso veía "localhost
inaccesible". Además, el enlace mágico de Supabase se "gasta" solo (visto en los logs de
auth: un login se registra ~15s después de enviarse el correo, sin que el usuario haya
hecho clic) — probablemente el escaneo de seguridad de Gmail abre el enlace de un solo
uso antes que la persona. Se intentó verificar el flujo completo generando un enlace vía
la API admin de Supabase (`/auth/v1/admin/generate_link`) y completando la sesión a mano;
el paso final (inyectar la cookie de sesión ya válida en el navegador de prueba) fue
bloqueado por un guardarrail de seguridad de Claude Code ("Credential Materialization") —
correctamente, porque es indistinguible de fabricar una sesión sin pasar por el login
real. No se debe reintentar ese rodeo. **Ambos problemas (localhost inalcanzable +
fragilidad del enlace mágico con Gmail) se resuelven solos al publicar en paso 4/7
(Vercel)**: ahí el dominio será público y alcanzable por cualquier navegador, y aunque el
enlace mágico se lo siga "comiendo" el escaneo de Gmail ocasionalmente, al menos la
página de destino sí cargará (ahora mismo fallaba en dos frentes a la vez). Próximo paso
inmediato: paso 4/7 (Vercel) — y ahí sí probar login + análisis de foto de punta a punta
en un navegador real.

## Checkpoint (paso 4/7 — Vercel, en curso)
Se le pidió al usuario importar el repo `juliolopez366-sys/julio` desde vercel.com/new
(mi conector MCP de Vercel no puede crear el proyecto sin un `teamId` real, y
`list_teams`/`list_projects` devuelven vacío — cuenta personal sin equipo, o el import
del usuario quedó en una cuenta distinta a la que ve mi conector). El usuario dijo
"listo" pero el conector sigue sin ver ningún proyecto. Pendiente: que el usuario
confirme qué vio exactamente en pantalla tras darle "Deploy" (¿se construyó? ¿pidió
crear cuenta? ¿no encontró el repo?) para diagnosticar antes de seguir. No se ha tocado
nada de Vercel todavía — solo diagnóstico.

Actualización (28 sep): se confirmó que el usuario creó una cuenta NUEVA de Vercel
("Julio" / Hobby, sin equipo — coincide con que mi conector MCP tampoco ve equipos). Se
distrajo primero con la pantalla de 2FA (se le dijo "Skip" está bien) y luego casi crea
un proyecto de plantilla genérica ("Next.js Boilerplate" de vercel/vercel) en vez de
importar su propio repo — corregido a tiempo, no se llegó a crear. Está ahora en
"Import Git Repository" → eligiendo el proveedor GitHub. Sigue sin tocarse nada real
todavía; próximo paso: que aparezca y elija su repo `juliolopez366-sys/julio`, deje
Framework/Root/Build por defecto y le dé Deploy. Después reviso con el conector MCP de
Vercel que quedó conectado a ESTE proyecto (puede que el conector siga sin ver nada si
quedó autorizado a una cuenta/GitHub App distinta — si pasa, toca reautorizar el
conector, no crear el proyecto por otro lado).

Actualización (29 sep): proyecto **"julio"** (prj_Afg09UudQaPuXK4fIYmnRXpLTL9A, team
team_BhNf0CeqU81iNPweNnhJqayP / scope "julio-1d50") SÍ quedó conectado al repo real.
Se subieron a GitHub todos los cambios pendientes de la sesión (commit 44278a9,
"Conectar IA real de analisis de fotos y login real end-to-end") para que Vercel tuviera
algo que construir — antes de eso llevaba 0 despliegues. El primer build **falló**:
`@supabase/ssr: Your project's URL and API key are required` en `/entrar` — las 4
variables de entorno no habían quedado guardadas para el ambiente "Production" (se
perdieron durante el alta de la cuenta nueva). El usuario las volvió a agregar en
Settings → Environments → Production. Al intentar relanzar el build, el usuario por
error creó un SEGUNDO proyecto duplicado ("julio-ro5p") en vez de usar "Redeploy" sobre
el original — se detuvo a tiempo, NO se le dio Deploy a ese duplicado (debe borrarse o
simplemente ignorarse, nunca usarse). Pendiente inmediato: que el usuario relance el
build correcto desde Deployments → (···) → Redeploy DENTRO del proyecto "julio"
original, y confirmar que esta vez compile.

**Bloqueante técnico aparte, ya identificado:** mi conector MCP de Vercel no puede leer
ni escribir nada de este proyecto (`get_project`, `list_deployment_events`,
`create_deployment` fallan con 403 "Trying to access resource under scope 'julio-1d50'.
You must re-authenticate to this scope") — aunque `list_projects`/`list_deployments`
básicos sí funcionan. El token de mi conector no incluye el scope de esta cuenta/team
nueva. Esto no bloquea al usuario (puede seguir todo desde el dashboard), pero significa
que yo no puedo disparar redeploys ni leer logs de build por mi cuenta para este
proyecto — hay que pedirle capturas/texto al usuario o, si se quiere una solución de
fondo, reautorizar el conector de Vercel desde los ajustes de conectores de la app (fuera
de mi alcance, lo hace el usuario).

## Checkpoint (paso 7/7 — Hotmart/webhook, en curso, adelantado fuera de orden)
Construido y aplicado a Supabase (migraciones 0004 y 0005): columnas nuevas en
`perfiles` (hotmart_subscriber_code, estado_suscripcion, primer_pago_en,
prueba_termina_en, acceso_hasta, periodo_gracia_hasta — reutiliza la columna `plan`
existente); tablas `eventos_procesados` (idempotencia), `webhook_log`
(observabilidad), `transacciones_pago` (ledger económico) — las 3 con RLS activo y
SIN políticas a propósito (solo el service_role las toca); funciones
`buscar_usuario_id_por_email` y `aplicar_evento_hotmart` (ambas revocadas de
anon/authenticated y de PUBLIC — el linter de seguridad detectó que revocar solo de
anon/authenticated NO bastaba, Postgres también concede a PUBLIC por defecto; quedó
corregido y verificado limpio con `get_advisors`).

Código: `lib/hotmart-verify.ts` (hottok en tiempo constante, fail-secure — crashea si
falta `HOTMART_HOTTOK`), `lib/membership-fsm.ts` (estados en español: prueba/activo/
atrasado/cancelado/expirado/reembolsado/contracargo — el evento de inicio de prueba
`SUBSCRIPTION_TRIAL_START` es PLACEHOLDER sin verificar, ver nota en el propio
archivo), `app/api/webhooks/hotmart/route.ts` (pipeline completo: autenticidad →
frescura → catálogo permitido por `HOTMART_PRODUCT_ID` → resuelve/crea el usuario de
auth ANTES de marcar el evento procesado, patrón A de 18 para que "pagó y no entra"
no pueda pasar → idempotencia+transición atómica vía RPC). `middleware.ts` excluye
`/api/webhooks` del refresco de sesión (no aplica, son peticiones de servidor a
servidor). **Gate de plan real activado en `app/(app)/layout.tsx`**: ya no basta con
iniciar sesión — si `perfiles.estado_suscripcion` no da acceso completo, redirige a
`/paywall`. Esto cierra el hallazgo crítico de seguridad que quedó pendiente desde la
auditoría (cualquier correo entraba gratis).

⚠️ **Efecto colateral esperado:** la cuenta de prueba del usuario
(juliolopez366@gmail.com) NUNCA pasó por una compra real de Hotmart, así que
`estado_suscripcion` está en null — con el gate activo, esa cuenta ahora rebota a
`/paywall` en vez de entrar a `/hoy`. Hay que decidir con el usuario si se le activa
el acceso a mano por SQL (para seguir probando IA/fotos) o si prueba el flujo
comprando de verdad en Hotmart.

**Bloqueante actual:** el build (local Y en Vercel) FALLA a propósito sin
`HOTMART_HOTTOK` en el entorno (fail-secure, línea 8 de hotmart-verify.ts revienta en
tiempo de build porque Next.js evalúa el módulo al recolectar datos de la ruta). Se
le pidió al usuario entrar a Hotmart → Herramientas → Webhook → crear una
configuración apuntando a `https://foodscan-murex.vercel.app/api/webhooks/hotmart` →
copiar el HOTTOK de la pestaña de Autenticación → pegarlo como `HOTMART_HOTTOK` en
Vercel (Production, Secret) y en `.env.local` — TODAVÍA sin seleccionar eventos ni
enviar el test (eso es el siguiente paso, después de que el build vuelva a compilar
y se despliegue). También falta, cuando se tenga: `HOTMART_PRODUCT_ID` (el ID
numérico del producto, para el chequeo de catálogo permitido) — opcional pero
recomendado, el endpoint funciona sin él si no está seteado.

**Próximo paso inmediato:** cuando el usuario confirme el HOTTOK puesto en ambos
lugares, hacer commit+push de todo este trabajo (los commits de IA real/paywall ya
se subieron; esto de Hotmart todavía NO), verificar que el build en Vercel compila,
y entonces sí guiar los pasos finales en el panel de Hotmart: seleccionar los
eventos (aprobada, completa, reembolso, chargeback, cancelación, SWITCH_PLAN, pago
atrasado) y darle "Enviar test" para confirmar 200.

## Responsable legal — dato del usuario (no inventar, no cambiar sin que él lo pida)
Julio López (persona natural) · opera desde Estados Unidos · contacto legal:
soporte@foodscan.app. Usado en privacidad/terminos/reembolsos/aviso-ia.

## Auditoría legal — COMPLETA (27 de septiembre de 2026)
Se auditaron las 4 páginas legales contra `47-LEGAL-FISCAL-Y-PRIVACIDAD.md` y contra
el código real (no contra lo prometido). Hallazgos y qué se corrigió:
- **Responsable no identificado** → corregido: las 4 páginas ahora nombran a Julio
  López, persona natural, operando desde EE. UU.
- **Sin lista de subprocesadores nombrados** → corregido en Privacidad: Supabase
  (activo), IA/Vercel/Resend/Hotmart marcados explícitamente como "pendiente de
  conectar" — nunca se inventaron nombres de proveedores que no existen todavía.
- **Sin transferencia internacional declarada** → corregido en Aviso de IA: como
  todavía no hay proveedor de IA conectado, se declara que se nombrará el proveedor
  y el país exacto ANTES de activar esa transferencia (no se puede declarar un dato
  que aún no existe).
- **Sin edad mínima declarada** → corregido: 18+ en Términos y Privacidad.
- **Sin registro de consentimiento en el punto de recolección** → corregido:
  `/entrar` ahora tiene una casilla SIN premarcar ("Acepto los Términos y el Aviso de
  Privacidad") que bloquea ambos botones (magic link y Google) hasta marcarla —
  cumple el requisito de autorización previa expresa de la Ley 1581 de Colombia.
- **Garantía de 7 días en el copy vs. 15 días reales configurados en Hotmart**
  (dato ya reconciliado en `FICHA-MERCADO.md`, nunca fue un error) → la página de
  Reembolsos ahora EXPLICA ambos números en vez de mostrar solo uno: la promesa de
  marketing (7 días) y el respaldo real más amplio de Hotmart (15 días desde el
  registro).
- **Sin página/sección "cómo cancelar"** → corregido: Reembolsos ahora se llama
  "Garantía, reembolsos y cómo cancelar" con pasos concretos; el link directo al
  portal de Hotmart queda marcado como pendiente hasta conectar el paso 7.
- **Sin aviso de renovación automática explícito en Términos** → corregido, más nota
  de la California ARL (aplica por operar desde EE. UU.).
- **Disclaimer de IA solo en `/aviso-ia`, no junto a la salida de la IA** → corregido:
  se agregó "Orientación de IA, no un diagnóstico" (enlaza a `/aviso-ia`) justo debajo
  del resultado de riesgo en Hoy y del anillo de confianza en Tu Patrón — el disclaimer
  vive en los 3 lugares que exige el 47 (ToS, página dedicada, junto a la salida).
- **Cookies**: verificado en el código que NO existe ninguna cookie de terceros
  (analytics/publicidad) — solo la cookie esencial de sesión de Supabase, exenta de
  banner de consentimiento. Documentado explícitamente como "no aplica" en vez de
  fabricar un banner para nada.
- **Botón de borrar cuenta**: no existe un botón self-service todavía (verificado en
  el código) — el proceso es por correo a soporte@foodscan.app, ya declarado así en
  Privacidad (coherente: no promete un botón que no existe). Se automatiza cuando
  haya más volumen.
Verificado: `tsc --noEmit` ✓ · `npm run build` ✓ · las 4 páginas + `/entrar` con la
casilla nueva probadas en navegador sin errores de consola.
⚠️ Pendiente que solo un humano puede resolver: esta auditoría es de completitud
profesional (que el texto exista, sea coherente con el código, y no contradiga lo que
la app promete) — NO es asesoría legal colegiada. Antes de vender de verdad
(conectar Hotmart), conviene que un abogado local revise estas páginas, sobre todo
por tratarse de datos de salud digestiva.

## Sesión 6 — Servicios externos (en curso)
- **1. GitHub — LISTO.** Repositorio del usuario: `github.com/juliolopez366-sys/julio`
  (privado). Remoto `origin` conectado, rama `master` subida con todo el historial de
  commits. `.gitignore` ya cubre `node_modules/`, `.next/`, `.env*.local` — sin
  archivos `.env` en el repo todavía (llegan en el paso 2-3).
- **2. Supabase — EN CURSO.** Proyecto del usuario creado. `.env.local` con
  `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` (nunca commiteado,
  cubierto por `.gitignore`). Instalado `@supabase/supabase-js` + `@supabase/ssr`.
  Creados `lib/supabase/client.ts` (browser), `lib/supabase/server.ts` (Server
  Components/Actions), `lib/supabase/middleware.ts` + `middleware.ts` raíz (refresca
  la sesión en cada request, patrón oficial de `@supabase/ssr`). Esquema SQL escrito
  en `supabase/migrations/0001_init.sql` — espejo de `lib/foodscan-data.ts`: tablas
  `perfiles`/`comidas`/`sintomas`/`correlaciones`, RLS con policy
  `(select auth.uid()) = user_id` en USING y WITH CHECK en las 4, `user_id` indexado,
  trigger que crea el perfil automáticamente al registrarse. Migración aplicada
  directamente con el conector MCP de Supabase (`apply_migration`, proyecto
  `pjssjkzqxyxnphwnxyoq`) — las 4 tablas existen con RLS activo, verificado con
  `list_tables`. El escáner de seguridad (`get_advisors`) marcó el trigger
  (`crear_perfil_nuevo_usuario`, SECURITY DEFINER) como invocable públicamente por
  RPC — corregido con `0002_restringir_trigger_perfil.sql` (revoca EXECUTE de
  public/anon/authenticated; no rompe el trigger, Postgres lo invoca sin chequear
  permisos). Advisors de seguridad limpios tras el fix.
  **Auth real — LISTO.** `/entrar` ya llama a Supabase de verdad
  (`supabase.auth.signInWithOtp` para el magic link, `signInWithOAuth({provider:
  'google'})` para Google) en vez de simular con `setTimeout`. Rutas nuevas
  `app/auth/confirm/route.ts` (verifica `token_hash`+`type` del magic link) y
  `app/auth/callback/route.ts` (intercambia el `code` de OAuth), ambas server-side
  con `crearClienteSupabaseServidor()`. Probado end-to-end con el conector MCP de
  Supabase: se envió un magic link real a `juliolopez366@gmail.com`, se creó la fila
  en `auth.users`, y `query_logs` confirmó `"event":"mail.send"` — el envío es real,
  no simulado (llega desde `noreply@mail.app.supabase.io`, dirección genérica hasta
  que se conecte un dominio propio en el paso 5/Resend). **Gate de sesión — LISTO,
  cierra el hallazgo crítico de la auditoría**: `app/(app)/layout.tsx` ahora es
  `async`, llama a `supabase.auth.getUser()` y hace `redirect('/entrar')` si no hay
  sesión — verificado con Playwright que `/hoy` sin sesión redirige a `/entrar`.
  ⚠️ Pendiente que el usuario verifique: agregar `http://localhost:3000/auth/confirm`
  y `/auth/callback` a la lista de Redirect URLs permitidas en el panel de Supabase
  (Authentication → URL Configuration) si el enlace del correo da error al abrirlo.
  Pendiente aún: reemplazar las funciones de `lib/foodscan-data.ts` (hoy leen/escriben
  `localStorage`) por queries reales a las tablas de Supabase — el auth ya es real
  pero los datos de comidas/síntomas/patrón siguen siendo locales del navegador.
  Verificado mientras tanto: `tsc --noEmit` ✓ · `npm run build` ✓ (middleware
  detectado correctamente). Este trabajo se subió en `feature/supabase-conexion`,
  PR #1, fusionado a `master` (fast-forward, sin `gh` disponible en el entorno —
  se hizo por git directo). Conectores MCP de Supabase y Vercel aparecieron
  disponibles en esta sesión a mitad de la Sesión 6 — usarlos cuando toque crear
  el proyecto/branches de Supabase y desplegar en Vercel, en vez de pedirle al
  usuario que haga todo manual en los paneles.
- **3. IA real (BFF)** — pendiente, depende del paso 2 (auth + RLS antes de exponer
  la IA, para no gastar créditos sin control de usuario).

### Auditoría de seguridad y pulido (pedido explícito del usuario)
Se exploró todo el código (rutas, seguridad, accesibilidad, dependencias, enlaces) con
un subagente independiente. Hallazgos y qué se hizo con cada uno:
- 🔴 **Crítico** — `/hoy`, `/historial`, `/patron`, `/cuenta` son accesibles sin ningún
  chequeo de sesión (ni siquiera un `if (!user) redirect(...)` placeholder). NO se
  corrigió todavía a propósito: el login (`/entrar`) sigue simulado (no crea sesión
  real), así que agregar el gate ahora dejaría a CUALQUIERA sin poder entrar a esas
  pantallas — se resuelve junto con el wireo de Supabase Auth real, no antes.
- 🟠 **Alto, corregido** — los 4 enlaces legales del footer/Cuenta daban 404
  (`/privacidad`, `/terminos`, `/reembolsos`, `/aviso-ia` no existían). Se crearon las
  4 páginas (componente compartido `components/legal/legal-page.tsx`) con contenido
  real basado en las decisiones YA aprobadas (precio, prueba de 7 días, Garantía del
  Primer Patrón, límites de la app, disclaimer de IA de FICHA-AVATAR/47-LEGAL) — NO
  son texto de relleno, pero SÍ necesitan revisión de un abogado antes de vender de
  verdad (quedan como pantallas secundarias, Regla 7, sin revisor-visual).
- 🟠 **Alto, anotado sin corregir** — el plan/precio elegido en el paywall vive en
  `sessionStorage` (editable desde devtools) y nada lo valida contra el servidor. Hoy
  no es explotable (no hay backend de pago conectado), pero es un patrón a vigilar:
  cuando se conecte Hotmart, el estado de suscripción debe validarse siempre del lado
  del servidor, nunca confiar en el valor del cliente.
- 🟡 **Medio, corregido** — `next.config.ts` no tenía NINGÚN header de seguridad. Se
  agregaron `X-Frame-Options: DENY` (evita clickjacking), `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy` (verificado con `curl -D -`). CSP se dejó
  fuera a propósito — agregarla antes de saber los hosts externos finales (IA real,
  Resend, Hotmart) rompería scripts legítimos; se define en Sesión 6 cuando esos
  servicios estén conectados.
- 🟡 **Medio, corregido parcial** — Cuenta mostraba "te quedan 4 días" hardcodeado sin
  relación con ningún dato real. Ahora lee el plan real de `sessionStorage` y muestra
  "Prueba gratis · plan {anual/mensual} después" — ya no inventa una cifra de días que
  nadie está contando de verdad.
- 🟡 **Medio, sin corregir** — `/entrar` promete "revisa tu correo" sin enviar nada
  real (ya documentado como simulación consciente de Sesión 4); y no hay rate-limit
  real en el reenvío (solo un countdown de cliente, evitable). Ambos se resuelven con
  el wireo de auth real, no antes.
- 🟢 **Bajo / sin hallazgos** — `npm audit`: 0 vulnerabilidades en 453 dependencias.
  Accesibilidad: labels, aria-checked, aria-hidden y alt ya están bien implementados
  donde se revisó — sin hallazgos nuevos.
- **4. Vercel** — pendiente.
- **5. Resend** — pendiente.
- **6. Dominio** — pendiente.
- **7. Hotmart** — pendiente.

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
Sesión 6 — Servicios externos: GitHub, Supabase (datos/RLS reales), IA real, Vercel,
Resend, dominio, Hotmart. Es la única fase donde el usuario hace pasos manuales
(crear cuentas, conectar servicios) — se le guía paso a paso (ver
`SECUENCIA-MAESTRA-CONSTRUCCION.md`).

## Sesión 5 — App interna: COMPLETA ✅
Rutas en `app/(app)/*` con shell compartido (nav en píldora flotante) y Error
Boundary compartido (`app/(app)/error.tsx`, cubre las 4 pantallas — la nav sigue
visible si una falla). Motor de correlación y datos simulados con `localStorage` en
`lib/foodscan-data.ts` (esquema real para Supabase ya decidido, ver Decisiones
técnicas abajo).
- **Hoy — LISTA (37/40 · 16/20, 5ª pasada).** Ritual diario M0: celebración de hito,
  título de riesgo, insight de correlación con barra, comidas de hoy.
- **Tu Patrón — LISTA (36/40 · 19/20, 7ª pasada de 7).** Pantalla que vende la
  promesa central (Motor de Detonante Real): anillo de confianza animado con
  `aria-live`, evidencia numerada 1-4, ayuda contextual ("¿Qué significa esto?"),
  "deshacer" real (no cosmético) al eliminar un registro — el borrado se difiere
  4.5s y es cancelable. Historial de 7 rondas de revisor-visual documentado en los
  commits (`ee8df74` en adelante); resumen: craft cruzó el umbral en la 2ª pasada,
  usabilidad tardó en cruzar por defectos reales de accesibilidad, consistencia de
  motion, reversibilidad de acciones destructivas y ayuda contextual — todos
  corregidos sin fabricar datos ni sobre-ingenierizar (los badges "ALTO" idénticos
  se dejaron así a propósito: son datos reales sin grados que inventar).
- **Historial y Cuenta** — sin revisor completo (pantallas secundarias, Regla 7),
  medición + checklist manual sin errores.
- Tokens semánticos agregados a `tokens.css` (`--exito`, `--alerta`, `--error`) que
  estaban en FICHA-ARTE.md pero nunca se habían llevado a CSS; `--accent-2` no se
  tocó (ya usado por Hero.tsx de la landing).

## Elevaciones post-lanzamiento (pedidos explícitos del usuario, tras cerrar Sesión 5)
- **Landing — 38/40 · 20/20 · 19/20 copy, LISTA.** Se le agregó ícono a la sección
  Agitación (única de las 10 sin uno) y luego el logo real (ver abajo); ninguno de
  los dos cambios introdujo defectos nuevos.
- **Logo real.** El usuario aportó la imagen de su isotipo (plato+hoja+cubiertos+
  marco de escaneo sobre verde bosque). Se procesó con `sharp`: fondo removido,
  recortado a solo el ícono (sin el wordmark "FOODSCAN", para que se lea bien
  chico). Assets: `public/logo-mark.png` (128×128, usado en Hero/FooterLegal/
  FunnelHeader a 32px — subido desde 24px porque el detalle se perdía) y
  `app/icon.png` + `app/apple-icon.png` (favicon vía convención de Next.js). Landing
  y onboarding re-revisados tras el cambio, ambos siguen LISTA.
- **Onboarding — 37/40 · 18/20, LISTA.** El usuario comparó el onboarding contra un
  análisis externo (Gemini) y pidió incorporar lo aplicable: se agregó `AhaSimulacion`
  (nuevo paso que rompe VISUALMENTE la objeción #1 de FICHA-AVATAR.md — antes solo se
  rompía con texto) y una línea en la pantalla de carga anclada al mecanismo real
  (sin prometer una cifra de días no sustentada). El modelo de "paywall difuminado"
  que proponía el análisis externo se descartó a propósito — reabriría la decisión
  de monetización ya aprobada (cosa juzgada).

## Problemas conocidos
- **veredicto:landing / veredicto:onboarding / veredicto:paywall** — el hook de
  cierre marca estos 3 veredictos como "caducados" cuando detecta archivos .tsx MÁS
  NUEVOS en el repo que pertenecen a OTRAS pantallas (ej. las de la app interna,
  `app/(app)/*`) — es un falso positivo del chequeo por fecha de archivo, no un
  veredicto real desactualizado, porque esas pantallas no tocan ningún componente de
  landing/onboarding/paywall. Cuando SÍ hubo un cambio real en una de las tres (ícono
  en Agitación, logo real, demo Aha del onboarding), siempre se relanzó el
  revisor-visual completo y se confirmó LISTA (ver "Elevaciones post-lanzamiento"
  arriba). Los ajustes cosméticos triviales sugeridos por el propio revisor tras un
  veredicto LISTA (ej. subir el logo de 24 a 32px, quitar un `border-2` residual en
  Sesión 4) no ameritaron una pasada extra por caer dentro de una categoría de
  defecto ya evaluada y aceptada como no bloqueante. Este falso positivo por fecha de
  archivo seguirá disparándose cada vez que se toque cualquier archivo de la app
  interna — es esperado, no indica una regresión real en esas 3 pantallas.
- Los enlaces del footer (/privacidad, /terminos, /reembolsos, /aviso-ia) aún no
  existen como páginas — se construyen en Sesión 6 (legal). Esperado en esta etapa.
- FICHA-MODELO.md: los campos de Meta Ads Library y Sensor Tower (MRR/top-grossing)
  quedaron NO ENCONTRADO — requieren búsqueda manual con acceso que esta sesión no
  tiene. No bloquea el avance; se completa si se decide invertir en ads pagados (34).
- FICHA-AVATAR.md no viene de entrevistas directas (44), sino del documento de
  research de mercado del usuario + reseñas públicas de competidores. Es evidencia
  real y citable, pero si en el futuro hay usuarias reales, conviene reforzarla con
  sus entrevistas.
- **veredicto:paywall — esta vez el archivo SÍ se tocó de verdad (30 sep/1 oct), no es
  el falso positivo genérico de arriba.** Se conectó el CTA a los checkouts reales de
  Hotmart (app/paywall/page.tsx), quitando la máquina de estados simulada
  (procesando/confirmado/error) que el veredicto original (9ª pasada) había evaluado y
  aprobado. No amerita una pasada nueva del revisor-visual porque CERO píxeles
  cambiaron en lo que se ve ANTES del clic (cards, copy, jerarquía — todo igual); lo
  único distinto es que, al tocar el botón, ahora la persona sale de verdad hacia
  Hotmart en lugar de ver una animación local — que es el comportamiento correcto para
  un redirect de pago real (el navegador ya muestra su propio indicador de carga al
  navegar). Si en el futuro se agrega feedback visual propio durante ese clic (p.ej.
  un `loading` de medio segundo antes del redirect), ahí sí conviene una pasada de
  craft, aunque no de usabilidad.

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
