import { RoomService } from "@/lib/services/roomService";
import RoomSplitSectionClient from "@/components/rooms/RoomSplitSectionClient";
import LeSuiteHeader from "@/components/rooms/LeSuiteHeader";
import LeSuiteBookingFooter from "@/components/rooms/LeSuiteBookingFooter";

export default async function RoomsList({ lang, data }: { lang: "en" | "it" | "de", data: any }) {
  const roomsData = await RoomService.getRooms();

  const rooms = roomsData.map((room: any) => ({
    id: room.slug,
    images: room.images,
    ...room.translations[lang]
  }));

  return (
    <section id="le-suite" className="">
      <LeSuiteHeader lang={lang} data={data} />

      {rooms.map((room: any, index: number) => (
        <RoomSplitSectionClient
          key={room.id}
          room={room}
          reverse={index % 2 !== 0}
          lang={lang}
          priority={false}
        />
      ))}

      <LeSuiteBookingFooter lang={lang} data={data} />
    </section>
  );
}
