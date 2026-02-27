import React from 'react';
import ToursGridSection from '@/components/tourcard/Toursgridsection';
import { mockNatureTours, mockActivityTours } from '@/data/Mocktours';

/**
 * Server Component Example
 * Shows both "Təbiət turlar" and "Aktivitilər turlar" sections
 */
export default function ToursSection() {
  return (
    <main >
      {/* Nature Tours Section */}
      <ToursGridSection
        title="Yaxın vaxtda keçiriləcək Təbiət turlar"
        tours={mockNatureTours}
        viewAllHref="/tours/nature" // Next.js Link
      />

      {/* Activity Tours Section */}
      <ToursGridSection
        title="Yaxın vaxtda keçiriləcək Aktivitilər turlar"
        tours={mockActivityTours}
        viewAllHref="/tours/activities" // Next.js Link
      />
    </main>
  );
}

/**
 * Alternative: With disabled buttons (MVP)
 * 
 * export default function ToursPage() {
 *   return (
 *     <main className="min-h-screen bg-gray-50">
 *       <ToursGridSection
 *         title="Yaxın vaxtda keçiriləcək Təbiət turlar"
 *         tours={mockNatureTours}
 *         isViewAllDisabled={true}
 *       />
 *       
 *       <ToursGridSection
 *         title="Yaxın vaxtda keçiriləcək Aktivitilər turlar"
 *         tours={mockActivityTours}
 *         isViewAllDisabled={true}
 *       />
 *     </main>
 *   );
 * }
 */