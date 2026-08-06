'use client';

import Link from 'next/link';
import { useState } from 'react';

import { FOOTER_MOBILE_VISIBLE_LINKS } from '@/lib/footer/constants';
import type { FooterLinkItem } from '@/lib/footer/types';
import { cn } from '@/lib/utils';

type FooterLinkListProps = {
  items: FooterLinkItem[];
  className?: string;
  download?: boolean;
};

function FooterLink({
  item,
  download,
}: {
  item: FooterLinkItem;
  download?: boolean;
}) {
  return (
    <Link
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      download={download ? true : undefined}
      className="text-footer-text hover:text-footer-heading text-sm leading-5 transition-colors"
    >
      {item.label}
    </Link>
  );
}

export function FooterLinkList({ items, className, download }: FooterLinkListProps) {
  const [showAllMobile, setShowAllMobile] = useState(false);
  const hasMoreMobile = items.length > FOOTER_MOBILE_VISIBLE_LINKS;
  const mobileItems = showAllMobile
    ? items
    : items.slice(0, FOOTER_MOBILE_VISIBLE_LINKS);

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <ul className="flex flex-col gap-3 md:hidden">
        {mobileItems.map((item) => (
          <li key={item.id}>
            <FooterLink item={item} download={download} />
          </li>
        ))}
      </ul>

      {hasMoreMobile && !showAllMobile ? (
        <button
          type="button"
          onClick={() => setShowAllMobile(true)}
          className="text-link-cta w-fit text-sm leading-5 transition-opacity hover:opacity-80 md:hidden"
        >
          Ver todas
        </button>
      ) : null}

      <ul className="hidden flex-col gap-3 md:flex">
        {items.map((item) => (
          <li key={item.id}>
            <FooterLink item={item} download={download} />
          </li>
        ))}
      </ul>
    </div>
  );
}
