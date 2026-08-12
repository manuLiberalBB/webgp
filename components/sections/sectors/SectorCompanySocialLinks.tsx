import { AppImage as Image } from '@/components/cms/AppImage';

type SectorCompanySocialLinksProps = {
  linkedinUrl?: string;
  instagramUrl?: string;
  className?: string;
};

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
              fill
              sizes="20px"
              className="object-contain"
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
              fill
              sizes="20px"
              className="object-contain"
            />
          </a>
        ) : null}
      </div>
    </div>
  );
}
