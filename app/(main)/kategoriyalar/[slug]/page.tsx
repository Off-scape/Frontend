"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/data/Categories";
import { api } from "@/services/api";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const normalizeCollection = (value: unknown): unknown[] => {
  if (Array.isArray(value)) return value;
  if (Array.isArray((value as { data?: unknown })?.data))
    return (value as { data: unknown[] }).data;
  if (Array.isArray((value as { results?: unknown })?.results))
    return (value as { results: unknown[] }).results;
  if (Array.isArray((value as { tours?: unknown })?.tours))
    return (value as { tours: unknown[] }).tours;
  return [];
};

export default function CategoryDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ? String(params.slug) : "";
  const [items, setItems] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<(typeof categories)[number] | null>(
    null,
  );

  useEffect(() => {
    const currentCategory =
      categories.find((item) => slugify(item.title) === slug) ?? null;
    setCategory(currentCategory);

    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/tours");
        const allTours = normalizeCollection(res?.data ?? res);

        const filtered = allTours.filter((tour) => {
          const categoryName = String(
            tour?.categoryName ?? tour?.category ?? tour?.category_title ?? "",
          ).toLowerCase();
          const categoryId = String(
            tour?.categoryId ?? tour?.category_id ?? "",
          );

          if (!currentCategory) return false;

          return (
            categoryName.includes(currentCategory.title.toLowerCase()) ||
            categoryId === String(currentCategory.id)
          );
        });

        setItems(filtered);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      load();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [slug]);

  if (!category) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
          <h1 className="text-2xl font-bold text-red-700">
            Kateqoriya tapılmadı
          </h1>
          <p className="mt-2 text-red-600">
            Bu kateqoriya üçün səhifə mövcud deyil.
          </p>
          <Link
            href="/kategoriyalar"
            className="mt-6 inline-block rounded-xl bg-[#0F766E] px-5 py-2.5 text-white hover:bg-[#0b5d5a]"
          >
            Bütün kateqoriyalara qayıt
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0F766E]">
          Kateqoriya
        </p>
        <h1 className="mt-3 text-3xl font-bold text-zinc-900 md:text-5xl">
          {category.title}
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-600">
          Bu kateqoriya üzrə uyğun təkliflər və turlar aşağıda göstərilir.
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-zinc-600">
          Turlar yüklənir...
        </div>
      ) : items.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const itemData = item as Record<string, unknown>;
            return (
              <div
                key={String(itemData.id ?? itemData._id ?? `item-${index}`)}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-bold text-zinc-900">
                    {typeof itemData.title === "string"
                      ? itemData.title
                      : typeof itemData.name === "string"
                        ? itemData.name
                        : "Tour"}
                  </h3>
                  <span className="rounded-full bg-[#0F766E]/10 px-2.5 py-1 text-xs font-semibold text-[#0F766E]">
                    {category.title}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {typeof itemData.description === "string"
                    ? itemData.description
                    : typeof itemData.shortDescription === "string"
                      ? itemData.shortDescription
                      : "Bu kateqoriya üçün uyğun tur."}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-zinc-600">
                  <span>
                    {typeof itemData.location === "string"
                      ? itemData.location
                      : typeof itemData.region === "string"
                        ? itemData.region
                        : "Region"}
                  </span>
                  <span className="font-semibold text-zinc-900">
                    {typeof itemData.price === "number"
                      ? `${itemData.price} AZN`
                      : "Qiymət"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-zinc-600">
          Bu kateqoriya üzrə hazırda tour yoxdur.
        </div>
      )}
    </section>
  );
}
