'use client';

import { useEffect } from 'react';

import { ErrorContent } from '@/components/ui/ErrorContent';
import { siteConfig } from '@/config/site';

import './globals.css';

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="bg-surface font-sans antialiased">
        <div className="flex min-h-dvh flex-col">
          <header className="border-card-border border-b px-6 py-4 md:px-layout-x">
            <span className="text-heading text-lg font-semibold">{siteConfig.name}</span>
          </header>

          <main className="flex flex-1 items-center">
            <section className="w-full py-10 md:py-16">
              <div className="mx-auto w-full max-w-content px-6 md:px-layout-x">
                <ErrorContent onRetry={reset} />
              </div>
            </section>
          </main>

          <footer className="bg-footer-bg text-footer-text px-6 py-6 md:px-layout-x">
            <p className="text-sm">{siteConfig.name}</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
