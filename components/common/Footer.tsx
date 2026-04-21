'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Yellowtail } from "next/font/google";

const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"] });

const staticContent = {
  en: {
    infoTitle: "GET IN TOUCH",
    address: "Piazza dell Unita', 1\n40128 Bologna, Italy",
    phone: "+39 123 456 7890",
    email: "info@marinalirooms.com",
    formTitle: "SEND US A MESSAGE",
    nameLabel: "NAME",
    emailLabel: "EMAIL",
    messageLabel: "MESSAGE",
    submitButton: "SEND INQUIRY",
    successMsg: "Thank you for your message. We will get back to you shortly.",
    follow: "Follow our journey",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
    rights: "All rights reserved",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11311.238128362706!2d10.428581023773539!3d44.86608935447101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47801be6ca7f363b%3A0xc3f83737ec38a2e!2sMarinali%20Rooms!5e0!3m2!1sen!2sit!4v1709669524458!5m2!1sen!2sit",
  },
  it: {
    infoTitle: "CONTATTACI",
    address: "Piazza dell Unita', 1\n40128 Bologna, Italia",
    phone: "+39 123 456 7890",
    email: "info@marinalirooms.com",
    formTitle: "INVIACI UN MESSAGGIO",
    nameLabel: "NOME",
    emailLabel: "EMAIL",
    messageLabel: "MESSAGGIO",
    submitButton: "INVIA RICHIESTA",
    successMsg: "Grazie per il tuo messaggio. Ti risponderemo a breve.",
    follow: "Segui il nostro viaggio",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
    rights: "Tutti i diritti riservati",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11311.238128362706!2d10.428581023773539!3d44.86608935447101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47801be6ca7f363b%3A0xc3f83737ec38a2e!2sMarinali%20Rooms!5e0!3m2!1sen!2sit!4v1709669524458!5m2!1sen!2sit",
  },
  de: {
    infoTitle: "KONTAKTIEREN SIE UNS",
    address: "Piazza dell Unita', 1\n40128 Bologna, Italien",
    phone: "+39 123 456 7890",
    email: "info@marinalirooms.com",
    formTitle: "SENDEN SIE UNS EINE NACHRICHT",
    nameLabel: "NAME",
    emailLabel: "E-MAIL",
    messageLabel: "NACHRICHT",
    submitButton: "ANFRAGE SENDEN",
    successMsg: "Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.",
    follow: "Folgen Sie unserer Reise",
    privacy: "Datenschutzerklärung",
    cookie: "Cookie-Richtlinie",
    rights: "Alle Rechte vorbehalten",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11311.238128362706!2d10.428581023773539!3d44.86608935447101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47801be6ca7f363b%3A0xc3f83737ec38a2e!2sMarinali%20Rooms!5e0!3m2!1sen!2sit!4v1709669524458!5m2!1sen!2sit",
  }
};

export default function Footer({ lang }: { lang: 'en' | 'it' | 'de' }) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const t = staticContent[lang] || staticContent.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <footer id="main-footer" className="bg-[#F8F6F2] font-playfair w-full relative z-30 text-[#123149] border-t border-gray-200">
      {/* Main Content Grid */}
      <section className="grid lg:grid-cols-2">
        {/* Left Side: Info & Form */}
        <div className="p-6 md:p-12 flex justify-center text-center">
          <div className="max-w-xl w-full mx-auto">
            <div className="mb-4">
              <span className="text-xl lg:text-2xl tracking-[0.3em] font-bold text-primary mb-4 block uppercase">
                {t.infoTitle}
              </span>
              <div className="space-y-2 text-sm font-medium">
                <span className="block hover:opacity-70 transition-opacity">
                  {t.address}
                </span>
                <span className=" text-sm hover:opacity-70 transition-opacity">
                  {t.phone}
                </span>
                <span className=" text-sm hover:opacity-70 transition-opacity">
                  || {t.email}
                </span>
              </div>
            </div>

            <hr className="my-5 border-gray-300" />

            <div>


              {formState === 'success' ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-sm italic animate-fade-in text-base border border-green-100">
                  {t.successMsg}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500 block">
                        {t.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full border-b border-gray-300 py-2 focus:border-[#123149] outline-none transition-colors bg-transparent font-sans text-center text-[#123149]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500 block">
                        {t.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full border-b border-gray-300 py-2 focus:border-[#123149] outline-none transition-colors bg-transparent font-sans text-center text-[#123149]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500 block">
                      {t.messageLabel}
                    </label>
                    <textarea
                      rows={2}
                      required
                      className="w-full border-b border-gray-300 py-2 focus:border-[#123149] outline-none transition-colors bg-transparent resize-none font-sans text-center text-[#123149]"
                    />
                  </div>
                  <button
                    disabled={formState === 'submitting'}
                    type="submit"
                    className="px-8 py-3 bg-[#123149] text-white text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-black transition-all disabled:opacity-50 mx-auto block cursor-pointer"
                  >
                    {t.submitButton}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="relative h-full overflow-hidden">
          <iframe
            src={t.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 grayscale"
          />
        </div>
      </section>

      {/* Navigation Footer for Contact */}
      <div className="py-10 px-4 text-center bg-[#123149] text-white mt-auto">
        <div className="relative z-10 flex flex-col items-center  justify-center text-white my-8">
          <h1 className={`${yellowtail.className} text-4xl md:text-5xl tracking-wide mb-1`}>
            Marinali
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <div className="w-10 h-[1px] bg-white opacity-80"></div>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-medium opacity-100">
              Rooms
            </span>
            <div className="w-10 h-[1px] bg-white opacity-80"></div>
          </div>
        </div>
        {/* Bottom copyright info preserved from original footer */}
        <div className="max-w-4xl mx-auto border-t border-white/20 pt-6 text-xs font-mono opacity-80 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <Link href="#" className="hover:underline mr-4">{t.privacy}</Link>
            <Link href="#" className="hover:underline">{t.cookie}</Link>
          </div>
          <div>© {new Date().getFullYear()} Marinali Rooms. {t.rights}.</div>
        </div>
      </div>
    </footer>
  );
};

