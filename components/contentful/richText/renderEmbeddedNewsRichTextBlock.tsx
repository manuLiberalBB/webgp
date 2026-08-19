import type { Entry } from 'contentful';

import { NewsInlineImage } from '@/components/news/NewsInlineImage';
import { NewsInlineVideo } from '@/components/news/NewsInlineVideo';
import { resolveImageItem } from '@/lib/contentful/image/resolveImageItem';
import { resolveVideoItem } from '@/lib/contentful/video/resolveVideoItem';

import { renderEmbeddedQuoteBlock } from './renderEmbeddedQuoteBlock';
import { renderEmbeddedStatisticBlock } from './renderEmbeddedStatisticBlock';

export function renderEmbeddedNewsRichTextBlock(target: Entry | undefined) {
  const quoteBlock = renderEmbeddedQuoteBlock(target);
  if (quoteBlock) return quoteBlock;

  const statisticBlock = renderEmbeddedStatisticBlock(target);
  if (statisticBlock) return statisticBlock;

  const imageItem = target ? resolveImageItem(target) : null;
  if (imageItem) return <NewsInlineImage item={imageItem} />;

  const videoItem = target ? resolveVideoItem(target) : null;
  if (videoItem) return <NewsInlineVideo item={videoItem} />;

  return null;
}
