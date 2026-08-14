"use client";

import Link from "next/link";
import { categories } from "@/data/Categories";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function CategoriesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0F766E]">
          Kateqoriyalar
        </p>
        <h1 className="mt-3 text-3xl font-bold text-zinc-900 md:text-4xl">
          Bütün kateqoriyalar
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/kategoriyalar/${slugify(category.title)}`}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#0F766E] hover:shadow-md"
          >
            <div className="text-lg font-semibold text-zinc-900">
              {category.title}
            </div>
            <div className="mt-3 text-sm text-[#0F766E]">
              Kateqoriya səhifəsini aç
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
