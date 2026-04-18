import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BookingBar from "@/components/common/BookingBar";
import { getContent } from "@/lib/content";

export default async function EnglishLayout({ children }: { children: React.ReactNode }) {
  const { home } = getContent("en");
  const data = home.booking;

  return (
    <>
      <Navbar lang="en" />
      <div className="pt-24 min-h-screen ">
        {children}
      </div>
      <BookingBar data={data} lang="en" />
      <Footer lang="en" />
    </>
  );
}
