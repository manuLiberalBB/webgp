import type { BlockComponentProps } from '@/components/blocks/registry';

import { renderGridSection } from './resolveGridSection';

export function GridSectionBlock(props: BlockComponentProps) {
  return renderGridSection(props);
}
