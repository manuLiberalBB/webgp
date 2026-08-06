'use client';

import { useState } from 'react';

import { FILTERED_NEWS_LOAD_MORE_LIMIT } from '@/lib/contentful/news/newsListFilters';
import type { NewsListItem } from '@/lib/news/types';

import { AllNewsSection } from './AllNewsSection';

type PaginatedFilteredNewsSectionProps = {
  initialItems: NewsListItem[];
  total: number;
  title: string;
  filterQueryString: string;
};

export function PaginatedFilteredNewsSection({
  initialItems,
  total,
  title,
  filterQueryString,
}: PaginatedFilteredNewsSectionProps) {
  const [items, setItems] = useState(initialItems);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const hasMore = items.length < total;

  async function handleLoadMore() {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    try {
      const params = new URLSearchParams(filterQueryString);
      params.set('skip', String(items.length));
      params.set('limit', String(FILTERED_NEWS_LOAD_MORE_LIMIT));

      const response = await fetch(`/api/news?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to load more news');
      }

      const data = (await response.json()) as { items: NewsListItem[] };
      setItems((currentItems) => [...currentItems, ...data.items]);
    } finally {
      setIsLoadingMore(false);
    }
  }

  return (
    <AllNewsSection
      items={items}
      title={title}
      showViewAllButton={false}
      hasMore={hasMore}
      isLoadingMore={isLoadingMore}
      onLoadMore={handleLoadMore}
    />
  );
}
