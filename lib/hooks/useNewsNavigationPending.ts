'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const NEWS_NAVIGATION_OVERLAY_DELAY_MS = 100;

export function useNewsNavigationPending() {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setPending(false);
    setShowOverlay(false);
  }, [pathname]);

  useEffect(() => {
    if (!pending) {
      setShowOverlay(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowOverlay(true);
    }, NEWS_NAVIGATION_OVERLAY_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [pending]);

  const markPending = useCallback(() => {
    setPending(true);
  }, []);

  return { pending, showOverlay, markPending };
}
