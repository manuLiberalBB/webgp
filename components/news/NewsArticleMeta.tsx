import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';

import { NewsCategoryBadge } from '@/components/news/NewsCategoryBadge';
import {
  BreadcrumbChevronIcon,
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
} from '@/components/news/icons/NewsMetaIcons';
import { siteConfig } from '@/config/site';
import { buildNewsCategoryFilterHref } from '@/lib/contentful/news/newsListFilters';
import { newsCategoryBadgeStyles } from '@/lib/contentful/news/categoryBadgeStyles';
import type { NewsCategory } from '@/lib/contentful/types/news';
import { formatNewsPublishDate } from '@/lib/news/formatNewsDate';
import { calculateNewsReadingTimeMinutes } from '@/lib/news/readingTime';
import { truncateText } from '@/lib/news/truncateText';
import type { Document } from '@contentful/rich-text-types';
import { cn } from '@/lib/utils';

const BREADCRUMB_TITLE_MAX_LENGTH = 48;

type NewsArticleMetaProps = {
  noticeTitle: string;
  category?: NewsCategory;
  companyName?: string;
  content: Document;
  subtitle?: string;
  publishedAt?: string;
  className?: string;
};

function truncateBreadcrumbTitle(title: string, maxLength = BREADCRUMB_TITLE_MAX_LENGTH) {
  return truncateText(title, maxLength);
}

function BreadcrumbSeparator() {
  return (
    <span className="text-news-meta shrink-0" aria-hidden>
      <BreadcrumbChevronIcon />
    </span>
  );
}

function MetaDivider() {
  return <span className="bg-[rgba(13,25,39,0.09)] h-3.5 w-px shrink-0" aria-hidden />;
}

function MetaItem({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <span className="text-news-meta inline-flex items-center gap-1.5 text-sm leading-[19.5px] whitespace-nowrap">
      <span className="text-news-meta shrink-0">{icon}</span>
      {label}
    </span>
  );
}

export function NewsArticleMeta({
  noticeTitle,
  category,
  companyName,
  content,
  subtitle,
  publishedAt,
  className,
}: NewsArticleMetaProps) {
  const publishDate = formatNewsPublishDate(publishedAt);
  const readingMinutes = calculateNewsReadingTimeMinutes({
    content,
    noticeTitle,
    subtitle,
  });
  const accentColor = category
    ? newsCategoryBadgeStyles[category].color
    : '#0f766e';

  const contextItems: ReactNode[] = [
    category ? <NewsCategoryBadge key="category" category={category} /> : null,
    companyName ? (
      <MetaItem key="company" icon={<BuildingIcon />} label={companyName} />
    ) : null,
    <MetaItem key="date" icon={<CalendarIcon />} label={publishDate} />,
    <MetaItem
      key="reading"
      icon={<ClockIcon />}
      label={`${readingMinutes} min de lectura`}
    />,
  ].filter(Boolean);

  return (
    <section className={cn('bg-surface px-6 py-5 md:px-layout-x md:py-5', className)}>
      <div className="mx-auto w-full max-w-content">
        <nav aria-label="Breadcrumb" className="min-w-0">
          <ol className="flex min-w-0 items-center gap-1 overflow-hidden text-[13px] leading-[18px]">
            <li className="flex shrink-0 items-center gap-1">
              <Link href={siteConfig.homePath} className="text-news-meta hover:underline">
                Inicio
              </Link>
              <BreadcrumbSeparator />
            </li>

            <li className="flex shrink-0 items-center gap-1">
              <Link href="/noticias" className="text-news-meta hover:underline">
                Noticias
              </Link>
              {category ? <BreadcrumbSeparator /> : null}
            </li>

            {category ? (
              <li className="flex shrink-0 items-center gap-1">
                <Link
                  href={buildNewsCategoryFilterHref(category)}
                  className="text-news-meta hover:underline"
                >
                  {category}
                </Link>
                <BreadcrumbSeparator />
              </li>
            ) : null}

            <li className="min-w-0 flex-1">
              <span
                aria-current="page"
                className="text-news-meta-current block truncate"
                title={noticeTitle}
              >
                {truncateBreadcrumbTitle(noticeTitle)}
              </span>
            </li>
          </ol>
        </nav>

        <div
          className="mt-3 flex flex-wrap items-center gap-x-[17px] gap-y-3 border-y py-[17px]"
          style={{ borderColor: accentColor }}
        >
          {contextItems.map((item, index) => (
            <Fragment key={index}>
              {index > 0 ? <MetaDivider /> : null}
              {item}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
