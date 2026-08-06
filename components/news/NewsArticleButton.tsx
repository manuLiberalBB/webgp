'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { buttonVariants } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';

import { useNewsNavigationPending } from '@/lib/hooks/useNewsNavigationPending';

type NewsArticleButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function NewsArticleButton({ href, children, className }: NewsArticleButtonProps) {
  const { pending, showOverlay, markPending } = useNewsNavigationPending();

  return (
    <Link
      href={href}
      aria-busy={pending || undefined}
      onClick={markPending}
      className={cn(buttonVariants(), className, pending && 'cursor-wait')}
    >
      {showOverlay ? (
        <LoadingSpinner size="sm" className="border-white/20 border-t-white" />
      ) : (
        children
      )}
    </Link>
  );
}
