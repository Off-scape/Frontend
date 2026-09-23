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

export interface ActivityContextValue {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  updatingIds: Set<string>;
  toggleLike: (id: string) => Promise<void>;
  toggleJoin: (id: string) => Promise<void>;
}


interface LikedTour {
  id: number;
  title: string;
  slug: string;
  is_featured: boolean;
  region_id: number;
  liked_at: string; // ISO date string
  activity_type: "liked"; // literal type since it's always "liked"
  image_url: string;
  price: number;
  participant_count: number;
}

// For a list of liked tours
 export type LikedToursList = LikedTour[];
