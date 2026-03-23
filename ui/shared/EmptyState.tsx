"use client";

import { HTMLAttributes, ReactNode } from "react";
import Button from "./Button";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function EmptyState({
  title = "No data found",
  description = "There is nothing here yet. Try changing filters or creating a new item.",
  icon,
  actionLabel,
  onAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cx(
        "flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#D0D5DD] bg-[#F9FAFB] p-6 text-center",
        className
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F1EE] text-xl text-[#0B3E35]">
        {icon || <span aria-hidden="true">○</span>}
      </div>
      <h3 className="text-base font-semibold text-[#101828]">{title}</h3>
      <p className="max-w-md text-sm text-[#667085]">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
