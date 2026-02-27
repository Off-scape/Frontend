export interface Participant {
  id: string;
  avatar: string;
  name: string;
}

export interface Tour {
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
  type: 'nature' | 'activity'; // To differentiate between "Təbiət" and "Aktivitilər"
}