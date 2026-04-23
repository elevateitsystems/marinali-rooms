import { ContentService } from "@/lib/services/contentService";
import EditableText from "@/components/common/EditableText";
import Hero from "@/components/Home/Hero";
import IntroSection from "@/components/Home/IntroSection";
import dynamic from "next/dynamic";
import Image from "next/image";
import RoomSplitSection from "@/components/rooms/RoomSplitSection";
import LeSuiteBookingFooter from "@/components/rooms/LeSuiteBookingFooter";

const ReviewSlider = dynamic(() => import("@/components/Home/ReviewSlider"));

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

export default async function GermanHomePage() {
  const content = await ContentService.getContent("home", "de");
  const data = (content?.sections as any) || {};

  return (
    <>
      <Hero 
        title={<EditableText lang="de" page="home" path="heroTitle" initialValue="Marinali" />}
        subtitle={<EditableText lang="de" page="home" path="heroSubtitle" initialValue="ROOMS" />}
        lang="de" 
      />
      
      {/* Le Suite Section */}
      <section id="le-suite" className="pt-20">
        <div className="bg-primary text-white py-24 lg:py-36 px-5 text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-primary mb-6 tracking-tight">Le Suite</h2>
          <p className="font-mono text-xs tracking-[0.3em] uppercase opacity-60">Bassano del Grappa, Italien</p>
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
          title={
            <EditableText
              lang="de" page="home" path="aboutTitle"
              initialValue={data?.aboutTitle || data?.title || "Willkommen"}
            />
          }
          description={
            <EditableText
              lang="de" page="home" path="aboutDescription" multiline
              initialValue={data?.aboutDescription || data?.welcomeText || "Erleben Sie unvergessliche Gastfreundschaft..."}
            />
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 md:py-10">
            <div className="space-y-4">
              <h3 className="text-xl uppercase tracking-widest font-light text-[#1A1A1A]">
                <EditableText lang="de" page="home" path="frescoTitle" initialValue={data?.frescoTitle || "Das 1460 Fresko"} />
              </h3>
              <p className="opacity-70 font-light leading-relaxed text-[15px] text-[#555] font-mono">
                <EditableText lang="de" page="home" path="frescoDescription" multiline initialValue={data?.frescoDescription || "Während der Restaurierung entdeckt, dient unser originales Fresko aus dem Jahr 1460 als atemberaubender Mittelpunkt, der Ihren Aufenthalt mit Jahrhunderten reicher italienischer Handwerkskunst verbindet."} />
              </p>
            </div>
            <div className="space-y-4">
               <h3 className="text-xl uppercase tracking-widest font-light text-[#1A1A1A]">
                <EditableText lang="de" page="home" path="terrazzoTitle" initialValue={data?.terrazzoTitle || "Venezianische Terrazzoböden"} />
              </h3>
              <p className="opacity-70 font-light leading-relaxed text-[15px] text-[#555] font-mono">
                <EditableText lang="de" page="home" path="terrazzoDescription" multiline initialValue={data?.terrazzoDescription || "Betreten Sie die Geschichte mit unseren authentischen venezianischen Terrazzoböden, die sorgfältig erhalten wurden, um ihren ursprünglichen Glanz und ihre komplizierten Muster zu bewahren, die die zeitlose Eleganz der Architektur Venetiens widerspiegeln."} />
              </p>
            </div>
          </div>

          {/* Fresco + Floor images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/assets/Stanza%201%20-%20Foto-5.jpg"
                alt="Das originale Fresko von 1460"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <span className="text-white text-xs font-mono tracking-[0.25em] uppercase opacity-80">Das 1460 Fresko</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/assets/Stanza%202%20-%20Foto-3.jpg"
                alt="Venezianische Terrazzoböden"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <span className="text-white text-xs font-mono tracking-[0.25em] uppercase opacity-80">Venezianische Terrazzoböden</span>
              </div>
            </div>
          </div>
        </IntroSection>
      </div>
      <ReviewSlider lang="de" data={data} />
    </>
  );
}
