import Link from 'next/link';

import { HIRING_ROOM_CTA_LABEL } from '@/lib/contentful/types/gridSection';
import { cn } from '@/lib/utils';

type HiringRoomCtaSectionProps = {
  title?: string;
  subtitle?: string;
  href: string;
  external?: boolean;
  className?: string;
};

function ArrowForwardIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M3.75 9h10.5M10.5 5.25 14.25 9 10.5 12.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HiringRoomCtaLink({
  href,
  external,
}: {
  href: string;
  external?: boolean;
}) {
  const className =
    'inline-flex items-center gap-2 rounded-lg px-[18px] py-[14px] text-lg leading-7 font-bold text-cta transition-opacity hover:opacity-80';

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {HIRING_ROOM_CTA_LABEL}
        <ArrowForwardIcon />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {HIRING_ROOM_CTA_LABEL}
      <ArrowForwardIcon />
    </Link>
  );
}

function renderSubtitle(subtitle: string) {
  const breakIndex = subtitle.search(/\s+y comenzá/i);

  if (breakIndex === -1) {
    return subtitle;
  }

  return (
    <>
      {subtitle.slice(0, breakIndex)}
      <br />
      {subtitle.slice(breakIndex).trimStart()}
    </>
  );
}

export function HiringRoomCtaSection({
  title,
  subtitle,
  href,
  external,
  className,
}: HiringRoomCtaSectionProps) {
  return (
    <section
      className={cn(
        'bg-ecosystem flex w-full items-center px-6 py-10 md:px-layout-x md:py-section-y',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[67.5rem] flex-col items-center gap-10">
        <div className="flex w-full flex-col gap-10">
          {title ? (
            <h2 className="text-heading text-center text-[2rem] font-semibold leading-normal md:text-[2.5rem]">
              {title}
            </h2>
          ) : null}

          {subtitle ? (
            <p className="text-body text-center text-lg leading-normal md:text-xl">
              {renderSubtitle(subtitle)}
            </p>
          ) : null}
        </div>

        <HiringRoomCtaLink href={href} external={external} />
      </div>
    </section>
  );
}
