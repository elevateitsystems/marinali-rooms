'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import EditableImage from "../common/EditableImage";

export default function HeroClient({
  lang = "en",
  data,
  isEditable = false,
  settings,
}: {
  lang?: 'en' | 'it' | 'de';
  data?: any;
  isEditable?: boolean;
  settings?: any;
}) {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDesktop(window.innerWidth > 1024);
  }, []);

  const { scrollY } = useScroll();

  // Scroll effects deferred to desktop
  const scale = useTransform(scrollY, [0, 500], [1, 0.2]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const translateY = useTransform(scrollY, [0, 1000], [0, -300]);

  const displayImgUrl = data?.heroImage || settings?.heroImage || "/assets/Stanza%203%20-%20Foto-13.jpg";

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

      {/* 
        interactive Layer
        Empty on mobile to reduce TBT.
        Handles parallax on desktop only.
      */}
      {mounted && isDesktop && (
        <motion.div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            y: translateY,
            scale,
            opacity,
            transformOrigin: "center center"
          }}
        />
      )}
    </>
  );
}
