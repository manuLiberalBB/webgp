import {
  NewsDetailMoreAboutGroupSection,
  resolveNewsDetailMoreAboutGroupCards,
} from '@/components/ui/NewsDetailMoreAboutGroupSection';
import { fetchGridSectionByContentfulName } from '@/lib/contentful/gridSection/fetchGridSectionByContentfulName';
import { NEWS_DETAIL_MORE_ABOUT_GROUP_SECTION_CONTENTFUL_NAME } from '@/lib/contentful/types/gridSection';

export async function NewsDetailMoreAboutGroupSectionWithFetch() {
  const fields = await fetchGridSectionByContentfulName(
    NEWS_DETAIL_MORE_ABOUT_GROUP_SECTION_CONTENTFUL_NAME,
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
