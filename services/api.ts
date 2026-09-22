import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true, // HttpOnly cookie-ni brauzer avtomatik göndərir/qəbul edir
  headers: {
    "Content-Type": "application/json",
  },
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