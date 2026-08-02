"use client"
import TourNavigation from "@/components/tour/TourNavigation"
import Card from "@/ui/card"
import { allTours } from "@/data/Mocktours"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CardLoading from "@/ui/card/CardLoading ";
import EmptyTours from "@/components/tour/EmptyTours";
import { Tour } from "@/types/Tour";
import { ToursService } from "@/services/tours.service";
const TourBody = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tours, setTours] = useState<Tour[]>([]);
  const searchParams = useSearchParams();
  const tourType = searchParams.get("type");

  // const filteredTours = tourType
  //   ? allTours.filter((tour) => tour.type === tourType)
  //   : allTours;

  const getTours = async () => {
    try {
      setLoading(true);

      const response = await ToursService.getAllTours();

      setTours(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    }, 0);
    getTours()
    return () => clearTimeout(timer);
  }, [tourType]);
  console.log("tours", tours)

  return (
    <div className="sm:px-8 md:px-12">
      <TourNavigation />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 ">
        {loading ? <>
          {Array.from({ length: 8 }).map((_, i) => <CardLoading key={i} />)}
        </> : tours.length > 0 ? tours.map((tour) => (
          <Card key={tour.id} data={tour} />
        )) : <EmptyTours />}
      </div>
    </div>
  )
}

export default TourBody
