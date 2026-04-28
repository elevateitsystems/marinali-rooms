import { ContentService } from "@/lib/services/contentService";
import Hero from "@/components/Home/Hero";
import IntroSection from "@/components/Home/IntroSection";
import dynamic from "next/dynamic";
import Image from "next/image";
import RoomSplitSection from "@/components/rooms/RoomSplitSection";
import LeSuiteBookingFooter from "@/components/rooms/LeSuiteBookingFooter";
import HeritageSection from "@/components/Home/HeritageSection";



const ReviewSlider = dynamic(() => import("@/components/Home/ReviewSlider"));

const rooms = [
  {
    id: 'junior-suite',
    name: 'JUNIOR SUITE',
    location: 'Bassano del Grappa',
    description: 'Ein Refugium aus Licht und Geschichte, mit originalen Fresken und maßgeschneiderter italienischer Handwerkskunst in einem intimen Rahmen. Perfekt für alle, die ein authentisches Palazzo-Erlebnis mit modernem Komfort suchen.',
    capacity: '2 Erwachsene',
    amenities: [
      'Kostenloses Highspeed-WLAN',
      'Klimaanlage',
      'Minibar',
      'Zimmersafe',
      'Flachbild-TV',
      'Nespresso-Kaffeemaschine',
      'Luxuriöses Badezimmer',
      'Haartrockner',
      'Bio-Pflegeprodukte'
    ],
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
    capacity: '2 Erwachsene',
    amenities: [
      'Kostenloses Highspeed-WLAN',
      'Klimaanlage',
      'Minibar',
      'Zimmersafe',
      'Flachbild-TV',
      'Nespresso-Kaffeemaschine',
      'Luxuriöses Badezimmer',
      'Haartrockner',
      'Bio-Pflegeprodukte'
    ],
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

export default async function GermanHomePage() {
  const content = await ContentService.getContent("home", "de");
  const data = (content?.sections as any) || {};

  return (
    <>
      <Hero 
        title={data?.heroTitle || "Marinali"}
        subtitle={data?.heroSubtitle || "ROOMS"}
        lang="de" 
        data={data}
      />
      
      {/* Le Suite Section */}
      <section id="le-suite" className="pt-20">
        <div className="bg-primary text-white py-24 lg:py-36 px-5 text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-primary mb-6 tracking-tight">
            {data?.leSuiteTitle || "Le Suite"}
          </h2>
          <p className="font-mono text-xs tracking-[0.3em] uppercase opacity-60">
            {data?.leSuiteSubtitle || "Bassano del Grappa, Italien"}
          </p>
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
        
        <LeSuiteBookingFooter lang="de" />
      </section>

      <div className="container mx-auto">
        <IntroSection
          title={data?.aboutTitle || data?.title || "Willkommen"}
          description={data?.aboutDescription || data?.welcomeText || "Erleben Sie unvergessliche Gastfreundschaft..."}
        >
          <HeritageSection data={data} lang="de" />
        </IntroSection>
      </div>
      <ReviewSlider lang="de" data={data} />
    </>
  );
}
