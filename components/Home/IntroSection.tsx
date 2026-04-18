'use client';

import { motion } from 'framer-motion';

import { ReactNode } from 'react';

export default function IntroSection({
  title,
  description,
}: {
  title?: string | ReactNode;
  description?: string | ReactNode;
}) {
  return (
    <section
      className='px-5 '
      style={{
        margin: '0 auto',
        textAlign: 'left',
      }}
    >
      <motion.div 
        className="max-w-[1000px] mr-auto mt-10 lg:mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            lineHeight: 1.4,
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            color: 'var(--foreground)',
          }}
        >
          {title || 'Welcome'}
        </h2>

        <p
          style={{
            fontSize: 'clamp(0.875rem, 1.5vw, 1.05rem)',
            lineHeight: 1.85,
            color: 'var(--foreground)',
            opacity: 0.7,
            fontWeight: 300,
            letterSpacing: '0.01em',
            marginBottom: '20px',
          }}
        >
          {description || 'Experience unforgettable hospitality at Marinali Rooms, right in the heart of the town center. We are passionate about creating welcoming stays with every comfort at your fingertips.'}
        </p>
      </motion.div>

      <hr
        style={{
          border: 'none',
          borderTop: '2px solid var(--primary-color)',
          opacity: 0.1,
          marginTop: '50px',
        }}
      />
    </section>
  );
}
