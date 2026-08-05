/**
 * Profundidad de `include` para la Content Delivery API.
 *
 * Medido con `scripts/analyze-include-depth.mjs` contra develop-v2 (preview):
 * - Páginas (`/inicio`, `/quienes-somos`): include 3 resuelve todo; include 2 deja refs sin resolver.
 * - Páginas con sectores estratégicos (`/economias-regionales`): include 4 resuelve casi todo.
 * - Header / footer: include 2 alcanza (nav → links).
 * - Noticias (detalle): include 2 para cover + embeds; include 3 si hay companies vinculadas.
 * - Listados de noticias: include 2 (coverImage es Asset, no entry).
 */
export const CONTENTFUL_INCLUDE = {
  /** Páginas CMS con bloques anidados (gridSection → items → card/sector/company). */
  page: 4,
  /** Artículo de noticia con rich text embebido y companies opcionales. */
  newsDetail: 3,
  /** Bloque gridSection resuelto fuera del árbol de una page. */
  gridSection: 4,
  /** Header y footer (navigationMenu → links). */
  layout: 2,
  /** Listados y cards de noticias (solo cover + campos escalares). */
  newsList: 2,
  /** Solo metadata SEO — path link + campos escalares. */
  metadata: 1,
  /** Paths de páginas para sitemap / static params. */
  pagePaths: 2,
} as const;

export type ContentfulIncludeDepth =
  (typeof CONTENTFUL_INCLUDE)[keyof typeof CONTENTFUL_INCLUDE];
