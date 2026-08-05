import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { Suspense } from 'react';

import { Header, SiteFooter } from '@/components/layout';
import { HashScrollOnLoad } from '@/components/layout/HashScrollOnLoad';
import { getHeader } from '@/lib/contentful/queries';
import { playfairDisplay } from '@/lib/fonts/playfairDisplay';

import './globals.css';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Grupo Petersen',
};

export const revalidate = 3600;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = await getHeader();

  return (
    <html lang="es" className="is-page-loading">
      <body
        className={`${openSans.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <noscript>
          <style>{'html.is-page-loading .app-shell { visibility: visible; }'}</style>
        </noscript>
        <Suspense fallback={null}>
          <HashScrollOnLoad />
        </Suspense>
        <div className="app-shell">
          <div className="app-content">
            {header ? <Header fields={header} /> : null}
            <main className="app-main">{children}</main>
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
