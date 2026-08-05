import type { EntrySkeletonType } from 'contentful';

export type StatisticIconId = 'icon1' | 'icon2' | 'icon3';

/**
 * Content type: `statistic` (Estadistica)
 * @see display field: `contentfulName`
 */
export type StatisticFields = {
  contentfulName?: string;
  value: string;
  label?: string;
  icon?: StatisticIconId;
};

export type StatisticEntry = {
  fields: StatisticFields;
};

export type StatisticSkeleton = EntrySkeletonType & {
  contentTypeId: 'statistic';
  fields: StatisticFields;
};

export type StatisticItem = {
  id: string;
  value: string;
  label?: string;
  icon?: StatisticIconId;
};
