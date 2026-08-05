'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { scrollToSectionAnchor } from '@/lib/navigation/parseHashHref';

export function HashScrollOnLoad() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '');

    if (!hash) return;

    const timeoutId = window.setTimeout(() => {
      scrollToSectionAnchor(hash);
    }, 150);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
}
