'use client';

import { useEffect, useRef, useState } from 'react';

import { PageContentReady } from '@/components/layout/PageLoadCoordinator';
import { Container } from '@/components/ui/Container';
import { NotFoundContent } from '@/components/ui/NotFoundContent';
import { Section } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

type ExternalLinkEmbedProps = {
  src: string;
  title: string;
  className?: string;
};

const LOAD_TIMEOUT_MS = 12_000;

function UnavailableEmbedFallback() {
  return (
    <>
      <Section>
        <Container>
          <NotFoundContent />
        </Container>
      </Section>
      <PageContentReady />
    </>
  );
}

export function ExternalLinkEmbed({ src, title, className }: ExternalLinkEmbedProps) {
  const [unavailable, setUnavailable] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setUnavailable(false);

    timeoutRef.current = setTimeout(() => {
      setUnavailable(true);
    }, LOAD_TIMEOUT_MS);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [src]);

  const clearLoadTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleLoad = () => {
    clearLoadTimeout();
  };

  const handleError = () => {
    clearLoadTimeout();
    setUnavailable(true);
  };

  if (unavailable) {
    return <UnavailableEmbedFallback />;
  }

  return (
    <section
      className={cn(
        'sticky top-header z-10 flex h-[calc(100dvh-var(--spacing-header))] w-full max-w-full min-w-0 flex-col overflow-hidden bg-surface',
        className,
      )}
      aria-label={title}
    >
      <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
        <iframe
          src={src}
          title={title}
          className="block h-full w-full max-w-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    </section>
  );
}
