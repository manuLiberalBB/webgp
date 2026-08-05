import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function NewsSidebarSectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'text-news-meta text-xs leading-none font-normal tracking-[1.89px] uppercase',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function NewsSidebarDivider({ className }: { className?: string }) {
  return <div className={cn('bg-news-divider h-px w-full', className)} aria-hidden />;
}

export function NewsSidebarArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M4.5 2.5L8 6L4.5 9.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NewsSidebarTextLink({
  href,
  children,
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'text-link-cta inline-flex items-center gap-1.5 text-xs leading-4',
        className,
      )}
    >
      {children}
      <NewsSidebarArrowIcon />
    </Link>
  );
}
