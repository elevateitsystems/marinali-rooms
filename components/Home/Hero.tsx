import Image from "next/image";
import dynamic from "next/dynamic";
import BrandLogo from "../common/BrandLogo";
import ReactDOM from "react-dom";

const HeroClient = dynamic(() => import("./HeroClient"), { ssr: true });

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

  // CRITICAL: Preload the LCP image as early as possible
  // @ts-ignore - preload is a valid method in modern React/Next.js
  if (typeof ReactDOM.preload === 'function') {
    ReactDOM.preload(displayImgUrl, { as: "image", fetchPriority: "high" });
  }

  return (
    <section
      id="hero"
      className="-mt-24 relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
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
          // PERFORMANCE: Use slightly more aggressive sizes for mobile to reduce byte size
          // Since the image has a dark overlay, we can get away with lower resolution on mobile
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 100vw, 100vw"
          className="object-cover object-center brightness-[0.7]"
          priority
          quality={60}
          loading="eager"
          // @ts-ignore
          fetchPriority="high"
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
      >
        <BrandLogo lang={lang} size="xl" variant="light" />
      </HeroClient>
    </section>
  );
}
