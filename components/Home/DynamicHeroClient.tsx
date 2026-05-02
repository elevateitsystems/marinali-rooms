'use client';
import dynamic from "next/dynamic";

const HeroClient = dynamic(() => import("./HeroClient"), { 
  ssr: false,
  loading: () => null // Zero-UI during load to prevent TBT
});

export default function DynamicHeroClient(props: any) {
  return <HeroClient {...props} />;
}
