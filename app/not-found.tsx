import { PageContentReady } from '@/components/layout/PageLoadCoordinator';
import { Container } from '@/components/ui/Container';
import { NotFoundContent } from '@/components/ui/NotFoundContent';
import { Section } from '@/components/ui/Section';

export default function NotFound() {
  return (
    <Section>
      <Container>
        <NotFoundContent />
      </Container>
      <PageContentReady />
    </Section>
  );
}
