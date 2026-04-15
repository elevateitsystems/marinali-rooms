import { client } from "@/sanity/lib/client";
import Link from "next/link";

export default async function EnglishContactPage() {
  const data = await client.fetch(
    `*[_type == "contactPage" && language == "en"][0]{ contactTitle, email }`
  );

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-8">
      <nav className="mb-8 flex gap-4">
        <Link href="/en" className="opacity-70 hover:opacity-100 transition-opacity">Back to English Home</Link>
      </nav>
      <h1 className="text-4xl font-bold mb-4">{data?.contactTitle || 'Contact Us (EN)'}</h1>
      <p className="text-lg opacity-80">Email: {data?.email || 'test@example.com'}</p>
    </div>
  );
}
