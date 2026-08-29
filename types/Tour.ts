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
  createdAt: string;
};

export type ToursResponse = ITours[];




export type Activity = {
  id: number;
  name: string;
  slug: string;
};

// export type Region = {
//   id: number;
//   name: string;
//   slug: string;
// };

// export type Category = {
//   id: number;
//   name: string;
//   slug: string;
// };

export type TourDetail = {
  id: number;
  userId: number;
  regionId: number;
  categoryId: number | null;
  title: string;
  slug: string;
  description: string;
  duration: number;
  maxSeats: number;
  isFeatured: boolean;
  youtubeUrl: string | null;
  operator: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  category_id: number | null;
  region_id: number;
  user_id: number;

  Region: Region;
  Category: Category | null;
  activities: Activity[];
};