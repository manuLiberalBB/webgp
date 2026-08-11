import Image from 'next/image';

import { siteConfig } from '@/config/site';
import {
  FOOTER_COLUMN_TITLES,
  FOOTER_CONNECT,
} from '@/lib/footer/constants';
import type { FooterLinkItem } from '@/lib/footer/types';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import type { FooterFields } from '@/lib/contentful/types';

import { FooterColumn } from './footer/FooterColumn';
import { LinkedInIcon, MailIcon, MapPinIcon, PhoneIcon } from './footer/FooterIcons';
import { FooterLinkList } from './footer/FooterLinkList';

type FooterProps = {
  fields: FooterFields;
  companies: FooterLinkItem[];
  pages: FooterLinkItem[];
};

export function Footer({ fields, companies, pages }: FooterProps) {
  const logoUrl = getAssetUrl(fields.logo);
  const currentYear = new Date().getFullYear();

  if (!logoUrl) return null;

  const imageDetails = fields.logo.fields.file?.details;
  const logoWidth =
    imageDetails && 'image' in imageDetails
      ? (imageDetails.image?.width ?? 157)
      : 157;
  const logoHeight =
    imageDetails && 'image' in imageDetails
      ? (imageDetails.image?.height ?? 35)
      : 35;
  const logoAlt =
    (typeof fields.logo.fields.title === 'string'
      ? fields.logo.fields.title
      : undefined) ?? siteConfig.name;

  return (
    <footer className="bg-footer-bg text-footer-text px-6 md:px-layout-x">
      <div className="mx-auto flex w-full max-w-content flex-col gap-12 pt-12 pb-8 md:pt-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-[22px]">
          <div className="flex w-full max-w-[459px] shrink-0 flex-col items-start gap-6 lg:w-[459px]">
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={logoWidth}
              height={logoHeight}
              className="block h-[35px] w-auto self-start brightness-0 invert"
            />

            <p className="text-sm leading-[22.75px]">{fields.information}</p>

            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-3 text-sm leading-5">
                <MapPinIcon className="text-footer-icon shrink-0" />
                <span>{fields.ubication}</span>
              </p>

              <p className="flex items-center gap-3 text-sm leading-5">
                <PhoneIcon className="text-footer-icon shrink-0" />
                <a
                  href={`tel:${fields.phone.replace(/\s/g, '')}`}
                  className="hover:text-footer-heading transition-colors"
                >
                  {fields.phone}
                </a>
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-8 lg:flex-row lg:gap-[30px]">
            <FooterColumn title={FOOTER_COLUMN_TITLES.companies}>
              <FooterLinkList items={companies} />
            </FooterColumn>

            <FooterColumn title={FOOTER_COLUMN_TITLES.navigation}>
              <FooterLinkList items={pages} />
            </FooterColumn>

            <FooterColumn title={FOOTER_COLUMN_TITLES.connect}>
              <div className="flex flex-col gap-2">
                <MailIcon className="text-footer-icon" />
                <a
                  href={`mailto:${FOOTER_CONNECT.email}`}
                  className="hover:text-footer-heading text-sm leading-5 transition-colors"
                >
                  {FOOTER_CONNECT.email}
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-footer-heading text-sm leading-5">
                  {FOOTER_CONNECT.socialTitle}
                </p>

                <div className="flex gap-3">
                  {FOOTER_CONNECT.social.map((network) => (
                    <a
                      key={network.id}
                      href={network.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={network.label}
                      className="bg-footer-social-bg flex size-10 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                    >
                      {network.id === 'linkedin' ? (
                        <LinkedInIcon className="text-[#D1D5DC]" />
                      ) : null}
                    </a>
                  ))}
                </div>
              </div>
            </FooterColumn>
          </div>
        </div>

        <div className="border-footer-border border-t pt-8">
          <p className="text-footer-muted text-base leading-6">
            © {currentYear} Grupo Petersen. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
