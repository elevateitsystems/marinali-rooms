import { getContent } from "@/lib/content";
import ThankYouPageContent from "@/components/common/ThankYouPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danke | Marinali Rooms",
  description: "Ihre Reservierung im Marinali Rooms wurde bestätigt. Wir freuen uns darauf, Sie begrüßen zu dürfen.",
  robots: "noindex",
};

export default function GermanThankYouPage() {
  const data = getContent("de");

  return <ThankYouPageContent lang="de" data={data} />;
}
