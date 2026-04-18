'use client';

import CustomSlider, { SliderItem } from '../common/CustomSlider';

import EditableText from '../common/EditableText';

const defaultHotels: SliderItem[] = [
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

export default function HotelSlider({ lang, data }: { lang: string; data?: any }) {
  return (
    <CustomSlider 
      title={<EditableText lang={lang} page="home" path="hotelsTitle" initialValue={data?.hotelsTitle || "HOTELS"} />} 
      items={defaultHotels} 
      sectionId="hotel-slider" 
    />
  );
}
