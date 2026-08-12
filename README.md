# webGP_v2

Rediseño del sitio institucional de **Grupo Petersen** — Next.js 16 + Contentful (headless CMS).

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router, Turbopack en dev) |
| UI | React 19 + TypeScript |
| Estilos | Tailwind CSS 4 |
| CMS | Contentful (Delivery + Preview) |
| Rich text | `@contentful/rich-text-react-renderer` |

## Inicio rápido

```bash
cp .env.example .env   # completar credenciales Contentful
yarn
yarn dev               # http://localhost:3000
```

Build de producción:

```bash
yarn build
yarn start             # http://localhost:8080
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `yarn dev` | Desarrollo local (Turbopack) |
| `yarn build` | Build de producción |
| `yarn start` | Servidor en puerto **8080** |
| `yarn lint` | ESLint |

Scripts de mantenimiento (requieren `.env` configurado):

```bash
node scripts/export-page-seo.mjs          # exporta SEO de páginas → docs/page-seo-export.json
node scripts/analyze-include-depth.mjs    # analiza profundidad de includes en Contentful
```

## Estructura del proyecto

```
webGP_v2/
├── app/                      # Rutas Next.js
│   ├── layout.tsx            # Layout raíz (header, footer, fuentes, cloak de carga)
│   ├── page.tsx              # / → redirect a /inicio
│   ├── [...page]/            # Catch-all: páginas CMS, sectores y noticias
│   └── api/                  # revalidate (ISR), news
│
├── components/
│   ├── blocks/               # Adaptadores CMS → React (registry + PageRenderer)
│   │   └── gridSection/      # Registry de variantes por sectionVariant
│   ├── sections/             # UI de secciones por dominio (foundations, i3, sectors…)
│   ├── news/                 # Módulo de noticias (listing, detalle, filtros)
│   ├── cms/                  # Primitivos CMS (RichText, AppImage, LoadRevealImage…)
│   ├── contentful/           # Embeds de rich text en artículos de noticias
│   ├── layout/               # Header, footer, PageLoadCoordinator
│   └── ui/                   # Design system (Container, Button, GridCard…)
│
├── lib/
│   ├── contentful/           # Cliente, queries, tipos, resolvers por dominio
│   │   └── gridSection/      # sectionVariant, context, fetch por variant
│   ├── news/                 # Mappers, config de “También puede interesarte”
│   ├── navigation/           # Anchors de sección, hash links
│   ├── hooks/                # Debounce, pending de navegación en noticias
│   └── fonts/                # Playfair, DM Sans, DM Mono
│
├── config/site.ts            # Nombre del sitio, homePath
├── scripts/                  # Utilidades de mantenimiento (SEO, Contentful)
└── docs/                     # Documentación detallada y exports de auditoría
```

> Documentación completa: [`docs/ARQUITECTURA-PROYECTO.md`](docs/ARQUITECTURA-PROYECTO.md)

## Cómo se compone una página

1. **URL** → `app/[...page]/page.tsx` resuelve la ruta.
2. **Datos** → `getPageByPath()` (página CMS), `getNewsByPath()` (noticia) o sector por path.
3. **Render** → `PageRenderer` itera el array `content` de la página:
   - Casos especiales: emparejamiento I3, páginas de sector, hub de noticias.
   - Resto: `blockRegistry[contentTypeId]` → componente Block.
4. **`gridSection`** → lee `sectionVariant` del CMS y elige el layout en `gridSection/renderers.tsx`.

```
Contentful page.content[]
        │
        ▼
   PageRenderer
        │
        ├── banner ──────────► BannerBlock
        ├── featuredNews ────► FeaturedNewsBlock
        ├── gridSection ─────► GridSectionBlock
        │                         │
        │                         ▼
        │                    sectionVariant → renderers.tsx → sections/*
        └── …
```

## Bloques CMS registrados

| Content type | Componente |
|--------------|------------|
| `banner` | `BannerBlock` |
| `card` | `CardBlock` |
| `externalLink` | `ExternalLinkBlock` |
| `featuredNews` | `FeaturedNewsBlock` |
| `gridSection` | `GridSectionBlock` |
| `image` | `ImageBlock` |
| `richTextBlock` | `RichTextBlock` |
| `video` | `VideoBlock` |

Para agregar un bloque: crear `components/blocks/XBlock.tsx` y registrarlo en `components/blocks/registry.ts`.

## banner y `bannerVariant`

El content type `banner` elige layout con **`bannerVariant`**:

| Slug | Componente |
|------|------------|
| `hero` | `HeroBanner` (+ rich text/CTAs opcionales debajo) |
| `statistics` | `StatisticsBanner` |
| `qualia` | `QualiaBanner` |

Campo opcional **`sectionId`** para anchor hash (ej. `que-hacemos` en el banner "Qué hacemos").

Auditorías previas en `docs/banner-variant-suggestions.json`.

## gridSection y `sectionVariant`

El content type `gridSection` es polivalente: un solo tipo en Contentful, muchos layouts en código.

Cada entry debe tener el campo **`sectionVariant`** con uno de los slugs definidos en `lib/contentful/gridSection/sectionVariants.ts` (ej. `bordered-grid`, `talent-culture`, `sectors-grid`).

| Slug | Sección UI |
|------|------------|
| `sectors-grid` | Grilla de sectores |
| `logo-grid` | Logos de empresas |
| `bordered-grid` | Cards con borde |
| `image-overlay-grid` | Cards con imagen overlay |
| `talent-culture` | Talento y cultura |
| `fundaciones-grupo-petersen` | Fundaciones GP |
| `i3-innovation` / `i3-conversations` | I3 (orquestado en PageRenderer) |
| `default` | Layout genérico (imagen lateral + rich text + cards) |
| … | Ver `sectionVariants.ts` para la lista completa |

Auditorías previas en `docs/grid-section-variant-suggestions.json`.

## Imágenes

Todas las imágenes del sitio pasan por `components/cms/AppImage.tsx` (no usar `next/image` directamente).

| Export | Uso |
|--------|-----|
| `AppImage` / `Image` | Imágenes generales con calidad 90 por defecto |
| `HeroImage` | Heroes above-the-fold: `priority`, `loading="eager"`, `fetchPriority="high"` |
| `HERO_IMAGE_SIZES`, `CONTENT_PADDED_IMAGE_SIZES`, … | Constantes `sizes` para distintos layouts |
| `AUTO_ASPECT_STYLE` | Logos con `max-h-* w-auto` (evita warnings de aspect ratio en SVG) |

**Carga sin flash:** `LoadRevealImage` oculta cada imagen (`opacity: 0`, `visibility: hidden`) hasta el evento `load`. En la carga inicial, `PageContentReady` mantiene el cloak (`html.is-page-loading`) hasta que carguen las imágenes prioritarias del hero, con timeout de 1.2 s.

Configuración en `next.config.ts`:

- `images.qualities: [75, 90]`
- `remotePatterns` para `images.ctfassets.net` e `img.youtube.com`
- Preconnect al CDN de Contentful vía header `Link`

## Capas de componentes

| Carpeta | Rol |
|---------|-----|
| `components/blocks/` | Adapta entries Contentful a React. Conoce tipos CMS y delega UI. |
| `components/sections/` | Secciones de página por dominio. Solo reciben props, sin fetch. |
| `components/news/` | Todo lo del módulo noticias. |
| `components/cms/` | Renderers reutilizables de assets, rich text e imágenes. |
| `components/ui/` | Primitivos visuales (botones, layout, cards). |

Imports directos por path (`@/components/...`); no hay barrel `index.ts` en ui/sections/cms.

## Variables de entorno

Copiá `.env.example` a `.env`. Variables principales:

| Variable | Descripción |
|----------|-------------|
| `CONTENTFUL_SPACE_ID` | ID del space |
| `CONTENTFUL_ACCESS_TOKEN` | Token Delivery API |
| `CONTENTFUL_ENVIRONMENT` | Entorno (ej. `develop-v2`) |
| `CONTENTFUL_HOST` | `cdn.contentful.com` |
| `CONTENTFUL_PREVIEW_ACCESS_TOKEN` | Token Preview API (opcional) |
| `CONTENTFUL_PREVIEW_DRAFT_CONTENT` | `true` para usar preview |
| `CONTENTFUL_PREVIEW_HOST` | `preview.contentful.com` |
| `REVALIDATE_SECRET` | Secreto del webhook ISR |
| `BASE_URL` / `NEXT_PUBLIC_BASE_URL` | URL base del sitio |

## ISR y revalidación

- `revalidate = 3600` (1 hora) en layout y páginas.
- Webhook on-demand: `POST /api/revalidate?secret=XXX&path=/ruta`

## Documentación adicional

| Archivo | Contenido |
|---------|-----------|
| [`docs/ARQUITECTURA-PROYECTO.md`](docs/ARQUITECTURA-PROYECTO.md) | Arquitectura completa, flujos, convenciones |
| [`docs/META-DESCRIPTIONS.md`](docs/META-DESCRIPTIONS.md) | Meta descriptions por página |
| [`docs/grid-section-variant-suggestions.json`](docs/grid-section-variant-suggestions.json) | Estado de migración gridSection |
| [`docs/banner-variant-suggestions.json`](docs/banner-variant-suggestions.json) | Estado de migración banner |
