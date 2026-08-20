import { AppImage as Image } from '@/components/cms/AppImage';
import Link from 'next/link';
import type { Entry } from 'contentful';

import { HeroImage } from '@/components/cms/AppImage';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { HERO_BOTTOM_PADDING } from '@/lib/layout/sectionPadding';
import { resolveNavLink } from '@/lib/contentful/resolveNavLink';
import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

const QUALIA_CARD_CTA_LABEL = 'Conocer más';

type QualiaBannerProps = {
  title?: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt?: string;
  logoUrl?: string;
  logoAlt?: string;
  cards: CardFields[];
  className?: string;
  priority?: boolean;
};

function ArrowOutwardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="shrink-0">
      <path
        d="M5.833 14.167 14.167 5.833M14.167 5.833H7.5M14.167 5.833V12.5"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function resolveCardLink(url?: Entry[]) {
  const entry = url?.[0];
  if (!entry) return null;
  return resolveNavLink(entry);
}

function QualiaBannerCard({ card }: { card: CardFields }) {
  const link = resolveCardLink(card.url);
  const cardImageUrl = card.image ? getAssetUrl(card.image) : undefined;
  const ctaClassName =
    'relative z-10 inline-flex items-center gap-1 text-base leading-6 font-bold !text-white transition-opacity hover:opacity-80';

  const ctaContent = (
    <>
      <span className="text-white">{QUALIA_CARD_CTA_LABEL}</span>
      <ArrowOutwardIcon />
    </>
  );

  return (
    <article
      className={cn(
        'relative flex min-h-[280px] flex-1 flex-col justify-between gap-4 overflow-hidden rounded-[20px] border-[3px] border-white text-white',
        'px-6 py-10 md:min-h-0',
      )}
    >
      {cardImageUrl ? (
        <Image
          src={cardImageUrl}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          aria-hidden
        />
      ) : null}

      <div aria-hidden className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex flex-col gap-4">
        {card.title ? (
          <h3 className="text-2xl leading-8 font-bold text-white">{card.title}</h3>
        ) : null}

        {card.description ? (
          <p className="text-base leading-6 text-white">{card.description}</p>
        ) : null}
      </div>

      {link ? (
        link.isExternal ? (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClassName}
          >
            {ctaContent}
          </a>
        ) : (
          <Link href={link.href} className={ctaClassName}>
            {ctaContent}
          </Link>
        )
      ) : null}
    </article>
  );
}

export function QualiaBanner({
  title,
  subtitle,
  imageUrl,
  imageAlt = '',
  logoUrl,
  logoAlt = 'Qualia Seguros',
  cards,
  className,
  priority = true,
}: QualiaBannerProps) {
  if (cards.length === 0) return null;

  return (
    <section
      className={cn(
        'relative flex min-h-hero w-full flex-col items-center overflow-hidden px-6 pt-hero-pt md:px-layout-x md:pt-20',
        HERO_BOTTOM_PADDING,
        className,
      )}
    >
      <HeroImage
        src={imageUrl}
        alt={imageAlt}
        fill
        priority={priority}
        className="object-cover"
      />

      <div aria-hidden className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col gap-12">
        {(title || subtitle || logoUrl) && (
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            {(title || subtitle) && (
              <div className="order-last flex max-w-[683px] flex-col gap-4 text-white lg:order-first">
                {title ? (
                  <h2 className="text-[2rem] leading-tight tracking-[-0.96px] md:text-[3rem] md:leading-normal">
                    {title}
                  </h2>
                ) : null}

                {subtitle ? (
                  <p className="text-lg leading-normal md:text-xl">{subtitle}</p>
                ) : null}
              </div>
            )}

            {logoUrl ? (
              <div className="relative order-first h-[104px] w-[304px] shrink-0 md:h-[124px] md:w-[360px] lg:order-last">
                <Image
                  src={logoUrl}
                  alt={logoAlt}
                  fill
                  sizes="(max-width: 768px) 304px, 360px"
                  className="object-contain object-left lg:object-right"
                />
              </div>
            ) : null}
          </div>
        )}

        <div
          className={cn(
            'grid grid-cols-1 gap-5',
            cards.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3',
            cards.length >= 4 && 'lg:grid-cols-4',
          )}
        >
          {cards.map((card, index) => (
            <QualiaBannerCard key={`${card.contentfulName}-${index}`} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
