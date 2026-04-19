import { getContent } from "@/lib/content";
import AboutContent from "@/components/About/AboutContent";

export default async function EnglishAboutPage() {
  const { about: data } = getContent("en");

  return <AboutContent lang="en" initialData={data} />;
}
