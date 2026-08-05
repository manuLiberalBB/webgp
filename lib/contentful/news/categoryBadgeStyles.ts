import type { NewsCategory } from '../types/news';

type CategoryBadgeStyle = {
  background: string;
  color: string;
};

export const newsCategoryBadgeStyles: Record<NewsCategory, CategoryBadgeStyle> = {
  Sustentabilidad: { background: '#f0fdfa', color: '#0f766e' },
  Innovación: { background: '#f0f3fd', color: '#3328bf' },
  Educación: { background: '#fdf9f0', color: '#755000' },
  'Desarrollo regional': { background: '#fdfaf0', color: '#76550f' },
  Comunidad: { background: '#fdf0fb', color: '#760f6a' },
  Talento: { background: '#eef2ff', color: '#1e3a8a' },
  Minería: { background: '#fdf9f0', color: '#6f4204' },
};
