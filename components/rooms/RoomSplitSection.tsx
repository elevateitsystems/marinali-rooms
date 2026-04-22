'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BookingModal = dynamic(() => import('../common/BookingModal').then(mod => ({ default: mod.BookingModal })), { ssr: false });

interface RoomSplitSectionProps {
  room: {
    id: string | number;
    name: string;
    description: string;
    image: string;
    images?: string[];
    location: string;
  };
  reverse?: boolean;
  lang: string;
  priority?: boolean;
}

export default function RoomSplitSection({ room, reverse = false, lang, priority = false }: RoomSplitSectionProps) {
  const allImages = room.images && room.images.length > 0 ? room.images : [room.image];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = () => setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length);
  const nextImage = () => setLightboxIndex((i) => (i + 1) % allImages.length);

  return (
    <>
      <section className="w-full min-h-[80vh] flex flex-col lg:flex-row items-stretch overflow-hidden bg-[var(--background)]">
        {/* Image Column — Swiper Carousel */}
        <div className={`w-full lg:w-[55%] h-[500px] lg:h-[700px] ${reverse ? 'lg:order-2' : ''}`}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            pagination={{ clickable: true }}
            loop={allImages.length > 1}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            className="h-full w-full room-gallery-swiper"
          >
            {allImages.map((img, idx) => (
              <SwiperSlide key={idx} className="h-full">
                <div
                  className="relative w-full h-full cursor-zoom-in"
                  onClick={() => openLightbox(idx)}
                  title="Click to enlarge"
                >
                  <Image
                    src={img}
                    alt={`${room.name} — photo ${idx + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                    priority={priority && idx === 0}
                    loading={priority && idx === 0 ? undefined : 'lazy'}
                  />
                  {/* Enlarge hint */}
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 pointer-events-none opacity-70">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <style>{`
            .room-gallery-swiper,
            .room-gallery-swiper .swiper-wrapper,
            .room-gallery-swiper .swiper-slide { height: 100% !important; }
            .room-gallery-swiper .swiper-pagination { bottom: 12px; }
            .room-gallery-swiper .swiper-pagination-bullet { background: white; opacity: 0.6; width: 8px; height: 8px; }
            .room-gallery-swiper .swiper-pagination-bullet-active { opacity: 1; }
          `}</style>
        </div>

        {/* Content Column — no Book Now button here */}
        <div className={`w-full lg:w-[45%] flex flex-col justify-center px-8 lg:px-20 py-16 lg:py-24 ${reverse ? 'lg:order-1' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col h-full justify-center"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-60 mb-6 block">
              {room.location}
            </span>

            <h2 className="text-4xl lg:text-5xl font-primary mb-8 leading-tight tracking-tight text-[var(--primary-color)]">
              {room.name}
            </h2>

            <p className="text-lg leading-relaxed opacity-80 mb-4 font-light max-w-xl">
              {room.description}
            </p>

            <p className="text-xs font-mono tracking-widest opacity-40 uppercase mt-2">
              {allImages.length > 1
                ? (lang === 'it' ? `${allImages.length} foto — clicca per ingrandire` : lang === 'de' ? `${allImages.length} Fotos — zum Vergrößern klicken` : `${allImages.length} photos — click to enlarge`)
                : (lang === 'it' ? 'Clicca sulla foto per ingrandire' : lang === 'de' ? 'Klicken zum Vergrößern' : 'Click photo to enlarge')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-5 text-white/60 text-sm font-mono tracking-widest">
            {lightboxIndex + 1} / {allImages.length}
          </div>

          {/* Prev */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[90vh] mx-16 my-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[lightboxIndex]}
              alt={`${room.name} — ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Next */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
