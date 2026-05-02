import Navbar from "@/components/common/Navbar";
import SmoothScrolling from "@/components/common/SmoothScrolling";
import { Suspense } from "react";
import BookingBarServer from "@/components/common/BookingBarServer";
import FooterServer from "@/components/common/FooterServer";

export const revalidate = 60;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrolling>
      <Navbar lang="en" />
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
