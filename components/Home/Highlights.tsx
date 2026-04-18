'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const highlights = [
  {
    id: 1,
    image: '/hotel-3.png',
    title: 'A PERFECT WEEK IN SAMOS',
    description: 'Quiet swims, coastal paths, local flavours and unhurried evenings, we have the ideal week long itinerary…',
    href: '#',
    isLarge: false,
  },
  {
    id: 2,
    image: '/hotel-4.png',
    title: 'MADONNA THROUGH THE EYES OF OUR GUESTS',
    description: 'Meet Roberta Mazzone, an Italian photographer with an architectural eye and a nomadic spirit.',
    href: '#',
    isLarge: false,
  },
  {
    id: 3,
    image: '/hotel-1.png',
    title: 'BEDOUIN NIGHTS AT CASA COOK EL GOUNA',
    description: 'Every Tuesday at sunset, experience an evening of Bedouin heritage with dance, grilled flavours, and soulful rhythms.',
    href: '#',
    isLarge: true,
  },
];

import EditableText from '../common/EditableText';

export default function Highlights({ lang, data }: { lang: string; data?: any }) {
  return (
    <motion.section
      id="highlights-section"
      className="px-5 mt-10 lg:mt-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
    >
      <div className="max-w-screen-2xl mx-auto">
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            color: '#1a1a1a',
            marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
            textTransform: 'uppercase'
          }}
        >
          <EditableText lang={lang} page="home" path="highlightsTitle" initialValue={data?.highlightsTitle || "HIGHLIGHTS"} />
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}
          className="highlights-grid"
        >
          {highlights.map((item) => (
            <div
              key={item.id}
              style={{
                gridColumn: item.isLarge ? 'span 2' : 'span 1',
                display: 'flex',
                flexDirection: 'column'
              }}
              className={item.isLarge ? 'col-span-4 lg:col-span-2' : 'col-span-4 lg:col-span-1'}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: item.isLarge ? '1 / 1' : '4 / 5',
                  overflow: 'hidden',
                  marginBottom: '20px'
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={item.isLarge ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div style={{ paddingRight: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                  <h3
                    style={{
                      fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)',
                      fontWeight: 700,
                      lineHeight: 1.25,
                      color: '#1a1a1a',
                      margin: 0,
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.title}
                  </h3>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0, marginTop: '2px' }}
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>

                <p
                  style={{
                    fontSize: 'clamp(0.75rem, 1.1vw, 0.85rem)',
                    lineHeight: 1.7,
                    color: '#555',
                    fontWeight: 300,
                    margin: 0,
                    fontFamily: 'var(--font-mono, monospace)',
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .highlights-grid {
            display: flex !important;
            flex-direction: column;
            gap: 40px !important;
          }
        }
      `}</style>
    </motion.section>
  );
}
