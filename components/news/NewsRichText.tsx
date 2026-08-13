import Link from 'next/link';
import {
  documentToReactComponents,
  type Options,
} from '@contentful/rich-text-react-renderer';
import {
  BLOCKS,
  INLINES,
  type Block,
  type Document,
  type TopLevelBlock,
} from '@contentful/rich-text-types';
import type { Entry } from 'contentful';
import type { ReactNode } from 'react';

import { NewsInlineImage } from '@/components/news/NewsInlineImage';
import { NewsInlineStatistics } from '@/components/news/NewsInlineStatistics';
import { renderEmbeddedNewsRichTextBlock } from '@/components/contentful/richText/renderEmbeddedNewsRichTextBlock';
import { renderTextWithLineBreaks } from '@/lib/contentful/richText/renderTextWithLineBreaks';
import { segmentNewsRichTextContent } from '@/lib/contentful/richText/segmentNewsRichTextContent';
import { cn } from '@/lib/utils';

type RichTextProps = {
  document: Document;
  className?: string;
};

type AssetTarget = {
  fields?: {
    title?: string;
    file?: {
      url?: string;
      details?: { image?: { width?: number; height?: number } };
    };
  };
};

function paragraphHasEmbeddedInline(node: Block) {
  return node.content.some((item) => item.nodeType === INLINES.EMBEDDED_ENTRY);
}

function renderEmbeddedAsset(node: { data: { target?: AssetTarget } }) {
  const target = node.data.target;
  const url = target?.fields?.file?.url;

  if (!url) return null;

  const src = url.startsWith('//') ? `https:${url}` : url;
  const width = target.fields?.file?.details?.image?.width ?? 1280;
  const height = target.fields?.file?.details?.image?.height ?? 720;
  const title = target.fields?.title;

  return (
    <NewsInlineImage
      item={{
        id: src,
        contentfulName: title ?? 'embedded-asset',
        imageUrl: src,
        imageAlt: title ?? '',
        width,
        height,
        epigraph: title,
      }}
    />
  );
}

const newsRichTextOptions: Options = {
  renderText: renderTextWithLineBreaks,
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (paragraphHasEmbeddedInline(node as Block)) {
        return <div>{children}</div>;
      }

      return <p>{children}</p>;
    },
    [BLOCKS.EMBEDDED_ASSET]: renderEmbeddedAsset,
    [BLOCKS.EMBEDDED_ENTRY]: (node) =>
      renderEmbeddedNewsRichTextBlock(node.data.target as Entry | undefined),
    [INLINES.EMBEDDED_ENTRY]: (node) =>
      renderEmbeddedNewsRichTextBlock(node.data.target as Entry | undefined),
    [INLINES.HYPERLINK]: (node, children: ReactNode) => (
      <Link
        href={node.data.uri as string}
        className="text-action hover:text-action-hover underline"
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </Link>
    ),
  },
};

function renderBlocksSegment(nodes: TopLevelBlock[]) {
  return documentToReactComponents(
    {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: nodes,
    },
    newsRichTextOptions,
  );
}

export function NewsRichText({ document, className }: RichTextProps) {
  const segments = segmentNewsRichTextContent(document.content);

  return (
    <div className={cn('rich-text news-rich-text', className)}>
      {segments.map((segment, index) => {
        if (segment.type === 'statistics') {
          return (
            <NewsInlineStatistics
              key={`news-stats-${index}`}
              items={segment.items}
            />
          );
        }

        return (
          <div key={`news-blocks-${index}`}>
            {renderBlocksSegment(segment.nodes)}
          </div>
        );
      })}
    </div>
  );
}
