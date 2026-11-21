/** Accept only same-site absolute paths and avoid redirecting back to login. */
export function safeNext(value: string | null | undefined): string | null {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return null;
  }

  try {
    const parsed = new URL(value, "https://offscape.invalid");
    if (parsed.origin !== "https://offscape.invalid" || parsed.pathname === "/admin/login") {
      return null;
    }
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return null;
  }
}
