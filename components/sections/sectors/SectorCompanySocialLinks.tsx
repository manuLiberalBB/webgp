import Image from 'next/image';

type SectorCompanySocialLinksProps = {
  linkedinUrl?: string;
  instagramUrl?: string;
  className?: string;
};

const SOCIAL_ICON_SIZE = 20;

export function SectorCompanySocialLinks({
  linkedinUrl,
  instagramUrl,
  className,
}: SectorCompanySocialLinksProps) {
  if (!linkedinUrl && !instagramUrl) return null;

  return (
    <div className={className}>
      <div className="flex items-start gap-[2px]">
        {linkedinUrl ? (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="relative block size-5 shrink-0 transition-opacity hover:opacity-80"
          >
            <Image
              src="/icons/social/linkedin.svg"
              alt=""
              width={SOCIAL_ICON_SIZE}
              height={SOCIAL_ICON_SIZE}
              className="size-full"
            />
          </a>
        ) : null}

        {instagramUrl ? (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="relative block size-5 shrink-0 transition-opacity hover:opacity-80"
          >
            <Image
              src="/icons/social/instagram.svg"
              alt=""
              width={SOCIAL_ICON_SIZE}
              height={SOCIAL_ICON_SIZE}
              className="size-full"
            />
          </a>
        ) : null}
      </div>
    </div>
  );
}
