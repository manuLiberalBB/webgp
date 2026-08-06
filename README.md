# webGP_v2

Rediseño de Grupo Petersen — Next.js 15 + Contentful.

## Stack

- Next.js 15 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS 4
- Contentful (Delivery + Preview)

## Estructura

```
app/                    # Rutas y layout
  [...page]/            # Páginas dinámicas desde Contentful
  api/revalidate/       # Webhook on-demand ISR
components/
  ui/                   # Design system (Container, Section, Button…)
  blocks/               # Bloques CMS + registry + PageRenderer
  layout/               # Header, Footer (pendiente)
features/               # Módulos por dominio (contact, articles…)
lib/
  contentful/           # Cliente, queries, tipos
config/                 # Configuración del sitio
```

## Content types en Contentful (fase actual)dd

Solo dos tipos por ahora:

### `link` (Enlace Interno)

| Campo (ID)      | Tipo   | Requerido | Notas                          |
|-----------------|--------|-----------|--------------------------------|
| `contentfulName` | Symbol | sí        | Display field, único           |
| `link`          | Symbol | sí        | URL interna (`/inicio`, etc.)  |

Tipo TS: `lib/contentful/types/link.ts` · helper: `getLinkHref()`

### `page` (Página)

| Campo (ID)        | Tipo              | Requerido | Notas                              |
|-------------------|-------------------|-----------|------------------------------------|
| `contentfulName`   | Symbol            | sí        | Display field, único               |
| `title`           | Symbol            | sí        | Título SEO                         |
| `metaDescription` | Symbol            | sí        | Meta descripción SEO               |
| `keywords`        | Array (Symbol)    | no        | Palabras clave SEO                 |
| `path`            | Link → `link`     | sí        | Ruta interna de la página          |
| `content`         | Array (Entry)     | sí        | Bloques de la página               |

Tipo TS: `lib/contentful/types/page.ts` · `formatPageKeywords()`

> v1 usaba content type `url` con campo `url`. v2 usa `link` con campo `link`.

### `richTextBlock` (Bloque de Texto Enriquecido)

| Campo (ID)      | Tipo     | Requerido | Notas                    |
|-----------------|----------|-----------|--------------------------|
| `contentfulName` | Symbol   | sí        | Display field            |
| `content`       | RichText | sí        | Cuerpo con formato       |

- Tipo TS: `lib/contentful/types/richTextBlock.ts`
- Bloque: `components/blocks/RichTextBlock.tsx`
- UI: `components/ui/RichText.tsx` (renderer compartido)

Registrado en `components/blocks/registry.ts` como `richTextBlock`.

### `news` (Noticia)

| Campo (ID)        | Tipo              | Requerido | Notas                                      |
|-------------------|-------------------|-----------|--------------------------------------------|
| `contentfulName`  | Symbol            | sí        | Display field, único                       |
| `title`           | Symbol            | sí        | Título SEO                                 |
| `metaDescription` | Symbol          | sí        | Meta descripción SEO                       |
| `keywords`        | Array (Symbol)    | no        | Palabras clave SEO                         |
| `noticeTitle`     | Symbol            | sí        | Título visible de la noticia, único        |
| `subtitle`        | Symbol            | no        | Bajada o subtítulo                         |
| `path`            | Symbol            | sí        | Slug de la noticia (`mi-noticia`)          |
| `companies`       | Array → `company` | no      | Empresas relacionadas                      |
| `category`        | Symbol (enum)     | no        | Categoría editorial                        |
| `tags`            | Array (Symbol)    | no        | Etiquetas                                  |
| `coverImage`      | Link → Asset      | sí        | Imagen de portada                          |
| `content`         | RichText          | sí        | Cuerpo de la noticia                       |

Tipo TS: `lib/contentful/types/news.ts` · helpers: `getNewsPath()`, `formatPageKeywords()`

## Agregar un bloque CMS

1. Crear el content type en Contentful (ej. `hero`).
2. Crear `components/blocks/HeroBlock.tsx`.
3. Registrar en `components/blocks/registry.ts`:

```ts
import { HeroBlock } from './HeroBlock';

export const blockRegistry = {
  hero: HeroBlock,
};
```

## Variables de entorno

Copiá `.env.example` a `.env` y completá las credenciales de Contentful.

```bash
cp .env.example .env
```

## Instalación

```bash
yarn
```

## Scripts

```bash
yarn dev         # desarrollo (Turbopack)
yarn build       # build producción
yarn start       # servidor en puerto 8080
yarn lint        # ESLint
```

## ISR

- `revalidate = 3600` en `[...page]/page.tsx` (1 hora).
- Webhook: `POST /api/revalidate?secret=XXX&path=/ruta`
