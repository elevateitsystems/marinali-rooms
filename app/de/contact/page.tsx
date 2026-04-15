import { client } from "@/sanity/lib/client";
import Link from "next/link";

export default async function GermanContactPage() {
  const data = await client.fetch(
    `*[_type == "contactPage" && language == "de"][0]{ contactTitle, email }`
  );

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-8">
      <nav className="mb-8 flex gap-4">
        <Link href="/de" className="opacity-70 hover:opacity-100 transition-opacity">Zurück zur Startseite</Link>
      </nav>
      <h1 className="text-4xl font-bold mb-4">{data?.contactTitle || 'Kontakt (Contact DE)'}</h1>
      <p className="text-lg opacity-80">Email: {data?.email || 'test@example.com'}</p>
    </div>
  );
}
