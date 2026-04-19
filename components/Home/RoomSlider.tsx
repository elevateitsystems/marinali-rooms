'use client';

import { useQuery } from '@tanstack/react-query';
import CustomSlider, { SliderItem } from '../common/CustomSlider';
import EditableText from '../common/EditableText';

const defaultRooms: SliderItem[] = [
  {
    id: 1,
    image: '/assets/Stanza%201%20-%20Foto-1.jpg',
    name: 'MARINALI POOLSIDE',
    location: 'Bassano del Grappa',
    description:
      'Experience the height of luxury in our poolside suites, where historic architecture meets modern relaxation.',
  },
  {
    id: 2,
    image: '/assets/Stanza%202%20-%20Foto-1.jpg',
    name: 'MARINALI TERRACE',
    location: 'Bassano del Grappa',
    description:
      'Our terrace rooms offer breathtaking views of the Venetian pre-Alps and the historic city center.',
  },
  {
    id: 3,
    image: '/assets/Stanza%203%20-%20Foto-1.jpg',
    name: 'MARINALI CLIFFSIDE',
    location: 'Bassano del Grappa',
    description:
      'Immerse yourself in history with rooms that overlook the Brenta river and the iconic Ponte Vecchio.',
  },
  {
    id: 4,
    image: '/assets/Stanza%201%20-%20Foto-4.jpg',
    name: 'MARINALI SUITE',
    location: 'Bassano del Grappa',
    description:
      'The pinnacle of our palazzo, the Marinali Suite features hand-restored frescoes and bespoke Italian furniture.',
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
