import type { Entry } from 'contentful';

import type { StrategicSectorFields } from '../types/strategicSector';

import { mapStrategicSectorToGridItem } from './mapStrategicSectorToGridItem';
import type { StrategicSectorGridItem } from './types';

export function resolveStrategicSectorGridItems(
  items?: Entry[],
): StrategicSectorGridItem[] {
  return (
    items
      ?.filter((item) => item.sys.contentType?.sys.id === 'strategicSector')
      .map((item) =>
        mapStrategicSectorToGridItem(item.sys.id, item.fields as StrategicSectorFields),
      )
      .filter((item): item is StrategicSectorGridItem => item !== null) ?? []
  );
}
