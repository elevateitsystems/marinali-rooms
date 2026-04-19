import { getContent } from "@/lib/content";
import ContactContent from "@/components/Contact/ContactContent";

export default async function ItalianContactPage() {
  const { contact: data } = getContent("it");

  return <ContactContent lang="it" initialData={data} />;
}
