import { PaymentCard } from "@/types/Payment";
import { api } from "./api";

export const CreditCardsService = {
  getCards() {
    return api.get("/api/creditCards");
  },

  createCard(data: PaymentCard) {
    return api.post("/api/creditCards", data);
  },

  deleteCard(id: string) {
    return api.delete(`/api/creditCards/${id}`);
  },

  setDefaultCard(id: string) {
    return api.patch(`/api/creditCards/${id}/default`);
  },

  getInvoices() {
    return api.get("/api/creditCards/invoices");
  },

  downloadInvoice(id: string) {
    return api.get(`/api/creditCards/invoices/${id}/download`, {
      responseType: "blob",
    });
  },
};