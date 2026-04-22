import { ContentService } from "@/lib/services/contentService";
import EditableText from "@/components/common/EditableText";
import Hero from "@/components/Home/Hero";
import IntroSection from "@/components/Home/IntroSection";
import dynamic from "next/dynamic";
import Image from "next/image";

const ReviewSlider = dynamic(() => import("@/components/Home/ReviewSlider"));

export default async function ItalianHomePage() {
  const content = await ContentService.getContent("home", "it");
  const data = (content?.sections as any) || {};

  return (
    <>
      <Hero title="Marinali" subtitle="ROOMS" lang="it" />
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
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 md:py-10">
            <div className="space-y-4">
              <h3 className="text-xl uppercase tracking-widest font-light text-[#1A1A1A]">
                <EditableText lang="it" page="home" path="frescoTitle" initialValue={data?.frescoTitle || "L'Affresco del 1460"} />
              </h3>
              <p className="opacity-70 font-light leading-relaxed text-[15px] text-[#555] font-mono">
                <EditableText lang="it" page="home" path="frescoDescription" multiline initialValue={data?.frescoDescription || "Scoperto durante i restauri, il nostro affresco originale del 1460 funge da fulcro mozzafiato che collega il tuo soggiorno a secoli di ricco patrimonio italiano e maestria artigianale."} />
              </p>
            </div>
            <div className="space-y-4">
               <h3 className="text-xl uppercase tracking-widest font-light text-[#1A1A1A]">
                <EditableText lang="it" page="home" path="terrazzoTitle" initialValue={data?.terrazzoTitle || "Pavimenti in Terrazzo Veneziano"} />
              </h3>
              <p className="opacity-70 font-light leading-relaxed text-[15px] text-[#555] font-mono">
                <EditableText lang="it" page="home" path="terrazzoDescription" multiline initialValue={data?.terrazzoDescription || "Cammina nella storia con i nostri autentici pavimenti in terrazzo veneziano, accuratamente preservati per mantenere la loro lucentezza originale e i motivi intricati che riflettono l'eleganza senza tempo dell'architettura veneta."} />
              </p>
            </div>
          </div>

          {/* Fresco + Floor images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/assets/Stanza%201%20-%20Foto-5.jpg"
                alt="L'affresco originale del 1460"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <span className="text-white text-xs font-mono tracking-[0.25em] uppercase opacity-80">L&apos;Affresco del 1460</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/assets/Stanza%202%20-%20Foto-3.jpg"
                alt="Pavimenti in Terrazzo Veneziano"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <span className="text-white text-xs font-mono tracking-[0.25em] uppercase opacity-80">Terrazzo Veneziano</span>
              </div>
            </div>
          </div>
        </IntroSection>
      </div>
      <ReviewSlider lang="it" data={data} />
    </>
  );
}
