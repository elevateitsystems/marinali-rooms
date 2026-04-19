import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BookingBar from "@/components/common/BookingBar";
import { getContent } from "@/lib/content";

export default async function ItalianLayout({ children }: { children: React.ReactNode }) {
  const { home } = getContent("it");
  const data = home.booking;

  return (
    <>
      <Navbar lang="it" />
      <div className="pt-24 min-h-screen">
        {children}
      </div>
      <BookingBar data={data} lang="it" />
      <Footer lang="it" />
    </>
  );
}
