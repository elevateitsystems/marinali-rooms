"use client";
import { ReactNode, useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

function ScrollResizeHandler() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    lenis.resize();

    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, [lenis, pathname]);

  return null;
}

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable smooth scrolling on desktop and after initial hydration
    if (window.innerWidth > 1024) {
      setEnabled(true);
    }
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        autoRaf: true,
      }}
    >
      <ScrollResizeHandler />
      {children}
    </ReactLenis>
  );
}
