import { api } from "./api";

export const PaymentsService = {
  createPayment(bookingId: string, data: any) {
    return api.post(`/api/bookings/${bookingId}/payments`, data);
  },

  getBookingPayments(bookingId: string) {
    return api.get(`/api/bookings/${bookingId}/payments`);
  },

  getPayment(id: string) {
    return api.get(`/api/payments/${id}`);
  },

  updatePaymentStatus(id: string, data: any) {
    return api.patch(`/api/payments/${id}/status`, data);
  },
};