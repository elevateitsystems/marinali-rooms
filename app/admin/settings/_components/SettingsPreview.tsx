"use client";

import React from "react";
import { ThemeSettings, FooterConfig } from "./types";
import { Eye, X, Menu } from "lucide-react";

interface SettingsPreviewProps {
  formData: ThemeSettings;
  fc: FooterConfig;
  showPreviewDrawer: boolean;
  setShowPreviewDrawer: (show: boolean) => void;
}

export function SettingsPreview({
  formData,
  fc,
  showPreviewDrawer,
  setShowPreviewDrawer,
}: SettingsPreviewProps) {

  const renderPreviewContent = () => {
    return (
      <>
        {/* Navbar */}
        {/* Banner / Hero */}
        <div className="relative flex flex-col items-center justify-center text-center px-4 py-4 border-b border-current/5 h-[140px] flex-shrink-0">
          <div className="absolute inset-0 z-0">
            <img
              src={formData.heroImage || "/assets/Stanza%203%20-%20Foto-13.jpg"}
              alt="Hero"
              className="w-full h-full object-cover brightness-[0.6]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-0"></div>

          <div className="z-10 flex flex-shrink-0 flex-col items-center text-white">
            <span className="text-xl md:text-2xl font-serif tracking-tight leading-none">Marinali</span>
            <div className="flex items-center gap-3 -mt-1">
              <div className="w-6 h-[0.5px] bg-white opacity-50"></div>
              <span className="text-[10px] font-serif tracking-wide" >Rooms</span>
              <div className="w-6 h-[0.5px] bg-white opacity-50"></div>
            </div>
            <span className="text-[4px] uppercase tracking-[0.4em] mt-1.5" >Bassano del Grappa</span>
          </div>
        </div>



        {/* Le Suite Section Preview */}
        <div className="border-b border-current/5">
          <div className="py-8 text-center" style={{ backgroundColor: formData.primaryColor, color: '#fff' }}>
            <h2 className="text-xl font-serif tracking-tight mb-1">Le Suite</h2>
            <p className="text-[4px] tracking-[0.3em] uppercase font-mono" style={{ color: formData.secondaryColor }}>Bassano del Grappa, Italy</p>
          </div>

          <div className="space-y-0">
            {/* Split Section 1 */}
            <div className="flex items-stretch border-b border-current/5">
              <div className="w-1/2 aspect-video bg-gray-100 relative">
                <div className="absolute inset-0 bg-black/5"></div>
              </div>
              <div className="w-1/2 p-4 flex flex-col justify-center items-center text-center">
                <h3 className="text-[7px] font-serif uppercase tracking-widest mb-1.5">Junior Suite</h3>
                <div className="space-y-[1.5px] w-3/4">
                  <div className="h-[2px] w-full bg-current/10 rounded-full"></div>
                  <div className="h-[2px] w-full bg-current/10 rounded-full"></div>
                  <div className="h-[2px] w-[60%] bg-current/10 rounded-full mx-auto"></div>
                </div>
                <div className="mt-3 px-3 py-1 border border-current opacity-40 text-[3px] tracking-widest uppercase">Discover</div>
              </div>
            </div>
            {/* Split Section 2 */}
            <div className="flex flex-row-reverse items-stretch border-b border-current/5">
              <div className="w-1/2 py-16 aspect-vedio bg-gray-100 relative">
                <div className="absolute inset-0 bg-black/5"></div>
              </div>
              <div className="w-1/2 p-4 flex flex-col justify-center items-center text-center">
                <h3 className="text-[7px] font-serif uppercase tracking-widest mb-1.5">Suite Deluxe</h3>
                <div className="space-y-[1.5px] w-3/4">
                  <div className="h-[2px] w-full bg-current/10 rounded-full"></div>
                  <div className="h-[2px] w-full bg-current/10 rounded-full"></div>
                  <div className="h-[2px] w-[60%] bg-current/10 rounded-full mx-auto"></div>
                </div>
                <div className="mt-3 px-3 py-1 border border-current opacity-40 text-[3px] tracking-widest uppercase">Discover</div>
              </div>
            </div>

          </div>

        </div>




        {/* Review Section Preview */}
        <div className="px-3 py-4 border-b border-current/5 text-center flex-shrink-0" style={{ backgroundColor: formData.primaryColor, color: '#fff' }}>
          <div className="max-w-[80%] mx-auto">
            <div className="text-[5px] font-bold leading-relaxed tracking-wide mb-1.5 opacity-90 italic">
              &ldquo;An unforgettable experience. The attention to detail and the serene atmosphere made our stay perfect.&rdquo;
            </div>
            <div className="text-[3.5px] tracking-[0.1em] font-mono" style={{ color: formData.secondaryColor }}>
              Marinali Rooms – Elena
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex gap-1.5">
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
              <div className="w-1 h-1 rounded-full bg-white"></div>
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
            </div>
          </div>
        </div>
        {/* Intro Section Preview */}
        <div className="px-3 py-3 border-b border-current/5">
          <div className="max-w-[85%]">
            <h2 className="text-[7px] uppercase font-normal tracking-[0.15em] leading-snug mb-1.5" style={{ color: formData.textColor }}>
              Welcome
            </h2>
            <div className="space-y-[2px]">
              <div className="h-1 w-full bg-current/10 rounded-xs"></div>
              <div className="h-1 w-[95%] bg-current/10 rounded-xs"></div>
              <div className="h-1 w-[85%] bg-current/10 rounded-xs"></div>
              <div className="h-1 w-[70%] bg-current/10 rounded-xs"></div>
            </div>
          </div>
          <div className="mt-2.5 h-[1px] w-full" style={{ backgroundColor: formData.primaryColor, opacity: 0.1 }}></div>
        </div>
        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/10" style={{ backgroundColor: formData.primaryColor, color: '#fff' }}>
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex flex-col items-start">
              <span className="text-[8px] font-serif tracking-tight">Marinali</span>
              <span className="text-[4px] tracking-[0.2em] uppercase -mt-0.5" style={{ color: formData.secondaryColor }}>Rooms</span>
            </div>
            <div className="flex gap-1.5 items-center">
              {fc.socialLinks.slice(0, 3).map((s, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full opacity-40"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mb-3">
            <div className="flex gap-4 text-[4px] uppercase tracking-widest opacity-60">
              <span>Privacy Policy</span>
              <span>Cookie Policy</span>
            </div>
          </div>

          <div className="h-[1px] w-full bg-white/10 mb-2"></div>
          <div className="flex justify-between items-center text-[4px] opacity-60 tracking-widest uppercase">
            <span className="truncate max-w-[70%]">{fc.copyright}</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* Right Column: Live Preview Pane — Desktop only */}
      <div className="hidden lg:block w-[480px] xl:w-[560px] flex-shrink-0 h-full border-l border-gray-200">
        <div className="flex flex-col h-full bg-white relative shadow-inner">
          <div
            className="flex-1 space-y-2 flex flex-col overflow-y-auto transition-colors duration-500 relative scrollbar-hide"
            style={{
              backgroundColor: formData.backgroundColor,
              color: formData.textColor,
              fontFamily: formData.fontFamily
            }}
          >
            {renderPreviewContent()}
          </div>
        </div>
      </div>

      {/* Mobile: Floating Eye Button */}
      <button
        type="button"
        onClick={() => setShowPreviewDrawer(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ backgroundColor: formData.primaryColor, color: '#fff' }}
      >
        <Eye size={22} />
      </button>

      {/* Mobile: Bottom Drawer Overlay */}
      {showPreviewDrawer && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowPreviewDrawer(false)}
          />
          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 h-[80vh] bg-white rounded-t-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300 overflow-hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">Live Preview</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewDrawer(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>
            {/* Drawer Content */}
            <div
              className="flex-1 flex flex-col overflow-y-auto scrollbar-hide"
              style={{
                backgroundColor: formData.backgroundColor,
                color: formData.textColor,
                fontFamily: formData.fontFamily
              }}
            >
              {renderPreviewContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
