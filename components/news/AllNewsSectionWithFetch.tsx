import { getNewsListItems } from '@/lib/contentful/queries';

import { AllNewsSection } from './AllNewsSection';

const LATEST_NEWS_COUNT = 4;
const ALL_NEWS_GRID_COUNT = 9;

export async function AllNewsSectionWithFetch() {
  const items = await getNewsListItems(LATEST_NEWS_COUNT + ALL_NEWS_GRID_COUNT);
  const allNewsItems = items.slice(LATEST_NEWS_COUNT, LATEST_NEWS_COUNT + ALL_NEWS_GRID_COUNT);

  return <AllNewsSection items={allNewsItems} completeRowsOnly />;
}
