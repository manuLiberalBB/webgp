import {
  buildContentDispositionHeader,
  isContentfulAssetUrl,
} from '@/lib/resourceCenter/resourceCenterDownload';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const filename = searchParams.get('filename')?.trim();

  if (!url || !filename || !isContentfulAssetUrl(url)) {
    return new Response('Invalid download request', { status: 400 });
  }

  try {
    const assetResponse = await fetch(url, { cache: 'no-store' });

    if (!assetResponse.ok) {
      return new Response('Asset unavailable', { status: assetResponse.status });
    }

    const contentType =
      assetResponse.headers.get('Content-Type') ?? 'application/octet-stream';

    return new Response(assetResponse.body, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': buildContentDispositionHeader(filename),
        'Cache-Control': 'private, no-store',
      },
    });
  } catch {
    return new Response('Download failed', { status: 502 });
  }
}
