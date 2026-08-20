'use client';

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { NewsSidebar } from '@/components/news/NewsSidebar';
import type { NewsArticleContext, NewsCompanyInfo, RelatedNewsItem } from '@/lib/news/types';
import { cn } from '@/lib/utils';
import { LG_MEDIA_QUERY } from '@/lib/layout/breakpoints';

type NewsDetailContentLayoutProps = {
  children: ReactNode;
  noticeTitle: string;
  relatedNews: RelatedNewsItem[];
  meta: NewsArticleContext;
  company?: NewsCompanyInfo;
  className?: string;
};

function resolveVisibleRelatedCount(options: {
  isDesktopLayout: boolean;
  relatedNewsCount: number;
  articleHeight: number;
  sidebarHeight: number;
  visibleCount: number;
  secondRelatedHeight: number;
}) {
  const {
    isDesktopLayout,
    relatedNewsCount,
    articleHeight,
    sidebarHeight,
    visibleCount,
    secondRelatedHeight,
  } = options;

  if (!isDesktopLayout || relatedNewsCount < 2) {
    return relatedNewsCount;
  }

  const projectedSidebarWithTwo =
    visibleCount >= 2 ? sidebarHeight : sidebarHeight + secondRelatedHeight;

  return projectedSidebarWithTwo > articleHeight ? 1 : 2;
}

export function NewsDetailContentLayout({
  children,
  noticeTitle,
  relatedNews,
  meta,
  company,
  className,
}: NewsDetailContentLayoutProps) {
  const articleRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const secondRelatedHeightRef = useRef(0);
  const visibleRelatedCountRef = useRef(relatedNews.length);
  const [visibleRelatedCount, setVisibleRelatedCount] = useState(relatedNews.length);

  useLayoutEffect(() => {
    visibleRelatedCountRef.current = visibleRelatedCount;
  }, [visibleRelatedCount]);

  useLayoutEffect(() => {
    const article = articleRef.current;
    const sidebar = sidebarRef.current;

    if (!article || !sidebar) return;

    const update = () => {
      const currentCount = visibleRelatedCountRef.current;

      if (currentCount >= 2) {
        const secondRelatedItem = sidebar.querySelector<HTMLElement>(
          '[data-related-news-item="1"]',
        );

        if (secondRelatedItem) {
          secondRelatedHeightRef.current = secondRelatedItem.offsetHeight;
        }
      }

      const isDesktopLayout = window.matchMedia(LG_MEDIA_QUERY).matches;
      const nextCount = resolveVisibleRelatedCount({
        isDesktopLayout,
        relatedNewsCount: relatedNews.length,
        articleHeight: article.offsetHeight,
        sidebarHeight: sidebar.offsetHeight,
        visibleCount: currentCount,
        secondRelatedHeight: secondRelatedHeightRef.current,
      });

      if (nextCount !== currentCount) {
        visibleRelatedCountRef.current = nextCount;
        setVisibleRelatedCount(nextCount);
      }
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(article);
    resizeObserver.observe(sidebar);

    const mediaQuery = window.matchMedia(LG_MEDIA_QUERY);
    mediaQuery.addEventListener('change', update);

    return () => {
      resizeObserver.disconnect();
      mediaQuery.removeEventListener('change', update);
    };
  }, [relatedNews.length]);

  const displayedRelatedNews = relatedNews.slice(0, visibleRelatedCount);

  return (
    <div
      className={cn(
        'mx-auto grid w-full max-w-content grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-10 xl:grid-cols-[minmax(0,54rem)_minmax(20.5rem,21.5rem)] xl:gap-12',
        className,
      )}
    >
      <div ref={articleRef} className="min-w-0">
        {children}
      </div>

      <NewsSidebar
        ref={sidebarRef}
        noticeTitle={noticeTitle}
        relatedNews={displayedRelatedNews}
        meta={meta}
        company={company}
      />
    </div>
  );
}
