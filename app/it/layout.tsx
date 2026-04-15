import Navbar from "@/components/Navbar";

export default function ItalianLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar lang="it" />
      <div className="pt-24 min-h-screen ">
        {children}
      </div>
    </>
  );
}
