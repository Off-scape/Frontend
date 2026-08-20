




// export interface Region {
//   id: number;
//   name: string;
//   slug: string;
// }

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
}

// export type TourFilter = {
//   id: number;
//   name: string;
//   value: string;
//   icon: string;
// };



interface IRegion {
  id: number;
  name: string;
  slug: string;
}

interface IActivity {
  id: number;
  name: string;
  slug: string;
}

 export interface ITours {
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
  Region: IRegion;
  Category: null;
  activities: IActivity[];
}