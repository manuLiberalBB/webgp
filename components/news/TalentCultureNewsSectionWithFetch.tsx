import { getNewsListItems } from '@/lib/contentful/queries';

import { TalentCultureNewsSection } from './TalentCultureNewsSection';

const TALENT_NEWS_COUNT = 3;

export async function TalentCultureNewsSectionWithFetch() {
  const items = await getNewsListItems({
    limit: TALENT_NEWS_COUNT,
    category: 'Talento',
  });

  return <TalentCultureNewsSection items={items} />;
}
