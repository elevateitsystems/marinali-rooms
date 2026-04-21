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

export default async function EnglishHomePage() {
  const content = await ContentService.getContent("home", "en");
  const data = (content?.sections as any) || {};

  return (
    <>
      <Hero title="Marinali" subtitle="ROOMS" />
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
        </IntroSection>
        <ImageSlider lang="en" data={data} />
      </div>
      <ReviewSlider lang="en" data={data} />
      <div className="container mx-auto">
        <Highlights lang="en" data={data} />
      </div>
      <FeaturedRetreat lang="en" data={data} />
      <div className="container mx-auto">
        <OfferSlider lang="en" data={data} />
      </div>



    </>

  );
}
