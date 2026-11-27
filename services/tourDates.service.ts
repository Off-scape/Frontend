import { api } from "./api";

export interface TourDate {
  id: number;
  tourId: number;
  startDate: string;
  endDate: string;
  price: number;
  priceForChild: number;
  availableSeats: number;
  minParticipants: number;
  maxParticipants: number;
  currency: string;
  [key: string]: unknown;
}

export interface TourDateInput {
  startDate: string;
  endDate: string;
  price: number;
  priceForChild: number;
  availableSeats: number;
  minParticipants: number;
  maxParticipants: number;
  currency: string;
}

export interface TourDateDeleteResult {
  cancelledBookingsCount: number;
  refundsRequiredCount: number;
  financeReviewRequired: boolean;
}

export const TourDatesService = {
  getDates(tourId: number) {
    return api.get(`/api/tours/${tourId}/dates`);
  },

  createDate(tourId: number, data: TourDateInput) {
    return api.post(`/api/tours/${tourId}/dates`, data);
  },

  getDateById(tourId: number, id: number) {
    return api.get(`/api/tours/${tourId}/dates/${id}`);
  },

  updateDate(tourId: number, id: number, data: Partial<TourDateInput>) {
    return api.patch(`/api/tours/${tourId}/dates/${id}`, data);
  },

  deleteDate(tourId: number, id: number) {
    return api.delete<TourDateDeleteResult>(`/api/tours/${tourId}/dates/${id}`);
  },
};
