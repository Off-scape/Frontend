export interface IPaymentCard {
  id: number;
  userId: number;
  cardholderName: string;
  lastFourDigits: string;
  cardType: string; // or "visa" | "mastercard" | "amex" if you know the possible values
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  createdAt: string; // ISO date string
}

export interface PaymentCard {
  cardholder_name: string;
  last_four_digits: string;
  card_type: string; // or "visa" | "mastercard" | "amex"
  expiry_month: number;
  expiry_year: number;
}