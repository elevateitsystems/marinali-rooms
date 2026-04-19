import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BookingBar from "@/components/common/BookingBar";
import { getContent } from "@/lib/content";

export default async function GermanLayout({ children }: { children: React.ReactNode }) {
  const { home } = getContent("de");
  const data = home.booking;

  return (
    <>
      <Navbar lang="de" />
      <div className="pt-24 min-h-screen">
        {children}
      </div>
      <BookingBar data={data} lang="de" />
      <Footer lang="de" />
    </>
  );
}
