import Link from 'next/link';

import { PageContentReady } from '@/components/layout/PageLoadCoordinator';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { siteConfig } from '@/config/site';

export default function NotFound() {
  return (
    <Section>
      <Container>
        <h1 className="text-2xl font-semibold">Página no encontrada</h1>
        <p className="text-text-muted mt-2 text-sm">
          La URL solicitada no existe en Contentful.
        </p>
        <Link
          href={siteConfig.homePath}
          className="text-action mt-4 inline-block text-sm font-semibold hover:underline"
        >
          Volver al inicio
        </Link>
      </Container>
      <PageContentReady />
    </Section>
  );
}
