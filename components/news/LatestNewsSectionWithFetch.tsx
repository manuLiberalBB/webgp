import { getNewsListItems } from '@/lib/contentful/queries';

import { LatestNewsSection } from './LatestNewsSection';

const LATEST_NEWS_COUNT = 4;
const LATEST_NEWS_FETCH_BUFFER = LATEST_NEWS_COUNT * 2;

export async function LatestNewsSectionWithFetch() {
  const items = await getNewsListItems(LATEST_NEWS_FETCH_BUFFER);

  return <LatestNewsSection items={items.slice(0, LATEST_NEWS_COUNT)} />;
}
