import type { NewsCategory } from '@/lib/contentful/types/news';

export const NEWS_CATEGORIES: NewsCategory[] = [
  'Sustentabilidad',
  'Innovación',
  'Educación',
  'Desarrollo regional',
  'Comunidad',
  'Talento',
  'Minería',
];

export type NewsFilterCategory = 'Todo' | NewsCategory;

export const NEWS_FILTER_OPTIONS: NewsFilterCategory[] = ['Todo', ...NEWS_CATEGORIES];
