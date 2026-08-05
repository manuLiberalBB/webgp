import { Container } from '@/components/ui/Container';
import { RichText } from '@/components/ui/RichText';
import { Section } from '@/components/ui/Section';
import type { RichTextBlockFields } from '@/lib/contentful/types/richTextBlock';

import type { BlockComponent } from './registry';

export const RichTextBlock: BlockComponent = ({ fields }) => {
  const { content } = fields as RichTextBlockFields;

  return (
    <Section>
      <Container>
        <RichText document={content} />
      </Container>
    </Section>
  );
};
