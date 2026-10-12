import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  "https://backend-production-4afd.up.railway.app";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // HttpOnly cookie-ni brauzer avtomatik göndərir/qəbul edir
});

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
