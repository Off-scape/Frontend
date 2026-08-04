"use client";

import { useEffect, useState } from "react";
import { HomeService } from "@/services/home.service";
import ToursGridSection from "@/components/tourcard/Toursgridsection";
import TourGuides from "@/components/landingpage/TourGuides";

const normalizeList = (value: unknown): any[] => {
  if (Array.isArray(value)) return value;
  if (Array.isArray((value as { data?: unknown })?.data)) {
    return (value as { data: any[] }).data;
  }
  return [];
};

export default function HomePage() {
  const [homeData, setHomeData] = useState<any>(null);
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

  const upcomingTours = normalizeList(homeData?.upcomingTours ?? []);
  const guides = normalizeList(homeData?.guides ?? []);
  const summary = homeData?.summary ?? {};

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-zinc-600">
        Home data yüklənir...
      </div>
    );
  }

  if (!homeData) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-red-600">
        Home məlumatı alınmadı.
      </div>
    );
  }

  return (
    <main className="space-y-12">
      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0F766E]">
            Home
          </p>
          <h1 className="mt-3 text-3xl font-bold text-zinc-900 md:text-5xl">
            Ana səhifə
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-600">
            Home endpointindən alınan real məlumat əsasında komponentlərə uyğun
            layout qurulur.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Tours</p>
            <h3 className="mt-2 text-3xl font-bold text-zinc-900">
              {summary?.toursCount ?? upcomingTours.length}
            </h3>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Regions</p>
            <h3 className="mt-2 text-3xl font-bold text-zinc-900">
              {summary?.regionsCount ?? 0}
            </h3>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Activities</p>
            <h3 className="mt-2 text-3xl font-bold text-zinc-900">
              {summary?.activitiesCount ?? 0}
            </h3>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Subscribers</p>
            <h3 className="mt-2 text-3xl font-bold text-zinc-900">
              {summary?.subscribersCount ?? 0}
            </h3>
          </div>
        </div>
      </section>

      <ToursGridSection
        title="Yaxın vaxtda keçiriləcək turlar"
        tours={upcomingTours}
        viewAllHref="/tours"
        maxDisplay={4}
      />

      <TourGuides
        guidesData={guides.map((guide: any) => ({
          id: guide.id,
          name: guide.name,
          role: guide.role,
          description: `Guide məlumatı: ${guide.name}`,
          image: guide.image || "/Ellipse 8 (1).png",
          rating: 5,
          toursIcon: "⭐",
          tours: "Live",
          jobIcon: "🧭",
          job: guide.role || "Guide",
        }))}
      />
    </main>
  );
}
