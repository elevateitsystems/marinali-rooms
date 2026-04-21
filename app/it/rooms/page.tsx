import { getContent } from "@/lib/content";
import RoomSplitSection from "@/components/rooms/RoomSplitSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camere & Suite | Marinali Rooms",
  description: "Esplora le nostre suite esclusive a Marinali Rooms. Scegli tra la nostra intima Junior Suite e la grandiosa Suite DeLuxe.",
};

const defaultRoomsIt = [
  {
    id: 'junior-suite',
    name: 'JUNIOR SUITE',
    location: 'Bassano del Grappa',
    description: 'Un santuario di luce e storia, con affreschi originali e artigianato italiano su misura in un ambiente intimo. Perfetto per chi cerca un\'autentica esperienza in un Palazzo con il comfort moderno.',
    image: '/assets/Stanza%201%20-%20Foto-1.jpg'
  },
  {
    id: 'suite-deluxe',
    name: 'SUITE DELUXE',
    location: 'Bassano del Grappa',
    description: 'Eleganza senza pari tra mura storiche, con pavimenti in terrazzo veneziano e vista panoramica sul centro storico. La nostra offerta più grandiosa per un soggiorno indimenticabile nel cuore di Bassano.',
    image: '/assets/Stanza%202%20-%20Foto-1.jpg'
  }
];

export default function ItalianRoomsPage() {
  return (
    <main className="pt-0">
      <div className="bg-primary text-white py-24 px-5 text-center">
        <h1 className="text-5xl md:text-7xl font-primary mb-6 tracking-tight">Camere & Suite</h1>
        <p className="font-mono text-xs tracking-[0.3em] uppercase opacity-60">Bassano del Grappa, Italia</p>
      </div>
      
      {defaultRoomsIt.map((room, index) => (
        <RoomSplitSection 
          key={room.id} 
          room={room} 
          reverse={index % 2 !== 0} 
          lang="it" 
        />
      ))}
    </main>
  );
}
