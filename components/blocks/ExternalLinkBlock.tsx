import { ExternalLinkEmbed } from '@/components/ui/ExternalLinkEmbed';
import {
  getExternalLinkLabel,
  type ExternalLinkFields,
} from '@/lib/contentful/types/externalLink';

import type { BlockComponent } from './registry';

function isValidEmbedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export const ExternalLinkBlock: BlockComponent = ({ fields }) => {
  const { link } = fields as ExternalLinkFields;

  if (!link || !isValidEmbedUrl(link)) return null;

  const title = getExternalLinkLabel({ fields: fields as ExternalLinkFields });

  return <ExternalLinkEmbed src={link} title={title} />;
};
