import { getContentfulClient } from '../../client';
import { resolveCompanyWebsiteUrl } from '../../company/resolveCompanyWebsite';
import { getAssetDimensions } from '../../getAssetDimensions';
import { getAssetUrl } from '../../getAssetUrl';
import type { CompanyFields, CompanySkeleton } from '../../types/company';
import type { CarouselItem } from '../types';

export function mapCompanyToCarouselItem(
  id: string,
  fields: CompanyFields,
): CarouselItem | null {
  if (!fields.logo) return null;

  const imageUrl = getAssetUrl(fields.logo);
  if (!imageUrl) return null;

  const dimensions = getAssetDimensions(fields.logo, { width: 200, height: 48 });
  const href = resolveCompanyWebsiteUrl(fields.webSiteURL);

  return {
    id,
    label: fields.name,
    imageUrl,
    imageWidth: dimensions.width,
    imageHeight: dimensions.height,
    href,
    external: Boolean(href),
  };
}

export async function fetchCompanyCarouselItems(): Promise<CarouselItem[]> {
  const client = getContentfulClient();

  const entries = await client.getEntries<CompanySkeleton>({
    content_type: 'company',
    include: 2,
    order: ['fields.name'],
    select: ['sys.id', 'fields.name', 'fields.logo', 'fields.webSiteURL'],
  });

  return entries.items
    .map((item) =>
      mapCompanyToCarouselItem(item.sys.id, item.fields as CompanyFields),
    )
    .filter((item): item is CarouselItem => item !== null);
}
