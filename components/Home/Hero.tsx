'use client';

import Image from "next/image";
import { Yellowtail } from "next/font/google";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"] });

export default function Hero({
  title = "Marinali",
  subtitle = "ROOMS",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [scrollY, setScrollY] = useState(0);

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      return res.json();
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll transformations
  const scale = Math.max(1 - scrollY / 500, 0.2);
  const opacity = Math.max(1 - scrollY / 400, 0);
  const translateY = -scrollY * 0.3; // Negative to move UP as user scrolls down
  const bgTranslateY = scrollY * 0.2; // Parallax for background

  return (
    <section className="-mt-24 relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${bgTranslateY}px)` }}
      >
        <Image
          src={settings?.heroImage || "/assets/Stanza%201%20-%20Foto-1.jpg"}
          alt="Hero Banner"
          fill
          className="object-cover object-center brightness-[0.7]"
          priority
        />
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-white mt-8 will-change-transform"
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity,
          transformOrigin: "center center"
        }}
      >
        {settings?.logo ? (
          <div className="relative h-24 md:h-32 w-56 md:w-64 mb-6">
            <Image
              src={settings.logo}
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        ) : (
          <h1
            className={`${yellowtail.className} text-7xl md:text-9xl tracking-wide drop-shadow-md mb-4`}
          >
            {title}
          </h1>
        )}
        <div className="flex items-center gap-6 mt-1 md:-mt-4">
          {/* <div className="w-16 h-[1px] bg-white opacity-80"></div> */}
          {/* <span className="text-xs md:text-sm uppercase tracking-[0.4em] font-medium opacity-100">
            {subtitle}
          </span> */}
          {/* <div className="w-16 h-[1px] bg-white opacity-80"></div> */}
        </div>
      </div>
    </section>
  );
}
