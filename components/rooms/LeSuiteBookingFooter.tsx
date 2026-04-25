'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function LeSuiteBookingFooter({ lang }: { lang: string }) {
  const handleBookNow = () => {
    const successUrl = `${window.location.origin}/${lang}/thank-you`;
    window.location.href = `https://marinalirooms.kross.travel/book/step1?lang=${lang}&url_back=${encodeURIComponent(successUrl)}`;
  };

  const label =
    lang === 'it' ? 'Pronto per il tuo soggiorno?' :
    lang === 'de' ? 'Bereit für Ihren Aufenthalt?' :
    'Ready for your stay?';

  const sub =
    lang === 'it' ? 'Prenota direttamente per le migliori tariffe garantite.' :
    lang === 'de' ? 'Direkt buchen für die besten garantierten Preise.' :
    'Book directly for the best guaranteed rates.';

  const btnText =
    lang === 'it' ? 'Prenota Ora' :
    lang === 'de' ? 'Jetzt Buchen' :
    'Book Now';

  return (
    <section className="w-full bg-primary text-white py-20 px-5 flex flex-col items-center text-center">
      <p className="font-mono text-xs tracking-[0.3em] uppercase opacity-50 mb-4">Marinali Rooms · Bassano del Grappa</p>
      <h2 className="text-4xl md:text-5xl font-primary mb-4 tracking-tight">{label}</h2>
      <p className="text-base opacity-70 font-light mb-10 max-w-md">{sub}</p>
      <button
        onClick={handleBookNow}
        className="group flex items-center gap-4 px-10 py-5 bg-white text-primary text-xs font-bold tracking-[0.2em] uppercase transition-all hover:bg-white/90 hover:gap-6 shadow-xl active:scale-95"
      >
        {btnText}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </button>
    </section>
  );
}
