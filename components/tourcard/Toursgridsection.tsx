import React from 'react';
import TourCard from './TourCard';
import SectionHeader from './Sectionheader';
import { Tour } from '@/types/Tour';

interface ToursGridSectionProps {
  title: string;
  tours: Tour[];
  onViewAll?: () => void;
  viewAllHref?: string; // For Server Components with Next.js Link
  isViewAllDisabled?: boolean;
  maxDisplay?: number; // Default: 4
}

/**
 * Generic tours grid section component
 * Can be used for both "Təbiət turlar" and "Aktivitilər turlar"
 */
const ToursGridSection: React.FC<ToursGridSectionProps> = ({
  title,
  tours,
  onViewAll,
  viewAllHref,
  isViewAllDisabled = false,
  maxDisplay = 4,
}) => {
  // Display only first N tours
  const displayedTours = tours.slice(0, maxDisplay);

  return (
    <section className="tours-grid-section py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader
          title={title}
          actionText="Bütün turları gör"
          onAction={onViewAll}
          actionHref={viewAllHref}
          isActionDisabled={isViewAllDisabled}
        />

        {/* Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayedTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* Empty State */}
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