"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingUrl: string;
}

export function BookingModal({ isOpen, onClose, bookingUrl }: BookingModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 overflow-hidden border-none bg-white">
        <DialogHeader className="sr-only">
          <DialogTitle>Booking Engine</DialogTitle>
        </DialogHeader>
        
        <div className="relative w-full h-full flex flex-col pt-10 px-0">
          {isOpen && isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 gap-4">
              <Loader2 className="animate-spin text-primary" size={40} />
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                Opening Booking Engine...
              </p>
            </div>
          )}
          
          {isOpen && (
            <iframe
              src={bookingUrl}
              className={cn(
                "w-full h-full border-none transition-opacity duration-500",
                isLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setIsLoading(false)}
              title="Booking Engine"
              allow="payment; clipboard-write; camera; microphone; geolocation"
              sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
              loading="lazy"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
