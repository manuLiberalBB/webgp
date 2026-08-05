import { Container } from '@/components/ui/Container';
import { ContentfulVideo } from '@/components/ui/ContentfulVideo';
import { Section } from '@/components/ui/Section';
import { resolveVideoFields } from '@/lib/contentful/video/resolveVideoItem';
import type { VideoFields } from '@/lib/contentful/types/video';

import type { BlockComponent } from './registry';

export const VideoBlock: BlockComponent = ({ fields }) => {
  const video = resolveVideoFields(fields as VideoFields);

  if (!video) return null;

  return (
    <Section>
      <Container>
        <ContentfulVideo item={video} />
      </Container>
    </Section>
  );
};
