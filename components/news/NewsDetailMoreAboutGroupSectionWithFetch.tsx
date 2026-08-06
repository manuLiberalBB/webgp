import {
  NewsDetailMoreAboutGroupSection,
  resolveNewsDetailMoreAboutGroupCards,
} from '@/components/news/NewsDetailMoreAboutGroupSection';
import { fetchGridSectionBySectionVariant } from '@/lib/contentful/gridSection/fetchGridSectionBySectionVariant';
import { GRID_SECTION_VARIANTS } from '@/lib/contentful/gridSection/sectionVariants';

export async function NewsDetailMoreAboutGroupSectionWithFetch() {
  const fields = await fetchGridSectionBySectionVariant(
    GRID_SECTION_VARIANTS.NEWS_DETAIL_MORE_ABOUT_GROUP,
  );

  if (!fields) return null;

  const cards = resolveNewsDetailMoreAboutGroupCards(fields.items);

  return (
    <NewsDetailMoreAboutGroupSection
      tag={fields.tag}
      title={fields.title}
      cards={cards}
      className="-mb-layout-gap"
    />
  );
}
