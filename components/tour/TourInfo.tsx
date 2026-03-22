import React, { useState } from 'react';
import { Tour } from '../../types/Tour';
import { StarRating } from '../ui/StarRating';

interface TourInfoProps {
  tour: Tour;
  /** Pre-resolved title: `tour.title ?? tour.activity` — computed in the page. */
  displayTitle: string;
}

const difficultyConfig = {
  easy:    { label: 'Easy',     color: 'bg-green-100 text-green-700' },
  moderate:{ label: 'Moderate', color: 'bg-amber-100 text-amber-700' },
  hard:    { label: 'Hard',     color: 'bg-orange-100 text-orange-700' },
  expert:  { label: 'Expert',   color: 'bg-red-100 text-red-700' },
};

export const TourInfo: React.FC<TourInfoProps> = ({ tour, displayTitle }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLen = 200;
  const isLong = (tour.description?.length ?? 0) > maxLen;

  return (
    <div className="space-y-5">
      {/* Tags */}
      {(tour.tags?.length || tour.difficulty) && (
        <div className="flex flex-wrap gap-2">
          {tour.tags?.map((tag) => (
            <span key={tag.id} className="px-3 py-1 text-xs font-bold rounded-full text-white" style={{ backgroundColor: tag.color ?? '#2D6A4F' }}>
              {tag.label}
            </span>
          ))}
          {tour.difficulty && (
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${difficultyConfig[tour.difficulty].color}`}>
              {difficultyConfig[tour.difficulty].label}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-snug">{displayTitle}</h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {tour.location}
        </span>
        {tour.duration && (
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {tour.duration}
          </span>
        )}
        {(tour.maxGroupSize ?? tour.participantCount) && (
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {tour.maxGroupSize ? `Max ${tour.maxGroupSize}` : `${tour.participantCount} joined`}
          </span>
        )}
      </div>

      {/* Rating — only if present */}
      {tour.rating != null && (
        <div className="flex items-center gap-2">
          <StarRating rating={tour.rating} size="md" />
          <span className="font-bold text-gray-800">{tour.rating.toFixed(1)}</span>
          {tour.reviewCount != null && (
            <span className="text-gray-400 text-sm">({tour.reviewCount} reviews)</span>
          )}
        </div>
      )}

      {/* Description */}
      {tour.description && (
        <div>
          <p className="text-gray-600 leading-relaxed">
            {isLong && !expanded ? tour.description.slice(0, maxLen) + '…' : tour.description}
          </p>
          {isLong && (
            <button onClick={() => setExpanded(!expanded)} className="mt-1 text-emerald-700 text-sm font-semibold hover:underline">
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      )}

      {/* Highlights */}
      {tour.highlights && tour.highlights.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-800 mb-3">Highlights</h3>
          <ul className="space-y-2">
            {tour.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Requirements */}
      {tour.requirements && tour.requirements.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-800 mb-3">Requirements</h3>
          <ul className="space-y-2">
            {tour.requirements.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};