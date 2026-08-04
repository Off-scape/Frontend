"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { HomeService } from "@/services/home.service";
import { PaymentsService } from "@/services/payments.service";
import { RegionsService } from "@/services/regions.service";
import { ReviewsService } from "@/services/reviews.services";
import { SubscriberService } from "@/services/subscriber.service";

const toArray = (value: unknown): any[] => {
  if (Array.isArray(value)) return value;
  if (Array.isArray((value as { data?: unknown })?.data)) {
    return (value as { data: unknown[] }).data;
  }
  if (Array.isArray((value as { results?: unknown })?.results)) {
    return (value as { results: unknown[] }).results;
  }
  if (Array.isArray((value as { items?: unknown })?.items)) {
    return (value as { items: unknown[] }).items;
  }
  return [];
};

const slugify = (value?: string) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const matchesRegion = (tour: any, regionName: string, regionSlug: string) => {
  const candidates = [
    tour?.region,
    tour?.regionName,
    tour?.city,
    tour?.cityName,
    tour?.region_name,
    tour?.city_name,
    tour?.region?.name,
    tour?.region?.slug,
    tour?.city?.name,
    tour?.city?.slug,
    tour?.regionId,
    tour?.cityId,
    tour?.region_id,
    tour?.city_id,
  ];

  const normalized = candidates
    .map((value) => {
      if (typeof value === "string") return value;
      if (value && typeof value === "object") {
        return String(
          (value as { name?: string; slug?: string }).name ??
            (value as { slug?: string }).slug ??
            "",
        );
      }
      return String(value ?? "");
    })
    .filter(Boolean)
    .map((value) => slugify(value));

  return (
    normalized.includes(slugify(regionSlug)) ||
    normalized.includes(slugify(regionName))
  );
};

export function useRegionPageData(slug: string) {
  const [region, setRegion] = useState<any>(null);
  const [tours, setTours] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [homeData, setHomeData] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!slug) {
        setRegion(null);
        setTours([]);
        setReviews([]);
        setSubscribers([]);
        setHomeData(null);
        setPayments([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const [regionRes, homeRes, subscriberRes, toursRes] =
          await Promise.allSettled([
            RegionsService.getRegionBySlug(slug),
            HomeService.getHomeData(),
            SubscriberService.getSubscribers(),
            api.get("/api/tours"),
          ]);

        const regionData =
          regionRes.status === "fulfilled"
            ? (regionRes.value?.data ?? regionRes.value ?? null)
            : null;

        const homePayload =
          homeRes.status === "fulfilled"
            ? (homeRes.value?.data ?? homeRes.value ?? null)
            : null;

        const subscriberPayload =
          subscriberRes.status === "fulfilled"
            ? (subscriberRes.value?.data ?? subscriberRes.value ?? [])
            : [];

        const toursPayload =
          toursRes.status === "fulfilled"
            ? (toursRes.value?.data ?? toursRes.value ?? [])
            : [];

        const cleanedTours = toArray(toursPayload);
        const relevantTours = cleanedTours.filter((tour) =>
          matchesRegion(tour, regionData?.name ?? "", slug),
        );

        const reviewsByTour = await Promise.allSettled(
          relevantTours.map(async (tour) => {
            const tourId = tour?.id ?? tour?._id ?? tour?.tourId;
            if (!tourId) return [];

            try {
              const res = await ReviewsService.getReview(String(tourId));
              return toArray(res?.data ?? res);
            } catch {
              return [];
            }
          }),
        );

        const reviewItems = reviewsByTour.flatMap((result) =>
          result.status === "fulfilled" ? result.value : [],
        );

        let paymentItems: any[] = [];
        const paymentCandidate =
          (homePayload as any)?.payments ??
          (homePayload as any)?.payment ??
          (regionData as any)?.payments ??
          (regionData as any)?.payment ??
          [];

        paymentItems = toArray(paymentCandidate);

        if (!paymentItems.length) {
          try {
            const fallback = await PaymentsService.getBookingPayments(
              String(regionData?.id ?? slug),
            );
            paymentItems = toArray(fallback?.data ?? fallback);
          } catch {
            paymentItems = [];
          }
        }

        if (!isMounted) return;

        setRegion(regionData ?? null);
        setTours(relevantTours);
        setReviews(reviewItems);
        setSubscribers(toArray(subscriberPayload));
        setHomeData(homePayload ?? null);
        setPayments(paymentItems);
      } catch {
        if (isMounted) {
          setRegion(null);
          setTours([]);
          setReviews([]);
          setSubscribers([]);
          setHomeData(null);
          setPayments([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return {
    region,
    tours,
    reviews,
    subscribers,
    homeData,
    payments,
    loading,
  };
}
