import type { NewsFields } from '@/lib/contentful/types/news';

export type NewsEntryPublicationSys = {
  publishedAt?: string;
  createdAt?: string;
};

export function resolveNewsPublishedAt(
  fields: Pick<NewsFields, 'date'>,
  sys?: NewsEntryPublicationSys,
): string {
  const customDate = fields.date?.trim();

  if (customDate) return customDate;

  return sys?.publishedAt ?? sys?.createdAt ?? new Date().toISOString();
}
