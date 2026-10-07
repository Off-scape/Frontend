const AVATAR_PATH_PATTERN = /^\/uploads\/avatars\/[A-Za-z0-9_-]+\.(?:jpe?g|png|webp)$/i;

export async function GET(request: Request) {
  const avatarPath = new URL(request.url).searchParams.get("path");
  if (!avatarPath || !AVATAR_PATH_PATTERN.test(avatarPath)) {
    return new Response("Invalid avatar path", { status: 400 });
  }

  const apiBaseUrl = (
    process.env.NEXT_PUBLIC_API_URL ||
    "https://backend-production-4afd.up.railway.app"
  ).replace(/\/+$/, "");

  try {
    const upstream = await fetch(`${apiBaseUrl}${avatarPath}`, {
      cache: "no-store",
    });

    if (!upstream.ok) {
      return new Response("Avatar image could not be loaded", {
        status: upstream.status,
      });
    }

    const contentType = upstream.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().startsWith("image/")) {
      return new Response("Invalid avatar response", { status: 415 });
    }

    return new Response(upstream.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Avatar image could not be loaded", { status: 502 });
  }
}
