import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BookingBar from "@/components/common/BookingBar";
import { client } from "@/sanity/lib/client";

export default async function EnglishLayout({ children }: { children: React.ReactNode }) {
  const data = await client.fetch(
    `*[_type == "homePage" && language == "en"][0]{ 
      bookingWhereLabel,
      bookingWhereValue,
      bookingDatesLabel,
      bookingDatesValue,
      bookingWhoLabel,
      bookingWhoValue,
      bookingRoomsLabel,
      bookingRoomsValue,
      bookingCodeLabel,
      bookingCodeValue,
      bookingButtonText
    }`,
    {},
    { next: { revalidate: 0 } }
  );

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
