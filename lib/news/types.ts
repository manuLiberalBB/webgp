import type { NewsCategory } from '@/lib/contentful/types/news';

export type FeaturedNewsItem = {
  id: string;
  title: string;
  subtitle?: string;
  coverImageUrl: string;
  coverImageAlt: string;
  href: string;
  category?: NewsCategory;
  companyName?: string;
  companyLogoUrl?: string;
  companyLogoWidth?: number;
  companyLogoHeight?: number;
  publishDate: string;
  publishedAt: string;
  readingMinutes: number;
};

export type RelatedNewsItem = {
  id: string;
  title: string;
  subtitle?: string;
  coverImageUrl: string;
  coverImageAlt: string;
  href: string;
};

export type NewsCompanyInfo = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  websiteUrl?: string;
  websiteLabel: string;
};

export type NewsArticleContext = {
  category?: NewsCategory;
  companyName?: string;
  publishDate: string;
  readingMinutes: number;
};

export type NewsListItem = {
  id: string;
  title: string;
  subtitle?: string;
  coverImageUrl: string;
  coverImageAlt: string;
  href: string;
  category?: NewsCategory;
  publishDate: string;
  publishedAt: string;
  readingMinutes: number;
};
