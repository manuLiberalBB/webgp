import { fetchRandomNewsDetailMoreAboutGroupCards } from '@/lib/contentful/company/fetchRandomNewsDetailMoreAboutGroupCards';
import { fetchGridSectionBySectionVariant } from '@/lib/contentful/gridSection/fetchGridSectionBySectionVariant';
import { GRID_SECTION_VARIANTS } from '@/lib/contentful/gridSection/sectionVariants';

import { NewsDetailMoreAboutGroupSection } from './NewsDetailMoreAboutGroupSection';

type NewsDetailMoreAboutGroupSectionWithFetchProps = {
  tag?: string;
  title?: string;
  className?: string;
};

export async function NewsDetailMoreAboutGroupSectionWithFetch({
  tag,
  title,
  className,
}: NewsDetailMoreAboutGroupSectionWithFetchProps = {}) {
  const [fields, cards] = await Promise.all([
    fetchGridSectionBySectionVariant(
      GRID_SECTION_VARIANTS.NEWS_DETAIL_MORE_ABOUT_GROUP,
    ),
    fetchRandomNewsDetailMoreAboutGroupCards(),
  ]);

  if (!fields && cards.length === 0) return null;

  return (
    <NewsDetailMoreAboutGroupSection
      tag={tag ?? fields?.tag}
      title={title ?? fields?.title}
      cards={cards}
      className={className ?? '-mb-layout-gap'}
    />
  );
}
