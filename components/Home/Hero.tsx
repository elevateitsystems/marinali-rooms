'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import EditableText from "../common/EditableText";
import EditableImage from "../common/EditableImage";
import BrandLogo from "../common/BrandLogo";
export default function Hero({
  title = "Marinali",
  subtitle = "Rooms",
  imgUrl = "/assets/Stanza%203%20-%20Foto-13.jpg",
  lang = "en",
  data,
  isEditable = false,
  settings: initialSettings,
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  imgUrl?: string;
  lang?: 'en' | 'it' | 'de';
  data?: any;
  isEditable?: boolean;
  settings?: any;
}) {
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      return res.json();
    },
    initialData: initialSettings
  });

  const { scrollY } = useScroll();

  // Smooth scroll transformations
  const scale = useTransform(scrollY, [0, 500], [1, 0.2]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const translateY = useTransform(scrollY, [0, 1000], [0, -300]);
  const bgTranslateY = useTransform(scrollY, [0, 1000], [0, 200]);

  const displayImgUrl = data?.heroImage || settings?.heroImage || imgUrl;

  const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isEditable) {
      return <div className="flex flex-col items-center justify-center group">{children}</div>;
    }
    return (
      <Link href={`/${lang}`} className="flex flex-col items-center justify-center group cursor-pointer">
        {children}
      </Link>
    );
  };

  return (
    <section id="hero" className="-mt-24 relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ y: 0 }}
        style={{ y: bgTranslateY }}
      >
        <Image
          src={displayImgUrl}
          alt="Hero Banner"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.7]"
          priority
          loading="eager"
          // @ts-ignore
          fetchPriority="high"
        />
      </motion.div>

      {isEditable && (
        <div className="absolute inset-0 z-[60] pointer-events-none">
          <div className="w-full h-full pointer-events-auto">
            <EditableImage
              lang={lang as string}
              page="home"
              path="heroImage"
              currentValue={displayImgUrl}
              className="w-full h-full"
              label="Change Background"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-background mt-8 will-change-transform"
        initial={{ y: 0, scale: 1, opacity: 1 }}
        style={{
          y: translateY,
          scale,
          opacity,
          transformOrigin: "center center"
        }}
      >
        <ContentWrapper>
          <BrandLogo
            lang={lang}
            size="xl"
            variant="light"
          />
        </ContentWrapper>
      </motion.div>
    </section>
  );
}
