import axios, { AxiosError } from "axios";
import { clearToken, getToken } from "../utils/authstorage";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://backend-production-4afd.up.railway.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearToken();
    }

    return Promise.reject(error);
  },
);

type ErrorBody = { message?: string | string[]; error?: string };

/** Axios xətasından istifadəçiyə göstəriləcək mətni çıxarır. */
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return "Server cavab vermədi. Bir az sonra yenidən cəhd edin.";
    }

    if (!error.response) {
      return "Serverə qoşulmaq mümkün olmadı. İnternet bağlantısını yoxlayın.";
    }

    const body = error.response.data as ErrorBody | undefined;
    const message = Array.isArray(body?.message)
      ? body.message[0]
      : body?.message;

    return message || body?.error || "Xəta baş verdi. Yenidən cəhd edin.";
  }

  return "Gözlənilməz xəta baş verdi.";
}