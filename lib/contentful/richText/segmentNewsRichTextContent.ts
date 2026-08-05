import { BLOCKS, INLINES, type Block, type TopLevelBlock } from '@contentful/rich-text-types';
import type { Entry } from 'contentful';

import { isBlankRichText } from '@/lib/contentful/richText/isBlankRichText';
import { resolveStatisticItem } from '@/lib/contentful/statistic/resolveStatisticItem';
import type { StatisticItem } from '@/lib/contentful/types/statistic';

export type NewsRichTextStatisticsSegment = {
  type: 'statistics';
  items: StatisticItem[];
};

export type NewsRichTextBlocksSegment = {
  type: 'blocks';
  nodes: TopLevelBlock[];
};

export type NewsRichTextSegment =
  | NewsRichTextStatisticsSegment
  | NewsRichTextBlocksSegment;

function isEmptyParagraph(node: TopLevelBlock): boolean {
  if (node.nodeType !== BLOCKS.PARAGRAPH) return false;

  const block = node as Block;

  return block.content.every((item) => {
    if (item.nodeType === INLINES.EMBEDDED_ENTRY) return false;

    return item.nodeType === 'text' && isBlankRichText(item.value);
  });
}

function paragraphHasVisibleText(content: Block['content']): boolean {
  return content.some((item) => {
    if (item.nodeType !== 'text') return true;

    return !isBlankRichText(item.value);
  });
}

function splitParagraphWithStatistics(node: TopLevelBlock): NewsRichTextSegment[] {
  if (node.nodeType !== BLOCKS.PARAGRAPH) {
    return [{ type: 'blocks', nodes: [node] }];
  }

  const block = node as Block;
  const segments: NewsRichTextSegment[] = [];
  let textBuffer: Block['content'] = [];
  let statsBuffer: StatisticItem[] = [];

  const flushText = () => {
    if (paragraphHasVisibleText(textBuffer)) {
      segments.push({
        type: 'blocks',
        nodes: [{ ...block, content: [...textBuffer] }],
      });
    }

    textBuffer = [];
  };

  const flushStats = () => {
    if (statsBuffer.length === 0) return;

    segments.push({
      type: 'statistics',
      items: [...statsBuffer],
    });
    statsBuffer = [];
  };

  for (const item of block.content) {
    if (item.nodeType === INLINES.EMBEDDED_ENTRY) {
      const statistic = resolveStatisticItem(item.data.target as Entry | undefined);

      if (statistic) {
        flushText();
        statsBuffer.push(statistic);
        continue;
      }
    }

    if (item.nodeType === 'text' && isBlankRichText(item.value) && statsBuffer.length > 0) {
      continue;
    }

    flushStats();
    textBuffer.push(item);
  }

  flushStats();
  flushText();

  return segments.length > 0 ? segments : [{ type: 'blocks', nodes: [node] }];
}

function segmentStatisticBlock(node: TopLevelBlock): NewsRichTextSegment | null {
  if (node.nodeType !== BLOCKS.EMBEDDED_ENTRY) return null;

  const statistic = resolveStatisticItem(node.data.target as Entry | undefined);

  if (!statistic) return null;

  return {
    type: 'statistics',
    items: [statistic],
  };
}

function mergeConsecutiveStatistics(
  segments: NewsRichTextSegment[],
): NewsRichTextSegment[] {
  const merged: NewsRichTextSegment[] = [];

  for (const segment of segments) {
    if (segment.type !== 'statistics') {
      merged.push(segment);
      continue;
    }

    const previous = merged[merged.length - 1];

    if (previous?.type === 'statistics') {
      previous.items.push(...segment.items);
      continue;
    }

    merged.push({
      type: 'statistics',
      items: [...segment.items],
    });
  }

  return merged;
}

export function segmentNewsRichTextContent(
  content: TopLevelBlock[],
): NewsRichTextSegment[] {
  const segments: NewsRichTextSegment[] = [];

  for (const node of content) {
    if (isEmptyParagraph(node)) continue;

    const statisticBlock = segmentStatisticBlock(node);

    if (statisticBlock) {
      segments.push(statisticBlock);
      continue;
    }

    if (node.nodeType === BLOCKS.PARAGRAPH) {
      segments.push(...splitParagraphWithStatistics(node));
      continue;
    }

    segments.push({ type: 'blocks', nodes: [node] });
  }

  return mergeConsecutiveStatistics(segments);
}
