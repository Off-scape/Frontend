




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
  id: number;
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