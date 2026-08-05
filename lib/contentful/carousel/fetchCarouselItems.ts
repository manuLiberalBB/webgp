import { fetchCompanyCarouselItems } from './sources/company';
import type { CarouselItem, CarouselSource } from './types';

export async function fetchCarouselItems(
  source: CarouselSource,
): Promise<CarouselItem[]> {
  switch (source) {
    case 'company':
      return fetchCompanyCarouselItems();
    default:
      return [];
  }
}
