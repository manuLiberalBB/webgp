import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { Suspense } from 'react';

import { Header, SiteFooter } from '@/components/layout';
import { HashScrollOnLoad } from '@/components/layout/HashScrollOnLoad';
import { getHeader } from '@/lib/contentful/queries';
import { env } from '@/lib/env';
import { dmMono } from '@/lib/fonts/dmMono';
import { dmSans } from '@/lib/fonts/dmSans';
import { playfairDisplay } from '@/lib/fonts/playfairDisplay';

import './globals.css';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

const noIndexMetadata: Pick<Metadata, 'robots'> = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export const metadata: Metadata = {
  title: 'Grupo Petersen',
  ...(env.site.allowIndexing() ? {} : noIndexMetadata),
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#001b57',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
};

export const revalidate = 3600;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = await getHeader();

  return (
    <html lang="es" className="is-page-loading" data-scroll-behavior="smooth">
      <body
        className={`${openSans.variable} ${playfairDisplay.variable} ${dmSans.variable} ${dmMono.variable} font-sans antialiased`}
      >
        <noscript>
          <style>{'html.is-page-loading .app-shell { visibility: visible; }'}</style>
        </noscript>
        <Suspense fallback={null}>
          <HashScrollOnLoad />
        </Suspense>
        <div className="app-shell">
          <div className="app-content pt-header nav-desktop:pt-0">
            {header ? <Header fields={header} /> : null}
            <main className="app-main">{children}</main>
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
