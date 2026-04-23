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

  return (
    <>
      <section className="w-full min-h-[80vh] flex flex-col lg:flex-row items-stretch overflow-hidden bg-[var(--background)]">
        {/* Image Column — Swiper Carousel */}
        <div className={`w-full lg:w-[55%] h-[500px] lg:h-[700px] relative group ${reverse ? 'lg:order-2' : ''}`}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: `.prev-${room.id}`,
              nextEl: `.next-${room.id}`,
            }}
            loop={allImages.length > 1}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={1000}
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
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Main Gallery Navigation Buttons */}
          <button className={`prev-${room.id} absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/90 backdrop-blur-md rounded-full text-white hover:text-black transition-all opacity-0 group-hover:opacity-100 hidden md:flex active:scale-90 border border-white/20`}>
            <ChevronLeft size={20} />
          </button>
          <button className={`next-${room.id} absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/90 backdrop-blur-md rounded-full text-white hover:text-black transition-all opacity-0 group-hover:opacity-100 hidden md:flex active:scale-90 border border-white/20`}>
            <ChevronRight size={20} />
          </button>

          <style>{`
            .room-gallery-swiper,
            .room-gallery-swiper .swiper-wrapper,
            .room-gallery-swiper .swiper-slide { height: 100% !important; }
            .room-gallery-swiper .swiper-pagination { bottom: 24px; text-align: center; width: 100%; left: 0; }
            .room-gallery-swiper .swiper-pagination-bullet { background: white; opacity: 0.4; width: 6px; height: 6px; transition: all 0.3s ease; }
            .room-gallery-swiper .swiper-pagination-bullet-active { opacity: 1; transform: scale(1.5); }
            
            .lightbox-swiper .swiper-pagination-fraction { color: white; opacity: 0.6; font-family: var(--font-mono); }
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
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-8 right-8 z-[210] p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all hover:scale-110 active:scale-95 border border-white/10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Swiper inside Lightbox */}
          <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Swiper
              modules={[Navigation, Pagination]}
              initialSlide={lightboxIndex}
              navigation={{
                prevEl: '.lightbox-prev',
                nextEl: '.lightbox-next',
              }}
              pagination={{ type: 'fraction', el: '.lightbox-counter' }}
              className="w-full h-full lightbox-swiper"
              speed={600}
              onSlideChange={(swiper) => setLightboxIndex(swiper.activeIndex)}
            >
              {allImages.map((img, idx) => (
                <SwiperSlide key={idx} className="flex items-center justify-center p-4 md:p-20">
                  <div className="relative w-full h-full">
                    <Image
                      src={img}
                      alt={`${room.name} — ${idx + 1}`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      quality={100}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Custom Controls */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[210] flex items-center gap-12 text-white">
            <button className="lightbox-prev p-4 hover:opacity-50 transition-opacity cursor-pointer">
              <ChevronLeft className="w-8 h-8" strokeWidth={1} />
            </button>
            <div className="lightbox-counter font-mono text-sm tracking-[0.3em] uppercase opacity-60"></div>
            <button className="lightbox-next p-4 hover:opacity-50 transition-opacity cursor-pointer">
              <ChevronRight className="w-8 h-8" strokeWidth={1} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
