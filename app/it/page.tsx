import { ContentService } from "@/lib/services/contentService";
import { RoomService } from "@/lib/services/roomService";
import { SettingsService } from "@/lib/services/settingsService";
import ReactDOM from "react-dom";

import Hero from "@/components/Home/Hero";
import IntroSection from "@/components/Home/IntroSection";
import dynamic from "next/dynamic";
import Image from "next/image";
const RoomSplitSection = dynamic(() => import("@/components/rooms/RoomSplitSection"));
import LeSuiteBookingFooter from "@/components/rooms/LeSuiteBookingFooter";
import LeSuiteHeader from "@/components/rooms/LeSuiteHeader";
import HeritageSection from "@/components/Home/HeritageSection";

const ReviewSlider = dynamic(() => import("@/components/Home/ReviewSlider"));

export default async function ItalianHomePage() {
  const [content, roomsData, settings] = await Promise.all([
    ContentService.getContent("home", "it"),
    RoomService.getRooms(),
    SettingsService.getSettings()
  ]);

  const data = (content?.sections as any) || {};
  const rooms = roomsData.map((room: any) => ({
    id: room.slug,
    images: room.images,
    ...room.translations.it
  }));  const heroImageUrl = data?.heroImage || settings?.heroImage || "/assets/Stanza%203%20-%20Foto-13.jpg";
  
  // Preload the Hero image for LCP optimization
  ReactDOM.preload(heroImageUrl, { as: "image", fetchPriority: "high" });

  return (
    <>
      <Hero
        title={data?.heroTitle || "Marinali"}
        subtitle={data?.heroSubtitle || "ROOMS"}
        lang="it"
        data={data}
        settings={settings}
      />

      {/* Le Suite Section */}
      <section id="le-suite" className="">
        <LeSuiteHeader lang="it" data={data} />

        {rooms?.map((room: any, index: number) => (
          <RoomSplitSection
            key={room.id}
            room={room}
            reverse={index % 2 !== 0}
            lang="it"
            priority={index === 0}
          />
        ))}

        <LeSuiteBookingFooter lang="it" data={data} />
      </section>

      <div className="container mx-auto">
        <IntroSection
          title={data?.aboutTitle || data?.title || "Benvenuto"}
          description={data?.aboutDescription || data?.welcomeText || "Vivi un'ospitalità indimenticabile..."}
        >
          <HeritageSection data={data} lang="it" />
        </IntroSection>
      </div>
      <ReviewSlider lang="it" data={data} />
    </>
  );
}
