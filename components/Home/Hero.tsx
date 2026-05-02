import Image from "next/image";
import HeroClient from "./HeroClient";

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
  lang?: 'en' | 'it' | 'de';
  data?: any;
  isEditable?: boolean;
  settings?: any;
}) {
  const displayImgUrl = data?.heroImage || settings?.heroImage || imgUrl;

  return (
    <section id="hero" className="-mt-24 relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 
        CRITICAL: LCP Image (Pure Server Rendered) 
        This is the most important element for performance. 
        It has NO client-side dependencies.
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src={displayImgUrl}
          alt="Hero Banner"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.7]"
          priority
          quality={90}
        />
      </div>

      {/* 
        Interactive Layer (Client Component)
        Handles animations, parallax, and brand logo.
        This loads after the main image has started painting.
      */}
      <HeroClient 
        lang={lang} 
        data={data} 
        isEditable={isEditable} 
        settings={settings}
        title={title}
        subtitle={subtitle}
        imgUrl={imgUrl}
      />
    </section>
  );
}
