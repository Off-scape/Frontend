import React from 'react';
import Image from 'next/image';
import { Tour } from '@/types/Tour';
import ParticipantAvatars from './Participantavatars';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const {
    id,
    image,
    price,
    date,
    time,
    activity,
    organizer,
    location,
    participantCount,
    participants,
  } = tour;

  return (
    <div className="tour-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative w-full h-48 md:h-52">
        <Image
          src={image}
          alt={activity}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-yellow-400 text-black font-semibold px-3 py-1.5 rounded-full text-sm">
          {price} AZN
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Date and Time */}
        <p className="text-xs text-gray-500 mb-2 ">
          <span className="font-roboto text-[#000000] text-sm">Tarix və saat:</span> {date} {time}
        </p>

        {/* Activity Name */}
        <h3 className="font-roboto text-[#000000] mb-2 line-clamp-2">
          Fəaliyyət: {activity}
        </h3>

        {/* Location (if available)
        {location && (
          <p className="text-sm text-gray-600 mb-2">📍 {location}</p>
        )} */}

        {/* Organizer */}
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-roboto text-[#000000]">Təşkilatçı:</span> {organizer}
        </p>

        {/* Participants */}
        <div className="flex items-center">
          <ParticipantAvatars
            participants={participants}
            count={participantCount}
          />
        </div>
      </div>
    </div>
  );
};

export default TourCard;