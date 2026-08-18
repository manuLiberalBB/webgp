import type { NewsCategory } from '../types/news';

type CategoryBadgeStyle = {
  background: string;
  color: string;
};

export const newsCategoryBadgeStyles: Record<NewsCategory, CategoryBadgeStyle> = {
  Sustentabilidad: { background: '#d6e8e6', color: '#0d4d48' },
  Innovación: { background: '#f0f3fd', color: '#3328bf' },
  Educación: { background: '#fdf9f0', color: '#755000' },
  'Desarrollo regional': { background: '#f4f0e7', color: '#513a09' },
  Comunidad: { background: '#f2e7f0', color: '#780e6c' },
  Talento: { background: '#eadbdc', color: '#760f16' },
  Minería: { background: '#fbf7f3', color: '#b75500' },
  Finanzas: { background: '#e7eee7', color: '#0f5912' },
  'Historia destacada': { background: '#f4f0fd', color: '#5a133e' },
};
