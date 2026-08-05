import { siteConfig } from '@/config/site';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import {
  resolveNavLink,
} from '@/lib/contentful/resolveNavLink';
import type { HeaderFields } from '@/lib/contentful/types';

import { HeaderNav } from './HeaderNav';

type HeaderProps = {
  fields: HeaderFields;
};

export function Header({ fields }: HeaderProps) {
  const logoUrl = getAssetUrl(fields.logo);

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
      : undefined) ??
    (typeof fields.logo.fields.description === 'string'
      ? fields.logo.fields.description
      : undefined) ??
    siteConfig.name;

  const links =
    fields.navigation.fields.links
      ?.map(resolveNavLink)
      .filter((link): link is NonNullable<typeof link> => link !== null) ?? [];

  return (
    <HeaderNav
      logoUrl={logoUrl}
      logoAlt={logoAlt}
      logoWidth={logoWidth}
      logoHeight={logoHeight}
      links={links}
    />
  );
}
