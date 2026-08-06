import Link from 'next/link';

import { buildNewsCategoryFilterHref } from '@/lib/contentful/news/newsListFilters';
import { newsCategoryBadgeStyles } from '@/lib/contentful/news/categoryBadgeStyles';
import type { NewsCategory } from '@/lib/contentful/types/news';
import { cn } from '@/lib/utils';

type NewsCategoryBadgeProps = {
  category: NewsCategory;
  className?: string;
};

export function NewsCategoryBadge({ category, className }: NewsCategoryBadgeProps) {
  const styles = newsCategoryBadgeStyles[category];

  return (
    <Link
      href={buildNewsCategoryFilterHref(category)}
      className={cn(
        'relative z-10 inline-flex w-fit shrink-0 items-center justify-center self-start rounded px-1.5 py-1 text-[10px] font-normal tracking-[1px] uppercase transition-opacity hover:opacity-80',
        className,
      )}
      style={{
        backgroundColor: styles.background,
        color: styles.color,
      }}
    >
      {category}
    </Link>
  );
}
