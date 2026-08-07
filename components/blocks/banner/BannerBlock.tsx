import type { BlockComponentProps } from '@/components/blocks/registry';

import { renderBanner } from './renderBanner';

export function BannerBlock(props: BlockComponentProps) {
  return renderBanner(props);
}
