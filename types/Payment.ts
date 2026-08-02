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
  card_type: string; 
  expiry_month: string;
  expiry_year: string;
}