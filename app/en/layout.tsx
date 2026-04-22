import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BookingBar from "@/components/common/BookingBar";
import { getContent } from "@/lib/content";
import { SettingsService } from "@/lib/services/settingsService";

export default async function EnglishLayout({ children }: { children: React.ReactNode }) {
  const { home } = getContent("en");
  const data = home.booking;
  const settings = await SettingsService.getSettings();
  const footerConfig = settings.footerConfig?.en;

  return (
    <>
      <Navbar lang="en" />
      <div className="pt-24 min-h-screen ">
        {children}
      </div>
      <BookingBar data={data} lang="en" />
      <Footer
        lang="en"
        address={footerConfig?.address}
        phone={footerConfig?.phone}
        email={footerConfig?.email}
        whatsapp={footerConfig?.whatsapp}
        mapUrl={footerConfig?.mapUrl}
        copyright={footerConfig?.copyright}
      />
    </>
  );
}
