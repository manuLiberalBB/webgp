import type { Document } from '@contentful/rich-text-types';

export type SectorCompanyCardItem = {
  id: string;
  title: string;
  description: string;
  body?: Document;
  logoUrl: string;
  logoWidth: number;
  logoHeight: number;
  iconUrl?: string;
  iconWidth?: number;
  iconHeight?: number;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
  external?: boolean;
  linkLabel: string;
};

export type SectorsGridItem = {
  id: string;
  contentfulName: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  iconUrl: string;
  iconAlt: string;
  href?: string;
  linkLabel?: string;
  external?: boolean;
};
