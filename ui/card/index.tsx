"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ITours, Tour } from "@/types/Tour";
import ParticipantAvatars from "@/components/tourcard/Participantavatars";
import { useRouter } from "next/navigation";
import { TourImagesService } from "@/services/tourImages.service";
import { TourDatesService } from "@/services/tourDates.service";
import { formatDate } from "@/utils/formatDate";

interface CardProps {
  data: ITours | Tour;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const normalized = data as any;
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [tourDates, setTourDates] = React.useState<any[]>([]);
  const image = normalized.image || "/default-tour.png";
  const title = normalized.title || normalized.activity || "Tour";
  const price = normalized.price ?? normalized.TourDates?.[0]?.price ?? 0;
  const date = normalized.date || normalized.TourDates?.[0]?.startDate || "-";
  const time = normalized.time || "";
  const organizer =
    normalized.organizer ||
    normalized.operator ||
    normalized.region?.name ||
    "OffSpace";
  // const participantCount =
  //   normalized.participantCount ?? normalized.availableSeats ?? 0;
  const participants = normalized.participants ?? [];

  const router = useRouter();

  useEffect(() => {
    const handleTourImage = async () => {
      try {
        if (data?.id && typeof data?.id === "number") {
          const response = await TourImagesService.getImages(Number(data?.id));
          setImageUrl(response.data.data[0]?.url || null);
        }
      } catch (e) {
        console.error("Error fetching tour image:", e);
      }

    }
    const handleTourDate = async () => {
      try {
        const response = await TourDatesService.getDates(Number(data?.id));
        setTourDates(response.data.data || []);
      } catch (e) {
        console.error("Error fetching tour date:", e);
      }
    }
    handleTourImage()
    handleTourDate()
  }, [])


  return (
    <div
      onClick={() =>
        router.push(`/tours/${normalized.id ?? normalized.slug ?? ""}`)
      }
      className="group tour-card bg-white rounded-[20px] overflow-hidden cursor-pointer"
    >
      <div className="relative w-full h-48 md:h-52 rounded-[20px] overflow-hidden group-hover:h-52.5 transition-all duration-500">
        <Image
          src={imageUrl || image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <div className="absolute top-3 right-3 bg-yellow-400 text-black font-semibold px-3 py-1.5 rounded-full transition-all duration-300 group-hover:bg-yellow-200 group-hover:text-black text-sm">
          {price} AZN
        </div>
      </div>

      <div className="p-4 space-y-1 transition-transform duration-500 group-hover:translate-y-1">
        <p className="text-xs text-gray-500 mb-2">
          <span className="font-roboto text-[#000000] text-base font-bold">
            Tarix və saat:
          </span>{" "}
          <span className="font-medium text-[#6A6A6D] text-sm">
            {date} {time}   {formatDate(normalized.createdAt)}
          </span>
        </p>

        <h3 className="font-roboto mb-2 line-clamp-2">
          <span className="text-base font-bold text-[#000000]">Fəaliyyət:</span>
          <span className="font-medium text-[#6A6A6D] text-sm"> {title}</span>
        </h3>

        <p className="text-sm text-gray-600 mb-2">
          <span className="font-roboto text-[#000000] font-bold text-base">
            Təşkilatçı:
          </span>{" "}
          <span className="font-medium text-[#6A6A6D] text-sm">
            {organizer}
          </span>
        </p>

        <div className="flex items-center">
          <ParticipantAvatars
            participants={participants}
            count={tourDates.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
