export function parseHashHref(href: string) {
  const hashIndex = href.indexOf('#');

  if (hashIndex === -1) {
    return { pathname: href, hash: '' };
  }

  const pathname = href.slice(0, hashIndex) || '/';
  const hash = href.slice(hashIndex + 1);

  return { pathname, hash };
}

export function normalizePathname(pathname: string) {
  if (!pathname || pathname === '/') return '/';

  return pathname.replace(/\/$/, '') || '/';
}

export function scrollToSectionAnchor(hash: string) {
  if (!hash) return false;

  const target = document.getElementById(hash);

  if (!target) return false;

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.pushState(null, '', `#${hash}`);

  return true;
}
