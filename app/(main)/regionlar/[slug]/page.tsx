"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useRegionPageData } from "@/hooks/useRegionPageData";

const formatValue = (value: unknown) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return `${value.length} item`;
  if (value && typeof value === "object")
    return Object.keys(value as Record<string, unknown>).length;
  return "-";
};

export default function RegionDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ? String(params.slug) : "";
  const { region, tours, reviews, subscribers, homeData, payments, loading } =
    useRegionPageData(slug);

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center text-zinc-600">
          Region məlumatı yüklənir...
        </div>
      </section>
    );
  }

  if (!region) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
          <h1 className="text-2xl font-bold text-red-700">Region tapılmadı</h1>
          <p className="mt-2 text-red-600">
            Bu şəhər/region üçün səhifə mövcud deyil.
          </p>
          <Link
            href="/regionlar"
            className="mt-6 inline-block rounded-xl bg-[#0F766E] px-5 py-2.5 text-white hover:bg-[#0b5d5a]"
          >
            Bütün regionlara qayıt
          </Link>
        </div>
      </section>
    );
  }

  const homeSummary = homeData && typeof homeData === "object" ? homeData : {};

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        {region.image ? (
          <div
            className="h-64 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${region.image})` }}
          />
        ) : (
          <div className="flex h-64 items-center justify-center bg-linear-to-r from-[#0F766E] via-[#0b5d5a] to-[#E7F6F3] text-3xl font-bold text-white">
            {region.name || "Region"}
          </div>
        )}

        <div className="p-8 md:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0F766E]">
            Region
          </p>
          <h1 className="mt-3 text-3xl font-bold text-zinc-900 md:text-5xl">
            {region.name || "Region adı"}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-700">
            {region.description ||
              `${region.name || "Bu region"} üçün tanışlıq, səyahət və fəaliyyət təklifləri hazırlanır.`}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl bg-[#0F766E] px-5 py-2.5 text-white hover:bg-[#0b5d5a]"
            >
              Ana səhifəyə qayıt
            </Link>
            <Link
              href="/regionlar"
              className="rounded-xl border border-zinc-300 px-5 py-2.5 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50"
            >
              Digər regionlar
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-zinc-500">Turlar</p>
          <h3 className="mt-2 text-3xl font-bold text-zinc-900">
            {tours.length}
          </h3>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-zinc-500">Reviews</p>
          <h3 className="mt-2 text-3xl font-bold text-zinc-900">
            {reviews.length}
          </h3>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-zinc-500">Subscribers</p>
          <h3 className="mt-2 text-3xl font-bold text-zinc-900">
            {subscribers.length}
          </h3>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-zinc-500">Payments</p>
          <h3 className="mt-2 text-3xl font-bold text-zinc-900">
            {payments.length}
          </h3>
        </div>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900">Region turları</h2>
          <div className="mt-5 space-y-4">
            {tours.length ? (
              tours.map((tour) => (
                <div
                  key={tour.id ?? tour._id ?? Math.random()}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900">
                        {tour.title || tour.name || "Tour"}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-600">
                        {tour.region || region.name}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#0F766E]/10 px-2.5 py-1 text-xs font-semibold text-[#0F766E]">
                      {tour.price ? `${tour.price} AZN` : "Pricing"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600">
                    {tour.description ||
                      tour.shortDescription ||
                      "Bu tur region üçün uyğun təklifdir."}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-zinc-500">
                Bu region üçün tour məlumatı mövcud deyil.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900">Reviews</h2>
          <div className="mt-5 space-y-4">
            {reviews.length ? (
              reviews.map((review, index) => (
                <div
                  key={
                    review.id ??
                    review._id ??
                    `${review.userId ?? "review"}-${index}`
                  }
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <strong className="text-zinc-900">
                      {review.user?.name || review.name || "User"}
                    </strong>
                    <span className="text-sm text-amber-600">
                      ⭐ {review.rating ?? 5}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {review.comment || review.review || "Müsbət rəy."}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-zinc-500">Bu region üçün review yoxdur.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900">Subscribers</h2>
          <div className="mt-5 space-y-3">
            {subscribers.length ? (
              subscribers.slice(0, 6).map((subscriber, index) => (
                <div
                  key={
                    subscriber.id ??
                    subscriber._id ??
                    `${subscriber.email ?? "subscriber"}-${index}`
                  }
                  className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2"
                >
                  <span className="text-sm text-zinc-700">
                    {subscriber.email ||
                      subscriber.name ||
                      `Subscriber ${index + 1}`}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    {subscriber.status || "active"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-zinc-500">Subscriber məlumatı yoxdur.</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900">Home</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {Object.entries(homeSummary)
              .slice(0, 6)
              .map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    {key}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-zinc-900">
                    {formatValue(value)}
                  </h3>
                </div>
              ))}
            {!Object.keys(homeSummary).length && (
              <p className="text-zinc-500">Home məlumatı yoxdur.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-zinc-900">Payments</h2>
        <div className="mt-5 space-y-3">
          {payments.length ? (
            payments.slice(0, 6).map((payment, index) => (
              <div
                key={
                  payment.id ??
                  payment._id ??
                  `${payment.bookingId ?? "payment"}-${index}`
                }
                className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3"
              >
                <div>
                  <p className="font-semibold text-zinc-900">
                    {payment.bookingId || payment.id || `Payment ${index + 1}`}
                  </p>
                  <p className="text-sm text-zinc-600">
                    {payment.status || "pending"}
                  </p>
                </div>
                <span className="text-sm font-semibold text-[#0F766E]">
                  {payment.amount ? `${payment.amount} AZN` : "-"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-zinc-500">
              Bu region üçün payment məlumatı yoxdur.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
