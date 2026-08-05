'use client';

import { useEffect } from 'react';

const RESULTS_SECTION_ID = 'todas-las-noticias';

type NewsFilteredResultsScrollProps = {
  scrollKey: string;
};

export function NewsFilteredResultsScroll({ scrollKey }: NewsFilteredResultsScrollProps) {
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 40;

    const scrollToResults = () => {
      const section = document.getElementById(RESULTS_SECTION_ID);
      if (!section) return false;

      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    };

    if (scrollToResults()) return;

    const intervalId = window.setInterval(() => {
      attempts += 1;

      if (scrollToResults() || attempts >= maxAttempts) {
        window.clearInterval(intervalId);
      }
    }, 100);

    return () => window.clearInterval(intervalId);
  }, [scrollKey]);

  return null;
}
