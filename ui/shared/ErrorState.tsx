"use client";

import { HTMLAttributes } from "react";
import Button from "./Button";

export interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  retryLabel = "Try again",
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cx(
        "flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-[#FEE4E2] bg-[#FEF3F2] p-6 text-center",
        className,
      )}
      role="alert"
      {...props}
    >
      <span className="text-2xl text-[#B42318]" aria-hidden="true">
        !
      </span>
      <h3 className="text-base font-semibold text-[#912018]">{title}</h3>
      <p className="max-w-md text-sm text-[#B42318]">{message}</p>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
