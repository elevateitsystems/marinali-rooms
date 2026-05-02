import { SettingsService } from "@/lib/services/settingsService";
import Footer from "./Footer";

export default async function FooterServer({ lang }: { lang: "en" | "it" | "de" }) {
  const settings = await SettingsService.getSettings();
  const footerConfig = settings.footerConfig?.[lang];

  return (
    <Footer
      lang={lang}
      infoTitle={footerConfig?.infoTitle}
      address={footerConfig?.address}
      phone={footerConfig?.phone}
      email={footerConfig?.email}
      whatsapp={footerConfig?.whatsapp}
      mapUrl={footerConfig?.mapUrl}
      copyright={footerConfig?.copyright}
      columns={footerConfig?.columns}
      bottomLinks={footerConfig?.bottomLinks}
    />
  );
}
