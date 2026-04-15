import { client } from "@/sanity/lib/client";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";

export default async function GermanHomePage() {
  const data = await client.fetch(
    `*[_type == "homePage" && language == "de"][0]{ 
      title, 
      welcomeText,
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
    }`
  );

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-3xl mx-auto pb-32">
      <h1 className="text-5xl font-bold mb-6 tracking-tight">{data?.title || 'German Home Page'}</h1>
      <p className="text-xl leading-relaxed">{data?.welcomeText || 'Add German Home Page content in Sanity.'}</p>
      <BookingBar data={data} lang="de" />
    </div>
  );
}
