'use client';

// Mock data ilə işləyir — backend yoxdur.
// Backend hazır olanda handleBook funksiyasının içini dəyiş:
//   await fetch('/api/bookings', { method: 'POST', body: JSON.stringify({...}) })

import { useState } from 'react';
import { Tour, TourDate } from '@/types/Tour';

interface TourBookingCardProps {
  tour: Tour;
  selectedDateId?: string;
  onSelectDate: (id: string) => void;
}

type BookingState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; bookingId: string; totalPrice: number }
  | { status: 'error';   message: string };

function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('az-AZ', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function TourBookingCard({ tour, selectedDateId, onSelectDate }: TourBookingCardProps) {
  const [tickets, setTickets] = useState(1);
  const [booking, setBooking] = useState<BookingState>({ status: 'idle' });

  const hasDates     = !!tour.dates?.length;
  const selectedDate = tour.dates?.find((d): d is TourDate => d.id === selectedDateId);
  const canBuy       = hasDates ? (!!selectedDate && selectedDate.availableSpots > 0) : true;
  const maxTickets   = selectedDate ? Math.min(selectedDate.availableSpots, 10) : 10;
  const totalPrice   = tour.price * tickets;
  const isPending    = booking.status === 'pending';

  // Mock booking — backend hazır olanda bu funksiyanın içini dəyiş
  const handleBook = async () => {
    if (!canBuy || isPending) return;
    setBooking({ status: 'pending' });

    // TODO: real API call
    // const res = await fetch('/api/bookings', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ tourId: tour.id, dateId: selectedDateId, tickets }),
    // });
    // const data = await res.json();
    // if (!res.ok) { setBooking({ status: 'error', message: data.message }); return; }
    // setBooking({ status: 'success', bookingId: data.bookingId, totalPrice });

    await new Promise((r) => setTimeout(r, 1200)); // mock gecikmə
    setBooking({
      status: 'success',
      bookingId: `BK-${Date.now()}`,
      totalPrice,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

      {/* Qiymət başlığı */}
      <div className="bg-gradient-to-br from-emerald-800 to-emerald-600 p-6 text-white">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-black">{tour.currency} {totalPrice.toLocaleString()}</span>
          {tickets > 1 && (
            <span className="text-emerald-200 text-sm">
              ({tour.currency} {tour.price} × {tickets})
            </span>
          )}
        </div>
        <p className="text-emerald-200 text-sm mt-1">Nəfər başına · Hamısı daxil</p>
      </div>

      <div className="p-5 space-y-4">

        {/* Tarix seçimi */}
        {hasDates && (
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Tarix seçin
            </label>
            <select
              value={selectedDateId ?? ''}
              onChange={(e) => onSelectDate(e.target.value)}
              disabled={isPending}
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
            >
              <option value="" disabled>Tarix seçin…</option>
              {tour.dates!.map((d) => (
                <option key={d.id} value={d.id} disabled={d.availableSpots === 0}>
                  {formatDateShort(d.date)}
                  {d.availableSpots === 0 ? ' — Dolu' : ` — ${d.availableSpots} yer`}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Bilet sayı */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
            Bilet sayı
          </label>
          <div className="flex items-center gap-3">
            <CounterBtn onClick={() => setTickets((t) => Math.max(1, t - 1))} disabled={tickets <= 1 || isPending} label="−" />
            <span className="w-8 text-center text-xl font-black text-gray-800">{tickets}</span>
            <CounterBtn onClick={() => setTickets((t) => Math.min(maxTickets, t + 1))} disabled={tickets >= maxTickets || isPending} label="+" />
          </div>
        </div>

        {/* CTA */}
        {booking.status === 'success' ? (
          <SuccessBanner bookingId={booking.bookingId} totalPrice={booking.totalPrice} currency={tour.currency} tickets={tickets} />
        ) : (
          <>
            <button
              onClick={handleBook}
              disabled={!canBuy || isPending}
              className={[
                'w-full py-3.5 rounded-xl font-bold text-base transition-all',
                canBuy && !isPending
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md hover:shadow-lg cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed',
              ].join(' ')}
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Təsdiq edilir…
                </span>
              ) : hasDates && !canBuy ? 'Tarix seçin'
                : 'İndi rezerv et'}
            </button>

            {booking.status === 'error' && (
              <p className="text-sm text-red-600 font-medium text-center">{booking.message}</p>
            )}
          </>
        )}

        {/* Güvən nişanları */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[
            { icon: '🔒', label: 'Təhlükəsiz ödəniş' },
            { icon: '✅', label: 'Ləğv etmək olar' },
            { icon: '📞', label: '24/7 dəstək' },
          ].map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-1 text-center">
              <span className="text-lg">{b.icon}</span>
              <span className="text-xs text-gray-400 font-medium leading-tight">{b.label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function CounterBtn({ onClick, disabled, label }: { onClick: () => void; disabled: boolean; label: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-9 h-9 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-600 text-lg font-bold hover:border-emerald-500 hover:text-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
    >
      {label}
    </button>
  );
}

function SuccessBanner({
  bookingId, totalPrice, currency, tickets,
}: { bookingId: string; totalPrice: number; currency: string; tickets: number }) {
  return (
    <div className="rounded-xl bg-emerald-50 border-2 border-emerald-300 p-4 space-y-1.5">
      <div className="flex items-center gap-2 text-emerald-700 font-bold">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        Rezervasiya təsdiqləndi!
      </div>
      <p className="text-xs text-emerald-600">
        Rezervasiya №: <span className="font-mono font-semibold">{bookingId}</span>
      </p>
      <p className="text-xs text-emerald-600">
        {tickets} bilet · {currency} {totalPrice.toLocaleString()}
      </p>
    </div>
  );
}