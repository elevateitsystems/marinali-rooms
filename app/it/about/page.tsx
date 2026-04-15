import { client } from "@/sanity/lib/client";
import Link from "next/link";

export default async function ItalianAboutPage() {
  const data = await client.fetch(
    `*[_type == "aboutPage" && language == "it"][0]{ aboutTitle, description }`
  );

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-8">
      <nav className="mb-8 flex gap-4">
        <Link href="/it" className="opacity-70 hover:opacity-100 transition-opacity">Torna alla Home</Link>
      </nav>
      <h1 className="text-4xl font-bold mb-4">{data?.aboutTitle || 'Chi Siamo (About IT)'}</h1>
      <p className="text-lg opacity-80">{data?.description || 'Add Italian About Page content in Sanity.'}</p>
    </div>
  );
}
