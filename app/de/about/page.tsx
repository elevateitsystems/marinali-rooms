import { getContent } from "@/lib/content";
import AboutContent from "@/components/About/AboutContent";

export default async function GermanAboutPage() {
  const { about: data } = getContent("de");

  return <AboutContent lang="de" initialData={data} />;
}
