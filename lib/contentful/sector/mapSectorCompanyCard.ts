import { getAssetDimensions } from '../getAssetDimensions';
import { getAssetUrl } from '../getAssetUrl';
import {
  COMPANY_WEBSITE_LINK_LABEL,
  resolveCompanyWebsiteLink,
  SECTOR_COMPANY_WEBSITE_LINK_LABEL,
} from '../company/resolveCompanyWebsite';
import type { CompanyFields } from '../types/company';

import type { SectorCompanyCardItem } from './types';

function normalizeSocialUrl(url?: string): string | undefined {
  const trimmed = url?.trim();
  return trimmed || undefined;
}

type MapCompanyToSectorCardOptions = {
  linkLabel?: string;
  preferLogo?: boolean;
  includeImage?: boolean;
};

export function mapCompanyToSectorCard(
  id: string,
  fields: CompanyFields,
  options: MapCompanyToSectorCardOptions = {},
): SectorCompanyCardItem | null {
  const {
    linkLabel = COMPANY_WEBSITE_LINK_LABEL,
    preferLogo = false,
    includeImage = false,
  } = options;

  const logoAsset = preferLogo ? (fields.logo ?? fields.icon) : (fields.icon ?? fields.logo);
  const logoUrl = getAssetUrl(logoAsset);
  if (!logoUrl) return null;

  const dimensions = getAssetDimensions(logoAsset, { width: 140, height: 48 });
  const link = fields.webSiteURL ? resolveCompanyWebsiteLink(fields.webSiteURL) : undefined;
  const imageUrl = includeImage ? getAssetUrl(fields.image) : undefined;
  const imageAlt =
    (typeof fields.image?.fields?.title === 'string'
      ? fields.image.fields.title
      : undefined) ?? fields.name;

  return {
    id,
    title: fields.name,
    description: fields.description,
    body: fields.body,
    logoUrl,
    logoWidth: dimensions.width,
    logoHeight: dimensions.height,
    imageUrl,
    imageAlt,
    href: link?.href,
    external: link?.external,
    linkLabel,
  };
}

export function mapCompanyToSectorFeatureItem(
  id: string,
  fields: CompanyFields,
): SectorCompanyCardItem | null {
  return mapCompanyToSectorCard(id, fields, {
    linkLabel: SECTOR_COMPANY_WEBSITE_LINK_LABEL,
    preferLogo: true,
    includeImage: true,
  });
}

export function mapCompanyToSectorBankingCard(
  id: string,
  fields: CompanyFields,
): SectorCompanyCardItem | null {
  const imageUrl = getAssetUrl(fields.image);
  if (!imageUrl) return null;

  const iconAsset = fields.icon ?? fields.logo;
  const iconUrl = getAssetUrl(iconAsset);
  if (!iconUrl) return null;

  const iconDimensions = getAssetDimensions(iconAsset, { width: 31, height: 31 });
  const logoDimensions = getAssetDimensions(fields.logo ?? iconAsset, { width: 140, height: 48 });
  const link = fields.webSiteURL ? resolveCompanyWebsiteLink(fields.webSiteURL) : undefined;
  const imageAlt =
    (typeof fields.image?.fields?.title === 'string'
      ? fields.image.fields.title
      : undefined) ?? fields.name;

  return {
    id,
    title: fields.name,
    description: fields.description,
    logoUrl: getAssetUrl(fields.logo ?? iconAsset) ?? iconUrl,
    logoWidth: logoDimensions.width,
    logoHeight: logoDimensions.height,
    iconUrl,
    iconWidth: iconDimensions.width,
    iconHeight: iconDimensions.height,
    imageUrl,
    imageAlt,
    href: link?.href,
    external: link?.external,
    linkLabel: SECTOR_COMPANY_WEBSITE_LINK_LABEL,
    linkedinUrl: normalizeSocialUrl(fields.linkedin),
    instagramUrl: normalizeSocialUrl(fields.instagram),
  };
}
