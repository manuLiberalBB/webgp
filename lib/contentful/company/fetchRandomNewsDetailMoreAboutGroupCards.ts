import { getContentfulClient } from '../client';
import { CONTENTFUL_INCLUDE } from '../includeDepth';
import type { CompanyFields, CompanySkeleton } from '../types/company';

import { mapCompanyToNewsDetailMoreAboutGroupCard } from './mapCompanyToNewsDetailMoreAboutGroupCard';
import type { NewsDetailMoreAboutGroupCardItem } from './newsDetailMoreAboutGroupTypes';

const DEFAULT_CARD_COUNT = 3;

function pickRandomItems<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items;

  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled.slice(0, count);
}

export async function fetchRandomNewsDetailMoreAboutGroupCards(
  count = DEFAULT_CARD_COUNT,
): Promise<NewsDetailMoreAboutGroupCardItem[]> {
  const client = getContentfulClient();

  const entries = await client.getEntries<CompanySkeleton>({
    content_type: 'company',
    include: CONTENTFUL_INCLUDE.newsDetail,
  });

  const eligibleCards = entries.items.flatMap((entry) => {
    const card = mapCompanyToNewsDetailMoreAboutGroupCard(
      entry.sys.id,
      entry.fields as CompanyFields,
    );

    return card ? [card] : [];
  });

  return pickRandomItems(eligibleCards, count);
}
