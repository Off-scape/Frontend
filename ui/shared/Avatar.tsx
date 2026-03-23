"use client";

import Image from "next/image";
import { HTMLAttributes, useMemo, useState } from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  rounded?: boolean;
  fallback?: string;
}

const sizeClassMap: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const sizePxMap: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getInitials(name?: string) {
  if (!name) {
    return "?";
  }

  const words = name.trim().split(/\s+/).slice(0, 2);
  return words.map((word) => word.charAt(0).toUpperCase()).join("");
}

export default function Avatar({
  src,
  alt,
  name,
  size = "md",
  rounded = true,
  fallback,
  className,
  ...props
}: AvatarProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const shouldShowImage = Boolean(src) && !hasImageError;
  const initials = useMemo(
    () => fallback || getInitials(name),
    [fallback, name],
  );

  return (
    <div
      className={cx(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-[#003BFF] font-semibold text-white",
        // rounded ? "rounded-full" :
        "rounded-lg",
        sizeClassMap[size],
        className,
      )}
      {...props}
    >
      {shouldShowImage ? (
        <Image
          src={src as string}
          alt={alt || name || "Avatar"}
          width={sizePxMap[size]}
          height={sizePxMap[size]}
          className="h-full w-full object-cover"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </div>
  );
}
