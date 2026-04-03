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