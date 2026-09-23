import Image from "next/image";
import { Tour } from "@/types/Tour";
import ParticipantAvatars from "@/components/tourcard/Participantavatars";

interface ActivityJoinedCardProps {
  tour: Tour;
}

const ActivityJoinedCard = ({ tour }: ActivityJoinedCardProps) => {
  const image = tour.image ?? "/default-tour.png";
  const price = tour.price ?? 0;
  const date = tour.date ?? "-";
  const time = tour.time ?? "";
  const activity = tour.activity ?? "Tour";
  const organizer = tour.organizer ?? "OffSpace";
  const participantCount = tour.participantCount ?? 0;
  const participants = tour.participants ?? [];

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex">
      {/* Image: w-28 on mobile, w-40 on sm+ */}
      <div className="relative w-28 sm:w-40 shrink-0">
        <Image
          src={image}
          alt={activity}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 112px, 160px"
        />
        <div className="absolute top-2 right-2 bg-yellow-400 text-black font-semibold px-2 py-0.5 rounded-full text-xs">
          {price} AZN
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
        <div className="space-y-1">
          <p className="text-xs text-gray-500">
            <span className="font-roboto text-[#000000]">Tarix və saat:</span>{" "}
            {date} {time}
          </p>
          <p className="text-xs text-gray-500">
            <span className="font-roboto text-[#000000]">Fəaliyyət:</span>{" "}
            {activity}
          </p>
          <p className="text-xs text-gray-500">
            <span className="font-roboto text-[#000000]">Bonus:</span> Bu turdan
            coin qazanılır
          </p>
          <p className="text-xs text-gray-500">
            <span className="font-roboto text-[#000000]">Təşkilatçı:</span>{" "}
            {organizer}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2 flex-wrap">
          <ParticipantAvatars
            participants={participants}
            count={participantCount}
          />

          <div className="flex gap-1.5 items-center flex-wrap">
            <button
              type="button"
              className="h-[24px] flex items-center justify-center px-2.5 rounded-[4px] border border-zinc-300 text-[#142A12] font-roboto font-medium text-[12px] sm:text-[14px] leading-none hover:bg-zinc-50 transition whitespace-nowrap"
            >
              Bonuslarım
            </button>
            <button
              type="button"
              className="h-[24px] flex items-center justify-center px-2.5 rounded-[4px] bg-[#0B3E35] text-white font-roboto font-medium text-[12px] sm:text-[14px] leading-none hover:bg-[#0d6560] transition whitespace-nowrap"
            >
              Rəylərim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityJoinedCard;
