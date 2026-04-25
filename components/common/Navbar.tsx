'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Yellowtail } from "next/font/google";
import { useQuery } from '@tanstack/react-query';
import { useLenis } from 'lenis/react';

const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"] });

// Dictionary for 3 languages
const navData = {
  en: {
    hero: 'Hero',
    suites: 'Le Suite',
    heritage: 'Heritage',
    reviews: 'Reviews',
    map: 'Map',
    contact: 'Contact',
  },
  it: {
    hero: 'Hero',
    suites: 'Le Suite',
    heritage: 'Il Palazzetto',
    reviews: 'Recensioni',
    map: 'Mappa',
    contact: 'Contatti',
  },
  de: {
    hero: 'Hero',
    suites: 'Le Suite',
    heritage: 'Heritage',
    reviews: 'Bewertungen',
    map: 'Karte',
    contact: 'Kontakt',
  }
};

const languages = ['it', 'en', 'de'] as const;

export default function Navbar({ lang }: { lang: 'en' | 'it' | 'de' }) {
  const [scrolled, setScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const t = navData[lang];
  const pathname = usePathname();
  const isLeSuite = pathname.includes('/le-suite');

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      return res.json();
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowLogo(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lenis = useLenis();

  const getPath = (route: string) => {
    if (route === '/') return `/${lang}`;
    return `/${lang}${route}`;
  };

  const switchLangUrl = (newLang: string) => {
    const currentRoute = pathname.replace(`/${lang}`, '');
    if (!currentRoute) return `/${newLang}`;
    return `/${newLang}${currentRoute}`;
  };

  const textColor = (scrolled || isLeSuite) ? 'text-black' : 'text-white';
  const logoLineColor = (scrolled || isLeSuite) ? 'bg-black' : 'bg-white';

  const logoContent = (
    <div
      className={`relative z-10 flex flex-col items-center justify-center ${textColor} will-change-transform`}
      style={{ transformOrigin: "center center" }}
    >
      <h1 className={`${yellowtail.className} text-3xl md:text-4xl tracking-wide mb-1`}>
        Marinali
      </h1>
      <div className="flex items-center gap-3 mt-0 md:-mt-1">
        <div className={`w-8 h-px ${logoLineColor} opacity-80`}></div>
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-medium opacity-100">
          Rooms
        </span>
        <div className={`w-8 h-px ${logoLineColor} opacity-80`}></div>
      </div>
      <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] font-light opacity-70 mt-1">
        Bassano del Grappa
      </span>
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${(scrolled || isLeSuite)
          ? 'bg-[var(--background)]/80 backdrop-blur-md shadow-sm py-2 pb-3'
          : 'bg-transparent py-2 md:py-4'
          }`}
      >
        <div className="container px-2 md:px-5 mx-auto flex items-center justify-between w-full relative min-h-[4rem]">

          {/* Left: Navigation Links */}
          <div className="flex-1 flex justify-start z-20">
            <nav className={`flex items-center justify-start flex-wrap gap-x-3 gap-y-1 md:gap-x-4 md:gap-y-2 lg:gap-6 ${textColor}`}>
              {[
                { name: t.suites, path: '#le-suite' },
                { name: t.heritage, path: '#heritage' },
                { name: t.contact, path: '#contact' },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(item.path);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:opacity-70"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: Logo */}
          <div className="flex-none flex justify-center z-30 mx-2 md:mx-4">
            <Link
              href={getPath('/')}
              onClick={(e) => {
                e.preventDefault();
                if (lenis) lenis.scrollTo(0);
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1 transition-all duration-500 ease-in-out ${(showLogo || isLeSuite)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
            >
              {logoContent}
            </Link>
          </div>

          {/* Right: Language Switcher */}
          <div className="flex-1 flex justify-end z-20">
            <div className={`flex items-center gap-2 sm:gap-3 md:gap-4 text-xs md:text-base font-mono tracking-widest uppercase ${textColor}`}>
              {languages.map((l, i) => (
                <div key={l} className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <Link
                    href={switchLangUrl(l)}
                    className={`transition-all duration-300 ${lang === l ? 'font-bold opacity-100 border-b border-current' : 'opacity-40 hover:opacity-100'}`}
                  >
                    {l}
                  </Link>
                  {i < languages.length - 1 && <span className="opacity-20">|</span>}
                </div>
              ))}
            </div>
          </div>

        </div>
      </header>
    </>
  );
}
