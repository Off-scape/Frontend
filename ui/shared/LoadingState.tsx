import { HTMLAttributes } from "react";

export interface LoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  fullWidth?: boolean;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function LoadingState({
  label = "Loading...",
  fullWidth = true,
  className,
  ...props
}: LoadingStateProps) {
  return (
    <div
      className={cx(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#D0D5DD] bg-[#FCFCFD] p-6",
        fullWidth && "w-full",
        className
      )}
      role="status"
      aria-live="polite"
      {...props}
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#0B3E35] border-t-transparent" />
      <p className="text-sm text-[#667085]">{label}</p>
    </div>
  );
}
