import React, { useState } from 'react';
import { ItineraryItem } from '../../types/Tour';
import { EmptyState } from '../ui/Emptystate';

interface TourItineraryProps {
  itinerary?: ItineraryItem[];
}

export const TourItinerary: React.FC<TourItineraryProps> = ({ itinerary }) => {
  const [openId, setOpenId] = useState<string | null>(itinerary?.[0]?.id ?? null);

  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Program / Itinerary</h2>
        </div>
        <EmptyState
          icon={
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
          title="No itinerary available yet"
          description="The tour operator hasn't added the day-by-day program yet. Check back soon."
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Program / Itinerary</h2>
        <p className="text-sm text-gray-500 mt-1">{itinerary.length} days</p>
      </div>

      <div className="divide-y divide-gray-50">
        {itinerary.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="transition-colors">
              <button
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                {/* Day badge */}
                {item.day && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-700 text-white text-sm font-bold flex items-center justify-center">
                    {item.day}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  {item.location && (
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {item.location}
                    </p>
                  )}
                </div>
                {item.time && (
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg flex-shrink-0">
                    {item.time}
                  </span>
                )}
                <svg
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 ml-14">
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};