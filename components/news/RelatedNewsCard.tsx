import { AppImage as Image } from '@/components/cms/AppImage';
import Link from 'next/link';

import { NewsSidebarTextLink } from '@/components/news/sidebar/NewsSidebarPrimitives';
import type { RelatedNewsItem } from '@/lib/news/types';
import { cn } from '@/lib/utils';

type RelatedNewsCardProps = {
  item: RelatedNewsItem;
  showTopSpacing?: boolean;
  className?: string;
};

export function RelatedNewsCard({
  item,
  showTopSpacing = false,
  className,
}: RelatedNewsCardProps) {
  return (
    <article className={cn('flex w-full flex-col', className)}>
      <Link
        href={item.href}
        className={cn(
          'bg-news-sidebar-image-bg block h-[171px] w-full overflow-hidden',
          showTopSpacing && 'mt-4',
        )}
      >
        <Image
          src={item.coverImageUrl}
          alt={item.coverImageAlt}
          width={368}
          height={171}
          className="h-full w-full object-cover"
        />
      </Link>

      <h3 className="text-news-sidebar-title pt-3 text-sm leading-5 font-bold">
        <Link href={item.href}>{item.title}</Link>
      </h3>

      {item.subtitle ? (
        <p className="text-news-meta pt-1 pb-3 text-xs leading-[21.125px]">
          {item.subtitle}
        </p>
      ) : (
        <div className="pb-3" />
      )}

      <NewsSidebarTextLink href={item.href}>Leer nota</NewsSidebarTextLink>
    </article>
  );
}
