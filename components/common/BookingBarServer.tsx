import { ContentService } from "@/lib/services/contentService";
import BookingBar from "./BookingBar";

export default async function BookingBarServer({
  lang,
}: {
  lang: "en" | "it" | "de";
}) {
  const content = await ContentService.getContent("home", lang);
  const data = content?.sections?.booking || {};

  return <BookingBar data={data} lang={lang} />;
}
