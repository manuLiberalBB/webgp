'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';

import {
  normalizePathname,
  parseHashHref,
  scrollToSectionAnchor,
} from '@/lib/navigation/parseHashHref';

type HashNavLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function HashNavLink({ href, className, children }: HashNavLinkProps) {
  const pathname = usePathname();
  const { pathname: linkPath, hash } = parseHashHref(href);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!hash) return;

    const isSamePage =
      normalizePathname(linkPath) === normalizePathname(pathname);

    if (!isSamePage) return;

    event.preventDefault();

    scrollToSectionAnchor(hash);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
