import type { Document } from '@contentful/rich-text-types';

import { NewsRichText } from '@/components/news/NewsRichText';
import { NewsTagsSection } from '@/components/news/NewsTagsSection';
import { cn } from '@/lib/utils';

type NewsArticleBodyProps = {
  content: Document;
  tags?: string[];
  className?: string;
};

export function NewsArticleBody({ content, tags, className }: NewsArticleBodyProps) {
  return (
    <div className={cn('min-w-0', className)}>
      <NewsRichText document={content} />
      <NewsTagsSection tags={tags} />
    </div>
  );
}
