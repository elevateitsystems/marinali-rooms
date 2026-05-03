import { ContentService } from "@/lib/services/contentService";
import dynamic from "next/dynamic";

const BookingBar = dynamic(() => import("./BookingBar"), { ssr: true });

export default async function BookingBarServer({ lang }: { lang: "en" | "it" | "de" }) {
  const content = await ContentService.getContent("home", lang);
  const data = content?.sections?.booking || {};

  return <BookingBar data={data} lang={lang} />;
}
