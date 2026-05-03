import type { Metadata } from "next";
import { Geist, Playfair_Display, Yellowtail } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import ThemeInjector from "@/components/common/ThemeInjector";
import Providers from "./providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const yellowtail = Yellowtail({
  variable: "--font-yellowtail",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marinali Rooms",
  description: "Experience the heart of Bassano del Grappa",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} ${yellowtail.variable} antialiased`}
    >
      <head>
        <ThemeInjector />
        <link rel="dns-prefetch" href="https://utfs.io" />
        <link rel="preconnect" href="https://utfs.io" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          {children}
          <Suspense fallback={null}>
            <Toaster position="top-center" richColors />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
