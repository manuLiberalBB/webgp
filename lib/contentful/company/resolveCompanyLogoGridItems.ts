import type { Entry } from 'contentful';

import { mapCompanyToCarouselItem } from '../carousel/sources/company';
import type { CarouselItem } from '../carousel/types';
import type { CompanyFields } from '../types/company';

export function resolveCompanyLogoGridItems(items?: Entry[]): CarouselItem[] {
  return (
    items
      ?.filter((item) => item.sys.contentType?.sys.id === 'company')
      .map((item) =>
        mapCompanyToCarouselItem(item.sys.id, item.fields as CompanyFields),
      )
      .filter((item): item is CarouselItem => item !== null) ?? []
  );
}
