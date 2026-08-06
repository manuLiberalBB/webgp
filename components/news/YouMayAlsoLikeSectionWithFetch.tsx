import { getFeaturedRelatedNews } from '@/lib/contentful/queries';
import type { NewsCategory } from '@/lib/contentful/types/news';

import { YouMayAlsoLikeSection } from './YouMayAlsoLikeSection';

const FEATURED_RELATED_NEWS_COUNT = 3;

type YouMayAlsoLikeSectionWithFetchProps = {
  excludePath?: string;
  category?: NewsCategory;
  categories?: NewsCategory[];
  title?: string;
  viewAllHref?: string;
};

export async function YouMayAlsoLikeSectionWithFetch({
  excludePath,
  category,
  categories,
  title,
  viewAllHref,
}: YouMayAlsoLikeSectionWithFetchProps) {
  const items = await getFeaturedRelatedNews({
    excludePath,
    category,
    categories,
    limit: FEATURED_RELATED_NEWS_COUNT,
  });

  return (
    <YouMayAlsoLikeSection items={items} title={title} viewAllHref={viewAllHref} />
  );
}
