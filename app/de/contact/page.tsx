import { getContent } from "@/lib/content";
import ContactContent from "@/components/Contact/ContactContent";

export default async function GermanContactPage() {
  const { contact: data } = getContent("de");

  return <ContactContent lang="de" initialData={data} />;
}
