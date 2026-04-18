"use client";

import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { Yellowtail } from "next/font/google";

const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[oklch(0.98_0_0)] flex flex-col md:flex-row font-sans text-gray-900 overflow-x-hidden">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-white border-b px-4 py-4 z-20 sticky top-0">
        <h1 className={`${yellowtail.className} text-2xl font-bold text-gray-900`}>
          Marinali Admin
        </h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 -mr-2 text-gray-600 focus:outline-none"
        >
          {isSidebarOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-[100dvh] w-64 bg-white border-r shadow-sm z-40 transform transition-transform duration-300 ease-in-out px-4 py-8
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="mb-10 text-center hidden md:block">
          <h1 className={`${yellowtail.className} text-3xl font-bold text-gray-900`}>
            Marinali Admin
          </h1>
        </div>
        <nav className="flex flex-col gap-2">
          <Link
            href="/admin/settings"
            onClick={() => setIsSidebarOpen(false)}
            className="px-4 py-3 rounded-md bg-gray-100 font-medium hover:bg-gray-200 transition-colors"
          >
            Site Settings
          </Link>
          <Link
            href="/en"
            className="px-4 py-3 rounded-md font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors mt-8 flex items-center justify-between group"
          >
            <span>Return to Site</span>
            <svg className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto w-full relative z-10">
        <div className=" mx-auto">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
}
