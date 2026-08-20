'use client';

import { useState } from 'react';

import {
  buildResourceDownloadApiUrl,
  resolveDownloadFileName,
} from '@/lib/resourceCenter/resourceCenterDownload';
import { cn } from '@/lib/utils';

type ResourceCenterDownloadButtonProps = {
  href: string;
  label: string;
  className?: string;
};

async function triggerBlobDownload(blob: Blob, fileName: string) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = fileName;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(objectUrl);
}

export function ResourceCenterDownloadButton({
  href,
  label,
  className,
}: ResourceCenterDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const fileName = resolveDownloadFileName(href, label);

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);

    try {
      const response = await fetch(buildResourceDownloadApiUrl(href, fileName));

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      await triggerBlobDownload(blob, fileName);
    } catch {
      window.alert('No se pudo descargar el archivo. Intentá nuevamente.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      aria-busy={isDownloading}
      className={cn(
        'text-link-cta shrink-0 cursor-pointer bg-transparent p-0 text-base leading-6 transition-opacity',
        'hover:opacity-80 disabled:cursor-wait disabled:opacity-60',
        className,
      )}
    >
      {isDownloading ? 'Descargando...' : 'Descargar'}
    </button>
  );
}
