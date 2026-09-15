'use client';

import { useEffect, useState, type FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/data';
import { scrollToSection } from '@/lib/utils';

interface NavbarProps {
  readonly brand?: { href: string };
}

const useScrollSpy = (
  sectionIds: string[],
): { active: string; scrolled: boolean } => {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      const current = sectionIds.findLast((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const offset = 180;
        return rect.top <= offset && rect.bottom > offset;
      });
      setActive(current ?? sectionIds[0] ?? 'hero');
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('hashchange', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('hashchange', update);
    };
  }, [sectionIds]);

  return { active, scrolled };
};

export const Navbar: FC<NavbarProps> = ({ brand }) => {
  const { active, scrolled } = useScrollSpy([
    'hero',
    'solutions',
    'portfolio',
    'pricing',
    'testimonials',
    'contact',
  ]);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      scrollToSection(href);
    }
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`sticky top-0 z-40 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'bg-midnight/70 shadow-lg shadow-black/30' : 'bg-transparent'
      } border-b border-white/5`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href={brand?.href ?? '/'}
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3"
          >
            <Image
              src="/enigmolabs.jpeg"
              alt="ENIGMO LABS logo"
              className="h-9 w-9 rounded-lg object-cover ring-1 ring-egyptian-blue/30"
              width={36}
              height={36}
            />
            <span className="text-xl font-bold tracking-wider font-mono text-white">
              ENIGMO LABS
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative text-sm font-mono tracking-widest uppercase transition-colors ${
                    isActive
                      ? 'text-egyptian-blue'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-0.5 w-4 rounded bg-egyptian-blue"
                    />
                  )}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => handleNavClick('#contact')}
              className="px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-egyptian-blue/20 transition-colors"
            >
              Consultation
            </button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-egyptian-blue"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-white/5 bg-midnight/95 backdrop-blur-md"
          >
            <div className="flex flex-col gap-2 py-3">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`block px-4 py-3 text-sm font-mono tracking-widest uppercase transition-colors ${
                      isActive
                        ? 'text-egyptian-blue bg-egyptian-blue/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
