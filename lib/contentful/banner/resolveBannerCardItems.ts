import type { Entry } from 'contentful';

import type { CardFields } from '../types/card';

export function resolveBannerCardItems(items?: Entry[]): CardFields[] {
  return (
    items
      ?.filter((item) => item.sys.contentType?.sys.id === 'card')
      .map((item) => item.fields as CardFields) ?? []
  );
}
