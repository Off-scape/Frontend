import ToursGridSection from "@/components/tourcard/Toursgridsection";
import { mockNatureTours, mockActivityTours } from "@/data/Mocktours";

export default  function ToursSection() {
  
  return (
    <main>
      <ToursGridSection
        title="Yaxın vaxtda keçiriləcək Təbiət turlar"
        tours={mockNatureTours}
         viewAllHref="/tours"

      />

      <ToursGridSection
        title="Yaxın vaxtda keçiriləcək Aktivitilər turlar"
        tours={mockActivityTours}
         viewAllHref="/tours?type=activity"
      />
    </main>
  );
}
