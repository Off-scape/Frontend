import { AlertIcon, CheckIcon } from "@/icons/ProfileIcons";

interface ToastProps {
  msg: string;
  type: "success" | "error";
}

export function Toast({ msg, type }: ToastProps) {
  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg text-white text-sm font-medium
        ${type === "success" ? "bg-[#0B3E35]" : "bg-[#FF0004]"}`}
    >
      {type === "success" ? <CheckIcon /> : <AlertIcon />}
      {msg}
    </div>
  );
}
