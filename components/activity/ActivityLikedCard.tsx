"use client";

import React from "react";
import Image from "next/image";
import ParticipantAvatars from "@/components/tourcard/Participantavatars";
import { useRouter } from "next/navigation";


export interface CardProps {
  data: any;
}

const ActivityLikedCard: React.FC<CardProps> = ({ data }) => {
  const image = data.image ?? "/default-tour.png";
  const price = data.price ?? 0;
  const date = data.date ?? "-";
  const time = data.time ?? "";
  const activity = data.activity ?? "Tour";
  const organizer = data.organizer ?? "OffSpace";
  const participantCount = data.participantCount ?? 0;
  const participants = data.participants ?? [];
  const router = useRouter();
  console.log("ActivityLikedCard data:", data); // Debugging line to check the data being passed
  return (
    <div
      onClick={() => router.push(`tours/${data.id}`)}
      className="tour-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      {/* Image: fixed 48/52 height preserved, full width on all screens */}
      <div className="relative w-full h-48 md:h-52">
        <Image
          src={image}
          alt={activity}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3 bg-yellow-400 text-black font-semibold px-3 py-1.5 rounded-full text-sm">
          {price} AZN
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 mb-2">
          <span className="font-roboto text-[#000000] text-sm">
            Tarix və saat:
          </span>{" "}
          {date} {time}
        </p>

        <h3 className="font-roboto text-[#000000] text-sm mb-2 line-clamp-2">
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

export default ActivityLikedCard;
