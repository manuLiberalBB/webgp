import { siteConfig } from '@/config/site';

export function isHomePage(pagePath?: string[]): boolean {
  return pagePath?.length === 1 && pagePath[0] === siteConfig.homePath.slice(1);
}
