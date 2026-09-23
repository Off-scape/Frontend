import ToursGridSection from "@/components/tourcard/Toursgridsection";
import { mockNatureTours } from "@/data/Mocktours";
import { Tour } from "@/types/Tour";

interface ToursSectionProps {
  tours?: Tour[];
}

export default function ToursSection({
  tours = mockNatureTours,
}: ToursSectionProps) {
  return (
    <main>
      <ToursGridSection
        title="Yaxın vaxtda keçiriləcək turlar"
        tours={tours}
        viewAllHref="/tours"
        maxDisplay={4}
      />
    </main>
  );
}
