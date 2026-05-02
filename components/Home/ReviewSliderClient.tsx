"use client";

import dynamic from "next/dynamic";

const ReviewSlider = dynamic(() => import("./ReviewSlider"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-primary animate-pulse flex items-center justify-center text-white/20">Loading reviews...</div>
});

export default function ReviewSliderClient({ lang, data }: { lang: string; data: any }) {
  return <ReviewSlider lang={lang} data={data} />;
}
