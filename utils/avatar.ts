export function getAvatarImageSrc(avatarPath: string | null): string | null {
  if (!avatarPath) return null;

  if (/^https?:\/\//i.test(avatarPath)) {
    const parsedUrl = new URL(avatarPath);
    if (parsedUrl.pathname.startsWith("/uploads/avatars/")) {
      return `/api/avatar?path=${encodeURIComponent(parsedUrl.pathname)}`;
    }
    return avatarPath;
  }

  const path = avatarPath.startsWith("/") ? avatarPath : `/${avatarPath}`;
  if (path.startsWith("/uploads/avatars/")) {
    return `/api/avatar?path=${encodeURIComponent(path)}`;
  }

  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
  return baseUrl ? `${baseUrl}${path}` : path;
}
