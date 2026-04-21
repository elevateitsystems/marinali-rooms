import { getContent } from "@/lib/content";
import ThankYouPageContent from "@/components/common/ThankYouPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grazie | Marinali Rooms",
  description: "La tua prenotazione presso Marinali Rooms è stata confermata. Non vediamo l'ora di accoglierti.",
  robots: "noindex",
};

export default function ItalianThankYouPage() {
  const data = getContent("it");

  return <ThankYouPageContent lang="it" data={data} />;
}
