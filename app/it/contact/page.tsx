import { getContent } from "@/lib/content";
import Link from "next/link";

export default async function ItalianContactPage() {
  const { contact: data } = getContent("it");

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-8">
      <nav className="mb-8 flex gap-4">
        <Link href="/it" className="opacity-70 hover:opacity-100 transition-opacity">Torna alla Home</Link>
      </nav>
      <h1 className="text-4xl font-bold mb-4">{data?.contactTitle || 'Contattaci (Contact IT)'}</h1>
      <p className="text-lg opacity-80">Email: {data?.email || 'test@example.com'}</p>
    </div>
  );
}
