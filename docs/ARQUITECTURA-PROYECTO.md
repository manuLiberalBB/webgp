# webGP_v2 — Arquitectura del proyecto

**Grupo Petersen — Rediseño web**  
**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Contentful  
**Última actualización:** Agosto 2026

---

## Tabla de contenidos

1. [Visión general](#1-visión-general)
2. [Estructura del repositorio](#2-estructura-del-repositorio)
3. [Capas y responsabilidades](#3-capas-y-responsabilidades)
4. [Flujo: de la URL al render](#4-flujo-de-la-url-al-render)
5. [Integración con Contentful](#5-integración-con-contentful)
6. [Sistema de bloques CMS](#6-sistema-de-bloques-cms)
7. [GridSection: registry por sectionVariant](#7-gridsection-registry-por-sectionvariant)
8. [Módulo de noticias](#8-módulo-de-noticias)
9. [Layout global](#9-layout-global)
10. [Caché, ISR y revalidación](#10-caché-isr-y-revalidación)
11. [Scripts de mantenimiento](#11-scripts-de-mantenimiento)
12. [Convenciones de código](#12-convenciones-de-código)
13. [Mapa de archivos clave](#13-mapa-de-archivos-clave)
14. [Próximos pasos sugeridos](#14-próximos-pasos-sugeridos)

---

## 1. Visión general

`webGP_v2` es un sitio **headless CMS**:

- **Contentful** almacena páginas, bloques, noticias, header, footer y entidades de dominio.
- **Next.js App Router** resuelve rutas, obtiene datos en servidor (RSC) y compone la UI.
- **React Server Components** son la base; Client Components solo donde hay interactividad.

### Principios

| Principio | Implementación |
|-----------|----------------|
| Contenido editable en CMS | Páginas = array de bloques Contentful (`page.content`) |
| Server-first | Fetch en servidor; Suspense para secciones async |
| Tipado fuerte | Tipos TS por content type en `lib/contentful/types/` |
| Separación datos / vista | Resolvers en `lib/contentful/{dominio}/` → props de UI |
| Variantes explícitas | `gridSection.sectionVariant` en CMS (no matching por nombre) |
| URLs compartibles | Filtros de noticias en query params |

---

## 2. Estructura del repositorio

```
webGP_v2/
├── app/
│   ├── layout.tsx                 # Layout raíz: fuentes, header, footer, <main>
│   ├── page.tsx                   # / → redirect /inicio
│   ├── not-found.tsx
│   ├── globals.css                # Tokens Tailwind 4 (@theme)
│   ├── [...page]/
│   │   └── page.tsx               # Catch-all: páginas, sectores, noticias
│   └── api/
│       ├── revalidate/route.ts    # Webhook ISR on-demand
│       └── news/route.ts
│
├── components/
│   ├── blocks/                    # Adaptadores CMS (ver §6)
│   │   ├── registry.ts
│   │   ├── PageRenderer.tsx
│   │   ├── GridSectionBlock.tsx   # Re-export → gridSection/
│   │   ├── gridSection/
│   │   │   ├── GridSectionBlock.tsx
│   │   │   ├── resolveGridSection.tsx
│   │   │   ├── renderers.tsx
│   │   │   └── GridSectionHeader.tsx
│   │   ├── *Block.tsx             # Un block por content type
│   │   └── *WithFetch.tsx         # Server components async (sector, carousel)
│   │
│   ├── sections/                  # UI de secciones por dominio (sin fetch)
│   │   ├── banking/
│   │   ├── foundations/
│   │   ├── i3/
│   │   ├── programs/
│   │   ├── regional/
│   │   ├── resources/
│   │   ├── sectors/
│   │   ├── shared/                # Heroes, grids genéricos, carruseles
│   │   ├── strategic-sectors/
│   │   └── talent/
│   │
│   ├── news/                      # Listing, detalle, filtros, cards
│   ├── cms/                       # RichText, ContentfulImage, video…
│   ├── contentful/                # Embeds rich text en artículos
│   ├── layout/                    # Header, footer, scroll hash, carga
│   └── ui/                        # Design system (~12 primitivos)
│
├── lib/
│   ├── contentful/
│   │   ├── client.ts, queries.ts, env.ts
│   │   ├── types/                 # Fields + Skeleton por content type
│   │   ├── gridSection/           # sectionVariant, context, helpers
│   │   ├── banner/, carousel/, company/, foundations/
│   │   ├── image/, news/, sector/, statistic/
│   │   ├── strategicSector/, video/, resource/
│   │   └── richText/
│   ├── news/                      # Mappers, pageYouMayAlsoLikeConfig
│   ├── navigation/                # Anchors, hash links
│   ├── hooks/                     # useDebouncedValue, useNewsNavigationPending
│   ├── layout/                    # sectionPadding, compactMobileHeroPages
│   ├── footer/
│   └── fonts/
│
├── config/site.ts
├── scripts/                       # suggest-grid-variants, export-page-seo…
├── docs/
└── features/                      # Reservado (sin módulos aún)
```

### Conteo aproximado de archivos fuente

| Área | Archivos `.ts/.tsx` |
|------|---------------------|
| `components/blocks/` | 18 |
| `components/sections/` | 38 |
| `components/news/` | 48 |
| `components/ui/` | 12 |
| `components/cms/` | 5 |
| `lib/contentful/` | ~55 |
| `lib/news/` | 12 |

---

## 3. Capas y responsabilidades

```
┌─────────────────────────────────────────────────────────┐
│                    Contentful CMS                        │
└─────────────────────────┬───────────────────────────────┘
                          │ SDK (Delivery / Preview)
┌─────────────────────────▼───────────────────────────────┐
│              lib/contentful/                             │
│  queries · types · resolvers · gridSection/              │
└─────────────────────────┬───────────────────────────────┘
                          │ props tipados
┌─────────────────────────▼───────────────────────────────┐
│         components/blocks/                               │
│  PageRenderer · registry · *Block · *WithFetch             │
└─────────────────────────┬───────────────────────────────┘
                          │ composición
┌─────────────────────────▼───────────────────────────────┐
│  components/sections/ · components/news/                 │
│  components/cms/ · components/layout/                    │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│              components/ui/                              │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                   app/ (Next.js)                         │
└─────────────────────────────────────────────────────────┘
```

| Capa | Qué hace | Qué NO hace |
|------|----------|-------------|
| `lib/contentful/` | Fetch, tipos, transformar entries → props | Renderizar JSX |
| `components/blocks/` | Mapear content type → componente; orquestar casos especiales | Estilos de sección detallados |
| `components/sections/` | Layout visual de una sección de página | Conocer Contentful SDK |
| `components/ui/` | Primitivos reutilizables | Lógica de dominio |
| `components/news/` | Todo el flujo editorial | — |
| `components/cms/` | Render de assets y rich text genérico | Layout de página completa |

**Imports:** siempre por path directo (`@/components/ui/Button`). No hay barrels `index.ts` en ui/, sections/ ni cms/ (se eliminaron por no usarse).

---

## 4. Flujo: de la URL al render

```
Browser URL
     │
     ├── / ──────────────────► redirect → /inicio
     │
     ├── /quienes-somos ─────► getPageByPath() → PageRenderer
     │
     ├── /sectores/banca ────► getPageByPath() o sector entry → PageRenderer
     │                         (+ fallbacks Sector*WithFetch)
     │
     └── /noticias/slug ─────► getNewsByPath() → NewsDetailView
```

### Paso a paso

1. **`app/layout.tsx`** — Carga header (`getHeader()`), aplica fuentes, renderiza `<main>{children}</main>` y `SiteFooter`.

2. **`app/[...page]/page.tsx`** — Punto central:
   - Convierte segmentos en path (`/foo/bar`).
   - `getPageByPath(page)` → si hay match, `PageRenderer` con `fields.content`.
   - Si no hay página: `getNewsByPath(page)` → `NewsDetailView`.
   - Metadata SEO desde campos de page, sector o news.

3. **`PageRenderer`** — Itera entries del CMS:
   - **I3:** empareja `i3-innovation` + `i3-conversations` consecutivos → `I3InnovationSplitSection`.
   - **Sector:** si es página de sector sin bloques CMS, inyecta hero/empresas/noticias vía `*WithFetch`.
   - **Noticias hub:** lógica de filtros URL; append de `AllNewsSectionWithFetch` y `YouMayAlsoLikeSectionWithFetch` en páginas configuradas.
   - **Resto:** `blockRegistry[contentTypeId]({ fields, pagePath, … })`.

4. **`GridSectionBlock`** — Delega a `renderGridSection()` → variant por `sectionVariant` → renderer en `renderers.tsx`.

---

## 5. Integración con Contentful

### Cliente (`lib/contentful/client.ts`)

Factory `getContentfulClient()` — alterna Delivery / Preview según `lib/env.ts`.

### Queries principales (`lib/contentful/queries.ts`)

| Función | Content type | Uso |
|---------|--------------|-----|
| `getPageByPath(page[])` | `page` | Páginas CMS por path |
| `getNewsByPath(page[])` | `news` | Artículo `/noticias/{slug}` |
| `getNewsListItems(options)` | `news` | Listado paginado + filtros |
| `getHeader()` / `getFooter()` | `header` / `footer` | Layout global |
| `getNewsFilterCompanies()` | `company` | Filtro de empresas |
| `getFooterCompanyLinks()` etc. | varios | Datos del footer |

### Tipos (`lib/contentful/types/`)

Un módulo por content type: `PageFields`, `NewsFields`, `GridSectionFields`, etc.  
Export central en `types/index.ts`.

`GridSectionFields` incluye:

```ts
{
  contentfulName: string;      // display/admin en Contentful
  sectionVariant?: string;     // slug que elige el layout (obligatorio en prod)
  title?, subtitle?, body?, items?, image?, cardStyle?, …
}
```

### Resolvers por dominio

| Carpeta | Transforma |
|---------|------------|
| `sector/` | Grids de sectores, empresas por página de sector |
| `company/` | Logos para carrusel y logo-grid |
| `foundations/` | Imágenes + CTA de fundaciones |
| `strategicSector/` | Items del panel interactivo |
| `statistic/` | Métricas para banners y compromiso regional |
| `carousel/` | Items de carrusel de empresas |
| `gridSection/` | Context de sección, fetch por variant, anchors |
| `news/` | Filtros URL, categorías, badges |

### Helpers compartidos

- `getAssetUrl.ts` — URLs de assets Contentful
- `resolveNavLink.ts` — entries `link` / `externalLink` → href + label
- `includeDepth.ts` — profundidad de `include` en queries

---

## 6. Sistema de bloques CMS

### Registry (`components/blocks/registry.ts`)

| Content type ID | Componente | Notas |
|-----------------|------------|-------|
| `banner` | `BannerBlock` | Hero, estadísticas, Qualia |
| `card` | `CardBlock` | Tarjeta suelta (CTA fundaciones) |
| `externalLink` | `ExternalLinkBlock` | iframe embed |
| `featuredNews` | `FeaturedNewsBlock` | Hub `/noticias` |
| `gridSection` | `GridSectionBlock` | Polivalente — ver §7 |
| `image` | `ImageBlock` | Imagen suelta |
| `richTextBlock` | `RichTextBlock` | Rich text |
| `video` | `VideoBlock` | Video Contentful |

### Bloques auxiliares (fuera del registry)

| Archivo | Usado por |
|---------|-----------|
| `CarouselSectionWithFetch.tsx` | `gridSection/renderers.tsx` (business-ecosystem, carousel) |
| `SectorCompaniesSectionWithFetch.tsx` | PageRenderer + renderer sector-companies |
| `SectorPageHeroWithFetch.tsx` | PageRenderer (páginas de sector) |
| `SectorRelatedNewsSectionWithFetch.tsx` | PageRenderer (páginas de sector) |

### PageRenderer — casos especiales

| Caso | Comportamiento |
|------|----------------|
| I3 consecutivo | Fusiona innovation + conversations en split section |
| I3 solo | Innovation split o panel de conversaciones |
| `/noticias` con filtros | Solo hero + filtros + resultados filtrados |
| `/noticias` sin filtros | Hero + bloques CMS + `AllNewsSectionWithFetch` |
| Páginas con config YMAL | Append `YouMayAlsoLikeSectionWithFetch`; omite bloques CMS `you-may-also-like` |
| Página de sector vacía | Inyecta hero, empresas y noticias relacionadas |

Config YMAL en `lib/news/pageYouMayAlsoLikeConfig.ts`:

- `quienes-somos` — 3 recientes
- `economias-regionales` — categoría Desarrollo regional
- `nuestro-impacto` — Educación / Innovación / Comunidad

### Banner: registry por `bannerVariant`

```
BannerBlock
      │
      ▼
renderBanner()               ← renderBanner.tsx
      │
      ├── buildBannerContext()
      ├── normalizeBannerVariant()
      └── bannerRenderers[variant]  ← banner/renderers.tsx
                │
                ▼
         HeroBanner | StatisticsBanner | QualiaBanner
```

| `bannerVariant` | Componente UI |
|-----------------|---------------|
| `hero` | `HeroBanner` (+ body/CTAs opcionales) |
| `statistics` | `StatisticsBanner` |
| `qualia` | `QualiaBanner` |

Campo opcional **`sectionId`** en CMS → prop `id` de `HeroBanner` (anchor hash).

Constantes: `lib/contentful/banner/bannerVariants.ts`  
Auditoría: `yarn suggest-banner-variants`

---

## 7. GridSection: registry por sectionVariant

### Arquitectura actual

```
GridSectionBlock
      │
      ▼
renderGridSection()          ← resolveGridSection.tsx
      │
      ├── buildGridSectionContext()   ← normaliza fields, cards, items, anchors
      ├── normalizeSectionVariant()   ← lee sectionVariant del CMS
      └── gridSectionRenderers[variant]  ← renderers.tsx
                │
                ▼
         components/sections/*
```

**Ya no hay matching por `contentfulName`.** Si falta o es inválido el variant, cae en `default` y avisa en dev (`sectionVariantLogger.ts`).

### Variants (`lib/contentful/gridSection/sectionVariants.ts`)

| `sectionVariant` | Componente UI |
|------------------|-----------------|
| `sectors-grid` | `SectorsGridSection` |
| `logo-grid` | `LogoGridSection` |
| `you-may-also-like` | `YouMayAlsoLikeSection` |
| `news-detail-more-about-group` | `NewsDetailMoreAboutGroupSection` |
| `resource-center` | `ResourceCenterSection` |
| `sector-companies` | `SectorCompaniesSectionWithFetch` |
| `hiring-room-cta` | `HiringRoomCtaSection` |
| `in-person-dynamics` | `InPersonDynamicsSection` |
| `fundaciones-grupo-petersen` | `FoundationsGridSection` |
| `fundaciones-cta` | `FoundationsConoceCtaCard` |
| `regional-economies-commitment` | `RegionalCommitmentSection` |
| `strategic-sectors` | `StrategicSectorsSection` |
| `business-ecosystem` | `CarouselSectionWithFetch` |
| `carousel` | `CarouselSectionWithFetch` |
| `programs-development` | `ProgramsDevelopmentSection` |
| `image-overlay-grid` | `ImageOverlayGridSection` |
| `bordered-grid` | `BorderedGridSection` |
| `icon-card-grid` | `IconCardGridSection` |
| `banking-connect` | `BankingConnectSection` |
| `banking-sustainability` | `BankingSustainabilitySection` |
| `talent-culture` | `TalentCultureSection` + news fetch |
| `i3-innovation` / `i3-conversations` | null en block — PageRenderer los maneja |
| `default` | Layout genérico con `GridSectionHeader` |

### Archivos del módulo

| Archivo | Rol |
|---------|-----|
| `buildGridSectionContext.ts` | Contexto unificado para renderers |
| `gridSectionHelpers.ts` | Cards, layout hints de image-overlay |
| `fetchGridSectionBySectionVariant.ts` | Fetch entry suelta por variant (ej. detalle noticia) |
| `i3Section.ts` | Detectores I3 por variant |
| `resolveGridSectionAnchorId.ts` | IDs para navegación hash |
| `sectionVariantLogger.ts` | Warnings en dev |

### cardStyle en CMS

Campo opcional `cardStyle` en gridSection: `ImageOverlayCard`, `FeatureCard`, `IconCard`.  
Resuelto por `resolveGridSectionCardStyle()` en tipos.

---

## 8. Módulo de noticias

### Rutas

| URL | Vista |
|-----|-------|
| `/noticias` | Hub (FeaturedNewsBlock + secciones) |
| `/noticias/{slug}` | `NewsDetailView` |
| `/noticias?categoria=&empresa=&q=` | Listing filtrado |

### Estructura `components/news/`

| Grupo | Ejemplos |
|-------|----------|
| Listing | `FeaturedNewsSection`, `LatestNewsSection`, `AllNewsSection` |
| Fetch wrappers | `*WithFetch` envueltos en Suspense |
| Filtros (client) | `NewsFiltersSection`, chips, dropdown, sheet mobile |
| Detalle | `NewsDetailView`, `NewsRichText`, sidebar, share |
| Relacionadas | `YouMayAlsoLikeSection`, `RelatedNewsSection`, `NewsDetailMoreAboutGroup*` |

### Lógica en `lib/news/`

| Módulo | Función |
|--------|---------|
| `mapFeaturedNewsItem.ts` | Entry → props tarjeta |
| `mapNewsListItem.ts` | Entry → props listado |
| `buildNewsArticleContext.ts` | Fecha, lectura, empresa |
| `pageYouMayAlsoLikeConfig.ts` | Config por slug de página |
| `readingTime.ts`, `formatNewsDate.ts` | Utilidades |

### Filtros URL (`lib/contentful/news/newsListFilters.ts`)

| Param | Significado |
|-------|-------------|
| `categoria` | Categoría editorial |
| `empresa` | Nombres separados por coma |
| `q` | Búsqueda full-text |

Debounced 400ms (`useDebouncedValue`); estado en URL para compartir y back-button.

---

## 9. Layout global

### Header

| Archivo | Tipo |
|---------|------|
| `Header.tsx` | Server — logo + nav desde CMS |
| `HeaderNav.tsx` | Client — menú mobile |

### Footer

| Archivo | Rol |
|---------|-----|
| `SiteFooter.tsx` | Server — agrega queries (empresas, recursos, páginas) |
| `Footer.tsx` | Presentacional |
| `footer/FooterColumn.tsx`, `FooterLinkList.tsx`, `FooterIcons.tsx` | Subcomponentes |

### Otros layout

- `HashScrollOnLoad.tsx` — scroll a hash en carga
- `PageLoadCoordinator.tsx` / `AfterHeroSectionWrap.tsx` — coordinación visual post-hero
- `LoadingSpinner` en `ui/` — spinners inline

---

## 10. Caché, ISR y revalidación

| Config | Valor |
|--------|-------|
| `revalidate` | 3600 s (1 h) en layout y `[...page]` |

**Webhook on-demand:**

```
POST /api/revalidate?secret=XXX&path=/ruta
```

**Suspense:** secciones async de noticias, talent-culture news, sector companies, etc.

---

## 11. Scripts de mantenimiento

| Script | Comando | Función |
|--------|---------|---------|
| `suggest-grid-section-variants.ts` | `yarn suggest-grid-variants` | Audita `sectionVariant` de todos los gridSection en CMS |
| `export-page-seo.mjs` | manual | Export meta SEO |
| `analyze-include-depth.mjs` | manual | Analiza profundidad de includes Contentful |

---

## 12. Convenciones de código

| Convención | Detalle |
|------------|---------|
| Alias `@/` | Imports desde raíz del proyecto |
| Block registry | Un componente por content type ID |
| `*WithFetch` | Server component async + Suspense en el padre |
| `sectionVariant` | Slug CMS que elige layout de gridSection |
| `contentfulName` | Solo identificador admin/display — no lógica de routing |
| Server-first | `'use client'` solo con interactividad |
| Tipado Contentful | `Fields` + `Skeleton` por content type |
| Estilos | Tailwind 4, tokens en `globals.css` |
| `cn()` | clsx + tailwind-merge en `lib/utils.ts` |

### Agregar una nueva variante de gridSection

1. Agregar slug en `GRID_SECTION_VARIANTS` (`sectionVariants.ts`).
2. Implementar renderer en `renderers.tsx` (usar sección existente o crear en `sections/`).
3. Setear `sectionVariant` en la entry de Contentful.
4. Correr `yarn suggest-grid-variants` para verificar.

### Agregar un bloque CMS nuevo

1. Content type en Contentful.
2. Tipos en `lib/contentful/types/`.
3. `components/blocks/XBlock.tsx`.
4. Entrada en `registry.ts`.

---

## 13. Mapa de archivos clave

| Responsabilidad | Archivo |
|-----------------|---------|
| Routing catch-all | `app/[...page]/page.tsx` |
| Layout raíz | `app/layout.tsx` |
| Orquestación bloques | `components/blocks/PageRenderer.tsx` |
| Registry bloques | `components/blocks/registry.ts` |
| Variants gridSection | `lib/contentful/gridSection/sectionVariants.ts` |
| Renderers gridSection | `components/blocks/gridSection/renderers.tsx` |
| Context gridSection | `lib/contentful/gridSection/buildGridSectionContext.ts` |
| Hub noticias | `components/blocks/FeaturedNewsBlock.tsx` |
| Queries CMS | `lib/contentful/queries.ts` |
| Filtros noticias | `lib/contentful/news/newsListFilters.ts` |
| Config YMAL por página | `lib/news/pageYouMayAlsoLikeConfig.ts` |
| Webhook ISR | `app/api/revalidate/route.ts` |
| Config sitio | `config/site.ts` |
| Tokens CSS | `app/globals.css` |

---

## 14. Próximos pasos sugeridos

### Completado recientemente

- [x] Reorganización `components/` (ui, sections, cms, news)
- [x] Registry gridSection por `sectionVariant`
- [x] Migración CMS de todos los gridSection entries
- [x] Eliminación de matching legacy por `contentfulName` en gridSection y banner
- [x] Eliminación de `sectorsGridSection` content type en código
- [x] Limpieza de código muerto (WithFetch huérfanos, barrels sin uso)

### Pendiente / mejoras

| Tarea | Prioridad | Notas |
|-------|-----------|-------|
| Tests unitarios (filtros, mappers, normalizeSectionVariant) | Alta | Vitest sugerido |
| Reducir `include` depth en queries | Media | Ver `includeDepth.ts` |
| `generateStaticParams` para rutas principales | Media | `getAllPagePaths()` existe |
| Suspense granular por bloque pesado | Baja | Skeletons específicos |
| Adoptar `features/` por dominio | Baja | Opcional; estructura actual funciona |
| Fix TS en `segmentNewsRichTextContent.ts` | Media | Error preexistente en build |
| Storybook / catálogo UI | Baja | Documentación visual |

---

## Apéndice — Content types Contentful

```
banner | card | externalLink | featuredNews | gridSection | image |
richTextBlock | video | page | news | link | header | footer |
company | sector | strategicSector | statistic | downloadableDocuments |
quoteBlock | navigationMenu
```

> `sectorsGridSection` fue consolidado en `gridSection` con `sectionVariant: "sectors-grid"`.

---

*Para exportar a PDF: `npx md-to-pdf docs/ARQUITECTURA-PROYECTO.md`*
