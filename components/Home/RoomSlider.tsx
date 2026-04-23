'use client';

import { useQuery } from '@tanstack/react-query';
import CustomSlider, { SliderItem } from '../common/CustomSlider';

const defaultRooms: SliderItem[] = [
  {
    id: 1,
    image: '/assets/Stanza%201%20-%20Foto-1.jpg',
    name: 'JUNIOR SUITE',
    location: 'Bassano del Grappa',
    description:
      'A sanctuary of light and history, featuring original frescoes and bespoke Italian craftsmanship in an intimate setting.',
  },
  {
    id: 2,
    image: '/assets/Stanza%202%20-%20Foto-1.jpg',
    name: 'SUITE DELUXE',
    location: 'Bassano del Grappa',
    description:
      'Unparalleled elegance spanning historic walls, with Venetian terrazzo floors and panoramic views of the historic center.',
  },
];

export default function RoomSlider({ lang, data }: { lang: string; data?: any }) {
  const { data: rooms = defaultRooms } = useQuery<SliderItem[]>({
    queryKey: ['rooms', lang],
    queryFn: async () => {
      const response = await fetch(`/api/rooms?lang=${lang}`);
      if (!response.ok) throw new Error('Failed to fetch rooms');
      const dbRooms = await response.json();
      return dbRooms && dbRooms.length > 0 ? dbRooms : defaultRooms;
    },
  });

  return (
    <CustomSlider 
      title={data?.roomsTitle || "ROOMS"} 
      items={rooms} 
      sectionId="room-slider" 
      showBookNow={true}
      lang={lang}
    />
  );
}
