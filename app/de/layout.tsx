import Navbar from "@/components/Navbar";

export default function GermanLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar lang="de" />
      <div className="pt-24 min-h-screen">
        {children}
      </div>
    </>
  );
}
