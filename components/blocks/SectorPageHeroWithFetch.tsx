import { HeroBanner } from '@/components/sections/shared/HeroBanner';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { fetchSectorEntryByPagePath } from '@/lib/contentful/sector/fetchSectorEntryByPagePath';
import { resolveSectorHeroSubtitle } from '@/lib/contentful/sector/isSectorPage';
import type { SectorFields } from '@/lib/contentful/types/sector';

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
      subtitle={resolveSectorHeroSubtitle(pagePath, description)}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      pagePath={pagePath}
    />
  );
}
