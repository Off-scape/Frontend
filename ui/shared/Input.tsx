"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    error,
    helperText,
    className,
    leftIcon,
    rightIcon,
    containerClassName,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasError = Boolean(error);
  const helperId = `${inputId}-helper`;

  return (
    <div className={cx("w-full", containerClassName)}>
      {label && (
        <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-[#0B3E35]">
          {label}
        </label>
      )}

      <div
        className={cx(
          "flex h-10 w-full items-center rounded-lg border bg-white px-3 transition-colors duration-200 focus-within:ring-2",
          hasError
            ? "border-[#B42318] focus-within:ring-[#B42318]/30"
            : "border-[#D0D5DD] focus-within:border-[#0B3E35] focus-within:ring-[#0B3E35]/20"
        )}
      >
        {leftIcon && <span className="mr-2 text-[#667085]">{leftIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={cx(
            "h-full w-full border-none bg-transparent text-sm text-[#101828] outline-none placeholder:text-[#98A2B3]",
            className
          )}
          aria-invalid={hasError}
          aria-describedby={error || helperText ? helperId : undefined}
          {...props}
        />
        {rightIcon && <span className="ml-2 text-[#667085]">{rightIcon}</span>}
      </div>

      {(error || helperText) && (
        <p
          id={helperId}
          className={cx("mt-1 text-xs", hasError ? "text-[#B42318]" : "text-[#667085]")}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

export default Input;
