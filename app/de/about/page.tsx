import { client } from "@/sanity/lib/client";
import Link from "next/link";

export default async function GermanAboutPage() {
  const data = await client.fetch(
    `*[_type == "aboutPage" && language == "de"][0]{ aboutTitle, description }`
  );

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-8">
      <nav className="mb-8 flex gap-4">
        <Link href="/de" className="opacity-70 hover:opacity-100 transition-opacity">Zurück zur Startseite</Link>
      </nav>
      <h1 className="text-4xl font-bold mb-4">{data?.aboutTitle || 'Über Uns (About DE)'}</h1>
      <p className="text-lg opacity-80">{data?.description || 'Add German About Page content in Sanity.'}</p>
    </div>
  );
}
