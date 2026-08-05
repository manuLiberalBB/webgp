'use client';

import { useEffect } from 'react';

const PAGE_LOADING_CLASS = 'is-page-loading';

/** Removes the initial-load cloak once page content has mounted. */
export function PageContentReady() {
  useEffect(() => {
    document.documentElement.classList.remove(PAGE_LOADING_CLASS);
  }, []);

  return null;
}
