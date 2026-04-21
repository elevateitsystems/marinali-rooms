import { getContent } from "@/lib/content";
import RoomSplitSection from "@/components/rooms/RoomSplitSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zimmer & Suiten | Marinali Rooms",
  description: "Entdecken Sie unsere exklusiven Suiten in den Marinali Rooms. Wählen Sie zwischen unserer intimen Junior Suite und der prachtvollen Suite DeLuxe.",
};

const defaultRoomsDe = [
  {
    id: 'junior-suite',
    name: 'JUNIOR SUITE',
    location: 'Bassano del Grappa',
    description: 'Ein Refugium aus Licht und Geschichte, mit originalen Fresken und maßgeschneiderter italienischer Handwerkskunst in einem intimen Rahmen. Perfekt für alle, die ein authentisches Palazzo-Erlebnis mit modernem Komfort suchen.',
    image: '/assets/Stanza%201%20-%20Foto-1.jpg'
  },
  {
    id: 'suite-deluxe',
    name: 'SUITE DELUXE',
    location: 'Bassano del Grappa',
    description: 'Unvergleichliche Eleganz in historischen Mauern, mit venezianischen Terrazzoböden und Panoramablick auf das historische Zentrum. Unser prachtvollstes Angebot für einen unvergesslichen Aufenthalt im Herzen von Bassano.',
    image: '/assets/Stanza%202%20-%20Foto-1.jpg'
  }
];

export default function GermanRoomsPage() {
  return (
    <main className="pt-0">
      <div className="bg-primary text-white py-24 px-5 text-center">
        <h1 className="text-5xl md:text-7xl font-primary mb-6 tracking-tight">Zimmer & Suite</h1>
        <p className="font-mono text-xs tracking-[0.3em] uppercase opacity-60">Bassano del Grappa, Italien</p>
      </div>
      
      {defaultRoomsDe.map((room, index) => (
        <RoomSplitSection 
          key={room.id} 
          room={room} 
          reverse={index % 2 !== 0} 
          lang="de" 
          priority={index === 0}
        />
      ))}
    </main>
  );
}
