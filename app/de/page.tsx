import { ContentService } from "@/lib/services/contentService";
import { SettingsService } from "@/lib/services/settingsService";
import { Suspense } from "react";
import Hero from "@/components/Home/Hero";
import HomeBTF from "@/components/Home/HomeBTF";

// Force ISR for the homepage (Revalidate every hour)
export const revalidate = 3600;
export const dynamic = 'force-static';

export default async function GermanHomePage() {
  const [content, settings] = await Promise.all([
    ContentService.getContent("home", "de"),
    SettingsService.getSettings(),
  ]);

  const data = (content?.sections as any) || {};

  return (
    <>
      {/* ABOVE THE FOLD: Rendered immediately */}
      <Hero
        title={data?.heroTitle || "Marinali"}
        subtitle={data?.heroSubtitle || "ROOMS"}
        lang="de"
        data={data}
        settings={settings}
      />

      {/* BELOW THE FOLD: Lazy loaded via Streaming/Suspense */}
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="animate-pulse text-slate-300">
              Lade Erlebnis...
            </div>
          </div>
        }
      >
        <HomeBTF lang="de" data={data} />
      </Suspense>
    </>
  );
}
