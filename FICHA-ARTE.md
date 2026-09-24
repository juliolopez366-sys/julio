# FICHA DE DIRECCIÓN DE ARTE — Rastreador de detonantes SII/FODMAP

## Referencia del usuario (CONTRATO — ver 16, protocolo obligatorio)
- ¿Hay imagen(es) de referencia del usuario?: SÍ → `docs/referencias/referencia-usuario-1.webp`
  (mockup de app de recetas — 2 pantallas, textos decorativos ilegibles/genéricos, pero el
  SISTEMA visual —color, forma, layout— es claro y se extrae igual)
- Extracción (mirada directamente con herramienta de imágenes):
  - Modo: claro · Fondo (backdrop/case): verde bosque `#3E4F35` · Superficie/card: crema pergamino `#F1E8D4`
  - Texto 1º: blanco `#FFFFFF` sobre verde · texto sobre crema: carbón cálido `#2C2A1E`
  - Texto 2º: oliva grisáceo `#6B6B54`
  - Acento(s): el MISMO verde bosque `#47593A` (sistema duotono verde+crema, sin 2º acento) —
    aparece en la barra superior, la franja de info y la barra de navegación inferior (píldora)
  - Display: clase slab-serif orgánica y con carácter, condensada → candidatas: **Fraunces**
    (elegida — óptica display, calidez orgánica), Lora Bold, Bitter
  - Body: sans neutra y limpia → candidatas: **Work Sans** (elegida), Public Sans, Karla
  - Radio: cards/foto ~28px · barra de nav inferior 999px (píldora) · Espaciado: aireado
  - Sombras: sutil, solo bajo el marco del teléfono — dentro de la app casi no hay sombra
  - Bordes: ninguno — todo por color plano y curvas, no por líneas
  - Textura/gradiente/grano: ninguno — colores planos
  - Layout: foto de comida a pantalla completa arriba → curva orgánica tipo "mordisco" que
    conecta con una hoja crema debajo → grid de 2 columnas con tarjetas pequeñas (foto + texto)
    → barra de navegación flotante en píldora verde
  - Detalle firma a replicar: la curva orgánica ("mordisco") donde la foto se encuentra con la
    hoja crema, y la barra de navegación flotante en píldora (no pegada a los bordes)
- Prohibiciones anti-IA que la referencia LEVANTA: ninguna — el estilo es claro/orgánico, ya
  evita el look "IA genérico" (nada de oscuro+neón+glass)

## Personalidad compilada
- 3 adjetivos: **natural, calmado, confiable** (arquetipo Cuidador con toque Explorador —
  orgánico, terroso, protector)
- Motion: ease-out suave 300-350ms, sin springs marcados — coherente con "calma competente"

## Brand kit final (valores que viven en tokens)
- Fondo app: `#F6F2E6` (crema más claro, para el lienzo general — la hoja crema de la
  referencia, aclarada para uso de fondo completo) · Superficie/card: `#F1E8D4`
  · Hundido: `#E9DFC6` · Texto 1º: `#2C2A1E` · Texto 2º: `#6B6B54`
- Acento: `#47593A` (verde bosque — SOLO en: header, nav inferior, CTA, dato de riesgo) ·
  2ª nota: N/A — sistema duotono deliberado, igual que la referencia
- Semánticos: éxito `#5C7A4A` (variante clara del mismo verde) · alerta `#B5652E` (terracota,
  para "riesgo medio/alto" — combina con el mundo natural sin salir del sistema) · error `#A6402C`
- Display: **Fraunces** (pesos 600/700) · Body: **Work Sans** (pesos 400/600)
  · Escala: display 26-34px / title 18px / body 15px / label 12px
- Radio: cards/foto 26-28px · botones 16px · nav píldora 999px
- Profundidad: sombra sutil tintada de verde bajo elementos flotantes (nav, CTA); sin bordes
- Dispositivo ownable: la curva "mordisco" (scallop) entre la foto y la hoja crema — se usa en
  la pantalla principal donde el usuario ve la foto de su comida
- Motion signature: ease-out 300-350ms, fades + scale suave en fotos (0.97→1), sin bounce

## Trazabilidad y vetos
- Ruta de diseño: RÉPLICA FIEL de la referencia del usuario (reemplazó la propuesta A/B/C)
- Réplica fiel: `replica-fiel.html` (raíz del proyecto) · referencia archivada en
  `docs/referencias/referencia-usuario-1.webp` · test de fidelidad: PASA (6/6, ver checklist
  en el propio archivo) · screenshot: `docs/revisiones/replica-fiel-375.png`
- Tour de la app: `vista-previa-app.html` (raíz) · vistas incluidas: onboarding, mecanismo
  (foto→IA), pantalla principal (M0), paywall · screenshot: `docs/revisiones/vista-previa-app-375.png`
  · aprobado por el usuario: PENDIENTE
- Paleta derivada de: referencia del usuario (tomada tal cual) — verde bosque + crema pergamino
- Registro anti-repetición: verde bosque `#47593A` + crema `#F1E8D4` + Fraunces/Work Sans →
  vetados para el próximo proyecto del SO
- Modo (claro/oscuro): claro — fijado por la referencia del usuario

## Idioma UI: Español latino neutro · Fecha de cierre: PENDIENTE aprobación · Aprobada: NO (en revisión)
