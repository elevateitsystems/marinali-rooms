import { ContentService } from "@/lib/services/contentService";
import EditableText from "@/components/common/EditableText";
import Hero from "@/components/Home/Hero";
import IntroSection from "@/components/Home/IntroSection";
import dynamic from "next/dynamic";
import Image from "next/image";

const ReviewSlider = dynamic(() => import("@/components/Home/ReviewSlider"));

export default async function GermanHomePage() {
  const content = await ContentService.getContent("home", "de");
  const data = (content?.sections as any) || {};

  return (
    <>
      <Hero title="Marinali" subtitle="ROOMS" lang="de" />
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

          {/* Fresco + Floor images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/assets/Stanza%201%20-%20Foto-5.jpg"
                alt="Das originale Fresko von 1460"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <span className="text-white text-xs font-mono tracking-[0.25em] uppercase opacity-80">Das 1460 Fresko</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/assets/Stanza%202%20-%20Foto-3.jpg"
                alt="Venezianische Terrazzoböden"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <span className="text-white text-xs font-mono tracking-[0.25em] uppercase opacity-80">Venezianische Terrazzoböden</span>
              </div>
            </div>
          </div>
        </IntroSection>
      </div>
      <ReviewSlider lang="de" data={data} />
    </>
  );
}
