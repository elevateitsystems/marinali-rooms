'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const BookingModal = dynamic(() => import('../common/BookingModal').then(mod => ({ default: mod.BookingModal })), { ssr: false });

interface RoomSplitSectionProps {
  room: {
    id: string | number;
    name: string;
    description: string;
    image: string;
    location: string;
  };
  reverse?: boolean;
  lang: string;
  priority?: boolean;
}

export default function RoomSplitSection({ room, reverse = false, lang, priority = false }: RoomSplitSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingUrl, setBookingUrl] = useState("");

  const handleBookNow = () => {
    const successUrl = `${window.location.origin}/${lang}/thank-you`;
    setBookingUrl(`https://marinalirooms.kross.travel/book/step1?lang=${lang}&url_back=${encodeURIComponent(successUrl)}`);
    setIsModalOpen(true);
  };

  const btnText = lang === 'it' ? 'Prenota ora' : lang === 'de' ? 'Jetzt buchen' : 'Book Now';

  return (
    <section className="w-full min-h-[80vh] flex flex-col lg:flex-row items-stretch overflow-hidden bg-[var(--background)]">
      {/* Image Column */}
      <div className={`w-full lg:w-[55%] relative min-h-[500px] lg:h-auto ${reverse ? 'lg:order-2' : ''}`}>
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      </div>

      {/* Content Column */}
      <div className={`w-full lg:w-[45%] flex flex-col justify-center px-8 lg:px-20 py-16 lg:py-24 ${reverse ? 'lg:order-1' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col h-full justify-center"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-60 mb-6 block">
            {room.location}
          </span>
          
          <h2 className="text-4xl lg:text-5xl font-primary mb-8 leading-tight tracking-tight text-[var(--primary-color)]">
            {room.name}
          </h2>
          
          <p className="text-lg leading-relaxed opacity-80 mb-10 font-light max-w-xl">
            {room.description}
          </p>
          
          <button
            onClick={handleBookNow}
            className="group flex items-center gap-4 w-fit px-8 py-5 bg-[var(--primary-color)] text-white text-xs font-bold tracking-[0.2em] uppercase transition-all hover:bg-[var(--primary-color)]/90 hover:gap-6 shadow-xl active:scale-95"
          >
            {btnText}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        bookingUrl={bookingUrl} 
      />
    </section>
  );
}
