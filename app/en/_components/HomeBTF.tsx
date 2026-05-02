import { Suspense } from "react";
import RoomsList from "./RoomsList";
import AboutSection from "./AboutSection";

export default function HomeBTF({ lang, data }: { lang: "en" | "it" | "de", data: any }) {
  return (
    <>
      {/* 1. Rooms Section - High priority Below-The-Fold */}
      <Suspense fallback={
        <div className="h-[500px] bg-slate-50 animate-pulse flex items-center justify-center text-slate-300">
          Loading our suites...
        </div>
      }>
        <RoomsList lang={lang} data={data} />
      </Suspense>

      {/* 2. About & Reviews - Lower priority */}
      <Suspense fallback={
        <div className="h-[400px] bg-white animate-pulse flex items-center justify-center text-slate-200">
          Preparing heritage story...
        </div>
      }>
        <AboutSection lang={lang} initialData={data} />
      </Suspense>
    </>
  );
}
