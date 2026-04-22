import LeSuiteBookingFooter from "@/components/rooms/LeSuiteBookingFooter";
import RoomSplitSection from "@/components/rooms/RoomSplitSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Suite | Marinali Rooms",
  description: "Entdecken Sie unsere exklusiven Suiten in den Marinali Rooms. Wählen Sie zwischen unserer intimen Junior Suite und der prachtvollen Suite DeLuxe im Herzen von Bassano del Grappa.",
};

const rooms = [
  {
    id: 'junior-suite',
    name: 'JUNIOR SUITE',
    location: 'Bassano del Grappa',
    description: 'Ein Refugium aus Licht und Geschichte, mit originalen Fresken und maßgeschneiderter italienischer Handwerkskunst in einem intimen Rahmen. Perfekt für alle, die ein authentisches Palazzo-Erlebnis mit modernem Komfort suchen.',
    image: '/assets/Stanza%201%20-%20Foto-1.jpg',
    images: [
      '/assets/Stanza%201%20-%20Foto-1.jpg',
      '/assets/Stanza%201%20-%20Foto-4.jpg',
      '/assets/Stanza%201%20-%20Foto-5.jpg',
      '/assets/Stanza%201%20-%20Foto-6.jpg',
      '/assets/Stanza%201%20-%20Foto-7.jpg',
      '/assets/Stanza%201%20-%20Foto-11.jpg',
    ]
  },
  {
    id: 'suite-deluxe',
    name: 'SUITE DELUXE',
    location: 'Bassano del Grappa',
    description: 'Unvergleichliche Eleganz in historischen Mauern, mit venezianischen Terrazzoböden und Panoramablick auf das historische Zentrum. Unser prachtvollstes Angebot für einen unvergesslichen Aufenthalt im Herzen von Bassano.',
    image: '/assets/Stanza%202%20-%20Foto-1.jpg',
    images: [
      '/assets/Stanza%202%20-%20Foto-1.jpg',
      '/assets/Stanza%202%20-%20Foto-2.jpg',
      '/assets/Stanza%202%20-%20Foto-3.jpg',
      '/assets/Stanza%202%20-%20Foto-7.jpg',
      '/assets/Stanza%202%20-%20Foto-11.jpg',
      '/assets/Stanza%202%20-%20Foto-12.jpg',
    ]
  }
];

export default function GermanLeSuitePage() {
  return (
    <main className="pt-0">
      <div className="bg-primary text-white py-24 px-5 text-center">
        <h1 className="text-5xl md:text-7xl font-primary mb-6 tracking-tight">Le Suite</h1>
        <p className="font-mono text-xs tracking-[0.3em] uppercase opacity-60">Bassano del Grappa, Deutschland</p>
      </div>

      {rooms.map((room, index) => (
        <RoomSplitSection
          key={room.id}
          room={room}
          reverse={index % 2 !== 0}
          lang="de"
          priority={index === 0}
        />
      ))}

      {/* Single Book Now at the bottom */}
      <LeSuiteBookingFooter lang="de" />
    </main>
  );
}
