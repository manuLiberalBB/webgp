import type { SectorCompanyCardItem } from '../sector/types';

export type StrategicSectorGridItem = {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
  linkLabel: string;
  sectorSubtitle?: string;
  body?: string;
  detailImageUrl?: string;
  detailImageAlt?: string;
  waysWeContribute: string[];
  projectsHref?: string;
  projectsExternal?: boolean;
  projectsLabel: string;
  relatedCompanies: SectorCompanyCardItem[];
};
