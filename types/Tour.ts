




export interface Region {
  id: number;
  name: string;
  slug: string;
}

export interface Activity {
  id: number;
  name: string;
  slug: string;
}

export interface Tour {
  id: number ;
  userId: number;
  regionId: number;
  title: string;
  slug: string;
  description: string;
  duration: number;
  maxSeats: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  image?: string;
  // Backend-dən gələn əlavə field-lər
  region_id: number;
  user_id: number;

  Region: Region;
  activities: Activity[];
}



export interface Participant {
  id: string;
  avatar: string;
  name: string;
}

export interface ITour {
  id: string;
  image: string;
  price: number;
  date: string;
  time: string;
  activity: string;
  organizer: string;
  location?: string;
  participantCount: number;
  participants: Participant[];
  isVisible?: boolean; // Admin panel can control visibility
  type: 'nature' | 'activity' | 'hiking' | 'health' | 'social' | 'camping' | 'psychology'; // To differentiate between various tour types
}

export type TourFilter = {
  id: number;
  name: string;
  value: string;
  icon: string;
};