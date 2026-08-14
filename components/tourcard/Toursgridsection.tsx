import React from "react";
import SectionHeader from "./Sectionheader";
import { ITour, Tour } from "@/types/Tour";
import Card from "@/ui/card";

interface ToursGridSectionProps {
  title: string;
  tours: ITour[];
  onViewAll?: () => void;
  viewAllHref?: string;
  isViewAllDisabled?: boolean;
  maxDisplay?: number;
}

const ToursGridSection: React.FC<ToursGridSectionProps> = ({
  title,
  tours,
  onViewAll,
  viewAllHref,
  isViewAllDisabled = false,
  maxDisplay = 4,
}) => {
  const displayedTours = tours.slice(0, maxDisplay);

  return (
    <section className="tours-grid-section py-8 md:py-12">
      <div className="container mx-auto px-4">
        <SectionHeader
          title={title}
          actionText="Bütün turları gör"
          onAction={onViewAll}
          actionHref={viewAllHref}
          isActionDisabled={isViewAllDisabled}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayedTours.map((tour) => (
            <Card key={tour.id} data={tour} />
          ))}
        </div>

        {displayedTours.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Hazırda heç bir tur yoxdur</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ToursGridSection;
