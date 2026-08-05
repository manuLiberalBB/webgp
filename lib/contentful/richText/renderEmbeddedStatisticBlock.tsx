import type { Entry } from 'contentful';

import { NewsInlineStatistics } from '@/components/news/NewsInlineStatistics';
import { resolveStatisticItem } from '@/lib/contentful/statistic/resolveStatisticItem';

export function renderEmbeddedStatisticBlock(target: Entry | undefined) {
  const item = resolveStatisticItem(target);

  if (!item) return null;

  return <NewsInlineStatistics items={[item]} />;
}
