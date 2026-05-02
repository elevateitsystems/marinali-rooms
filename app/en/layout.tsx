import Navbar from "@/components/common/Navbar";
import SmoothScrolling from "@/components/common/SmoothScrolling";
import { Suspense } from "react";
import BookingBarServer from "@/components/common/BookingBarServer";
import FooterServer from "@/components/common/FooterServer";

import { SettingsService } from "@/lib/services/settingsService";

export const revalidate = 60;

export default async function EnglishLayout({ children }: { children: React.ReactNode }) {
  const settings = await SettingsService.getSettings();

  return (
    <SmoothScrolling>
      <Navbar lang="en" settings={settings} />
      <div className="pt-24 min-h-screen">
        {children}
      </div>
      
      <Suspense fallback={<div className="h-20 bg-slate-50 animate-pulse" />}>
        <BookingBarServer lang="en" />
      </Suspense>

      <Suspense fallback={<div className="h-64 bg-slate-900 animate-pulse" />}>
        <FooterServer lang="en" />
      </Suspense>
    </SmoothScrolling>
  );
}
