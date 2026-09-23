"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/heroSection";
import Community from "@/components/landingpage/Community";
import Landscape from "@/components/landingpage/Landscape";
import MoreInfo from "@/components/landingpage/MoreInfo";
import PopularCategories from "@/components/landingpage/PopularCategories";
import Question from "@/components/landingpage/Question";
import TourGuides from "@/components/landingpage/TourGuides";
import WhyChooseUs from "@/components/landingpage/WhyChooseUs";
import ToursSection from "@/components/tourcard/ToursSection";
import { categories as defaultCategories } from "@/data/Categories";
import { HomeService } from "@/services/home.service";
import type { Tour } from "@/types/Tour";

const normalizeList = (value: unknown): unknown[] => {
  if (Array.isArray(value)) return value;
  if (Array.isArray((value as { data?: unknown })?.data)) {
    return (value as { data: unknown[] }).data;
  }
  return [];
};

export default function Home() {
  const [homeData, setHomeData] = useState<Record<string, unknown> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await HomeService.getHomeData();
        setHomeData(res?.data ?? res ?? null);
      } catch {
        setHomeData(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const upcomingTours = normalizeList(homeData?.upcomingTours ?? []) as Tour[];
  const guides = normalizeList(homeData?.guides ?? []) as Record<
    string,
    unknown
  >[];

  const mappedCategories = defaultCategories.map((category) => ({
    id: category.id,
    title: category.title,
    name: category.title,
    slug: category.title.toLowerCase().replace(/\s+/g, "-"),
    icon: category.icon,
    borderColor: category.borderColor,
    bottomGradient: category.bottomGradient,
  }));

  const mappedGuides = guides.length
    ? guides.map((guide) => {
        const guideItem = guide as Record<string, unknown>;
        const safeId =
          typeof guideItem.id === "string" || typeof guideItem.id === "number"
            ? guideItem.id
            : undefined;

        return {
          id: safeId,
          name: typeof guideItem.name === "string" ? guideItem.name : undefined,
          role: typeof guideItem.role === "string" ? guideItem.role : undefined,
          description:
            typeof guideItem.description === "string"
              ? guideItem.description
              : `Guide məlumatı: ${typeof guideItem.name === "string" ? guideItem.name : "Guide"}`,
          image:
            typeof guideItem.image === "string"
              ? guideItem.image
              : "/Ellipse 8 (1).png",
          rating: typeof guideItem.rating === "number" ? guideItem.rating : 5,
          toursIcon: "⭐",
          tours: typeof guideItem.tours === "string" ? guideItem.tours : "Live",
          jobIcon: "🧭",
          job: typeof guideItem.role === "string" ? guideItem.role : "Guide",
        };
      })
    : undefined;

  return (
    <div className="bg-zinc-50 font-sans dark:bg-white">
      <HeroSection />
      <div className="mx-auto max-w-7xl">
        {!loading && upcomingTours.length > 0 ? (
          <ToursSection tours={upcomingTours} />
        ) : (
          <ToursSection />
        )}
        <PopularCategories categories={mappedCategories} />
        {!loading && mappedGuides && mappedGuides.length > 0 ? (
          <TourGuides guidesData={mappedGuides} />
        ) : (
          <TourGuides />
        )}
        <WhyChooseUs />
        <MoreInfo />
        <Community />
        <Question />
        <Landscape />
      </div>
    </div>
  );
}
