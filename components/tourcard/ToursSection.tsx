import ToursGridSection from "@/components/tourcard/Toursgridsection";
import { mockNatureTours } from "@/data/Mocktours";
import { ITour } from "@/types/Tour";


interface ToursSectionProps {
  tours?: ITour[];
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
