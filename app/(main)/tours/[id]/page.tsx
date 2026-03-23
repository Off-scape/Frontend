"use client";
import TourDetail from "@/components/tour/TourDetail";
import { allTours } from "@/data/Mocktours";
import { useParams } from "next/navigation";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const TourDetailPage = () => {
  const { id: tourId } = useParams();

  // Find the tour from mock data
  const tour = allTours.find((t) => t.id === tourId);

  if (!tour) {
    return (
      <section
        className={`bg-zinc-50 font-sans dark:bg-white pt-28 md:pt-32 ${roboto.className}`}
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-8 md:px-12 py-12">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">
            Tour not found
          </h1>
          <p className="text-gray-600">
            The tour you're looking for doesn't exist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`bg-zinc-50 font-sans dark:bg-white pt-28 md:pt-32 ${roboto.className}`}
    >
      <TourDetail tour={tour} />
    </section>
  );
};

export default TourDetailPage;
