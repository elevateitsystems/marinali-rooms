'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useLenis } from 'lenis/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


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

  const [lightboxPrevEl, setLightboxPrevEl] = useState<HTMLElement | null>(null);
  const [lightboxNextEl, setLightboxNextEl] = useState<HTMLElement | null>(null);

  const lenis = useLenis();

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }

    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    };
  }, [lightboxOpen, lenis]);

  return (
    <>
      <section className={`w-full min-h-[80vh] flex ${reverse ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row'} items-stretch overflow-hidden bg-[var(--background)]`}>
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
            
            .lightbox-swiper .swiper-pagination-fraction { color: black; opacity: 0.6; font-family: var(--font-mono); }
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

      {/* Lightbox - Casa Cook Style */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] bg-white flex flex-col lg:flex-row items-stretch animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 lg:top-8 lg:right-8 z-[210] p-2 text-black/70 hover:text-black transition-all hover:scale-110 active:scale-95 bg-white/50 rounded-full backdrop-blur-sm"
          >
            <X className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={1} />
          </button>

          {/* Image Area */}
          <div className="w-full lg:w-[70%] h-[55vh] lg:h-full relative bg-[#F8F6F2]" onClick={(e) => e.stopPropagation()}>
            <Swiper
              modules={[Navigation, Pagination]}
              initialSlide={lightboxIndex}
              navigation={{
                prevEl: lightboxPrevEl,
                nextEl: lightboxNextEl,
              }}
              loop={true}
              className="w-full h-full lightbox-swiper"
              speed={800}
              onSlideChange={(swiper) => setLightboxIndex(swiper.realIndex)}
            >
              {allImages.map((img, idx) => (
                <SwiperSlide key={idx} className="flex items-center justify-center w-full h-full">
                  <div className="relative w-full h-full p-4 lg:p-12">
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

            {/* Custom Minimal Controls - Casa Cook Style */}
            {/* Left Arrow */}
            <button
              ref={setLightboxPrevEl}
              className="absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-[210] p-2 lg:p-4 text-black/50 hover:text-black transition-opacity cursor-pointer hidden md:block bg-white/30 hover:bg-white/60 rounded-full backdrop-blur-sm"
            >
              <ChevronLeft className="w-8 h-8 lg:w-10 lg:h-10" strokeWidth={1} />
            </button>
            
            {/* Right Arrow */}
            <button
              ref={setLightboxNextEl}
              className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-[210] p-2 lg:p-4 text-black/50 hover:text-black transition-opacity cursor-pointer hidden md:block bg-white/30 hover:bg-white/60 rounded-full backdrop-blur-sm"
            >
              <ChevronRight className="w-8 h-8 lg:w-10 lg:h-10" strokeWidth={1} />
            </button>

          </div>

          {/* Content Area */}
          <div 
            className="w-full lg:w-[30%] h-[45vh] lg:h-full overflow-y-auto px-6 lg:px-16 py-10 lg:py-24 flex flex-col justify-center bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-60 mb-4 lg:mb-6 block">
              {room.location}
            </span>
            <h2 className="text-3xl lg:text-4xl font-primary mb-4 lg:mb-6 leading-tight tracking-tight text-[var(--primary-color)]">
              {room.name}
            </h2>
            <p className="text-sm lg:text-base leading-relaxed opacity-80 font-light">
              {room.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
