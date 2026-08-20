const VALIDATION_TIMEOUT_MS = 8_000;

export function isValidEmbedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

async function fetchEmbedUrl(url: string, method: 'HEAD' | 'GET'): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), VALIDATION_TIMEOUT_MS);

  try {
    return await fetch(url, {
      method,
      signal: controller.signal,
      redirect: 'follow',
      cache: 'no-store',
      headers: method === 'GET' ? { Range: 'bytes=0-0' } : undefined,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function isSuccessfulResponse(response: Response): boolean {
  return response.ok || (response.status >= 300 && response.status < 400);
}

export async function validateExternalEmbedUrl(url: string): Promise<boolean> {
  if (!isValidEmbedUrl(url)) return false;

  try {
    const headResponse = await fetchEmbedUrl(url, 'HEAD');

    if (headResponse.status === 405 || headResponse.status === 501) {
      const getResponse = await fetchEmbedUrl(url, 'GET');
      return isSuccessfulResponse(getResponse);
    }

    return isSuccessfulResponse(headResponse);
  } catch {
    try {
      const getResponse = await fetchEmbedUrl(url, 'GET');
      return isSuccessfulResponse(getResponse);
    } catch {
      return false;
    }
  }
}
