import type { Asset } from 'contentful';

/** Resuelve dimensiones de un asset de imagen de Contentful. */
export function getAssetDimensions(
  asset: Asset,
  fallback = { width: 800, height: 600 },
): { width: number; height: number } {
  const file = asset.fields.file;
  const details =
    typeof file === 'object' && file && 'details' in file ? file.details : undefined;

  if (details && typeof details === 'object' && 'image' in details) {
    const image = details.image as { width?: number; height?: number } | undefined;
    return {
      width: image?.width ?? fallback.width,
      height: image?.height ?? fallback.height,
    };
  }

  return fallback;
}
