"use client"

import React from "react";
import Image from "next/image";
import { Tour } from "@/types/Tour";
import ParticipantAvatars from "@/components/tourcard/Participantavatars";
import { useRouter } from "next/navigation";

interface CardProps {
  data: Tour;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const {
    image,
    price,
    date,
    time,
    activity,
    organizer,
    participantCount,
    participants,
  } = data;
  const router = useRouter();
  return (
    <div   onClick={()=>router.push(`tours/${data.id}`)} className="group tour-card bg-white rounded-lg overflow-hidden cursor-pointer">
      <div className="relative w-full h-48 md:h-52">
        <Image
          src={image}
          alt={activity}
          fill
          className="object-cover transition-transform duration-500 origin-bottom group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <div className="absolute top-3 right-3 bg-yellow-400 text-black font-semibold px-3 py-1.5 rounded-full transition-all duration-300 group-hover:bg-yellow-200 group-hover:text-black text-sm">
          {price} AZN
        </div>
      </div>

      <div className="p-4 space-y-1 transition-transform duration-500 group-hover:translate-y-1">
        <p className="text-xs text-gray-500 mb-2 ">
          <span className="font-roboto text-[#000000] text-sm">
            Tarix və saat:
          </span>{" "}
          {date} {time}
        </p>

        <h3 className="font-roboto text-[#000000] mb-2 line-clamp-2">
          Fəaliyyət: {activity}
        </h3>

        <p className="text-sm text-gray-600 mb-2">
          <span className="font-roboto text-[#000000]">Təşkilatçı:</span>{" "}
          {organizer}
        </p>

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

export default Card;
