'use client';

import Link from 'next/link';
import { Yellowtail } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

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

const footerData = {
  en: {
    locations: ['MARINALI EL GOUNA', 'MARINALI MADONNA', 'MARINALI NORTH COAST', 'MARINALI RHODES', 'MARINALI SAMOS'],
    links: ['ABOUT US', 'MANAGE MY BOOKING', 'COMPANY INFORMATION', 'CONTACT US', 'CAREER', 'SITEMAP', 'EXPLORE OUR OTHER BRAND'],
    bottom: ['Privacy Policy', 'Cookie Policy', 'User Generated Content'],
    copyright: '© Marinali Rooms, All rights reserved'
  },
  it: {
    locations: ['MARINALI EL GOUNA', 'MARINALI MADONNA', 'MARINALI NORTH COAST', 'MARINALI RHODES', 'MARINALI SAMOS'],
    links: ['CHI SIAMO', 'GESTISCI PRENOTAZIONE', 'INFORMAZIONI AZIENDALI', 'CONTATTACI', 'CARRIERA', 'MAPPA DEL SITO', 'ESPLORA ALTRI BRAND'],
    bottom: ['Privacy Policy', 'Cookie Policy', 'Contenuti Generati dagli Utenti'],
    copyright: '© Marinali Rooms, Tutti i diritti riservati'
  },
  de: {
    locations: ['MARINALI EL GOUNA', 'MARINALI MADONNA', 'MARINALI NORTH COAST', 'MARINALI RHODES', 'MARINALI SAMOS'],
    links: ['ÜBER UNS', 'BUCHUNG VERWALTEN', 'UNTERNEHMENSINFORMATIONEN', 'KONTAKT', 'KARRIERE', 'SITEMAP', 'ENTDECKEN SIE UNSERE MARKE'],
    bottom: ['Datenschutzerklärung', 'Cookie-Richtlinie', 'Nutzergenerierte Inhalte'],
    copyright: '© Marinali Rooms, Alle Rechte vorbehalten'
  }
};

export default function Footer({ lang }: { lang: 'en' | 'it' | 'de' }) {
  const t = footerData[lang];

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      return res.json();
    }
  });

  const footerConfigs = settings?.footerConfig as Record<string, any> | undefined;
  const fc = footerConfigs?.[lang];

  // Helper to render social icon by name
  const renderSocialIcon = (iconName: string, className: string) => {
    switch (iconName.toLowerCase()) {
      case 'instagram': return <InstagramIcon className={className} />;
      case 'facebook': return <FacebookIcon className={className} />;
      case 'linkedin': return <LinkedinIcon className={className} />;
      case 'youtube': return <YoutubeIcon className={className} />;
      default: return null;
    }
  };

  return (
    <footer
      id="main-footer"
      className="bg-primary"
      style={{
        backgroundColor: settings?.primaryColor || undefined,
        color: '#fff',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem) 2rem',
        marginTop: 'auto'
      }}
    >
      <div className="mx-auto container">
        {/* Main Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Logo Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="flex flex-col items-start">
              {settings?.logo ? (
                <div className="relative h-16 w-32 mb-2">
                  <Image
                    src={settings.logo}
                    alt="Marinali Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              ) : (
                <>
                  <span className={`${yellowtail.className} text-4xl leading-none `}>
                    Marinali
                  </span>
                  <div className="flex items-center gap-3 w-full mt-3">
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Dynamic Columns or Fallback */}
          {fc?.columns && fc.columns.length > 0 ? (
            fc.columns.map((col: any, i: number) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 className="text-[14px] font-bold mb-2 uppercase tracking-widest opacity-60">{col.title}</h4>
                {col.links.map((link: any, j: number) => (
                  <Link
                    key={j}
                    href={link.url || '#'}
                    className="text-[11px] tracking-[0.1em] font-bold hover:opacity-70 transition-opacity uppercase"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))
          ) : (
            <>
              {/* Fallback Locations Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {t.locations.map((loc, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="text-[11px] tracking-[0.1em] font-bold hover:opacity-70 transition-opacity uppercase"
                  >
                    {loc}
                  </Link>
                ))}
              </div>

              {/* Fallback Links Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {t.links.map((link, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="text-[11px] tracking-[0.1em] font-bold hover:opacity-70 transition-opacity uppercase"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Socials Column */}
          <div className="flex flex-col gap-5 lg:items-end">
            <div className="flex gap-6 lg:flex-col lg:gap-4 lg:items-center">
              {fc?.socialLinks && fc.socialLinks.length > 0 ? (
                fc.socialLinks.map((social: any, i: number) => (
                  <Link key={i} href={social.url || '#'}>
                    {renderSocialIcon(social.icon, "w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity")}
                  </Link>
                ))
              ) : (
                <>
                  <InstagramIcon className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                  <FacebookIcon className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                  <LinkedinIcon className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                  <YoutubeIcon className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ marginTop: '80px' }}>
          {/* Legal Links */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 text-[12px] opacity-90 tracking-wide font-mono">
            {fc?.bottomLinks && fc.bottomLinks.length > 0 ? (
              fc.bottomLinks.map((link: any, i: number) => (
                <Link key={i} href={link.url || '#'} className="hover:underline">
                  {link.label}
                </Link>
              ))
            ) : (
              t.bottom.map((item, i) => (
                <Link key={i} href="#" className="hover:underline">
                  {item}
                </Link>
              ))
            )}
          </div>

          {/* Separator Line */}
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.2)', marginBottom: '20px' }} />

          {/* Copyright */}
          <div
            style={{
              textAlign: 'center',
              fontSize: '11px',
              opacity: 0.7,
              letterSpacing: '0.05em',
              fontFamily: 'monospace'
            }}
          >
            {fc?.copyright || t.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
