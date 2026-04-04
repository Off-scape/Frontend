export type Gender = "male" | "female";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: Gender;
  avatarUrl: string | null;
}

export interface FieldErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  password?: string;
  gender?: string;
}
