'use client';

import { useLayoutEffect, useRef, type RefObject } from 'react';

export const SECTORS_GRID_EQUAL_HEIGHT_SELECTOR = '[data-sector-grid-card]';

export function useSectorsGridEqualHeights(deps: unknown[]): RefObject<HTMLDivElement | null> {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const syncHeights = () => {
      const cards = root.querySelectorAll<HTMLElement>(SECTORS_GRID_EQUAL_HEIGHT_SELECTOR);

      cards.forEach((card) => {
        card.style.minHeight = '';
      });

      let maxHeight = 0;
      cards.forEach((card) => {
        maxHeight = Math.max(maxHeight, card.getBoundingClientRect().height);
      });

      if (maxHeight <= 0) return;

      cards.forEach((card) => {
        card.style.minHeight = `${maxHeight}px`;
      });
    };

    syncHeights();

    const resizeObserver = new ResizeObserver(syncHeights);
    resizeObserver.observe(root);

    window.addEventListener('resize', syncHeights);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', syncHeights);
    };
  }, deps);

  return rootRef;
}
