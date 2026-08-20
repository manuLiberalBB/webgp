'use client';

import { AppImage as Image, AUTO_ASPECT_STYLE } from '@/components/cms/AppImage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { siteConfig } from '@/config/site';
import type { ResolvedNavLink } from '@/lib/contentful/resolveNavLink';
import { cn } from '@/lib/utils';

type HeaderNavProps = {
  logoUrl: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  links: ResolvedNavLink[];
};

function isActivePath(pathname: string, href: string) {
  if (href === siteConfig.homePath) {
    return pathname === siteConfig.homePath || pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  link,
  active,
  onNavigate,
  className,
  mobile = false,
}: {
  link: ResolvedNavLink;
  active: boolean;
  onNavigate?: () => void;
  className?: string;
  mobile?: boolean;
}) {
  return (
    <Link
      href={link.href}
      target={link.isExternal ? '_blank' : undefined}
      rel={link.isExternal ? 'noopener noreferrer' : undefined}
      onClick={onNavigate}
      className={cn(
        'text-nav whitespace-nowrap transition-opacity hover:opacity-80',
        mobile
          ? cn(
              'text-[20px] leading-5',
              active ? 'font-bold underline' : 'font-normal',
            )
          : cn(
              'text-sm leading-5',
              active && 'font-bold !underline decoration-solid underline-offset-[3px]',
            ),
        className,
      )}
    >
      {link.label}
    </Link>
  );
}

export function HeaderNav({
  logoUrl,
  logoAlt,
  logoWidth,
  logoHeight,
  links,
}: HeaderNavProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = links;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-surface fixed inset-x-0 top-0 z-50 w-full shrink-0 shadow-header lg:sticky">
      <div className="px-6 md:px-layout-x">
        <div className="mx-auto flex h-header w-full max-w-content items-center justify-between">
          <Link
            href={siteConfig.homePath}
            className="flex h-[42px] items-center"
            onClick={closeMenu}
          >
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={logoWidth}
              height={logoHeight}
              priority
              style={AUTO_ASPECT_STYLE}
              className="h-[35px] w-auto max-w-[157px] object-contain"
            />
          </Link>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-8 lg:flex"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                link={link}
                active={isActivePath(pathname, link.href)}
              />
            ))}
          </nav>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((open) => !open)}
            className="text-text flex size-6 shrink-0 items-center justify-center lg:hidden"
          >
            {menuOpen ? (
              <Image src="/icons/close.svg" alt="" width={17} height={17} aria-hidden />
            ) : (
              <Image src="/icons/hamburger.svg" alt="" width={24} height={24} aria-hidden />
            )}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Navegación mobile"
        className={cn(
          'bg-surface min-h-[calc(100dvh-var(--spacing-header))] lg:hidden',
          menuOpen ? 'block' : 'hidden',
        )}
      >
        <div className="px-6 md:px-layout-x">
          <ul className="mx-auto flex w-full max-w-content flex-col items-end gap-[60px] py-10">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  link={link}
                  active={isActivePath(pathname, link.href)}
                  onNavigate={closeMenu}
                  mobile
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
