import { ContentService } from "@/lib/services/contentService";
import { SettingsService } from "@/lib/services/settingsService";
import { Suspense } from "react";
import Hero from "@/components/Home/Hero";
import HomeBTF from "./_components/HomeBTF";

// Force ISR for the homepage (Revalidate every hour)
export const revalidate = 3600;
export const dynamic = 'force-static';

export default async function EnglishHomePage() {
  // ATF Data: Only fetch what's absolutely necessary for the Hero
  // These are cached and fast (Redis/Next Cache)
  const [content, settings] = await Promise.all([
    ContentService.getContent("home", "en"),
    SettingsService.getSettings()
  ]);

  const data = (content?.sections as any) || {};

  return (
    <>
      {/* ABOVE THE FOLD: Rendered immediately */}
      <Hero
        title={data?.heroTitle || "Marinali"}
        subtitle={data?.heroSubtitle || "ROOMS"}
        lang="en"
        data={data}
        settings={settings}
      />

      {/* BELOW THE FOLD: Lazy loaded via Streaming/Suspense */}
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="animate-pulse text-slate-300">Loading experience...</div>
        </div>
      }>
        <HomeBTF lang="en" data={data} />
      </Suspense>
    </>
  );
}
