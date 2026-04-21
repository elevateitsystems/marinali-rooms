'use client';

import React, { useState, useEffect } from 'react';
import { format, addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { BookingModal } from './BookingModal';

interface BookingBarProps {
  lang?: 'en' | 'it' | 'de';
  data?: {
    bookingWhereLabel?: string;
    bookingWhereValue?: string;
    bookingDatesLabel?: string;
    bookingDatesValue?: string;
    bookingWhoLabel?: string;
    bookingWhoValue?: string;
    bookingRoomsLabel?: string;
    bookingRoomsValue?: string;
    bookingCodeLabel?: string;
    bookingCodeValue?: string;
    bookingButtonText?: string;
    // Map with shorter names from content.json
    whereLabel?: string;
    whereValue?: string;
    datesLabel?: string;
    datesValue?: string;
    whoLabel?: string;
    whoValue?: string;
    roomsLabel?: string;
    roomsValue?: string;
    codeLabel?: string;
    codeValue?: string;
    buttonText?: string;
  };
}

const BookingBar = ({ data, lang = 'en' }: BookingBarProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  const [guests, setGuests] = useState("2");
  const [rooms, setRooms] = useState("1");
  const [coupon, setCoupon] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingUrl, setBookingUrl] = useState("");

  const lenis = useLenis();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (!lenis) return;
    if (drawerOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [drawerOpen, lenis]);


  const formatDateForKross = (d?: Date) => {
    if (!d) return "";
    return format(d, "yyyy-MM-dd");
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the URL manually
    const baseUrl = "https://marinalirooms.kross.travel/book/step1";
    const params = new URLSearchParams({
      lang: lang,
      from: formatDateForKross(date?.from),
      to: formatDateForKross(date?.to),
      rooms: rooms,
      guests: guests,
      coupon: coupon
    });
    
    const finalUrl = `${baseUrl}?${params.toString()}`;
    setBookingUrl(finalUrl);
    setIsModalOpen(true);
    setDrawerOpen(false); // Close mobile drawer if open
  };

  const mobileButtonText = lang === 'it' ? 'Prenota il tuo soggiorno' : lang === 'de' ? 'Buchen Sie Ihren Aufenthalt' : 'Book Your Stay';

  // --- Shared form content (used in both desktop bar and mobile drawer) ---
  const bookingFormContent = (
    <form
      onSubmit={handleBookingSubmit}
      className="flex flex-col lg:flex-row items-stretch lg:items-center w-full"
    >
      {/* Dates */}
      <Popover>
        <PopoverTrigger className="flex-[2] flex flex-row items-stretch">
          {/* Arrival */}
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-[var(--foreground)]/10 py-4 px-6 flex flex-col justify-center items-start gap-1 group cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors text-left font-sans">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 uppercase">
              {lang === 'it' ? 'Arrivo' : lang === 'de' ? 'Anreise' : 'Arrival'}
            </span>
            <span className="text-base font-semibold tracking-tight uppercase">
              {date?.from ? format(date.from, "LLL dd, yyyy") : 'Select Date'}
            </span>
          </div>
          {/* Departure */}
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-[var(--foreground)]/10 py-4 px-6 flex flex-col justify-center items-start gap-1 group cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors text-left font-sans">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 uppercase">
              {lang === 'it' ? 'Partenza' : lang === 'de' ? 'Abreise' : 'Departure'}
            </span>
            <span className="text-base font-semibold tracking-tight uppercase">
              {date?.to ? format(date.to, "LLL dd, yyyy") : 'Select Date'}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>

      {/* Rooms */}
      <div className="flex-1 border-b lg:border-b-0 lg:border-r border-[var(--foreground)]/10 py-4 px-6 flex flex-col justify-center gap-1 group transition-colors">
        <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 uppercase">
          {data?.bookingRoomsLabel || data?.roomsLabel || (lang === 'it' ? 'Camere' : lang === 'de' ? 'Zimmer' : 'Rooms')}
        </span>
        <div className="relative">
          <Select value={rooms} onValueChange={(val) => setRooms(val as string)}>
            <SelectTrigger className="border-none cursor-pointer p-0 h-auto bg-transparent focus:ring-0 shadow-none text-base font-semibold tracking-tight uppercase hover:text-primary transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? (lang === 'it' ? 'Camera' : lang === 'de' ? 'Zimmer' : 'Room') : (lang === 'it' ? 'Camere' : lang === 'de' ? 'Zimmer' : 'Rooms')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Guests */}
      <div className="flex-1 border-b lg:border-b-0 lg:border-r border-[var(--foreground)]/10 py-4 px-6 flex flex-col justify-center gap-1 group transition-colors">
        <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 uppercase">
          {data?.bookingWhoLabel || data?.whoLabel || (lang === 'it' ? 'Ospiti' : lang === 'de' ? 'Gäste' : 'Guests')}
        </span>
        <div className="relative">
          <Select name="guests" value={guests} onValueChange={(val) => setGuests(val as string)}>
            <SelectTrigger className="border-none cursor-pointer p-0 h-auto bg-transparent focus:ring-0 shadow-none text-base font-semibold tracking-tight uppercase hover:text-primary transition-colors">
              <SelectValue placeholder="Guests" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? (lang === 'it' ? 'Ospite' : lang === 'de' ? 'Gast' : 'Guest') : (lang === 'it' ? 'Ospiti' : lang === 'de' ? 'Gäste' : 'Guests')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Code */}
      <div className="flex-1 border-b lg:border-b-0 lg:border-r border-[var(--foreground)]/10 py-4 px-6 flex flex-col justify-center gap-1 group cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors">
        <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 uppercase">
          {data?.bookingCodeLabel || data?.codeLabel || (lang === 'it' ? 'Codice' : lang === 'de' ? 'Code' : 'Code')}
        </span>
        <input
          name="coupon"
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder={data?.bookingCodeValue || data?.codeValue || (lang === 'it' ? 'Inserisci' : 'Enter')}
          className="bg-transparent border-none p-0 focus:ring-0 text-base font-semibold tracking-tight uppercase placeholder:text-current/30 w-full"
        />
      </div>

      {/* Book Now Button */}
      <div className="py-4 px-6 flex items-center justify-center">
        <button
          type="submit"
          className="w-full lg:w-auto px-10 py-5 bg-primary hover:bg-primary/90 text-white font-bold tracking-[0.2em] text-xs transition-all active:scale-95 shadow-xl uppercase cursor-pointer"
        >
          {data?.bookingButtonText || data?.buttonText || (lang === 'it' ? 'Prenota Ora' : lang === 'de' ? 'Jetzt Buchen' : 'Book Now')}
        </button>
      </div>
    </form>
  );

  return (
    <>
      {/* ========== DESKTOP: Full booking bar (hidden on mobile) ========== */}
      <div 
        className="hidden lg:block z-40 w-full bg-[var(--background)]/90 backdrop-blur-md border-t border-[var(--foreground)]/10 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] sticky bottom-0 left-0 right-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {bookingFormContent}
        </div>
      </div>

      {/* ========== MOBILE: Sticky button (visible on mobile only) ========== */}
      <div 
        className="lg:hidden z-40 w-full bg-[var(--background)]/90 backdrop-blur-md border-t border-[var(--foreground)]/10 sticky bottom-0 left-0 right-0"
      >
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="w-full py-5 bg-primary hover:bg-primary/90 text-white font-bold tracking-[0.2em] text-sm uppercase transition-all shadow-xl cursor-pointer"
        >
          {mobileButtonText}
        </button>
      </div>

      {/* ========== MOBILE DRAWER: Slides up from bottom ========== */}
      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--background)] rounded-t-2xl shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${drawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Drawer Handle */}
        <div className="flex items-center justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-[var(--foreground)]/15" />
        </div>

        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--foreground)]/10">
          <h3 className="text-sm font-bold tracking-[0.15em] uppercase">{mobileButtonText}</h3>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="p-2 hover:bg-[var(--foreground)]/5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 opacity-60" strokeWidth={1.5} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="px-2 pb-8">
          {bookingFormContent}
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        bookingUrl={bookingUrl} 
      />
    </>
  );
};

export default BookingBar;
