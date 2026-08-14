"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RegionsService } from "@/services/regions.service";

type RegionItem = {
  id?: string | number;
  name?: string;
  slug?: string;
};

export default function RegionlarPage() {
  const [regions, setRegions] = useState<RegionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRegions = async () => {
      try {
        const res = await RegionsService.getAllRegions();
        const data = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
            ? res
            : [];
        setRegions(data as RegionItem[]);
      } catch {
        setRegions([]);
      } finally {
        setLoading(false);
      }
    };

    loadRegions();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0F766E]">
          Regionlar
        </p>
        <h1 className="mt-3 text-3xl font-bold text-zinc-900 md:text-4xl">
          Bütün bölgələr
        </h1>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-600">
          Regionlar yüklənir...
        </div>
      ) : regions.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-600">
          Hazırda region məlumatı yoxdur.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => {
            const slug =
              region.slug || region.name?.toLowerCase().replace(/\s+/g, "-");
            const label = region.name || "Region";

            if (!slug) return null;

            return (
              <Link
                key={region.id ?? slug}
                href={`/regionlar/${slug}`}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#0F766E] hover:shadow-md"
              >
                <div className="text-lg font-semibold text-zinc-900">
                  {label}
                </div>
                <div className="mt-3 text-sm text-[#0F766E]">Səhifəni aç</div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
