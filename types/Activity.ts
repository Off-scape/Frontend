export interface Activity {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  bonus: string;
  organizer: string;
  participants: number;
  price: string;
  date: string;
  type: string;
  isLiked: boolean;
  isJoined: boolean;
  createdAt: string;
}

export type ActivityTab = "liked" | "joined";

export interface ILikedActivity {
  id: number;
  title: string;
  slug: string;
  is_featured: boolean;
  region_id: number;
  liked_at: string; // ISO date string
  activity_type: "liked" | string; // You can make this more specific if you have other types
  image_url: string;
  price: number;
  participant_count: number;
}

export interface IJoinedActivity {
  id: number;
  title: string;
  slug: string;
  is_featured: boolean;
  region_id: number;
  booking_id: number;
  booking_status: number; // Could be enum if you have status codes
  seats: number;
  total_price: number;
  joined_at: string; // ISO date string
  activity_type: "joined" | string; // Union type for known values
  image_url: string;
  participant_count: number;
}

type ActivityArray = IJoinedActivity[];

export interface ActivityContextValue {
  activities: ILikedActivity[] | IJoinedActivity[];
  loading: boolean;
  error: string | null;
  updatingIds: Set<string>;
  toggleLike: (id: string) => Promise<void>;
  toggleJoin: (id: string) => Promise<void>;
}