import { api } from "./api";

export type PaymentStatus = 1 | 2 | 3 | 4;

export type CreatePaymentInput = {
  gateway: string;
  gatewayRef?: string;
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  1: "Gözləyir",
  2: "Uğursuz",
  3: "Uğurlu",
  4: "Geri qaytarılıb",
};

export const PaymentsService = {
  createPayment(bookingId: string, data: CreatePaymentInput) {
    return api.post(`/api/bookings/${bookingId}/payments`, data);
  },

  getBookingPayments(bookingId: string) {
    return api.get(`/api/bookings/${bookingId}/payments`);
  },

  getPayment(id: string) {
    return api.get(`/api/payments/${id}`);
  },
};
