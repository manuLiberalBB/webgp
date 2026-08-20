const CONTENTFUL_ASSET_HOSTS = new Set(['assets.ctfassets.net', 'images.ctfassets.net']);

export function getFileExtension(href: string): string | undefined {
  try {
    const assetFileName = new URL(href).pathname.split('/').pop();
    if (!assetFileName?.includes('.')) return undefined;

    return assetFileName.slice(assetFileName.lastIndexOf('.') + 1);
  } catch {
    return undefined;
  }
}

export function resolveDownloadFileName(href: string, label: string): string {
  const baseName =
    label
      .trim()
      .replace(/[\\/:*?"<>|]/g, '-')
      .replace(/\s+/g, ' ') || 'recurso';
  const extension = getFileExtension(href);

  if (!extension) return baseName;

  const normalizedExtension = extension.toLowerCase();
  if (baseName.toLowerCase().endsWith(`.${normalizedExtension}`)) {
    return baseName;
  }

  return `${baseName}.${extension}`;
}

export function isContentfulAssetUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === 'https:' && CONTENTFUL_ASSET_HOSTS.has(parsed.hostname)
    );
  } catch {
    return false;
  }
}

export function buildResourceDownloadApiUrl(href: string, fileName: string): string {
  const params = new URLSearchParams({
    url: href,
    filename: fileName,
  });

  return `/api/resource-download?${params.toString()}`;
}

export function buildContentDispositionHeader(fileName: string): string {
  const asciiFallback = fileName.replace(/[^\x20-\x7E]/g, '_');
  return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}
