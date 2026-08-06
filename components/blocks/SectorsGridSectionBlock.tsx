import { SectorsGridSection } from '@/components/sections/sectors/SectorsGridSection';
import { resolveSectorGridItems } from '@/lib/contentful/sector/resolveSectorGridItems';
import type { SectorsGridSectionFields } from '@/lib/contentful/types/sectorsGridSection';

import type { BlockComponentProps } from './registry';

export function SectorsGridSectionBlock({ fields }: BlockComponentProps) {
  const { subtitle, items } = fields as SectorsGridSectionFields;
  const sectorItems = resolveSectorGridItems(items);

  return <SectorsGridSection subtitle={subtitle} items={sectorItems} />;
}
