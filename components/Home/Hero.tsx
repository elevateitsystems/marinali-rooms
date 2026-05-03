import Image from "next/image";
import HeroClient from "./HeroClient";
import BrandLogo from "../common/BrandLogo";

export default function Hero({
  title = "Marinali",
  subtitle = "Rooms",
  imgUrl = "/assets/Stanza%203%20-%20Foto-13.jpg",
  lang = "en",
  data,
  isEditable = false,
  settings,
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  imgUrl?: string;
  lang?: "en" | "it" | "de";
  data?: any;
  isEditable?: boolean;
  settings?: any;
}) {
  const displayImgUrl = data?.heroImage || settings?.heroImage || imgUrl;

  return (
    <section
      id="hero"
      className="-mt-24 relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 
        CRITICAL: LCP Image (Pure Server Rendered) 
        This is the most important element for performance. 
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src={displayImgUrl}
          alt="Hero Banner"
          fill
          // PERFORMANCE: Force granular scaling on mobile
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          className="object-cover object-center brightness-[0.7]"
          priority
          quality={85}
          loading="eager"
          // @ts-ignore
          fetchPriority="high"
        />
      </div>

      {/* 
        Interactive Layer (Client Component)
        Handles animations and parallax.
        We pass the BrandLogo as a child to keep it server-rendered.
      */}
      <HeroClient
        lang={lang}
        data={data}
        isEditable={isEditable}
        settings={settings}
        title={title}
        subtitle={subtitle}
        imgUrl={imgUrl}
      >
        <BrandLogo lang={lang} size="xl" variant="light" />
      </HeroClient>
    </section>
  );
}
