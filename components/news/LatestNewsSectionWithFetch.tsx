import { getNewsListItems } from '@/lib/contentful/queries';

import { LatestNewsSection } from './LatestNewsSection';

const LATEST_NEWS_COUNT = 4;

export async function LatestNewsSectionWithFetch() {
  const items = await getNewsListItems(LATEST_NEWS_COUNT);

  return <LatestNewsSection items={items} />;
}
