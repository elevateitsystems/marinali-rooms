'use client';
import { ReactNode, useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

const LenisWrapper = dynamic(() => import('./LenisWrapper'), { 
  ssr: true,
});

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable smooth scrolling on desktop and after initial hydration
    if (window.innerWidth > 1024) {
      setIsDesktop(true);
    }
  }, []);

  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <Suspense fallback={<>{children}</>}>
      <LenisWrapper>
        {children}
      </LenisWrapper>
    </Suspense>
  );
}
