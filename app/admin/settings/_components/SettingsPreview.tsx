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
        <div className="relative flex items-center justify-center px-3 py-3 border-b border-current/10 sticky top-0 bg-inherit z-20 backdrop-blur-sm bg-opacity-90">
          {formData.logo ? (
            <img src={formData.logo} alt="Logo" className="h-4 w-auto object-contain" />
          ) : (
            <div className="font-bold text-[10px] drop-shadow-sm" style={{ color: formData.primaryColor }}>
              Marinali
            </div>
          )}
          <div className="absolute right-3 flex gap-4 text-[8px] uppercase font-bold tracking-widest opacity-80">
            <Menu size={10} />
          </div>
        </div>

        {/* Banner / Hero */}
        <div className="relative flex flex-col items-center justify-center text-center px-4 py-4 border-b border-current/5 h-[120px] flex-shrink-0">
          {formData.heroImage ? (
            <div className="absolute inset-0 z-0">
              <img src={formData.heroImage} alt="Hero" className="w-full h-full object-cover brightness-[0.7]" />
            </div>
          ) : (
            <div className="absolute inset-0 z-0 bg-current/5"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-0"></div>

          <div className="z-10 flex flex-col items-center">
            {formData.logo ? (
              <img src={formData.logo} alt="Logo" className="h-8 w-auto object-contain" />
            ) : (
              <div className="font-bold text-[10px] drop-shadow-sm" style={{ color: formData.primaryColor }}>
                Marinali
              </div>
            )}
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

        {/* Rooms Section Preview */}
        <div className="px-3 py-3 border-b border-current/5">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-[8px] uppercase font-bold tracking-tight text-[#1a1a1a]">Our Rooms</h2>
            <div className="flex gap-1">
              <div className="w-3 h-3 flex items-center justify-center opacity-30 text-[6px]">&larr;</div>
              <div className="w-3 h-3 flex items-center justify-center opacity-60 text-[6px]">&rarr;</div>
            </div>
          </div>
          <div className="flex gap-2 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-[75px]">
                <div className="aspect-[4/3] bg-gray-100 relative mb-1.5 overflow-hidden rounded-sm"></div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1/2 rounded-xs bg-[#1a1a1a]"></div>
                    <div className="h-1.5 w-1.5 rounded-xs bg-[#1a1a1a]"></div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <div className="h-[3px] w-[3px] rounded-full border border-gray-400"></div>
                    <div className="h-[3px] w-1/3 rounded-xs bg-gray-400"></div>
                  </div>
                  <div className="space-y-[2px] mt-0.5">
                    <div className="h-1 w-full bg-gray-300 rounded-xs"></div>
                    <div className="h-1 w-5/6 bg-gray-300 rounded-xs"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Section Preview */}
        <div className="px-3 py-4 border-b border-current/5 text-center flex-shrink-0" style={{ backgroundColor: formData.primaryColor, color: '#fff' }}>
          <div className="max-w-[80%] mx-auto">
            <div className="text-[5px] font-bold leading-relaxed tracking-wide mb-1.5 opacity-90">
              &ldquo;TRULY AMAZING STAY THAT EXCEEDED OUR EXPECTATIONS. BEST STAFF EVER!&rdquo;
            </div>
            <div className="text-[3.5px] tracking-[0.1em] opacity-60 font-mono">
              Marinali Rooms – Elena, June 2024
            </div>
            <div className="text-[3px] underline opacity-50 mt-0.5">
              Google Reviews
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="text-[4px] opacity-50">1 / 3</div>
            <div className="flex gap-1.5">
              <div className="text-[5px] opacity-40">&larr;</div>
              <div className="text-[5px] opacity-70">&rarr;</div>
            </div>
          </div>
        </div>

        {/* Highlights Section Preview */}
        <div className="px-3 py-3 border-b border-current/5">
          <h2 className="text-[6px] font-bold mb-2 flex items-center gap-1.5">
            <span className="w-3 h-[1px] block" style={{ backgroundColor: formData.primaryColor }}></span>
            Highlights
          </h2>
          <div className="grid grid-cols-3 gap-1 h-[60px]">
            <div className="col-span-2 row-span-2 bg-gray-100 rounded-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="bg-gray-200 rounded-sm"></div>
            <div className="bg-gray-100 rounded-sm"></div>
          </div>
        </div>

        {/* Featured Retreat Section Preview */}
        <div className="relative h-[70px] flex-shrink-0 flex items-center overflow-hidden border-b border-current/5">
          {formData.retreatImage ? (
            <div className="absolute inset-0 z-0">
              <img src={formData.retreatImage} alt="Retreat" className="w-full h-full object-cover brightness-[0.5]" />
            </div>
          ) : (
            <div className="absolute inset-0 z-0 bg-gray-800"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 z-0"></div>
          <div className="relative z-10 ml-auto mr-3 text-right max-w-[55%]">
            <h3 className="text-[7px] font-bold text-white uppercase leading-tight tracking-tight mb-1">
              Casa Cook<br />Madonna
            </h3>
            <div className="space-y-[1.5px] mb-1.5">
              <div className="h-[2.5px] w-full bg-white/30 rounded-xs ml-auto"></div>
              <div className="h-[2.5px] w-[85%] bg-white/30 rounded-xs ml-auto"></div>
            </div>
            <div
              className="inline-block px-1.5 py-[2px] text-[3.5px] font-bold text-white uppercase tracking-widest"
              style={{ backgroundColor: formData.primaryColor }}
            >
              Discover
            </div>
          </div>
        </div>

        {/* Offer Section Preview */}
        <div className="flex-1 px-3 py-3" style={{ backgroundColor: `${formData.secondaryColor}10` }}>
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-[8px] uppercase font-bold tracking-tight text-[#1a1a1a]">Offers</h2>
            <div className="flex gap-1">
              <div className="w-3 h-3 flex items-center justify-center opacity-30 text-[6px]">&larr;</div>
              <div className="w-3 h-3 flex items-center justify-center opacity-60 text-[6px]">&rarr;</div>
            </div>
          </div>
          <div className="flex gap-2 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-[75px]">
                <div className="aspect-[4/3] bg-gray-100 relative mb-1.5 overflow-hidden rounded-sm">
                  <div className="absolute top-1 left-1 px-1 py-[1px] text-[3px] font-bold text-white rounded-[1px] drop-shadow-sm" style={{ backgroundColor: formData.secondaryColor }}>20% OFF</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1/2 rounded-xs bg-[#1a1a1a]"></div>
                    <div className="h-1.5 w-1.5 rounded-xs bg-[#1a1a1a]"></div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <div className="h-[3px] w-[3px] rounded-full border border-gray-400"></div>
                    <div className="h-[3px] w-1/3 rounded-xs bg-gray-400"></div>
                  </div>
                  <div className="space-y-[2px] mt-0.5">
                    <div className="h-1 w-full bg-gray-300 rounded-xs"></div>
                    <div className="h-1 w-5/6 bg-gray-300 rounded-xs"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/10" style={{ backgroundColor: formData.primaryColor, color: '#fff' }}>
          <div className="flex justify-between items-center mb-2.5">
            {formData.logo ? (
              <img src={formData.logo} alt="Logo" className="h-3 w-auto object-contain" />
            ) : (
              <div className="font-bold text-[10px] drop-shadow-sm" style={{ color: formData.primaryColor }}>
                Marinali
              </div>
            )}
            <div className="flex gap-1.5 items-center">
              {fc.socialLinks.slice(0, 3).map((s, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full opacity-40"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
            {fc.columns.slice(0, 2).map((col, i) => (
              <div key={i} className="space-y-1">
                <div className="text-[5px] font-bold uppercase tracking-wider opacity-90">{col.title}</div>
                <div className="space-y-[1px]">
                  {col.links.slice(0, 3).map((link, j) => (
                    <div key={j} className="text-[4px] opacity-60 truncate">{link.label}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="h-[1px] w-full bg-white/10 mb-2"></div>
          <div className="flex justify-between items-center text-[4px] opacity-60 tracking-widest uppercase">
            <span className="truncate max-w-[50%]">{fc.copyright}</span>
            <div className="flex gap-1.5">
              {fc.bottomLinks.slice(0, 2).map((link, i) => (
                <span key={i}>{link.label}</span>
              ))}
            </div>
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
