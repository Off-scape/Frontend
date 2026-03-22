// ─── Sub-types ────────────────────────────────────────────────────────────────

export interface Participant {
  id: string;
  avatar: string;
  name: string;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  experience: string;
  specialization: string;
}

export interface ItineraryItem {
  id: string;
  day?: number;
  title: string;
  description: string;
  time?: string;
  location?: string;
}

export interface TourDate {
  id: string;
  date: string; // ISO date string e.g. "2025-07-15"
  availableSpots: number;
  totalSpots: number;
}

export interface TourTag {
  id: string;
  label: string;
  color?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string; // ISO date string
}

// ─── Core Tour type ───────────────────────────────────────────────────────────
//
// Design rationale:
//   • Fields needed on EVERY card (list view) are required.
//   • Fields only rendered on the detail page are optional — they are absent
//     in list-only payloads and present (or lazily fetched) on detail payloads.
//   • `image` (single, for card thumbnail) is separate from `images` (gallery).
//     The API can return both; the card uses `image`, the detail page uses
//     `images`. When only `image` is provided, the detail gallery falls back
//     to [image].
//
// Switching from mock to real API:
//   List endpoint   → GET /api/tours       returns Tour[]  (detail fields absent)
//   Detail endpoint → GET /api/tours/:id   returns Tour    (all fields present)
//   No component changes needed — each component guards optional fields itself.

export interface Tour {
  // ── Identity ─────────────────────────────────────────────────────────────────
  id: string;
  type: 'nature' | 'activity'; // used for category filtering / tabs

  // ── Card-list fields (always present) ────────────────────────────────────────
  image: string;            // thumbnail used on list cards
  price: number;
  currency: string;         // e.g. "AZN"
  date: string;             // human-readable display date e.g. "29 Noy 2025"
  time: string;             // departure / start time e.g. "08:00"
  activity: string;         // short title shown on card e.g. "Şuşa Kampı"
  organizer: string;
  location: string;
  participantCount: number;  // total registered participants
  participants: Participant[]; // avatar strip (typically first 4)

  // ── Admin / visibility ────────────────────────────────────────────────────────
  isVisible?: boolean;      // admin panel toggle; default true

  // ── Detail-page fields (optional — present in full payload) ──────────────────
  title?: string;           // long-form title for detail page heading
  description: string;
  duration?: string;        // e.g. "3 days / 2 nights"
  rating?: number;          // 0–5
  reviewCount?: number;
  images?: string[];        // gallery; falls back to [image] if absent
  tags?: TourTag[];
  highlights?: string[];
  requirements?: string[];
  difficulty?: 'easy' | 'moderate' | 'hard' | 'expert';
  maxGroupSize?: number;
  dates?: TourDate[];       // structured date/availability for booking UI
  instructor?: Instructor;
  itinerary?: ItineraryItem[];
  reviews?: Review[];
}