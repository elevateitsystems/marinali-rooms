import Link from 'next/link';
import { Yellowtail } from "next/font/google";
import { CheckCircle2, Calendar, MapPin, Phone } from 'lucide-react';

const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"] });

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-5 py-20 text-center">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <CheckCircle2 size={48} strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className={`${yellowtail.className} text-6xl md:text-7xl text-primary`}>
            Grazie
          </h1>
          <h2 className="text-2xl md:text-3xl font-primary tracking-tight uppercase">
            Prenotazione Confermata
          </h2>
          <p className="text-lg opacity-70 font-light leading-relaxed max-w-lg mx-auto">
            La tua richiesta è stata elaborata con successo. Ti abbiamo inviato un&apos;email di conferma con tutti i dettagli del tuo soggiorno a Marinali Rooms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-[var(--foreground)]/10">
          <div className="flex flex-col items-center gap-2">
            <Calendar className="text-primary opacity-60" size={20} />
            <span className="text-[10px] uppercase tracking-widest font-mono opacity-50">Soggiorno</span>
            <span className="text-sm font-medium">Controlla l&apos;email</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MapPin className="text-primary opacity-60" size={20} />
            <span className="text-[10px] uppercase tracking-widest font-mono opacity-50">Indirizzo</span>
            <span className="text-sm font-medium">Bassano del Grappa</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Phone className="text-primary opacity-60" size={20} />
            <span className="text-[10px] uppercase tracking-widest font-mono opacity-50">Supporto</span>
            <span className="text-sm font-medium">+39 347 1234567</span>
          </div>
        </div>

        <div className="pt-12">
          <Link 
            href="/it"
            className="inline-block px-12 py-5 bg-primary text-white text-xs font-bold tracking-[0.3em] uppercase hover:bg-primary/90 transition-all active:scale-95 shadow-lg"
          >
            Torna alla Home
          </Link>
        </div>
      </div>
      
      {/* Visual background element */}
      <div className="fixed top-0 right-0 -z-10 opacity-[0.03] pointer-events-none">
        <h1 className={`${yellowtail.className} text-[30rem] leading-none`}>M</h1>
      </div>
    </div>
  );
}
