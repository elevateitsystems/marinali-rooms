'use client';

import { useQuery } from '@tanstack/react-query';
import CustomSlider, { SliderItem } from '../common/CustomSlider';
import EditableText from '../common/EditableText';

const defaultRooms: SliderItem[] = [
  {
    id: 1,
    image: '/hotel-1.png',
    name: 'MARINALI POOLSIDE',
    location: 'Greece',
    description:
      'Nestled along the Mediterranean coast with crystal-clear waters and warm golden sunsets, Marinali Poolside offers an unforgettable…',
  },
  {
    id: 2,
    image: '/hotel-2.png',
    name: 'MARINALI TERRACE',
    location: 'Greece',
    description:
      'Perched on sun-drenched cliffs with panoramic sea views, our elegant terrace dining invites you to savor Mediterranean…',
  },
  {
    id: 3,
    image: '/hotel-3.png',
    name: 'MARINALI CLIFFSIDE',
    location: 'Greece',
    description:
      'Tucked between the mountains and the sea on the iconic Greek coastline, Marinali Cliffside is a sanctuary…',
  },
  {
    id: 4,
    image: '/hotel-4.png',
    name: 'MARINALI SUITE',
    location: 'Greece',
    description:
      'A serene retreat blending minimalist luxury with breathtaking coastal views, each suite is thoughtfully designed for…',
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
      title={<EditableText lang={lang} page="home" path="roomsTitle" initialValue={data?.roomsTitle || "ROOMS"} />} 
      items={rooms} 
      sectionId="room-slider" 
    />
  );
}
