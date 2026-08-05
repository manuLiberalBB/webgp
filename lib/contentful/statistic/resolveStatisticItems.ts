import type { Entry } from 'contentful';

import type { StatisticFields, StatisticItem } from '../types/statistic';

export function resolveStatisticItems(items?: Entry[]): StatisticItem[] {
  return (
    items
      ?.filter((item) => item.sys.contentType?.sys.id === 'statistic')
      .map((item) => {
        const fields = item.fields as StatisticFields;

        return {
          id: item.sys.id,
          value: fields.value,
          label: fields.label,
          icon: fields.icon,
        };
      }) ?? []
  );
}

export function hasStatisticItems(items?: Entry[]): boolean {
  return resolveStatisticItems(items).length > 0;
}
