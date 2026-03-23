"use client";

import { HTMLAttributes, useState } from "react";

export interface RatingStarsProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
  onRatingChange?: (value: number) => void;
  showValue?: boolean;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const sizeMap = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
};

export default function RatingStars({
  value = 0,
  max = 5,
  size = "md",
  readOnly = true,
  onRatingChange,
  className,
  showValue = false,
  ...props
}: RatingStarsProps) {
  const safeMax = Math.max(1, max);
  const safeValue = clamp(value, 0, safeMax);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const activeValue = hoveredValue ?? safeValue;

  return (
    <div
      className={cx("inline-flex items-center gap-2", className)}
      role={readOnly ? "img" : "radiogroup"}
      aria-label={`Rating: ${safeValue} out of ${safeMax}`}
      {...props}
    >
      <div className="inline-flex items-center">
        {Array.from({ length: safeMax }).map((_, index) => {
          const starValue = index + 1;
          const isActive = activeValue >= starValue;

          return (
            <button
              key={starValue}
              type="button"
              role={readOnly ? undefined : "radio"}
              aria-checked={readOnly ? undefined : safeValue === starValue}
              aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
              disabled={readOnly}
              className={cx(
                "leading-none transition-transform duration-150",
                sizeMap[size],
                isActive ? "text-[#F59E0B]" : "text-[#D0D5DD]",
                !readOnly && "hover:scale-110",
              )}
              onMouseEnter={() => !readOnly && setHoveredValue(starValue)}
              onMouseLeave={() => !readOnly && setHoveredValue(null)}
              onClick={() => {
                if (!readOnly && onRatingChange) {
                  onRatingChange(starValue);
                }
              }}
            >
              ★
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className="text-sm text-[#344054]">{safeValue.toFixed(1)}</span>
      )}
    </div>
  );
}
