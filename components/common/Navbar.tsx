'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Yellowtail } from "next/font/google";
import { Menu, X, Globe, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useLenis } from 'lenis/react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"] });

// Dictionary for 3 languages
const navData = {
  en: {
    home: 'Home',
    suites: 'Le Suite',
  },
  it: {
    home: 'Home',
    suites: 'Le Suite',
  },
  de: {
    home: 'Home',
    suites: 'Le Suite',
  }
};

// Flag Components
const FlagEN = () => (
  <svg width="32" height="24" viewBox="0 0 640 480" className="rounded-sm shadow-sm inline-block">
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 240l240 178v62h-78L320 300 77 480H0v-62l240-178L0 62V0h75z" />
    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zM226 199 0 32V0l271 199h-45zm353 82L640 327v-62l-61 45zM0 321l121-89H66L0 281v40z" />
    <path fill="#FFF" d="M241 0v480h158V0H241zM0 161v158h640V161H0z" />
    <path fill="#C8102E" d="M0 193v95h640v-95H0zM272 0v480h96V0h-96z" />
  </svg>
);

const FlagIT = () => (
  <svg width="32" height="24" viewBox="0 0 640 480" className="rounded-sm shadow-sm inline-block">
    <path fill="#fff" d="M0 0h640v480H0z" />
    <path fill="#009246" d="M0 0h213.3v480H0z" />
    <path fill="#ce2b37" d="M426.7 0H640v480H426.7z" />
  </svg>
);

const FlagDE = () => (
  <svg width="32" height="24" viewBox="0 0 640 480" className="rounded-sm shadow-sm inline-block">
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
  const [showLogo, setShowLogo] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = navData[lang];
  const pathname = usePathname();

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

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (!lenis) return;
    if (isMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isMenuOpen, lenis]);

  const getPath = (route: string) => {
    if (route === '/') return `/${lang}`;
    return `/${lang}${route}`;
  };

  const switchLangUrl = (newLang: string) => {
    const currentRoute = pathname.replace(`/${lang}`, '');
    if (!currentRoute) return `/${newLang}`;
    return `/${newLang}${currentRoute}`;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolled
          ? 'bg-[var(--background)]/80 backdrop-blur-md py-5 pb-6'
          : 'bg-transparent py-5 md:py-10'
          } ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="container px-5 mx-auto relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            {(['en', 'it', 'de'] as const).map((l) => (
              <Link
                key={l}
                href={switchLangUrl(l)}
                title={l.toUpperCase()}
                className={`p-2 -m-2 transition-all duration-300 transform ${lang === l
                  ? 'scale-110 opacity-100 saturate-100'
                  : 'scale-90 opacity-50 saturate-50 hover:opacity-100 hover:saturate-100 hover:scale-100'
                  }`}
              >
                {flags[l]}
              </Link>
            ))}
          </div>
          {/* Logo Section */}
          <Link
            href={getPath('/')}
            className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-1 transition-all duration-500 ease-in-out ${showLogo
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
          >

            <div
              className="relative z-10 flex flex-col items-center justify-center text-black will-change-transform mt-2"
              style={{
                transformOrigin: "center center"
              }}
            >
              <h1
                className={`${yellowtail.className} text-3xl md:text-4xl tracking-wide mb-1`}
              >
                Marinali
              </h1>
              <div className="flex items-center gap-3 mt-0 md:-mt-1">
                <div className="w-8 h-[1px] bg-black opacity-80"></div>
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-medium opacity-100">
                  Rooms
                </span>
                <div className="w-8 h-[1px] bg-black opacity-80"></div>
              </div>
              <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] font-light opacity-70 mt-1">
                Bassano del Grappa
              </span>
            </div>

          </Link>

          {/* Right Section: Only Burger Menu (+ Flags on Desktop) */}
          <div className="flex items-center gap-6 ml-auto">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 cursor-pointer transition-all hover:scale-110 active:scale-95 text-primary"
            >
              <Menu className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Split Overlay Menu */}
      <div
        className={`fixed inset-0 z-50 grid grid-cols-1 md:grid-cols-2 transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Left Pane (Navigation Links & Solid Background) */}
        <div className="bg-primary text-white flex flex-col justify-center px-10 md:px-24 py-16 relative h-full">
          {/* Menu Items */}
          <nav className="flex flex-col gap-6 md:gap-10 mt-10 md:mt-0">
            {[
              { name: t.home, path: '/' },
              { name: t.suites, path: '/le-suite' },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={getPath(item.path)}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl md:text-3xl font-medium tracking-wide uppercase transition-all duration-300 hover:text-white/70 hover:translate-x-2 w-fit"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Bottom Controls (Socials & Language) */}
          <div className="absolute bottom-10 left-10 md:left-24 flex flex-col gap-6">
            {/* Language Switcher inside Menu */}
            <div className="flex items-center gap-4 mt-2">
              <Globe className="w-5 h-5 opacity-60" />
              <div className="flex items-center gap-3">
                {(['en', 'it', 'de'] as const).map((l) => (
                  <Link
                    key={l}
                    href={switchLangUrl(l)}
                    className={`p-2 -m-2 hover:scale-110 transition-all duration-300 ${lang === l ? 'ring-2 ring-white ring-offset-1 ring-offset-[#8b917c] scale-110' : 'opacity-60 saturate-50 hover:saturate-100 hover:opacity-100'}`}
                    title={l.toUpperCase()}
                  >
                    {flags[l]}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Close Button (only visible on small screens) */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="md:hidden cursor-po absolute top-6 right-6 z-10 p-2 text-white/80 hover:text-white"
          >
            <X className="w-8 h-8" strokeWidth={1} />
          </button>
        </div>

        {/* Right Pane (Image & Close Button) */}
        <div className="hidden md:block relative h-full">
          <Image
            src="/assets/Stanza%201%20-%20Foto-7.jpg"
            alt="Menu Aesthetic"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay to darken image slightly for contrast */}
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Desktop Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute cursor-pointer top-8 right-8 z-10 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 text-white border border-white/30 hover:scale-105 active:scale-95"
          >
            <X className="w-6 h-6" strokeWidth={1} />
          </button>
        </div>
      </div>
    </>
  );
}
