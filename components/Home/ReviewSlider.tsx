'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

const reviews = [
  {
    id: 1,
    quote: "“TRULY AMAZING STAY THAT EXCEEDED OUR HIGH EXPECTATIONS. BEST STAFF EVER! SO FRIENDLY, FUNNY, PROFESSIONAL AND CARING. THE HOTEL ITSELF IS A PIECE OF ART IN DESIGN, CONCEPT AND LAYOUT. TO TOP IT ALL OFF THE BREAKFAST, LUNCH AND DINNER AT THE BEACHHOUSE EVERYDAY WAS SUCH A HIGH LEVEL!”",
    attribution: "Casa Cook Samos – Alexander, September 2023",
    source: "Tripadvisor"
  },
  {
    id: 2,
    quote: "“AN UNFORGETTABLE EXPERIENCE. THE ATTENTION TO DETAIL AND THE SERENE ATMOSPHERE MADE OUR STAY PERFECT. THE ARCHITECTURE BLENDS SEAMLESSLY WITH THE NATURAL BEAUTY OF THE ISLAND. CANNOT WAIT TO RETURN NEXT SEASON.”",
    attribution: "Marinali Rooms – Elena, June 2024",
    source: "Google Reviews"
  },
  {
    id: 3,
    quote: "“THE PERFECT BALANCE OF LUXURY AND RELAXATION. EVERY ASPECT OF THE STAY WAS THOUGHTFULLY CURATED. FROM THE BREAKFAST VIEW TO THE COMFORT OF THE BED, EVERYTHING WAS FIVE STARS.”",
    attribution: "Casa Cook Rhodes – Marco, August 2023",
    source: "Booking.com"
  }
];

export default function ReviewSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section
      className='mt-10 lg:mt-20 bg-primary'
      style={{
        color: '#fff',
        padding: 'clamp(4rem, 10vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setCurrentIndex(swiper.realIndex);
          }}
          slidesPerView={1}
          loop={true}
          speed={800}
          style={{ width: '100%' }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p
                  style={{
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
                    fontWeight: 700,
                    lineHeight: 1.4,
                    letterSpacing: '0.05em',
                    marginBottom: 'clamp(2rem, 5vw, 3rem)',
                    maxWidth: '900px'
                  }}
                >
                  {review.quote}
                </p>

                <p
                  style={{
                    fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                    fontWeight: 400,
                    letterSpacing: '0.1em',
                    opacity: 0.9,
                    fontFamily: 'monospace',
                    marginBottom: '10px'
                  }}
                >
                  {review.attribution}
                </p>

                <a
                  href="#"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                    color: '#fff',
                    textDecoration: 'underline',
                    opacity: 0.8,
                    letterSpacing: '0.1em'
                  }}
                >
                  {review.source}
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Footer Row: Pagination + Arrows */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '3rem auto 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          paddingTop: '2rem'
        }}
      >
        {/* Pagination Status (Left) */}
        <div
          style={{
            fontSize: '0.9rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            opacity: 0.8
          }}
        >
          {currentIndex + 1} / {reviews.length}
        </div>

        {/* Navigation Arrows (Centered) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <svg width="28" height="16" viewBox="0 0 32 12" fill="none">
              <path d="M6 1L1 6L6 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 6H31" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <svg width="28" height="16" viewBox="0 0 32 12" fill="none">
              <path d="M26 1L31 6L26 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 6H31" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Placeholder for symmetry on the right */}
        <div style={{ width: '40px' }} />
      </div>
    </section>
  );
}
