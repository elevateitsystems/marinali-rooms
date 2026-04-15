import Navbar from "@/components/Navbar";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar lang="en" />
      <div className="pt-24 min-h-screen ">
        {children}
      </div>
    </>
  );
}
