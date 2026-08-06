import { LogoGridSection } from '@/components/sections/shared/LogoGridSection';
import { fetchCarouselItems } from '@/lib/contentful/carousel/fetchCarouselItems';
import type { CarouselSource } from '@/lib/contentful/carousel/types';

type LogoGridSectionWithFetchProps = {
  source: CarouselSource;
  title?: string;
};

export async function LogoGridSectionWithFetch({
  source,
  title,
}: LogoGridSectionWithFetchProps) {
  const items = await fetchCarouselItems(source);

  return <LogoGridSection title={title} items={items} />;
}
