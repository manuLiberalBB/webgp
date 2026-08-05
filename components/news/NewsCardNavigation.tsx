'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';

import { useNewsNavigationPending } from './useNewsNavigationPending';

type OverlayTone = 'dark' | 'light';

function NewsCardPendingOverlay({ tone }: { tone: OverlayTone }) {
  return (
    <span
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 z-20 flex items-center justify-center',
        tone === 'dark' ? 'bg-black/25' : 'bg-white/60',
      )}
    >
      <LoadingSpinner
        size="md"
        className={tone === 'dark' ? 'border-white/20 border-t-white' : undefined}
      />
    </span>
  );
}

type NewsCardOverlayLinkProps = {
  href: string;
  ariaLabel: string;
  overlayTone?: OverlayTone;
  className?: string;
};

/** Link de overlay para cards con `position: relative`. */
export function NewsCardOverlayLink({
  href,
  ariaLabel,
  overlayTone = 'dark',
  className,
}: NewsCardOverlayLinkProps) {
  const { pending, showOverlay, markPending } = useNewsNavigationPending();

  return (
    <>
      <Link
        href={href}
        aria-label={ariaLabel}
        aria-busy={pending || undefined}
        onClick={markPending}
        className={cn('absolute inset-0 z-0', pending && 'cursor-wait', className)}
      />
      {showOverlay ? <NewsCardPendingOverlay tone={overlayTone} /> : null}
    </>
  );
}

type NewsCardArticleShellProps = {
  href: string;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  overlayTone?: OverlayTone;
};

/** Contenedor clickeable para cards con varios elementos internos. */
export function NewsCardArticleShell({
  href,
  ariaLabel,
  children,
  className,
  overlayTone = 'light',
}: NewsCardArticleShellProps) {
  const { pending, showOverlay, markPending } = useNewsNavigationPending();

  return (
    <article className={cn('group relative', className, pending && 'cursor-wait')}>
      <Link
        href={href}
        aria-label={ariaLabel}
        aria-busy={pending || undefined}
        onClick={markPending}
        className="absolute inset-0 z-0"
      />
      {showOverlay ? <NewsCardPendingOverlay tone={overlayTone} /> : null}
      <div className="pointer-events-none relative z-10">{children}</div>
    </article>
  );
}

type NewsCardLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  overlayTone?: OverlayTone;
};

/** Link con feedback de carga para bloques puntuales (imagen, título). */
export function NewsCardLink({
  href,
  children,
  className,
  overlayTone = 'light',
}: NewsCardLinkProps) {
  const { pending, showOverlay, markPending } = useNewsNavigationPending();

  return (
    <Link
      href={href}
      aria-busy={pending || undefined}
      onClick={markPending}
      className={cn('relative block', className, pending && 'cursor-wait')}
    >
      {children}
      {showOverlay ? (
        <span
          aria-hidden
          className={cn(
            'absolute inset-0 z-10 flex items-center justify-center',
            overlayTone === 'dark' ? 'bg-black/25' : 'bg-white/60',
          )}
        >
          <LoadingSpinner
            size="sm"
            className={overlayTone === 'dark' ? 'border-white/20 border-t-white' : undefined}
          />
        </span>
      ) : null}
    </Link>
  );
}
