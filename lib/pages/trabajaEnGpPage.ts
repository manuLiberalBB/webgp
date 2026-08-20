export const TRABAJA_EN_GP_PAGE_PATH = 'trabaja-en-gp';

export function isTrabajaEnGpPage(pagePath?: string[]): boolean {
  return pagePath?.length === 1 && pagePath[0] === TRABAJA_EN_GP_PAGE_PATH;
}
