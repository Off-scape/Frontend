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

export type ProfileUpdatePayload = Partial<
  Pick<UserProfile, "firstName" | "lastName" | "phone" | "gender">
>;

export interface FieldErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
  newPassword?: string;
  gender?: string;
}

type CardType = "visa" | "mastercard";
export type Card = {
  id: number;
  type: CardType;
  last4: string;
  expiry: string;
  isPrimary: boolean;
};

export type PaymentsType = {
  tur: string;
  odenis: string;
  tarix: string;
  tip: string;
  kart: string;
  faktura: string;
}
