import RoomSplitSection from "@/components/rooms/RoomSplitSection";
import LeSuiteBookingFooter from "@/components/rooms/LeSuiteBookingFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Suite | Marinali Rooms",
  description: "Explore our exclusive suites at Marinali Rooms. Choose between our intimate Junior Suite and the grand Suite DeLuxe in the heart of Bassano del Grappa.",
};

const rooms = [
  {
    id: 'junior-suite',
    name: 'JUNIOR SUITE',
    location: 'Bassano del Grappa',
    description: 'A sanctuary of light and history, featuring original frescoes and bespoke Italian craftsmanship in an intimate setting. Perfect for those seeking an authentic Palazzo experience with modern comfort.',
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
    description: 'Unparalleled elegance spanning historic walls, with Venetian terrazzo floors and panoramic views of the historic center. Our grandest offering for an unforgettable stay in the heart of Bassano.',
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

export default function EnglishLeSuitePage() {
  return (
    <main className="pt-0 mt-7">
      <div className="bg-primary text-white py-24 px-5 text-center">
        <h1 className="text-5xl md:text-7xl font-primary mb-6 tracking-tight">Le Suite</h1>
        <p className="font-mono text-xs tracking-[0.3em] uppercase opacity-60">Bassano del Grappa, Italy</p>
      </div>

      {rooms.map((room, index) => (
        <RoomSplitSection
          key={room.id}
          room={room}
          reverse={index % 2 !== 0}
          lang="en"
          priority={index === 0}
        />
      ))}

      {/* Single Book Now at the bottom */}
      <LeSuiteBookingFooter lang="en" />
    </main>
  );
}
