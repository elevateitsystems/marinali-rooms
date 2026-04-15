'use client';

import React from 'react';

const BookingBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--background)]/90 backdrop-blur-md border-t border-[var(--foreground)]/10 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center">

          {/* Section: Where */}
          <div className="flex-1 border-r border-[var(--foreground)]/10 py-4 px-6 flex flex-col justify-center gap-1 group cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 uppercase">Where</span>
            <span className="text-sm sm:text-base font-semibold tracking-tight uppercase">Select Accommodation</span>
          </div>

          {/* Section: Dates */}
          <div className="flex-1 border-r border-[var(--foreground)]/10 py-4 px-6 flex flex-col justify-center gap-1 group cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 uppercase">Select Your Dates</span>
            <span className="text-sm sm:text-base font-semibold tracking-tight uppercase">Check In - Check Out</span>
          </div>

          {/* Section: Who */}
          <div className="flex-1 border-r border-[var(--foreground)]/10 py-4 px-6 flex flex-col justify-center gap-1 group cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 uppercase">Who</span>
            <span className="text-sm sm:text-base font-semibold tracking-tight uppercase">1 Room • 2 Adults</span>
          </div>

          {/* Section: Code */}
          <div className="flex-1 border-r border-[var(--foreground)]/10 py-4 px-6 flex flex-col justify-center gap-1 group cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 uppercase">Do you have a code?</span>
            <span className="text-sm sm:text-base font-semibold tracking-tight uppercase">Enter Code</span>
          </div>

          {/* Section: Book Now Button */}
          <div className="py-3 px-6 flex items-center justify-center lg:justify-end">
            <button className="w-full lg:w-auto px-10 py-4 bg-[#8b8c7a] hover:bg-[#7a7b69] text-white font-bold tracking-widest text-sm transition-all active:scale-95 shadow-lg uppercase">
              Book Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingBar;
