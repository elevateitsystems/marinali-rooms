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
        />
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
