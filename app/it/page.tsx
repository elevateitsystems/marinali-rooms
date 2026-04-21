import { ContentService } from "@/lib/services/contentService";
import EditableText from "@/components/common/EditableText";
import Hero from "@/components/Home/Hero";

import IntroSection from "@/components/Home/IntroSection";
import ImageSlider from "@/components/Home/RoomSlider";
import ReviewSlider from "@/components/Home/ReviewSlider";
import OfferSlider from "@/components/Home/OfferSlider";
import Highlights from "@/components/Home/Highlights";
import FeaturedRetreat from "@/components/Home/FeaturedRetreat";

export default async function ItalianHomePage() {
  const content = await ContentService.getContent("home", "it");
  const data = (content?.sections as any) || {};

  return (
    <>
      <Hero title="Marinali" subtitle="ROOMS" />
      <div className="container mx-auto">
        <IntroSection
          title={
            <EditableText
              lang="it" page="home" path="aboutTitle"
              initialValue={data?.aboutTitle || data?.title || "Benvenuto"}
            />
          }
          description={
            <EditableText
              lang="it" page="home" path="aboutDescription" multiline
              initialValue={data?.aboutDescription || data?.welcomeText || "Vivi un'ospitalità indimenticabile..."}
            />
          }
        />
        <ImageSlider lang="it" data={data} />
      </div>
      <ReviewSlider lang="it" data={data} />
      <div className="container mx-auto">
        <Highlights lang="it" data={data} />
      </div>
      <FeaturedRetreat lang="it" data={data} />
      <div className="container mx-auto">
        <OfferSlider lang="it" data={data} />
      </div>



    </>

  );
}
