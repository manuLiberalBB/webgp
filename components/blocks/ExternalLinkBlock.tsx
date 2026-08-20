import { ExternalLinkEmbed } from '@/components/ui/ExternalLinkEmbed';
import { isValidEmbedUrl } from '@/lib/externalLink/validateExternalEmbedUrl';
import {
  getExternalLinkLabel,
  type ExternalLinkFields,
} from '@/lib/contentful/types/externalLink';

import type { BlockComponent } from './registry';

export const ExternalLinkBlock: BlockComponent = ({ fields }) => {
  const { link } = fields as ExternalLinkFields;

  if (!link || !isValidEmbedUrl(link)) return null;

  const title = getExternalLinkLabel({ fields: fields as ExternalLinkFields });

  return <ExternalLinkEmbed src={link} title={title} />;
};
