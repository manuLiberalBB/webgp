import Link from 'next/link';

import { buildNewsCompanyFilterHref } from '@/lib/contentful/news/newsListFilters';
import { cn } from '@/lib/utils';

type NewsCompanyBadgeProps = {
  name: string;
  className?: string;
  variant?: 'default' | 'brand' | 'green';
};

const variantClasses = {
  default: 'bg-nav text-white',
  brand: 'bg-cta text-white',
  green: 'bg-[#198038] text-white',
};

export function NewsCompanyBadge({
  name,
  className,
  variant = 'default',
}: NewsCompanyBadgeProps) {
  return (
    <Link
      href={buildNewsCompanyFilterHref(name)}
      className={cn(
        'relative z-10 inline-flex shrink-0 items-center justify-center self-start rounded px-1.5 py-1 text-[10px] font-normal tracking-[1px] uppercase transition-opacity hover:opacity-80',
        variantClasses[variant],
        className,
      )}
    >
      {name}
    </Link>
  );
}
