import { HTMLAttributes, ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";
type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-[#E7F1EE] text-[#0B3E35]",
  success: "bg-[#ECFDF3] text-[#067647]",
  warning: "bg-[#FFFAEB] text-[#B54708]",
  danger: "bg-[#FEF3F2] text-[#B42318]",
  info: "bg-[#EFF8FF] text-[#175CD3]",
  neutral: "bg-[#F2F4F7] text-[#344054]",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "h-5 px-2 text-xs",
  md: "h-6 px-2.5 text-sm",
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Badge({
  className,
  children,
  variant = "default",
  size = "sm",
  dot = false,
  icon,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full font-medium",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full bg-current"
          aria-hidden="true"
        />
      )}
      {icon}
      {children}
    </span>
  );
}
