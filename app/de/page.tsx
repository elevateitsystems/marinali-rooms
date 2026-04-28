import { ContentService } from "@/lib/services/contentService";
import { RoomService } from "@/lib/services/roomService";

import Hero from "@/components/Home/Hero";
import IntroSection from "@/components/Home/IntroSection";
import dynamic from "next/dynamic";
import Image from "next/image";
import RoomSplitSection from "@/components/rooms/RoomSplitSection";
import LeSuiteBookingFooter from "@/components/rooms/LeSuiteBookingFooter";
import HeritageSection from "@/components/Home/HeritageSection";



const ReviewSlider = dynamic(() => import("@/components/Home/ReviewSlider"));

export default async function GermanHomePage() {
  const roomsData = await RoomService.getRooms();
  const rooms = roomsData.map((room: any) => ({
    id: room.slug,
    image: room.image,
    images: room.images,
    ...room.translations.de
  }));



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

        {rooms.map((room: any, index: number) => (
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
