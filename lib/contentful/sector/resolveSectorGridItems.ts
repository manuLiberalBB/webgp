import type { Entry } from 'contentful';

import type { SectorFields } from '../types/sector';

import { mapSectorToGridItem } from './mapSectorToGridItem';
import type { SectorsGridItem } from './types';

export function resolveSectorGridItems(items?: Entry[]): SectorsGridItem[] {
  return (
    items
      ?.filter((item) => item.sys.contentType?.sys.id === 'sector')
      .map((item) => mapSectorToGridItem(item.sys.id, item.fields as SectorFields))
      .filter((item): item is SectorsGridItem => item !== null) ?? []
  );
}
