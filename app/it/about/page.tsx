import { getContent } from "@/lib/content";
import AboutContent from "@/components/About/AboutContent";

export default async function ItalianAboutPage() {
  const { about: data } = getContent("it");

  return <AboutContent lang="it" initialData={data} />;
}
