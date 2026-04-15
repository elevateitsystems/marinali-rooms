'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// Dictionary for 3 languages
const navData = {
  en: {
    home: 'Home',
    about: 'About Us',
    contact: 'Contact',
    book: 'Book Now'
  },
  it: {
    home: 'Home',
    about: 'Chi Siamo',
    contact: 'Contatto',
    book: 'Prenota Ora'
  },
  de: {
    home: 'Startseite',
    about: 'Über Uns',
    contact: 'Kontakt',
    book: 'Jetzt Buchen'
  }
};

// Flag Components
const FlagEN = () => (
  <svg width="24" height="18" viewBox="0 0 640 480" className="rounded-sm shadow-sm">
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 240l240 178v62h-78L320 300 77 480H0v-62l240-178L0 62V0h75z" />
    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zM226 199 0 32V0l271 199h-45zm353 82L640 327v-62l-61 45zM0 321l121-89H66L0 281v40z" />
    <path fill="#FFF" d="M241 0v480h158V0H241zM0 161v158h640V161H0z" />
    <path fill="#C8102E" d="M0 193v95h640v-95H0zM272 0v480h96V0h-96z" />
  </svg>
);

const FlagIT = () => (
  <svg width="24" height="18" viewBox="0 0 640 480" className="rounded-sm shadow-sm">
    <path fill="#fff" d="M0 0h640v480H0z" />
    <path fill="#009246" d="M0 0h213.3v480H0z" />
    <path fill="#ce2b37" d="M426.7 0H640v480H426.7z" />
  </svg>
);

const FlagDE = () => (
  <svg width="24" height="18" viewBox="0 0 640 480" className="rounded-sm shadow-sm">
    <path fill="#ffce00" d="M0 320h640v160H0z" />
    <path d="M0 0h640v160H0z" />
    <path fill="#d00" d="M0 160h640v160H0z" />
  </svg>
);

const flags = {
  en: <FlagEN />,
  it: <FlagIT />,
  de: <FlagDE />
};

export default function Navbar({ lang }: { lang: 'en' | 'it' | 'de' }) {
  const [scrolled, setScrolled] = useState(false);
  const t = navData[lang];
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to construct link paths. 
  // E.g. getPath('/about') -> '/it/about'
  const getPath = (route: string) => {
    if (route === '/') return `/${lang}`;
    return `/${lang}${route}`;
  };

  // Helper to switch language
  // E.g. switchLang('it') on '/en/about' -> '/it/about'
  const switchLangUrl = (newLang: string) => {
    const currentRoute = pathname.replace(`/${lang}`, '');
    if (!currentRoute) return `/${newLang}`;
    return `/${newLang}${currentRoute}`;
  };

  const isActive = (route: string) => {
    return pathname === getPath(route);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolled
        ? 'bg-[var(--background)]/80 backdrop-blur-md shadow-sm py-4'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">

        {/* Logo Section */}
        <Link
          href={getPath('/')}
          className="text-2xl font-bold tracking-tight transition-colors"
        >
          Marinali <span className="text-primary">Rooms</span>
        </Link>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: t.home, path: '/' },
            { name: t.about, path: '/about' },
            { name: t.contact, path: '/contact' },
          ].map((item) => (
            <Link
              key={item.path}
              href={getPath(item.path)}
              className={`text-sm font-medium transition-colors hover:text-primary relative group
                ${isActive(item.path) ? 'text-primary' : 'opacity-70 hover:opacity-100'}
              `}
            >
              {item.name}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300
                ${isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'}
              `}></span>
            </Link>
          ))}
        </nav>

        {/* Right Section: Language Switcher & CTA */}
        <div className="flex items-center gap-6">

          <div className="flex items-center gap-3">
            {(['en', 'it', 'de'] as const).filter(l => l !== lang).map((l) => (
              <Link
                key={l}
                href={switchLangUrl(l)}
                className="hover:scale-110 transition-transform active:scale-95  hover:grayscale-0 duration-300"
                title={l.toUpperCase()}
              >
                {flags[l]}
              </Link>
            ))}
          </div>

          <button className="hidden sm:flex items-center justify-center px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full shadow hover:-translate-y-0.5 hover:shadow-lg transition-all active:scale-95">
            {t.book}
          </button>
        </div>
      </div>
    </header>
  );
}
