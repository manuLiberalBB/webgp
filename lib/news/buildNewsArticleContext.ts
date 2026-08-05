import { normalizeNewsCategory } from '@/lib/contentful/news/normalizeNewsCategory';
import type { NewsFields } from '@/lib/contentful/types/news';
import { formatNewsPublishDate } from '@/lib/news/formatNewsDate';
import { getPrimaryCompanyName } from '@/lib/news/getPrimaryCompanyName';
import { calculateNewsReadingTimeMinutes } from '@/lib/news/readingTime';

import type { NewsArticleContext } from './types';

export function buildNewsArticleContext(
  fields: Pick<NewsFields, 'content' | 'noticeTitle' | 'subtitle' | 'category' | 'companies'>,
  publishedAt?: string,
): NewsArticleContext {
  return {
    category: normalizeNewsCategory(fields.category),
    companyName: getPrimaryCompanyName(fields.companies),
    publishDate: formatNewsPublishDate(publishedAt),
    readingMinutes: calculateNewsReadingTimeMinutes({
      content: fields.content,
      noticeTitle: fields.noticeTitle,
      subtitle: fields.subtitle,
    }),
  };
}
