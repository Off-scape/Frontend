import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // token httpOnly cookie-dədir, JS ona toxuna bilmir
    // 401 gələndə backend cookie-ni özü etibarsız edir
    return Promise.reject(error);
  },
);
