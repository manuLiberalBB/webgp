import type { Entry } from 'contentful';

import { NewsInlineImage } from '@/components/news/NewsInlineImage';
import { resolveImageItem } from '@/lib/contentful/image/resolveImageItem';

import { renderEmbeddedQuoteBlock } from './renderEmbeddedQuoteBlock';
import { renderEmbeddedStatisticBlock } from './renderEmbeddedStatisticBlock';

export function renderEmbeddedNewsRichTextBlock(target: Entry | undefined) {
  const quoteBlock = renderEmbeddedQuoteBlock(target);
  if (quoteBlock) return quoteBlock;

  const statisticBlock = renderEmbeddedStatisticBlock(target);
  if (statisticBlock) return statisticBlock;

  const imageItem = target ? resolveImageItem(target) : null;
  if (imageItem) return <NewsInlineImage item={imageItem} />;

  return null;
}
