"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ChipVariant = "filled" | "outlined";

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  variant?: ChipVariant;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  onRemove?: () => void;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Chip({
  children,
  className,
  selected = false,
  variant = "filled",
  leadingIcon,
  trailingIcon,
  onRemove,
  type = "button",
  ...props
}: ChipProps) {
  const base = "inline-flex h-8 items-center gap-1 rounded-full px-3 text-sm font-medium transition-colors";
  const filled = selected
    ? "bg-[#0B3E35] text-white"
    : "bg-[#E7F1EE] text-[#0B3E35] hover:bg-[#D9E9E5]";
  const outlined = selected
    ? "border border-[#0B3E35] bg-[#F2F7F6] text-[#0B3E35]"
    : "border border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB]";

  return (
    <span className="inline-flex items-center gap-1">
      <button
        type={type}
        className={cx(base, variant === "filled" ? filled : outlined, className)}
        {...props}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
      </button>

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove chip"
          className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[#667085] transition-colors hover:bg-[#F2F4F7] hover:text-[#344054]"
        >
          x
        </button>
      )}
    </span>
  );
}
