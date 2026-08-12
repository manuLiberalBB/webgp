import { AppImage as Image } from '@/components/cms/AppImage';
import Link from 'next/link';
import {
  documentToReactComponents,
  type Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, type Document } from '@contentful/rich-text-types';
import type { ReactNode } from 'react';

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

function renderTextWithLineBreaks(text: string): ReactNode {
  const lines = text.split('\n');

  if (lines.length === 1) return text;

  return lines.flatMap((line, index) =>
    index === 0 ? [line] : [<br key={`line-break-${index}`} />, line],
  );
}

const richTextOptions: Options = {
  renderText: renderTextWithLineBreaks,
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const target = node.data.target as AssetTarget;
      const url = target?.fields?.file?.url;

      if (!url) return null;

      const src = url.startsWith('//') ? `https:${url}` : url;
      const width = target.fields?.file?.details?.image?.width ?? 800;
      const height = target.fields?.file?.details?.image?.height ?? 450;

      return (
        <Image
          src={src}
          alt={target.fields?.title ?? ''}
          width={width}
          height={height}
          className="h-auto w-full rounded-lg"
        />
      );
    },
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

export function RichText({ document, className }: RichTextProps) {
  return (
    <div className={cn('rich-text', className)}>
      {documentToReactComponents(document, richTextOptions)}
    </div>
  );
}
