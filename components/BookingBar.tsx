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
  };
}

const BookingBar = ({ data, lang = 'en' }: BookingBarProps) => {
  // Setup default dates: Today to Tomorrow
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  const [guests, setGuests] = useState("2");
  const [rooms, setRooms] = useState("1");

  // Helper formats for Kross Booking (YYYY-MM-DD)
  const formatDateForKross = (d?: Date) => {
    if (!d) return "";
    return format(d, "yyyy-MM-dd");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--background)]/90 backdrop-blur-md border-t border-[var(--foreground)]/10 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <form 
          action="https://marinalirooms.kross.travel/book/step1" 
          method="GET" 
          target="_blank"
          className="flex flex-col lg:flex-row items-stretch lg:items-center"
        >
          {/* Hidden inputs for Kross parameters */}
          <input type="hidden" name="lang" value={lang} />
          <input type="hidden" name="from" value={formatDateForKross(date?.from)} />
          <input type="hidden" name="to" value={formatDateForKross(date?.to)} />
          <input type="hidden" name="rooms" value={rooms} />

          {/* Section: Dates (Interactive Calendar Split into Arrival & Departure) */}
          <Popover>
            <PopoverTrigger className="flex-[2] flex flex-row items-stretch">
              {/* Arrival Column */}
              <div className="flex-1 border-r border-[var(--foreground)]/10 py-4 px-6 flex flex-col justify-center items-start gap-1 group cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors text-left font-sans">
                <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 uppercase">
                  {lang === 'it' ? 'Arrivo' : lang === 'de' ? 'Anreise' : 'Arrival'}
                </span>
                <span className="text-sm sm:text-base font-semibold tracking-tight uppercase">
                  {date?.from ? format(date.from, "LLL dd, yyyy") : 'Select Date'}
                </span>
              </div>
              
              {/* Departure Column */}
              <div className="flex-1 border-r border-[var(--foreground)]/10 py-4 px-6 flex flex-col justify-center items-start gap-1 group cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors text-left font-sans">
                <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 uppercase">
                  {lang === 'it' ? 'Partenza' : lang === 'de' ? 'Abreise' : 'Departure'}
                </span>
                <span className="text-sm sm:text-base font-semibold tracking-tight uppercase">
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

          {/* Section: Rooms (NEW) */}
          <div className="flex-1 border-r border-[var(--foreground)]/10 py-4 px-6 flex flex-col justify-center gap-1 group transition-colors sm:hidden lg:flex">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 uppercase">
              {data?.bookingRoomsLabel || (lang === 'it' ? 'Camere' : lang === 'de' ? 'Zimmer' : 'Rooms')}
            </span>
            <div className="relative">
              <Select value={rooms} onValueChange={setRooms}>
                <SelectTrigger className="border-none p-0 h-auto bg-transparent focus:ring-0 shadow-none text-sm sm:text-base font-semibold tracking-tight uppercase hover:text-primary transition-colors">
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

          {/* Section: Who (Guests Selection) */}
          <div className="flex-1 border-r border-[var(--foreground)]/10 py-4 px-6 flex flex-col justify-center gap-1 group transition-colors">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 uppercase">
              {data?.bookingWhoLabel || (lang === 'it' ? 'Ospiti' : lang === 'de' ? 'Gäste' : 'Guests')}
            </span>
            <div className="relative">
              <Select name="guests" value={guests} onValueChange={setGuests}>
                <SelectTrigger className="border-none p-0 h-auto bg-transparent focus:ring-0 shadow-none text-sm sm:text-base font-semibold tracking-tight uppercase hover:text-primary transition-colors">
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

          {/* Section: Code (Optional) */}
          <div className="flex-1 border-r border-[var(--foreground)]/10 py-4 px-6 flex flex-col justify-center gap-1 group cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors sm:hidden xl:flex">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest opacity-60 uppercase">
              {data?.bookingCodeLabel || (lang === 'it' ? 'Codice' : lang === 'de' ? 'Code' : 'Code')}
            </span>
            <input 
              name="coupon" 
              type="text" 
              placeholder={data?.bookingCodeValue || (lang === 'it' ? 'Inserisci' : 'Enter')}
              className="bg-transparent border-none p-0 focus:ring-0 text-sm sm:text-base font-semibold tracking-tight uppercase placeholder:text-current/30 w-full"
            />
          </div>

          {/* Section: Book Now Button */}
          <div className="py-3 px-6 flex items-center justify-center lg:justify-end">
            <button 
              type="submit"
              className="w-full lg:w-auto px-10 py-5 bg-primary hover:bg-primary/90 text-white font-bold tracking-[0.2em] text-xs transition-all active:scale-95 shadow-xl uppercase cursor-pointer"
            >
              {data?.bookingButtonText || (lang === 'it' ? 'Prenota Ora' : lang === 'de' ? 'Jetzt Buchen' : 'Book Now')}
            </button>
          </div>

        </form>
      </div>
    </div>

  );
};

export default BookingBar;
;
