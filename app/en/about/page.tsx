import { getContent } from "@/lib/content";
import Link from "next/link";

export default async function EnglishAboutPage() {
  const { about: data } = getContent("en");

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-8">
      <nav className="mb-8 flex gap-4">
        <Link href="/en" className="opacity-70 hover:opacity-100 transition-opacity">Back to English Home</Link>
      </nav>
      <h1 className="text-4xl font-bold mb-4">{data?.aboutTitle || 'About Us (EN)'}</h1>
      <p className="text-lg opacity-80">{data?.description || 'Add English About Page content.'}</p>
    </div>
  );
}
