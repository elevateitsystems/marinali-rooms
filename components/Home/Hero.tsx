import Image from "next/image";
import BrandLogo from "../common/BrandLogo";
import Link from "next/link";
import DynamicHeroClient from "./DynamicHeroClient";

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
      className="-mt-24 relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 
        CRITICAL: LCP Image (Pure Server Rendered) 
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src={displayImgUrl}
          alt="Hero Banner"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.7]"
          priority
          loading="eager"
          // @ts-ignore
          fetchPriority="high"
        />
      </div>

      {/* 
        ABOVE THE FOLD BRANDING: Rendered immediately in HTML
        No hydration needed for initial paint.
      */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <Link href={`/${lang}`} className="flex flex-col items-center justify-center group cursor-pointer">
          <BrandLogo
            lang={lang}
            size="xl"
            variant="light"
          />
        </Link>

        {/* 
          Interactive Layer (Client Component)
          Handles only non-critical animations and parallax.
          Deferred to client-side only (ssr: false)
        */}
        <DynamicHeroClient
          lang={lang}
          data={data}
          isEditable={isEditable}
          settings={settings}
        />
      </div>
    </section>
  );
}
