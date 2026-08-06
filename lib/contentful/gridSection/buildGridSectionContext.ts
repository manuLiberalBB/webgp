import type { Entry } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

import type { BlockComponentProps } from '@/components/blocks/registry';
import { resolveCompanyLogoGridItems } from '@/lib/contentful/company/resolveCompanyLogoGridItems';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import {
  resolveCardEntries,
  isNewsListingPage,
} from '@/lib/contentful/gridSection/gridSectionHelpers';
import {
  normalizeSectionVariant,
  type GridSectionVariant,
} from '@/lib/contentful/gridSection/sectionVariants';
import { resolveSectorGridItems } from '@/lib/contentful/sector/resolveSectorGridItems';
import { resolveStrategicSectorGridItems } from '@/lib/contentful/strategicSector/resolveStrategicSectorGridItems';
import type { CardFields } from '@/lib/contentful/types/card';
import {
  type GridSectionFields,
  resolveGridSectionCardStyle,
} from '@/lib/contentful/types/gridSection';
import { resolveGridSectionAnchorId } from '@/lib/navigation/resolveGridSectionAnchorId';
import {
  hasNewsEntries,
} from '@/lib/news/mapNewsEntriesFromItems';

export type GridSectionContext = {
  fields: GridSectionFields;
  pagePath?: string[];
  contentfulName: string;
  sectionVariant?: GridSectionVariant;
  tag?: string;
  title?: string;
  subtitle?: string;
  body?: Document;
  items?: Entry[];
  urlList?: Entry[];
  imageUrl?: string;
  imageAlt: string;
  backgroundUrl?: string;
  iconUrl?: string;
  cards: CardFields[];
  resolvedCardStyle?: ReturnType<typeof resolveGridSectionCardStyle>;
  sectionId?: string;
  sectorItems: ReturnType<typeof resolveSectorGridItems>;
  strategicSectorItems: ReturnType<typeof resolveStrategicSectorGridItems>;
  hasSideImage: boolean;
  hasCards: boolean;
  hasNewsItems: boolean;
  companyCarouselItems: ReturnType<typeof resolveCompanyLogoGridItems>;
  isNewsListingPage: boolean;
};

export function buildGridSectionContext({
  fields,
  pagePath,
}: BlockComponentProps): GridSectionContext {
  const gridFields = fields as GridSectionFields;
  const {
    contentfulName,
    sectionVariant,
    tag,
    title,
    subtitle,
    icon,
    body,
    items,
    urlList,
    image,
    backgroundImage,
    cardStyle,
  } = gridFields;

  const imageUrl = image ? getAssetUrl(image) : undefined;
  const imageAlt =
    (typeof image?.fields.title === 'string' ? image.fields.title : undefined) ??
    title ??
    '';
  const backgroundUrl = backgroundImage ? getAssetUrl(backgroundImage) : undefined;
  const iconUrl = icon ? getAssetUrl(icon) : undefined;
  const cards = resolveCardEntries(items);
  const resolvedVariant = normalizeSectionVariant(sectionVariant);
  const sectionId = resolveGridSectionAnchorId({
    sectionVariant,
    tag,
  });

  return {
    fields: gridFields,
    pagePath,
    contentfulName,
    sectionVariant: resolvedVariant,
    tag,
    title,
    subtitle,
    body,
    items,
    urlList,
    imageUrl,
    imageAlt,
    backgroundUrl,
    iconUrl,
    cards,
    resolvedCardStyle: resolveGridSectionCardStyle(cardStyle),
    sectionId,
    sectorItems: resolveSectorGridItems(items),
    strategicSectorItems: resolveStrategicSectorGridItems(items),
    hasSideImage: Boolean(imageUrl),
    hasCards: cards.length > 0,
    hasNewsItems: hasNewsEntries(items),
    companyCarouselItems: resolveCompanyLogoGridItems(items),
    isNewsListingPage: isNewsListingPage(pagePath),
  };
}
