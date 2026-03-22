import React from 'react';
import { Instructor } from '../../types/Tour';
import { EmptyState } from '../ui/Emptystate';

interface TourInstructorProps {
  instructor?: Instructor;
}

export const TourInstructor: React.FC<TourInstructorProps> = ({ instructor }) => {
  if (!instructor) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Your Guide</h2>
        </div>
        <EmptyState
          icon={
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
          title="Guide not assigned yet"
          description="An experienced guide will be assigned to this tour before departure."
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Your Guide</h2>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={instructor.avatar}
            alt={instructor.name}
            className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-md"
          />
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg">{instructor.name}</h3>
            <p className="text-sm text-emerald-700 font-medium mt-0.5">{instructor.specialization}</p>

            <div className="flex items-center gap-1.5 mt-2">
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">{instructor.experience} experience</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600 leading-relaxed">{instructor.bio}</p>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors">
            View Profile
          </button>
          <button className="flex-1 py-2.5 text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};