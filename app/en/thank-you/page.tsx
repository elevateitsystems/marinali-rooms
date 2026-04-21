import { getContent } from "@/lib/content";
import ThankYouPageContent from "@/components/common/ThankYouPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | Marinali Rooms",
  description: "Your reservation at Marinali Rooms has been confirmed. We look forward to welcoming you.",
  robots: "noindex", // Prevents tracking page from appearing in search results
};

export default function EnglishThankYouPage() {
  const data = getContent("en");

  return <ThankYouPageContent lang="en" data={data} />;
}
