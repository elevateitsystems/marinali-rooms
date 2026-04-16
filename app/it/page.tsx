import { client } from "@/sanity/lib/client";
import Hero from "@/components/Home/Hero";

import IntroSection from "@/components/Home/IntroSection";
import ImageSlider from "@/components/Home/HotelSlider";
import ReviewSlider from "@/components/Home/ReviewSlider";
import OfferSlider from "@/components/Home/OfferSlider";
import Highlights from "@/components/Home/Highlights";
import FeaturedRetreat from "@/components/Home/FeaturedRetreat";





export default async function ItalianHomePage() {
  const data = await client.fetch(
    `*[_type == "homePage" && language == "it"][0]{ 
      title, 
      welcomeText,
      aboutTitle,
      aboutDescription,
      bookingWhereLabel,
      bookingWhereValue,
      bookingDatesLabel,
      bookingDatesValue,
      bookingWhoLabel,
      bookingWhoValue,
      bookingRoomsLabel,
      bookingRoomsValue,
      bookingCodeLabel,
      bookingCodeValue,
      bookingButtonText
    }`
  );

  return (
    <>
      <Hero title="Marinali" subtitle="CAMERE" />
      <div className="container mx-auto">
        <IntroSection
          title={data?.aboutTitle || data?.title}
          description={data?.aboutDescription || data?.welcomeText}
        />
        <ImageSlider />
      </div>
      <ReviewSlider />
      <div className="container mx-auto">
        <Highlights />
      </div>
      <FeaturedRetreat />
      <div className="container mx-auto">
        <OfferSlider />
      </div>



    </>

  );
}
