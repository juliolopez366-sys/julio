# Product

<!-- impeccable:product-schema 1 -->

> Derived from the project's own memory files (ESTADO.md, FICHA-AVATAR.md, FICHA-MODELO.md,
> FICHA-MERCADO.md, FICHA-ARTE.md), which stay the source of truth. If this file and a ficha
> disagree, the ficha wins and this file gets updated.

## Platform

web

## Users

Primary user: adults in Latin America living with Irritable Bowel Syndrome (SII) who already
follow, or know about, the low-FODMAP diet. The reference persona is **Valeria**, 32, an urban
project manager with an active social life (FICHA-AVATAR.md).

- **Situation:** unpredictable attacks (extreme bloating, sharp pain, urgency) after work
  lunches; cancels evening plans out of "ansiedad del baño"; searches Reddit at night for
  what she ate.
- **Job:** find her real trigger food with evidence, without the logging feeling like
  homework ("estoy haciendo tarea cada vez que intento comer").
- **History:** already tried and abandoned paper diaries, Cara Care, mySymptoms and the Monash
  app, because they demand typing every ingredient and "show the same thing on good and bad
  days."
- **Awareness:** solution-aware, in a sophisticated market. She doesn't need FODMAP explained;
  she needs to see why this tool is different from the ones she already gave up on.
- **Device:** not researched. Assume a mid-range Android phone on LATAM networks.

**Open decision:** whether the audience is explicitly women-first (the approved promise says
"mujeres con Intestino Irritable") or anyone with SII. Not decided; don't lock copy or design
to either until it is.

## Product Purpose

FoodScan is an AI digestive-trigger tracker. The user photographs a meal, the AI flags FODMAP
risk ingredients, and the app crosses every symptom against the meals of the previous 48 hours
to isolate the food that is actually causing the pain.

Approved central promise: help people with SII find their real trigger by crossing each symptom
with what they ate in the last 48 hours — without typing, without guessing, and without the app
treating them like an exhausting science experiment.

Success means the user can name her trigger with evidence she trusts, and bring clear data to
her gastroenterologist.

## Positioning

The differentiator is the **correlation engine**: every symptom is crossed against the meals
from the previous 8–48 hours, and a candidate trigger is shown only with a confidence level.
This answers the #1 complaint about Cara Care and mySymptoms ("me muestra lo mismo cuando estoy
sana que cuando me muero de dolor").

Photo-based logging alone is NOT the differentiator; FODMAP Snap and BiteRight already do it.
Photo logging is the effortless input; correlation is the mechanism.

Second axis: Spanish-first for LATAM. The model app (Cara Care, acquired by Bayer) has no
Spanish version with traction.

## Operating Context

- **Daily ritual (Hoy):** before or after eating, one camera action to log the next meal and
  get instant FODMAP risk; one tap to log a symptom.
- **Correlation (Tu Patrón):** after enough logs, the engine reveals a candidate trigger with
  a confidence ring and numbered evidence. Reveals are occasional, not on every log.
- **History (Historial):** past meals and symptoms, searchable.
- **Account (Cuenta):** plan, streak, settings.
- **Sales path:** landing → anonymous onboarding quiz → paywall → Hotmart checkout →
  login via magic link or Google (`/entrar`) to tie the purchase to the account.
- **Doctor visits:** the user brings her data to a gastroenterologist; shareable reports are
  part of the model, not yet built.

## Capabilities and Constraints

- **Stack:** Next.js 16 App Router, TypeScript, Tailwind v4, motion, lucide-react. Supabase
  (Postgres + Auth + Storage, RLS on every user table). Claude Haiku 4.5 analyses meal photos
  through a server-only route with a 20-analyses/day/user limit. Hosted on Vercel at
  `www.clubfoodscan.com`.
- **MVP, exactly three functions:** (1) photo → instant risk, (2) one-tap symptom log,
  (3) 8–48 h correlation engine. Out of scope: recipes, meal plans, nutritionist chat,
  community.
- **Pricing:** US$6.99/month or US$49.99/year, sold through Hotmart. 7-day free trial and a
  15-day guarantee. Access is gated server-side on the Hotmart subscription state.
- **The app never:** replaces a doctor or suggests medication · invents a pattern without
  enough evidence · uses a tone of blame · shares health data.
- **AI disclaimer:** "Orientación de IA, no un diagnóstico" must sit next to every AI result
  (risk on Hoy, confidence ring on Tu Patrón) and link to `/aviso-ia`.
- **Data:** this is health data. Only the essential Supabase session cookie exists; no
  analytics or advertising cookies. Account deletion is by email to soporte@foodscan.app.
  Users must be 18+.
- **Language:** UI in neutral Latin American Spanish, single-language, *tuteo*, no voseo or
  single-country slang.
- **Terminology:** "detonante" (trigger), "detonante real", "ansiedad del baño", "brote" /
  "recaída" (flare-up), "dieta de eliminación", "Motor de Detonante Real" (the correlation
  engine), "Garantía del Primer Patrón".

## Brand Commitments

- **Name:** FoodScan. **Logo:** isotype only (plate + leaf + cutlery + scan frame on forest
  green), at `public/logo-mark.png`, `app/icon.png`, `app/apple-icon.png`.
- **Binding visual system (user-confirmed):** FICHA-ARTE.md is settled and comes from the
  user's own reference image (`docs/referencias/referencia-usuario-1.webp`). Future design
  work keeps it and only extends or polishes within it; it is not to be replaced. That
  covers the forest-green + cream duotone, Fraunces + Work Sans, the "mordisco" curve, the
  floating pill nav, light mode only, no borders, flat colour.
- **Personality:** natural, calm, trustworthy — a caretaker, never clinical or cold.
- **Voice:** emotional and everyday first, never a diagnosis. Don't open with cold clinical
  jargon ("síndrome", "patología"). Use the user's words: "detonante real", "ansiedad del
  baño", "datos reales, no adivinanzas"; name "hacer tarea" as the thing FoodScan avoids.
- **Legal owner:** Julio López, individual, operating from the United States. Contact:
  soporte@foodscan.app.

## Evidence on Hand

- **Market research:** the user's own research document, summarised in FICHA-AVATAR.md with
  literal voice-of-customer quotes, competitor reviews, and FICHA-MODELO.md (Cara Care:
  US$16M raised, acquired by Bayer).
- **Real product captures:** `public/hero-mockup.png`, `public/carrusel-1-onboarding.png`,
  `public/carrusel-2-mecanismo.png`, `public/carrusel-4-planes.png`, plus the approved tour
  `vista-previa-app.html` and replica `replica-fiel.html`.
- **Confirmed absent (2026-10-14):** no real users, beta testers, testimonials, results,
  ratings, press or founder outcomes. Never fabricate any of them. Social proof comes from
  the mechanism and live demos only.
- **Not researched:** conversion benchmarks, per-country pricing, decision cycle, dominant
  local payment methods. Don't state numbers for these.

## Product Principles

1. **Effortless input, evidence-backed output.** Logging is a photo; a conclusion appears
   only when the data supports it, with its confidence shown.
2. **Answer the objection with proof, not promises.** The #1 objection ("AI can't guess the
   hidden garlic in a restaurant sauce") is met with a real demo on a composed dish, and
   correcting the AI costs one tap.
3. **Never homework, never blame.** Every screen should feel lighter than a paper diary.
   No guilt about what she ate.
4. **Honest about uncertainty.** Health data and AI output are guidance, not diagnosis. Empty
   states stay honest; the app never invents a pattern or a number.
5. **Built for the doctor visit.** Data should be clear enough that a gastroenterologist
   takes it seriously.

## Accessibility & Inclusion

Mobile-first at 375px on mid-range Android. Users are often in pain or anxious when using the
app, so primary actions must take one or two taps and be reachable with one hand. Keep
existing labels, `aria-live` on result reveals, visible focus on every CTA, and reversible
destructive actions (delete has a 4.5 s undo). No formal WCAG level has been set.
