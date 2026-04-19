'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import EditableText from '../common/EditableText';
import { Yellowtail } from "next/font/google";

const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"] });
interface ContactContentProps {
  lang: 'en' | 'it' | 'de';
  initialData: any;
}

export default function ContactContent({ lang, initialData }: ContactContentProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch('/api/settings');
      return res.json();
    }
  });

  const { data } = useQuery({
    queryKey: ['content', lang, 'contact'],
    queryFn: async () => {
      const res = await fetch(`/api/content/${lang}/contact`);
      return res.json();
    },
    initialData
  });

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll transformations
  const scale = Math.max(1 - scrollY / 500, 0.2);
  const opacity = Math.max(1 - scrollY / 400, 0);
  const translateY = -scrollY * 0.3;
  const bgTranslateY = scrollY * 0.2;

  const primaryColor = settings?.primaryColor || '#123149';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className="bg-[#F8F6F2] min-h-screen font-playfair">
      {/* Hero Section */}
      <section className="-mt-24 relative h-[85vh] w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${bgTranslateY}px)` }}
        >
          <Image
            src="/assets/Stanza%202%20-%20Foto-2.jpg"
            alt="Contact Hero"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>

        {/* Main Content */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-white mt-8 will-change-transform"
          style={{
            transform: `translateY(${translateY}px) scale(${scale})`,
            opacity,
            transformOrigin: "center center"
          }}
        >
          {settings?.logo && (
            <div className="relative h-20 md:h-24 w-48 md:w-56 mb-4">
              <Image
                src={settings.logo}
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
          <EditableText
            page="contact"
            path="heroTitle"
            lang={lang}
            initialValue={data?.heroTitle}
            className={`${yellowtail.className} text-7xl md:text-9xl tracking-wide drop-shadow-md mb-4`}
          />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="grid lg:grid-cols-2">
        {/* Left Side: Info & Form */}
        <div className="p-8 md:p-24 bg-white">
          <div className="max-w-xl mx-auto lg:mx-0">
            <div className="mb-16">
              <EditableText
                page="contact"
                path="infoTitle"
                lang={lang}
                initialValue={data?.infoTitle}
                className="text-xs tracking-[0.3em] font-bold text-gray-400 mb-8 block uppercase"
              />
              <div className="space-y-6 text-2xl md:text-3xl font-medium text-[#123149]" style={{ color: primaryColor }}>
                <EditableText
                  page="contact"
                  path="address"
                  lang={lang}
                  initialValue={data?.address}
                  className="block hover:opacity-70 transition-opacity"
                />
                <EditableText
                  page="contact"
                  path="phone"
                  lang={lang}
                  initialValue={data?.phone}
                  className="block hover:opacity-70 transition-opacity"
                />
                <EditableText
                  page="contact"
                  path="email"
                  lang={lang}
                  initialValue={data?.email}
                  className="block hover:opacity-70 transition-opacity underline underline-offset-8"
                />
              </div>
            </div>

            <hr className="my-16 border-gray-100" />

            <div>
              <EditableText
                page="contact"
                path="formTitle"
                lang={lang}
                initialValue={data?.formTitle}
                className="text-3xl font-bold mb-12 uppercase tracking-tighter"
              />

              {formState === 'success' ? (
                <div className="bg-green-50 text-green-800 p-8 rounded-sm italic animate-fade-in text-lg border border-green-100">
                  {lang === 'en' ? 'Thank you for your message. We will get back to you shortly.' : lang === 'it' ? 'Grazie per il tuo messaggio. Ti risponderemo a breve.' : 'Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.'}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <EditableText
                        page="contact"
                        path="nameLabel"
                        lang={lang}
                        initialValue={data?.nameLabel}
                        className="text-[10px] tracking-[0.2em] font-bold uppercase text-gray-400"
                      />
                      <input
                        type="text"
                        required
                        className="w-full border-b border-gray-200 py-4 focus:border-black outline-none transition-colors bg-transparent font-sans"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <EditableText
                        page="contact"
                        path="emailLabel"
                        lang={lang}
                        initialValue={data?.emailLabel}
                        className="text-[10px] tracking-[0.2em] font-bold uppercase text-gray-400"
                      />
                      <input
                        type="email"
                        required
                        className="w-full border-b border-gray-200 py-4 focus:border-black outline-none transition-colors bg-transparent font-sans"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <EditableText
                      page="contact"
                      path="messageLabel"
                      lang={lang}
                      initialValue={data?.messageLabel}
                      className="text-[10px] tracking-[0.2em] font-bold uppercase text-gray-400"
                    />
                    <textarea
                      rows={4}
                      required
                      className="w-full border-b border-gray-200 py-4 focus:border-black outline-none transition-colors bg-transparent resize-none font-sans"
                      placeholder="..."
                    />
                  </div>
                  <button
                    disabled={formState === 'submitting'}
                    type="submit"
                    className="px-12 py-5 bg-[#123149] text-white text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-black transition-all disabled:opacity-50"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <EditableText
                      page="contact"
                      path="submitButton"
                      lang={lang}
                      initialValue={data?.submitButton}
                    />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="relative h-[600px] lg:h-auto overflow-hidden">
          <iframe
            src={data?.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 grayscale invert"
          />
        </div>
      </section>

      {/* Navigation Footer for Contact */}
      <div className="bg-[#123149] py-20 px-4 text-center text-white" style={{ backgroundColor: primaryColor }}>
        <h3 className="text-4xl md:text-5xl font-bold mb-8 italic">
          {lang === 'en' ? 'Follow our journey' : lang === 'it' ? 'Segui il nostro viaggio' : 'Folgen Sie unserer Reise'}
        </h3>
        <div className="flex justify-center gap-12 text-[10px] tracking-[0.3em] font-bold uppercase">
          <Link href="#" className="hover:opacity-70 transition-opacity">INSTAGRAM</Link>
          <Link href="#" className="hover:opacity-70 transition-opacity">FACEBOOK</Link>
          <Link href="#" className="hover:opacity-70 transition-opacity">LINKEDIN</Link>
        </div>
      </div>
    </div>
  );
}
