import { Container } from '@/components/ui/Container';
import { ContentfulImage } from '@/components/cms/ContentfulImage';
import { Section } from '@/components/ui/Section';
import { resolveImageFields } from '@/lib/contentful/image/resolveImageItem';
import type { ImageFields } from '@/lib/contentful/types/image';

import type { BlockComponent } from './registry';

export const ImageBlock: BlockComponent = ({ fields }) => {
  const image = resolveImageFields(fields as ImageFields);

  if (!image) return null;

  return (
    <Section>
      <Container>
        <ContentfulImage item={image} />
      </Container>
    </Section>
  );
};
