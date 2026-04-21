import { ContentService } from "@/lib/services/contentService";
import EditableText from "@/components/common/EditableText";
import Hero from "@/components/Home/Hero";
import IntroSection from "@/components/Home/IntroSection";
import dynamic from "next/dynamic";

const ImageSlider = dynamic(() => import("@/components/Home/RoomSlider"));
const ReviewSlider = dynamic(() => import("@/components/Home/ReviewSlider"));
const OfferSlider = dynamic(() => import("@/components/Home/OfferSlider"));
const Highlights = dynamic(() => import("@/components/Home/Highlights"));
const FeaturedRetreat = dynamic(() => import("@/components/Home/FeaturedRetreat"));

export default async function GermanHomePage() {
  const content = await ContentService.getContent("home", "de");
  const data = (content?.sections as any) || {};

  return (
    <>
      <Hero title="Marinali" subtitle="ROOMS" />
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
        </IntroSection>
        <ImageSlider lang="de" data={data} />
      </div>
      <ReviewSlider lang="de" data={data} />
      <div className="container mx-auto">
        <Highlights lang="de" data={data} />
      </div>
      <FeaturedRetreat lang="de" data={data} />
      <div className="container mx-auto">
        <OfferSlider lang="de" data={data} />
      </div>
    </>
  );
}
