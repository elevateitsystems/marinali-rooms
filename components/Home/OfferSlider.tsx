'use client';

import CustomSlider, { SliderItem } from '../common/CustomSlider';
import EditableText from '../common/EditableText';

const offers: SliderItem[] = [
  {
    id: 1,
    image: '/offer-honeymoon.png',
    name: 'HONEYMOON SPECIAL',
    location: 'Marinali Rooms',
    description:
      'Celebrate your love with a romantic escape featuring champagne, floral decorations, and breathtaking sunset views…',
  },
  {
    id: 2,
    image: '/hotel-2.png',
    name: 'EARLY BIRD DEAL',
    location: 'All Locations',
    description:
      'Plan ahead and save. Book your stay 60 days in advance to enjoy exclusive rates and complementary breakfast…',
  },
  {
    id: 3,
    image: '/hotel-3.png',
    name: 'LAST MINUTE ESCAPE',
    location: 'Greece',
    description:
      'Looking for a spontaneous getaway? Grab our special last-minute rates for stays within the next 7 days…',
  },
];

export default function OfferSlider({ lang, data }: { lang: string; data?: any }) {
  return (
    <div className='mb-10'>
      <CustomSlider 
        title={<EditableText lang={lang} page="home" path="offersTitle" initialValue={data?.offersTitle || "OFFERS"} />} 
        items={offers} 
        sectionId="offer-slider" 
      />
    </div>
  );
}
