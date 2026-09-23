const TOKEN_KEY = "token";

const isBrowser = () => typeof window !== "undefined";

export function getToken(): string | null {
  if (!isBrowser()) return null;
  return (
    localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY)
  );
}

/**
 * remember = true  -> localStorage  (brauzer bağlansa da qalır)
 * remember = false -> sessionStorage (tab bağlananda silinir)
 */
export function setToken(token: string, remember: boolean) {
  if (!isBrowser()) return;
  clearToken();
  (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (!isBrowser()) return;
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}