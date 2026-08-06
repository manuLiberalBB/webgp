import type { ComponentType } from 'react';

import { BannerBlock } from './BannerBlock';
import { CardBlock } from './CardBlock';
import { ExternalLinkBlock } from './ExternalLinkBlock';
import { FeaturedNewsBlock } from './FeaturedNewsBlock';
import { GridSectionBlock } from './GridSectionBlock';
import { ImageBlock } from './ImageBlock';
import { RichTextBlock } from './RichTextBlock';
import { SectorsGridSectionBlock } from './SectorsGridSectionBlock';
import { VideoBlock } from './VideoBlock';

export type BlockFields = Record<string, unknown>;

export type BlockComponentProps = {
  fields: BlockFields;
  entryId?: string;
  pagePath?: string[];
  searchParams?: Record<string, string | string[] | undefined>;
};

export type BlockComponent = ComponentType<BlockComponentProps>;

/**
 * Map Contentful content type IDs to React block components.
 * Add entries here as you implement each block in components/blocks/.
 */
export const blockRegistry: Record<string, BlockComponent> = {
  banner: BannerBlock,
  card: CardBlock,
  externalLink: ExternalLinkBlock,
  featuredNews: FeaturedNewsBlock,
  gridSection: GridSectionBlock,
  image: ImageBlock,
  sectorsGridSection: SectorsGridSectionBlock,
  richTextBlock: RichTextBlock,
  video: VideoBlock,
};

export type RegisteredBlockType = keyof typeof blockRegistry;
