import { ContentService } from "@/lib/services/contentService";
import EditableText from "@/components/common/EditableText";
import Hero from "@/components/Home/Hero";

import IntroSection from "@/components/Home/IntroSection";
import ImageSlider from "@/components/Home/HotelSlider";
import ReviewSlider from "@/components/Home/ReviewSlider";
import OfferSlider from "@/components/Home/OfferSlider";
import Highlights from "@/components/Home/Highlights";
import FeaturedRetreat from "@/components/Home/FeaturedRetreat";

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
        />
        <ImageSlider lang="en" data={data} />
      </div>
      <ReviewSlider />
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
