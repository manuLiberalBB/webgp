import { AppImage as Image } from '@/components/cms/AppImage';
import Link from 'next/link';

import type { NewsDetailMoreAboutGroupCardItem } from '@/lib/contentful/company/newsDetailMoreAboutGroupTypes';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import type { ResolvedNavLink } from '@/lib/contentful/resolveNavLink';
import { cn } from '@/lib/utils';

type NewsDetailMoreAboutGroupCardProps = {
  item: NewsDetailMoreAboutGroupCardItem;
  className?: string;
};

const CONOCER_MAS_LABEL = 'CONOCER MÁS';

function ConocerMasCta({ link }: { link: ResolvedNavLink }) {
  const className =
    'inline-flex h-[18px] items-center gap-2 text-xs leading-[18px] font-normal tracking-[1.2px] text-white uppercase transition-opacity hover:opacity-80';

  const content = (
    <>
      <span>{CONOCER_MAS_LABEL}</span>
      <Image
        src="/icons/arrow-right-white.svg"
        alt=""
        width={12}
        height={12}
        aria-hidden
        className="shrink-0"
      />
    </>
  );

  if (link.isExternal) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  );
}

export function NewsDetailMoreAboutGroupCard({
  item,
  className,
}: NewsDetailMoreAboutGroupCardProps) {
  const imageUrl = getAssetUrl(item.image)!;
  const imageAlt =
    (typeof item.image.fields.title === 'string'
      ? item.image.fields.title
      : undefined) ?? item.title;

  return (
    <article className={cn('flex h-full flex-col', className)}>
      <div className="relative h-[252px] w-full overflow-hidden bg-[#ddd]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 344px, 100vw"
          className="object-cover"
        />
      </div>

      <h3 className="pt-2.5 text-lg leading-normal font-bold text-white">{item.title}</h3>

      <p className="pt-3 pb-5 text-sm leading-[21.94px] text-white/80">{item.description}</p>

      <div className="pt-1">
        <ConocerMasCta link={item.link} />
      </div>
    </article>
  );
}
