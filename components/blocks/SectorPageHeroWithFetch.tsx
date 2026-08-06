import { HeroBanner } from '@/components/ui/HeroBanner';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { fetchSectorEntryByPagePath } from '@/lib/contentful/sector/fetchSectorEntryByPagePath';
import type { SectorFields } from '@/lib/contentful/types/sector';
import { isCompactMobileHeroPage } from '@/lib/layout/compactMobileHeroPages';

type SectorPageHeroWithFetchProps = {
  pagePath?: string[];
};

export async function SectorPageHeroWithFetch({ pagePath }: SectorPageHeroWithFetchProps) {
  const entry = await fetchSectorEntryByPagePath(pagePath);
  if (!entry) return null;

  const { name, description, image } = entry.fields as SectorFields;
  const imageUrl = getAssetUrl(image);
  if (!imageUrl || !name) return null;

  const imageAlt =
    (typeof image?.fields?.title === 'string' ? image.fields.title : undefined) ?? name;

  return (
    <HeroBanner
      title={name}
      subtitle={description}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      compactMobile={isCompactMobileHeroPage(pagePath)}
    />
  );
}
