'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import EditableText from '../common/EditableText';

export default function FeaturedRetreat({ lang, data }: { lang: string; data?: any }) {
  return (
    <motion.section
      className='mt-10 lg:mt-20'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(500px, 70vh, 800px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0
        }}
      >
        <Image
          src="/hotel-4.png"
          alt="Casa Cook Madonna"
          fill
          style={{
            objectFit: 'cover',
            filter: 'brightness(0.6)'
          }}
          priority
        />
      </div>

      {/* Content Container */}
      <div
        className="container mx-auto px-5"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <div
          style={{
            maxWidth: '500px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: 0
            }}
          >
            <EditableText 
              lang={lang} 
              page="home" 
              path="featuredTitle" 
              initialValue={data?.featuredTitle || "Introducing Casa Cook Madonna"} 
              multiline
            />
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
              lineHeight: 1.8,
              fontWeight: 300,
              fontFamily: 'var(--font-mono, monospace)',
              opacity: 0.9,
              margin: 0
            }}
          >
            <EditableText 
              lang={lang} 
              page="home" 
              path="featuredDescription" 
              initialValue={data?.featuredDescription || "Nestled in the picturesque village of Madonna di Campiglio..."} 
              multiline
            />
          </p>

          <div className='bg-primary px-8 w-fit py-3 text-center' style={{ marginTop: '10px' }}>
            <button
              style={{
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Discover Casa Cook Madonna
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
