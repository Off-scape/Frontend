export interface Participant {
  id: string;
  avatar: string;
  name: string;
}

export interface Tour {
  id?: string;
  image?: string;
  price?: number | string;
  date?: string;
  time?: string;
  activity?: string;
  organizer?: string;
  title?: string;
  description?: string;
  location?: string;
  participantCount?: number;
  participants?: Participant[];
  isVisible?: boolean;
  type?:
    | "nature"
    | "activity"
    | "hiking"
    | "health"
    | "social"
    | "camping"
    | "psychology";
  slug?: string;
  region?: { name?: string; slug?: string } | string;
  TourDates?: Array<{
    startDate?: string;
    endDate?: string;
    price?: number | string;
    currency?: string;
  }>;
}

export type TourFilter = {
  id: number;
  name: string;
  value: string;
  icon: string;
};





type Region = {
  id: number;
  name: string;
  slug: string;
};

type Category = {
  id: number;
  name: string;
  slug: string;
};

export type ITours = {
  id: number;
  title: string;
  slug: string;
  description: string;
  duration: number;
  maxSeats: number;
  isFeatured: boolean;
  youtubeUrl: string;
  operator: string;
  ogTitle: string;
  ogDescription: string;
  latitude: number;
  longitude: number;
  address: string;
  regionId: number;
  region: Region;
  categoryId: number;
  category: Category;
};

export type ToursResponse = ITours[];