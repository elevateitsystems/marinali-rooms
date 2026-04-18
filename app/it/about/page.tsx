import { getContent } from "@/lib/content";
import Link from "next/link";

export default async function ItalianAboutPage() {
  const { about: data } = getContent("it");

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-8">
      <nav className="mb-8 flex gap-4">
        <Link href="/it" className="opacity-70 hover:opacity-100 transition-opacity">Torna alla Home</Link>
      </nav>
      <h1 className="text-4xl font-bold mb-4">{data?.aboutTitle || 'Chi Siamo (About IT)'}</h1>
      <p className="text-lg opacity-80">{data?.description || 'Add Italian About Page content.'}</p>
    </div>
  );
}
