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

export default async function EnglishHomePage() {
  const content = await ContentService.getContent("home", "en");
  const data = (content?.sections as any) || {};

  return (
    <>
      <Hero 
        title={data?.heroTitle || "Marinali"}
        subtitle={data?.heroSubtitle || "ROOMS"}
        lang="en" 
        data={data}
      />
      
      {/* Le Suite Section */}
      <section id="le-suite" className="pt-20">
        <div className="bg-primary text-white py-24 lg:py-36 px-5 text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-primary mb-6 tracking-tight">
            {data?.leSuiteTitle || "Le Suite"}
          </h2>
          <p className="font-mono text-xs tracking-[0.3em] uppercase opacity-60">
            {data?.leSuiteSubtitle || "Bassano del Grappa, Italy"}
          </p>
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
        
        <LeSuiteBookingFooter lang="en" />
      </section>

      <div className="container mx-auto">
        <IntroSection
          title={data?.aboutTitle || data?.title || "Welcome"}
          description={data?.aboutDescription || data?.welcomeText || "Experience unforgettable hospitality..."}
        >
          <HeritageSection data={data} lang="en" />
        </IntroSection>
      </div>
      <ReviewSlider lang="en" data={data} />
    </>
  );
}
