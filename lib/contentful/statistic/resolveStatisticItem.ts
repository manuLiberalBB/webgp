import type { Entry } from 'contentful';

import type { StatisticFields, StatisticItem } from '../types/statistic';

export function isStatisticEntry(
  target: Entry | undefined,
): target is Entry & { fields: StatisticFields } {
  if (!target?.sys) return false;

  const contentTypeId = target.sys.contentType?.sys?.id;

  if (contentTypeId === 'statistic') return true;

  if (contentTypeId) return false;

  const fields = target.fields as Partial<StatisticFields> | undefined;

  return typeof fields?.value === 'string' && fields.value.trim().length > 0;
}

export function resolveStatisticItem(target: Entry | undefined): StatisticItem | null {
  if (!isStatisticEntry(target)) return null;

  const { value, label, icon } = target.fields;
  const trimmedValue = value?.trim();

  if (!trimmedValue) return null;

  return {
    id: target.sys.id,
    value: trimmedValue,
    label: label?.trim() || undefined,
    icon,
  };
}
