'use client';

import Image from "next/image";
import { Yellowtail } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"] });

export default function Hero({
  title = "Marinali",
  subtitle = "ROOMS",
  imgUrl = "/assets/Stanza%203%20-%20Foto-13.jpg",
}: {
  title?: string;
  subtitle?: string;
  imgUrl?: string;
}) {
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      return res.json();
    }
  });

  const { scrollY } = useScroll();

  // Smooth scroll transformations
  const scale = useTransform(scrollY, [0, 500], [1, 0.2]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const translateY = useTransform(scrollY, [0, 1000], [0, -300]);
  const bgTranslateY = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section className="-mt-24 relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgTranslateY }}
      >
        <Image
          src={imgUrl}
          alt="Hero Banner"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.7]"
          priority
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-white mt-8 will-change-transform"
        style={{
          y: translateY,
          scale,
          opacity,
          transformOrigin: "center center"
        }}
      >

        <h1
          className={`${yellowtail.className} text-7xl md:text-9xl tracking-wide drop-shadow-md mb-4`}
        >
          {title}
        </h1>
        <div className="flex items-center gap-6 mt-1 md:-mt-4">
          <div className="w-16 h-[1px] bg-white opacity-80"></div>
          <span className="text-xs md:text-sm uppercase tracking-[0.4em] font-medium opacity-100">
            {subtitle}
          </span>
          <div className="w-16 h-[1px] bg-white opacity-80"></div>
        </div>
      </motion.div>
    </section>
  );
}
