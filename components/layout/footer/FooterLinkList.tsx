import Link from 'next/link';

import type { FooterLinkItem } from '@/lib/footer/types';
import { cn } from '@/lib/utils';

type FooterLinkListProps = {
  items: FooterLinkItem[];
  className?: string;
  download?: boolean;
};

export function FooterLinkList({ items, className, download }: FooterLinkListProps) {
  return (
    <ul className={cn('flex flex-col gap-3', className)}>
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            download={download ? true : undefined}
            className="text-footer-text hover:text-footer-heading text-sm leading-5 transition-colors"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
