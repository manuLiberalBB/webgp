import type { Entry } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

import { CarouselSection } from '@/components/sections/shared/CarouselSection';
import type { MarqueeCarouselVariant } from '@/components/sections/shared/MarqueeCarousel';
import { fetchCarouselItems } from '@/lib/contentful/carousel/fetchCarouselItems';
import type { CarouselItem, CarouselSource } from '@/lib/contentful/carousel/types';

type CarouselSectionWithFetchProps = {
  source: CarouselSource;
  title?: string;
  subtitle?: string;
  body?: Document;
  urlList?: Entry[];
  items?: CarouselItem[];
  headerTextClassName?: string;
  companyVariant?: MarqueeCarouselVariant;
};

export async function CarouselSectionWithFetch({
  source,
  title,
  subtitle,
  body,
  urlList,
  items: sectionItems,
  headerTextClassName,
  companyVariant,
}: CarouselSectionWithFetchProps) {
  const items =
    sectionItems !== undefined
      ? sectionItems
      : await fetchCarouselItems(source);

  return (
    <CarouselSection
      title={title}
      subtitle={subtitle}
      body={body}
      urlList={urlList}
      items={items}
      headerTextClassName={headerTextClassName}
      companyVariant={companyVariant}
    />
  );
}
