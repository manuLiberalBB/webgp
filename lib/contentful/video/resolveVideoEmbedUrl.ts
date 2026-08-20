export function parseYoutubeVideoId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^#&?/]+)/,
    /youtube\.com\/embed\/([^#&?/]+)/,
    /youtube\.com\/watch\?v=([^#&?/]+)/,
    /youtube\.com\/shorts\/([^#&?/]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

export function resolveVideoPosterUrl(url: string): string | null {
  const youtubeId = parseYoutubeVideoId(url);
  if (youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  }

  return null;
}

function parseVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1] ?? null;
}

/** Convierte URLs de video externas a una URL embebible en iframe. */
export function resolveVideoEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtube.com') && parsed.pathname.startsWith('/embed/')) {
      return url;
    }

    const youtubeId = parseYoutubeVideoId(url);
    if (youtubeId) {
      return `https://www.youtube.com/embed/${youtubeId}`;
    }

    if (parsed.hostname.includes('player.vimeo.com')) {
      return url;
    }

    const vimeoId = parseVimeoId(url);
    if (vimeoId) {
      return `https://player.vimeo.com/video/${vimeoId}`;
    }

    return url;
  } catch {
    return null;
  }
}

export function withVideoAutoplay(embedUrl: string): string {
  const url = new URL(embedUrl);

  if (url.hostname.includes('youtube.com')) {
    url.searchParams.set('autoplay', '1');
  }

  if (url.hostname.includes('vimeo.com')) {
    url.searchParams.set('autoplay', '1');
  }

  return url.toString();
}
