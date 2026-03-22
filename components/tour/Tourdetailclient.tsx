/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Tour } from "@/types/Tour";
import { TourReviews } from "./Tourreviews";
import { Navbar } from "./layout/Navbar";

interface Props {
  tour: Tour;
  displayTitle: string;
  galleryImages: string[];
  initialDateId?: string;
}

export function TourDetailClient({
  tour,
  displayTitle,
  galleryImages,
  initialDateId,
}: Props) {
  const [selectedDateId, setSelectedDateId] = useState<string | undefined>(
    initialDateId,
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div
        className="max-w-auto mx-auto"
        style={{
          padding: "clamp(20px, 4vw, 64px) clamp(16px, 5vw, 48px)",
        }}
      >
        {/* ── Başlıq ── */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h1
            className="font-bold text-gray-900"
            style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}
          >
            {displayTitle}
          </h1>
          {tour.description && (
            <p
              className="text-gray-500 mt-1"
              style={{ fontSize: "clamp(12px, 1.2vw, 14px)" }}
            >
              {tour.description.split(".")[0]}.
            </p>
          )}
        </div>

        {/* ── İki sütun grid ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_360px]"
          style={{ gap: "clamp(24px, 4vw, 40px)" }}
        >
          {/* ══ SOL ══ */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(20px, 3vw, 32px)",
            }}
          >
            {/* Hero şəkil */}
            <div
              className="rounded-2xl overflow-hidden bg-gray-100"
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src={galleryImages[0]}
                alt={displayTitle}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tarix chipləri */}
            {tour.dates && tour.dates.length > 0 && (
              <div
                className="flex flex-wrap"
                style={{ gap: "clamp(8px, 1.5vw, 12px)" }}
              >
                {tour.dates
                  .filter((d) => d.availableSpots > 0)
                  .slice(0, 4)
                  .map((d) => {
                    const [, month, day] = d.date.split("-");
                    const MONTHS = [
                      "",
                      "Yanvar",
                      "Fevral",
                      "Mart",
                      "Aprel",
                      "May",
                      "İyun",
                      "İyul",
                      "Avqust",
                      "Sentyabr",
                      "Oktyabr",
                      "Noyabr",
                      "Dekabr",
                    ];
                    const label = `${parseInt(day)}  ${MONTHS[parseInt(month)].slice(0, 6)}`;
                    const isSelected = d.id === selectedDateId;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDateId(d.id)}
                        className={[
                          "rounded-full font-medium border-2 transition-all",
                          isSelected
                            ? "border-gray-900 text-gray-900 bg-white font-semibold"
                            : "border-gray-300 text-gray-600 hover:border-gray-500",
                        ].join(" ")}
                        style={{
                          padding: "clamp(6px, 1vw, 10px) clamp(14px, 2vw, 24px)",
                          fontSize: "clamp(12px, 1.1vw, 14px)",
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
              </div>
            )}

            {/* Təsvir */}
            <Section title="Təsvir:">
              {tour.description && (
                <>
                  <p
                    className="font-semibold text-gray-800 mb-3"
                    style={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}
                  >
                    {tour.description}
                  </p>
                  <p
                    className="text-gray-600 leading-relaxed"
                    style={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}
                  >
                    Hiking sadəcə yürüş deyil — bu, təbiətlə birbaşa təmas
                    qurmaq, gündəlik ritmdən uzaqlaşıb anı hiss etməkdir.{" "}
                    <strong>{displayTitle.split(" ")[0]}</strong>-in saf
                    havasında keçirilən yürüşlər həm bədəni canlandırır, həm də
                    zehni rahatlıq qazandırır. Dağ cığırları boyunca paylaşılan
                    anlar, panoramik mənzərələr və zirvəyə çatdıqda duyulan
                    sakitlik bu təcrübəni yadda qalan edir.
                  </p>
                </>
              )}
            </Section>

            {/* Marşrut və proqram */}
            <Section title="Marşrut və proqram:">
              <p
                className="text-gray-600 mb-5 leading-relaxed"
                style={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}
              >
                Hiking fəaliyyətimiz{" "}
                <strong>{displayTitle.split(" ")[0]}</strong> ərazisində
                seçilmiş təbii marşrutlar üzrə təşkil olunur. Təhlükəsiz və
                rahat yürüş yolu, düzgün planlaşdırılmış fasilələr və peşəkar
                rəhbərlik təmin edilir. Proqram çərçivəsində yüngül və orta
                səviyyəli yürüşlər, istirahət dayanacaqları və birgə aktivliklər
                yer alır. Təcrübə həm yeni başlayanlar, həm də hiking
                həvəskarları üçün uyğundur.
              </p>
              {tour.itinerary &&
                tour.itinerary.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start py-3 border-b border-gray-100 last:border-0"
                    style={{ gap: "clamp(8px, 1.5vw, 12px)" }}
                  >
                    <div
                      className="rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        width: "clamp(22px, 2.5vw, 28px)",
                        height: "clamp(22px, 2.5vw, 28px)",
                        fontSize: "clamp(10px, 1vw, 12px)",
                      }}
                    >
                      {item.day}
                    </div>
                    <div>
                      <p
                        className="font-semibold text-gray-800"
                        style={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}
                      >
                        {item.title}
                      </p>
                      <p
                        className="text-gray-500 mt-0.5 leading-relaxed"
                        style={{ fontSize: "clamp(11px, 1vw, 14px)" }}
                      >
                        {item.description}
                      </p>
                      {item.location && (
                        <p
                          className="text-emerald-700 mt-1"
                          style={{ fontSize: "clamp(10px, 0.9vw, 12px)" }}
                        >
                          📍 {item.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </Section>

            {/* Qiymət daxildir */}
            {tour.highlights && tour.highlights.length > 0 && (
              <Section title="✅  Qiymət daxildir:">
                <div
                  className="grid grid-cols-1 sm:grid-cols-2"
                  style={{
                    columnGap: "clamp(16px, 3vw, 32px)",
                    rowGap: "clamp(8px, 1.5vw, 12px)",
                  }}
                >
                  {tour.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center text-gray-700"
                      style={{
                        gap: "clamp(6px, 1vw, 8px)",
                        fontSize: "clamp(12px, 1.1vw, 14px)",
                      }}
                    >
                      <span style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}>
                        {HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]}
                      </span>
                      {h}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Ələqə */}
            <Section title="📞  Ələqə:">
              <p
                className="text-gray-600"
                style={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}
              >
                Özəl tur və əlavə suallar üçün bizimlə WhatsApp vasitəsilə əlaqə
                saxlayın:{" "}
                <span className="font-semibold text-gray-800">
                  xxx-xxx-xx-xx
                </span>
              </p>
            </Section>

            {/* Ləğv Qaydası */}
            <Section title="Ləğv Qaydası:">
              <p
                className="text-gray-600 leading-relaxed"
                style={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}
              >
                Xidmətin baş tutulmasına 72 saat və ya daha çox müddət qaldıqda
                bilet geri qaytarılarsa və ya dəyişdirilərsə bilet dəyərinin
                20%-i tutulur. Xidmətin baş tutmasına 72 saat və ya daha az
                müddət qaldıqda bilet geri qaytarılmir və dəyişdirilmir.
              </p>
            </Section>

            {/* Rəylər */}
            <TourReviews
              reviews={tour.reviews}
              rating={tour.rating ?? 0}
              reviewCount={tour.reviewCount ?? 0}
            />
          </div>

          {/* ══ SAĞ ══ */}
          <div>
            <div
              className="lg:sticky lg:top-6"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(12px, 2vw, 16px)",
              }}
            >
              {/* ── Əsas kart ── */}
              <div
                className="border border-gray-200 rounded-2xl"
                style={{
                  padding: "clamp(14px, 2vw, 20px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(12px, 1.5vw, 16px)",
                }}
              >
                {/* Ulduz + ürək */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <svg
                      style={{
                        width: "clamp(16px, 1.5vw, 20px)",
                        height: "clamp(16px, 1.5vw, 20px)",
                      }}
                      className="text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span
                      className="font-bold text-gray-900"
                      style={{ fontSize: "clamp(13px, 1.2vw, 16px)" }}
                    >
                      {(tour.rating ?? 5).toFixed(1)}
                    </span>
                    <span
                      className="text-blue-600 font-medium"
                      style={{ fontSize: "clamp(11px, 1vw, 14px)" }}
                    >
                      ({tour.reviewCount ?? 0} reviwes)
                    </span>
                  </div>
                  <button className="text-gray-300 hover:text-red-400 transition-colors">
                    <svg
                      style={{
                        width: "clamp(18px, 1.8vw, 24px)",
                        height: "clamp(18px, 1.8vw, 24px)",
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Başlıq + məkan */}
                <div>
                  <h2
                    className="font-bold text-gray-900 leading-snug mb-1"
                    style={{ fontSize: "clamp(14px, 1.4vw, 18px)" }}
                  >
                    {displayTitle}
                  </h2>
                  <p
                    className="text-gray-400"
                    style={{ fontSize: "clamp(11px, 1vw, 14px)" }}
                  >
                    Bakı, Şuşa
                  </p>
                </div>

                {/* Bilet al düyməsi */}
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
                  style={{
                    padding: "clamp(10px, 1.2vw, 14px) 0",
                    fontSize: "clamp(13px, 1.2vw, 16px)",
                  }}
                >
                  Bilet al
                </button>

                {/* Birbaşa Təsdiq */}
                <div
                  className="flex items-center py-2"
                  style={{ gap: "clamp(8px, 1.2vw, 12px)" }}
                >
                  <div
                    className="rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0"
                    style={{
                      width: "clamp(32px, 2.5vw, 36px)",
                      height: "clamp(32px, 2.5vw, 36px)",
                    }}
                  >
                    <svg
                      style={{
                        width: "clamp(16px, 1.4vw, 20px)",
                        height: "clamp(16px, 1.4vw, 20px)",
                      }}
                      className="text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="font-semibold text-gray-800"
                      style={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}
                    >
                      Birbaşa Təsdiq
                    </p>
                    <p
                      className="text-gray-400"
                      style={{ fontSize: "clamp(10px, 0.9vw, 12px)" }}
                    >
                      Rezervasiyanız birbaşa təsdiqlanacaq
                    </p>
                  </div>
                </div>

                {/* Məkan */}
                <div
                  className="flex items-center pt-1 border-t border-gray-100"
                  style={{ gap: "clamp(8px, 1.2vw, 12px)" }}
                >
                  <div
                    className="rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0"
                    style={{
                      width: "clamp(32px, 2.5vw, 36px)",
                      height: "clamp(32px, 2.5vw, 36px)",
                    }}
                  >
                    <svg
                      style={{
                        width: "clamp(16px, 1.4vw, 20px)",
                        height: "clamp(16px, 1.4vw, 20px)",
                      }}
                      className="text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="font-semibold text-gray-800"
                      style={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}
                    >
                      Baku
                    </p>
                    <p
                      className="text-gray-400"
                      style={{ fontSize: "clamp(10px, 0.9vw, 12px)" }}
                    >
                      Baku – Şuşa
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Xəritə ── */}
              <div
                className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-100 relative"
                style={{ height: "clamp(140px, 15vw, 192px)" }}
              >
                <img
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=40.4093,49.8671&zoom=13&size=400x200&markers=color:red%7C40.4093,49.8671`}
                  alt="xəritə"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = "none";
                    t.parentElement!.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96873!2d49.8671!3d40.4093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6c3f921de821!2sBaku%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
                  }}
                />
              </div>

              {/* ── Təlimçilər ── */}
              <div
                className="border border-gray-200 rounded-2xl"
                style={{ padding: "clamp(14px, 2vw, 20px)" }}
              >
                <h3
                  className="font-bold text-gray-900 mb-1"
                  style={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}
                >
                  Təlimçilər
                </h3>
                <p
                  className="text-gray-500 leading-relaxed"
                  style={{
                    fontSize: "clamp(11px, 1vw, 12px)",
                    marginBottom: "clamp(12px, 2vw, 20px)",
                  }}
                >
                  Təcrübəli yoga və psixoloji təlimçilərlə təbiətdə bədən və
                  ruhunuzu rahatlayın, enerji dolu seanslarda yeni bacarıqlar
                  kəşf edin.
                </p>
                <div
                  className="grid grid-cols-2"
                  style={{ gap: "clamp(10px, 1.5vw, 16px)" }}
                >
                  {MOCK_INSTRUCTORS.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center"
                      style={{ gap: "clamp(6px, 1vw, 12px)" }}
                    >
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="rounded-full object-cover flex-shrink-0"
                        style={{
                          width: "clamp(36px, 3.5vw, 48px)",
                          height: "clamp(36px, 3.5vw, 48px)",
                        }}
                      />
                      <div className="min-w-0">
                        <p
                          className="font-semibold text-gray-800 truncate"
                          style={{ fontSize: "clamp(10px, 1vw, 12px)" }}
                        >
                          {p.role}
                        </p>
                        <p
                          className="text-gray-400 truncate"
                          style={{ fontSize: "clamp(10px, 0.9vw, 12px)" }}
                        >
                          {p.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ── */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        className="font-bold text-gray-900 mb-3"
        style={{ fontSize: "clamp(14px, 1.4vw, 18px)" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

const HIGHLIGHT_ICONS = ["🌲", "🎸", "🎨", "☕", "📸", "🔥", "🌊", "🏕"];

// TODO: backend-dən instructors[] gələcək — bu mock data silinəcək
const MOCK_INSTRUCTORS = [
  {
    id: "i1",
    name: "Robert De Niro",
    role: "Kamp Mütəxəsisi",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
  },
  {
    id: "i2",
    name: "Meryl Streep",
    role: "Psixoloq",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
  },
  {
    id: "i3",
    name: "Jan Reno",
    role: "Yoga təlimçisi",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80",
  },
  {
    id: "i4",
    name: "Anna Karenina",
    role: "Psixoloq",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80",
  },
];