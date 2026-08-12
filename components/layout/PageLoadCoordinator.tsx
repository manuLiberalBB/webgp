'use client';

import { useEffect } from 'react';

const PAGE_LOADING_CLASS = 'is-page-loading';
const REVEAL_TIMEOUT_MS = 1200;

function getPriorityImages() {
  return Array.from(
    document.querySelectorAll<HTMLImageElement>(
      'main img[fetchpriority="high"], main img[loading="eager"]',
    ),
  );
}

function isImageReady(img: HTMLImageElement) {
  return img.complete && img.naturalWidth > 0;
}

function waitForImages(images: HTMLImageElement[]) {
  const pending = images.filter((img) => !isImageReady(img));

  if (pending.length === 0) {
    return Promise.resolve();
  }

  return Promise.all(
    pending.map(
      (img) =>
        new Promise<void>((resolve) => {
          const done = () => resolve();
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
        }),
    ),
  );
}

/** Removes the initial-load cloak once priority images have loaded (with a short fallback). */
export function PageContentReady() {
  useEffect(() => {
    let cancelled = false;

    const reveal = () => {
      if (!cancelled) {
        document.documentElement.classList.remove(PAGE_LOADING_CLASS);
      }
    };

    const priorityImages = getPriorityImages();

    if (priorityImages.length === 0) {
      reveal();
      return () => {
        cancelled = true;
      };
    }

    const timeoutId = window.setTimeout(reveal, REVEAL_TIMEOUT_MS);

    void waitForImages(priorityImages).then(reveal);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
