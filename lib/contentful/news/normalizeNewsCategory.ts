import type { NewsCategory } from '../types/news';

import { NEWS_CATEGORIES } from './newsCategories';

const LEGACY_NEWS_CATEGORY_MAP: Record<string, NewsCategory> = {
  Institucional: 'Talento',
};

function stripCategoryAccents(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '');
}

function normalizeCategoryToken(value: string): string {
  return stripCategoryAccents(value.trim()).toLowerCase();
}

export function normalizeNewsCategory(
  category: string | undefined,
): NewsCategory | undefined {
  if (!category) return undefined;

  const legacy = LEGACY_NEWS_CATEGORY_MAP[category];
  if (legacy) return legacy;

  const exact = NEWS_CATEGORIES.find((item) => item === category);
  if (exact) return exact;

  const token = normalizeCategoryToken(category);
  return NEWS_CATEGORIES.find((item) => normalizeCategoryToken(item) === token);
}

/** Valores a consultar en Contentful (incluye categorías legacy durante la migración). */
export function getNewsCategoryQueryValues(category: NewsCategory): string[] {
  if (category === 'Talento') {
    return ['Talento', 'Institucional'];
  }

  return [category];
}
