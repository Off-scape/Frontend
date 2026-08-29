"use client";
import TourDetail from "@/components/tour/TourDetail";
import { useParams } from "next/navigation";
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";
import { ToursService } from "@/services/tours.service";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const TourDetailPage = () => {
  const { id: tourId } = useParams();
  const [tourDetail, setTourDetail] = useState<any | null>(null);

  useEffect(() => {
    const handleTourDetail = async () => {
      try {
        const response = await ToursService.getTour(Number(tourId));
        setTourDetail(response.data);
      } catch (e) {
        console.error("Error fetching tour detail:", e);
      }
    };

    handleTourDetail();
  }, [tourId]);


  if (!tourDetail) {
    return (
      <section
        className={`bg-zinc-50 font-sans dark:bg-white pt-28 md:pt-32 ${roboto.className}`}
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-8 md:px-12 py-12">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">
            Tour not found
          </h1>
          <p className="text-gray-600">
            The tour you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`bg-zinc-50 font-sans dark:bg-white pt-28 md:pt-32 ${roboto.className}`}
    >
      <TourDetail tour={tourDetail} />
    </section>
  );
};

export default TourDetailPage;
