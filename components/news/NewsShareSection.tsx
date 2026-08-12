'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

import {
  ShareFacebookIcon,
  ShareLinkIcon,
  ShareLinkedInIcon,
  SharePdfIcon,
  ShareWhatsAppIcon,
  ShareXIcon,
} from '@/components/news/sidebar/NewsShareIcons';
import {
  NewsSidebarSectionTitle,
} from '@/components/news/sidebar/NewsSidebarPrimitives';
import { cn } from '@/lib/utils';

type NewsShareSectionProps = {
  title: string;
  className?: string;
};

type ShareAction = {
  id: string;
  label: string;
  bgClass: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
};

function ShareButton({ action }: { action: ShareAction }) {
  const content = (
    <>
      <span
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded text-white',
          action.bgClass,
        )}
      >
        {action.icon}
      </span>
      <span className="text-news-meta text-sm leading-5">{action.label}</span>
    </>
  );

  if (action.href) {
    return (
      <Link
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex cursor-pointer items-center gap-3"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={action.onClick}
      className="flex cursor-pointer items-center gap-3 text-left"
    >
      {content}
    </button>
  );
}

export function NewsShareSection({ title, className }: NewsShareSectionProps) {
  const pathname = usePathname();
  const [pageUrl, setPageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);

  const encodedUrl = encodeURIComponent(pageUrl);
  const whatsappText = encodeURIComponent(
    `📢 ${title}\n\n¡Te comparto esta noticia! Mirala acá 👉\n${pageUrl}`,
  );
  const tweetText = encodeURIComponent(
    `📢 ${title}\n\n¡Te comparto esta noticia! Mirala acá 👉\n${pageUrl}`,
  );

  async function handleCopyLink() {
    if (!pageUrl) return;

    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const actions: ShareAction[] = pageUrl
    ? [
        {
          id: 'twitter',
          label: 'X',
          bgClass: 'bg-share-x',
          icon: <ShareXIcon />,
          href: `https://twitter.com/intent/tweet?text=${tweetText}`,
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          bgClass: 'bg-share-linkedin',
          icon: <ShareLinkedInIcon />,
          href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        },
        {
          id: 'facebook',
          label: 'Facebook',
          bgClass: 'bg-share-facebook',
          icon: <ShareFacebookIcon />,
          href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        },
        {
          id: 'whatsapp',
          label: 'WhatsApp',
          bgClass: 'bg-share-whatsapp',
          icon: <ShareWhatsAppIcon />,
          href: `https://api.whatsapp.com/send?text=${whatsappText}`,
        },
        {
          id: 'copy',
          label: copied ? 'Enlace copiado' : 'Copiar enlace',
          bgClass: 'bg-share-copy text-[#302e38]',
          icon: <ShareLinkIcon />,
          onClick: handleCopyLink,
        },
        {
          id: 'pdf',
          label: 'Descargar PDF',
          bgClass: 'bg-share-pdf',
          icon: <SharePdfIcon />,
          onClick: () => window.print(),
        },
      ]
    : [];

  return (
    <section className={cn('w-full', className)} aria-label="Compartir noticia">
      <NewsSidebarSectionTitle>Compartir</NewsSidebarSectionTitle>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-4 lg:grid-cols-1 lg:gap-x-0">
        {actions.map((action) => (
          <li key={action.id}>
            <ShareButton action={action} />
          </li>
        ))}
      </ul>
    </section>
  );
}
