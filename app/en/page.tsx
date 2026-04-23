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
        title={<EditableText lang="en" page="home" path="heroTitle" initialValue="Marinali" />}
        subtitle={<EditableText lang="en" page="home" path="heroSubtitle" initialValue="ROOMS" />}
        lang="en" 
      />
      
      {/* Le Suite Section */}
      <section id="le-suite" className="pt-20">
        <div className="bg-primary text-white py-24 lg:py-36 px-5 text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-primary mb-6 tracking-tight">Le Suite</h2>
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
        
        <LeSuiteBookingFooter lang="en" />
      </section>

      <div className="container mx-auto">
        <IntroSection
          title={
            <EditableText
              lang="en" page="home" path="aboutTitle"
              initialValue={data?.aboutTitle || data?.title || "Welcome"}
            />
          }
          description={
            <EditableText
              lang="en" page="home" path="aboutDescription" multiline
              initialValue={data?.aboutDescription || data?.welcomeText || "Experience unforgettable hospitality..."}
            />
          }
        >
          {/* Feature text grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 md:py-10">
            <div className="space-y-4">
              <h3 className="text-xl uppercase tracking-widest font-light text-[#1A1A1A]">
                <EditableText lang="en" page="home" path="frescoTitle" initialValue={data?.frescoTitle || "The 1460 Fresco"} />
              </h3>
              <p className="opacity-70 font-light leading-relaxed text-[15px] text-[#555] font-mono">
                <EditableText lang="en" page="home" path="frescoDescription" multiline initialValue={data?.frescoDescription || "Discovered during restoration, our original 1460 fresco serves as a breathtaking centerpiece that connects your stay to centuries of rich Italian heritage and artisanal craftsmanship."} />
              </p>
            </div>
            <div className="space-y-4">
               <h3 className="text-xl uppercase tracking-widest font-light text-[#1A1A1A]">
                <EditableText lang="en" page="home" path="terrazzoTitle" initialValue={data?.terrazzoTitle || "Venetian Terrazzo Floors"} />
              </h3>
              <p className="opacity-70 font-light leading-relaxed text-[15px] text-[#555] font-mono">
                <EditableText lang="en" page="home" path="terrazzoDescription" multiline initialValue={data?.terrazzoDescription || "Step onto history with our authentic Venetian terrazzo floors, carefully preserved to maintain their original luster and intricate patterns that reflect the timeless elegance of Veneto architecture."} />
              </p>
            </div>
          </div>

          {/* Fresco + Floor images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/assets/Stanza%201%20-%20Foto-5.jpg"
                alt="The original 1460 fresco"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <span className="text-white text-xs font-mono tracking-[0.25em] uppercase opacity-80">The 1460 Fresco</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/assets/Stanza%202%20-%20Foto-3.jpg"
                alt="Venetian Terrazzo floors"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <span className="text-white text-xs font-mono tracking-[0.25em] uppercase opacity-80">Venetian Terrazzo Floors</span>
              </div>
            </div>
          </div>
        </IntroSection>
      </div>
      <ReviewSlider lang="en" data={data} />
    </>
  );
}
