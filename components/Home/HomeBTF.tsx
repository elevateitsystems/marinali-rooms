import dynamic from "next/dynamic";

const RoomsList = dynamic(() => import("./SharedRoomsList"), { 
  ssr: true,
  loading: () => <div className="h-[500px] bg-slate-50 animate-pulse flex items-center justify-center text-slate-300">Loading our suites...</div>
});

const AboutSection = dynamic(() => import("./SharedAboutSection"), { 
  ssr: true,
  loading: () => <div className="h-[400px] bg-white animate-pulse flex items-center justify-center text-slate-200">Preparing heritage story...</div>
});

export default function HomeBTF({ lang, data }: { lang: "en" | "it" | "de", data: any }) {
  return (
    <>
      <RoomsList lang={lang} data={data} />
      <AboutSection lang={lang} initialData={data} />
    </>
  );
}
