import { getContent } from "@/lib/content";
import ContactContent from "@/components/Contact/ContactContent";

export default async function EnglishContactPage() {
  const { contact: data } = getContent("en");

  return <ContactContent lang="en" initialData={data} />;
}
