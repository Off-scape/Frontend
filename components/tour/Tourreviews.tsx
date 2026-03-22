// TODO: backend-dən reviews[], rating, reviewCount gələcək

import React from 'react';
import { Review } from '@/types/Tour';

interface Props {
  reviews?: Review[];
  rating: number;
  reviewCount: number;
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} className={`w-5 h-5 ${i <= count ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

// Avatar rəngləri — şəkil 3-dəki mavi kvadrat avatarlar
const AVATAR_COLORS = [
  'bg-blue-600',
  'bg-blue-600',
  'bg-blue-600',
  'bg-blue-600',
  'bg-blue-600',
];

// Tarix: ISO string-dən "Noyabr 28, 2025" formatı
const MONTHS = ['','Yanvar','Fevral','Mart','Aprel','May','İyun','İyul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'];
function fmtDate(iso: string) {
  const [year, month, day] = iso.split('-');
  return `${MONTHS[parseInt(month)]} ${parseInt(day)}, ${year}`;
}

export function TourReviews({ reviews, rating, reviewCount }: Props) {
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews?.filter((r) => r.rating === star).length ?? 0,
  }));

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-6">Rəylər</h2>

      {/* Xülasə: böyük rəqəm + ulduzlar | bar chart */}
      <div className="flex items-start gap-8 mb-8">
        {/* Sol: 5.0 + ulduzlar + "5 ray" */}
        <div className="flex flex-col items-center min-w-[80px]">
          <span className="text-4xl font-black text-gray-900">{rating.toFixed(1)}</span>
          <div className="flex items-center gap-0.5 mt-1">
            {[1,2,3,4,5].map((i) => (
              <svg key={i} className={`w-5 h-5 ${i <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
          <span className="text-sm text-blue-600 font-medium mt-1">{reviewCount} ray</span>
        </div>

        {/* Ayırıcı xətt */}
        <div className="w-px bg-gray-200 self-stretch" />

        {/* Sağ: bar chart */}
        <div className="flex-1 space-y-2">
          {dist.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm text-gray-500 w-14 text-right flex-shrink-0">{star} ulduz</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all"
                  style={{ width: reviewCount > 0 ? `${(count / reviewCount) * 100}%` : '0%' }}
                />
              </div>
              <span className="text-sm text-gray-400 w-4 text-right flex-shrink-0">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fərdi rəylər */}
      {!reviews?.length ? (
        <p className="text-sm text-gray-400">Hələ rəy yoxdur.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((r, idx) => (
            <div key={r.id} className="flex items-start gap-4">
              {/* Mavi kvadrat avatar — şəkil 3 */}
              <div className={`w-10 h-10 rounded-lg ${AVATAR_COLORS[idx % AVATAR_COLORS.length]} text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}>
                {r.author[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-sm font-semibold text-gray-900">{r.author}</span>
                  <span className="text-xs text-gray-400">{fmtDate(r.date)}</span>
                </div>
                <Stars count={r.rating} />
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{r.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}