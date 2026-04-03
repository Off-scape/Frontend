"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import ReviewsSection from "@/components/tour/ReviewsSection";
import { Tour } from "@/types/Tour";
import Avatar from "@/ui/shared/Avatar";
import RatingStars from "@/ui/shared/RatingStars";
import { ratingSummary } from "@/data/Reviews";
import { FiHeart, FiMapPin, FiPhoneCall } from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";
import { LuCircleCheckBig } from "react-icons/lu";
import {
  includedItems,
  instructorRoles,
  tourDescription,
  tourRoute,
  tourContact,
  tourCancellationPolicy,
  tourSubtitle,
  instructorsDescription,
  scheduleExtraDates,
} from "@/data/TourDetailData";

interface TourDetailProps {
  tour: Tour;
}

const TourDetail = ({ tour }: TourDetailProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(tour.date);
  const scheduleOptions = useMemo(
    () => [tour.date, ...scheduleExtraDates],
    [tour.date],
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-8 md:px-12">
      <header className="border-b border-zinc-300 pb-4">
        <h1 className="text-2xl font-bold text-zinc-900 md:text-4xl">
          {tour.activity}
        </h1>
        <p className="mt-2 text-sm text-zinc-600 md:text-base">
          {tourSubtitle}
        </p>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_330px]">
        {/* MAIN CONTENT */}
        <div className="xl:col-start-1 xl:row-start-1">
          <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-90 md:h-110">
            <Image
              src={tour.image}
              alt={tour.activity}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 860px"
              className="object-cover"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {scheduleOptions.map((date) => {
              const isSelected = selectedDate === date;
              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`min-w-28 rounded-xl border px-5 py-2 text-sm font-medium transition ${
                    isSelected
                      ? "border-[#0F766E] bg-[#E7F6F3] text-[#0F766E]"
                      : "border-zinc-300 text-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  {date}
                </button>
              );
            })}
          </div>

          <div className="mt-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">Təsvir:</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-700 md:text-base">
                {tourDescription}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                Marşrut və proqram:
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-700 md:text-base">
                {tourRoute}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                Qiymətə daxildir:
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {includedItems.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <LuCircleCheckBig className="mt-0.5 size-5 shrink-0 text-green-600" />
                    <p className="text-sm text-zinc-700 md:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-900">Əlaqə:</h2>
              <p className="mt-3 flex items-center gap-2 text-sm text-zinc-700 md:text-base">
                <FiPhoneCall className="size-4 text-rose-500" />
                Özəl tur və əlavə suallar üçün bizimlə WhatsApp vasitəsilə əlaqə
                saxlayın: {tourContact}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                Ləğv Qaydası:
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-700 md:text-base">
                {tourCancellationPolicy}
              </p>
            </div>
          </div>

          <ReviewsSection />
        </div>

        {/* ASIDE */}
        <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start xl:col-start-2 xl:row-start-1">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                <RatingStars
                  value={ratingSummary.averageRating}
                  size="sm"
                  readOnly
                />
                <span>{ratingSummary.averageRating.toFixed(1)}</span>
                <span className="text-blue-600">
                  ({ratingSummary.totalReviews} reviews)
                </span>
              </div>
              <button
                type="button"
                aria-label="Favorilərə əlavə et"
                className="rounded-full border border-zinc-300 p-2 text-zinc-600 transition hover:bg-zinc-100"
              >
                <FiHeart className="size-4" />
              </button>
            </div>

            <h3 className="mt-4 text-3xl font-bold leading-tight text-zinc-900">
              {`"${tour.activity}" - birlikdə qrup oyunu`}
            </h3>
            <p className="mt-2 text-sm text-zinc-600">{tour.location}</p>

            <button
              type="button"
              className="mt-5 w-full rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Bilet al
            </button>

            <div className="mt-4 flex items-start gap-2 rounded-xl bg-zinc-50 p-3 text-sm text-zinc-600">
              <GoShieldCheck className="mt-0.5 size-4 shrink-0 text-zinc-500" />
              <div>
                <p className="font-semibold text-zinc-800">Birbaşa Təsdiq</p>
                <p>Rezervasiyanız birbaşa təsdiqlənəcək</p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 text-sm text-zinc-700">
              <FiMapPin className="mt-0.5 size-4 shrink-0 text-zinc-500" />
              <div>
                <p className="font-semibold text-zinc-900">{tour.location}</p>
                <p className="text-zinc-500">Bakı - {tour.location}</p>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
              <div className="relative h-48 w-full bg-[linear-gradient(135deg,#eef3f8_25%,#dde7f1_25%,#dde7f1_50%,#eef3f8_50%,#eef3f8_75%,#dde7f1_75%,#dde7f1_100%)] bg-size-[24px_24px]">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500 p-2 text-white shadow">
                  <FiMapPin className="size-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900">Təlimçilər</h3>
            <p className="mt-2 text-sm text-zinc-600">
              {instructorsDescription}
            </p>

            <div className="mt-4 space-y-4">
              {tour.participants.slice(0, 4).map((person, index) => (
                <div key={person.id} className="flex items-center gap-3">
                  <Avatar src={person.avatar} name={person.name} size="md" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {instructorRoles[index]}
                    </p>
                    <p className="text-xs text-zinc-600">{person.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default TourDetail;