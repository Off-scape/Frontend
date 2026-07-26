import { api } from "./api";
export const BooksService = {
    getAllBooks({data}: any) {
        return api.post("/api/bookings", data);
    }
}