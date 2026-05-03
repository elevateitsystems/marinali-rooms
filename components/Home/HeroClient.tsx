"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import EditableImage from "../common/EditableImage";
import BrandLogo from "../common/BrandLogo";

export default function HeroClient({
  lang = "en",
  data,
  isEditable = false,
  settings: initialSettings,
}: {
  lang?: "en" | "it" | "de";
  data?: any;
  isEditable?: boolean;
  settings?: any;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  imgUrl?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDesktop(window.innerWidth > 1024);
  }, []);

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error("Failed to fetch settings");
      return res.json();
    },
    initialData: initialSettings,
  });

  const { scrollY } = useScroll();

  // Scroll effects deferred to desktop
  const scale = useTransform(scrollY, [0, 500], [1, 0.2]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const translateY = useTransform(scrollY, [0, 1000], [0, -300]);

  const displayImgUrl =
    data?.heroImage ||
    settings?.heroImage ||
    "/assets/Stanza%203%20-%20Foto-13.jpg";

  const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isEditable) {
      return (
        <div className="flex flex-col items-center justify-center group">
          {children}
        </div>
      );
    }
    return (
      <Link
        href={`/${lang}`}
        className="flex flex-col items-center justify-center group cursor-pointer"
      >
        {children}
      </Link>
    );
  };

  return (
    <>
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

      {/* Main Content (Animated Logo) */}
      <motion.div
        className="relative z-10 text-background mt-8"
        initial={false}
        style={
          mounted && isDesktop
            ? {
                y: translateY,
                scale,
                opacity,
                transformOrigin: "center center",
              }
            : {}
        }
      >
        <ContentWrapper>
          <BrandLogo lang={lang} size="xl" variant="light" />
        </ContentWrapper>
      </motion.div>
    </>
  );
}
  );
}
