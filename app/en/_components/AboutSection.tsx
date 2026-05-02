import { ContentService } from "@/lib/services/contentService";
import IntroSection from "@/components/Home/IntroSection";
import HeritageSection from "@/components/Home/HeritageSection";
import ReviewSliderClient from "@/components/Home/ReviewSliderClient";

export default async function AboutSection({ lang, initialData }: { lang: "en" | "it" | "de", initialData: any }) {
  const content = await ContentService.getContent("home", lang);
  const data = (content?.sections as any) || initialData || {};

  return (
    <>
      <div className="container mx-auto">
        <IntroSection
          title={data?.aboutTitle || data?.title || "Welcome"}
          description={data?.aboutDescription || data?.welcomeText || "Experience unforgettable hospitality..."}
        >
          <HeritageSection data={data} lang={lang} />
        </IntroSection>
      </div>
      <ReviewSliderClient lang={lang} data={data} />
    </>
  );
}
