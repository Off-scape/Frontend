import React from 'react';
import { TourDate } from '../../types/Tour';
import { EmptyState } from '../ui/Emptystate';

interface TourDatesProps {
  dates: TourDate[];
  selectedDateId?: string;
  onSelectDate: (id: string) => void;
}

function formatDate(iso: string): { weekday: string; day: string; month: string; year: string } {
  const d = new Date(iso);
  return {
    weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
    day: d.toLocaleDateString('en-US', { day: 'numeric' }),
    month: d.toLocaleDateString('en-US', { month: 'short' }),
    year: d.toLocaleDateString('en-US', { year: 'numeric' }),
  };
}

export const TourDates: React.FC<TourDatesProps> = ({ dates, selectedDateId, onSelectDate }) => {
  if (!dates || dates.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Available Dates</h2>
        </div>
        <EmptyState
          icon={
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          title="No dates available"
          description="There are no upcoming dates for this tour. Please contact the organizer."
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Available Dates</h2>
        <p className="text-sm text-gray-500 mt-1">Select your preferred departure date</p>
      </div>

      <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {dates.map((d) => {
          const formatted = formatDate(d.date);
          const isFull = d.availableSpots === 0;
          const isSelected = d.id === selectedDateId;
          const isAlmostFull = d.availableSpots > 0 && d.availableSpots <= 3;

          return (
            <button
              key={d.id}
              disabled={isFull}
              onClick={() => onSelectDate(d.id)}
              className={[
                'relative flex flex-col items-center rounded-xl border-2 p-3 transition-all',
                isFull
                  ? 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                  : isSelected
                  ? 'border-emerald-600 bg-emerald-50 shadow-md'
                  : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer',
              ].join(' ')}
            >
              <span className="text-xs text-gray-400 font-medium">{formatted.weekday}</span>
              <span className={`text-2xl font-black ${isSelected ? 'text-emerald-700' : 'text-gray-800'}`}>
                {formatted.day}
              </span>
              <span className={`text-xs font-semibold ${isSelected ? 'text-emerald-600' : 'text-gray-500'}`}>
                {formatted.month} {formatted.year}
              </span>

              {/* Spot info */}
              <div className="mt-2">
                {isFull ? (
                  <span className="text-xs text-red-500 font-semibold">Full</span>
                ) : isAlmostFull ? (
                  <span className="text-xs text-amber-600 font-semibold">{d.availableSpots} left!</span>
                ) : (
                  <span className="text-xs text-gray-400">{d.availableSpots} spots</span>
                )}
              </div>

              {isSelected && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};