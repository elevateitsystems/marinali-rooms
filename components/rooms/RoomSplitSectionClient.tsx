"use client";

import dynamic from "next/dynamic";

const RoomSplitSection = dynamic(() => import("./RoomSplitSection"), { 
  ssr: true // Swiper can do basic SSR, but we want the interactive parts on client
});

export default function RoomSplitSectionClient(props: any) {
  return <RoomSplitSection {...props} />;
}
