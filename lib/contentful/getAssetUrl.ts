import type { Asset } from 'contentful';

/** Resuelve la URL HTTPS de un asset de Contentful. */
export function getAssetUrl(asset?: Asset | null): string | undefined {
  if (!asset?.fields) return undefined;

  const file = asset.fields.file;
  const url = typeof file === 'object' && file && 'url' in file ? file.url : undefined;
  if (!url || typeof url !== 'string') return undefined;
  return url.startsWith('//') ? `https:${url}` : url;
}
