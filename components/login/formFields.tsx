"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { GoogleIcon, EyeOpenIcon, EyeCloseIcon } from "../../icons/authIcon";

/* ── Text / Email Input ── */
export function Field({
  placeholder,
  type = "text",
  register,
  error,
}: {
  placeholder: string;
  type?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}) {
  const [f, setF] = useState(false);

  return (
    <div className="w-full max-w-[416px]">
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        onFocus={() => setF(true)}
        onBlur={(e) => {
          setF(false);
          register?.onBlur(e);
        }}
        className="block w-full h-[46px] rounded-full px-5 bg-white text-gray-900 text-[14px] outline-none placeholder:text-gray-400"
        style={{
          border: error
            ? "2px solid #e53e3e"
            : f
              ? "2px solid #0B3E35"
              : "2px solid rgba(255,255,255,0.5)",
          boxShadow: error
            ? "0 0 0 4px rgba(229,62,62,0.15)"
            : f
              ? "0 0 0 4px rgba(11,62,53,0.12)"
              : "none",
          transition: "border-color .18s, box-shadow .18s",
        }}
      />
      {error && (
        <p className="text-[12px] mt-1.5 pl-4" style={{ color: "#fca5a5" }}>
          {error.message}
        </p>
      )}
    </div>
  );
}

/* ── Password Input ── */
export function PassField({
  placeholder,
  register,
  error,
}: {
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}) {
  const [show, setShow] = useState(false);
  const [f, setF] = useState(false);

  return (
    <div className="w-full max-w-[416px]">
      <div className="relative">
        <input
          {...register}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          onFocus={() => setF(true)}
          onBlur={(e) => {
            setF(false);
            register?.onBlur(e);
          }}
          className="block w-full h-[46px] rounded-full px-5 pr-12 bg-white text-gray-900 text-[14px] outline-none placeholder:text-gray-400"
          style={{
            border: error
              ? "2px solid #e53e3e"
              : f
                ? "2px solid #0B3E35"
                : "2px solid rgba(255,255,255,0.5)",
            boxShadow: error
              ? "0 0 0 4px rgba(229,62,62,0.15)"
              : f
                ? "0 0 0 4px rgba(11,62,53,0.12)"
                : "none",
            transition: "border-color .18s, box-shadow .18s",
          }}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-0 p-0 cursor-pointer flex items-center"
          style={{ color: "rgba(100,100,100,0.7)" }}
        >
          {show ? <EyeCloseIcon /> : <EyeOpenIcon />}
        </button>
      </div>
      {error && (
        <p className="text-[12px] mt-1.5 pl-4" style={{ color: "#fca5a5" }}>
          {error.message}
        </p>
      )}
    </div>
  );
}

/* ── Primary Button ── */
export function PrimaryBtn({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <motion.button
      type="submit"
      disabled={isLoading}
      whileHover={!isLoading ? { scale: 1.02, backgroundColor: "#f0f0f0" } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
      className="w-full max-w-[416px] h-[46px] rounded-full bg-white border-0 text-[#0B3E35] font-bold text-[14px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-[#0B3E35]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
            />
          </svg>
          Yüklənir...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}

/* ── Google Button ── */
export function GoogleBtn() {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02, backgroundColor: "#f5f5f5" }}
      whileTap={{ scale: 0.98 }}
      className="w-full max-w-[416px] h-[46px] rounded-full bg-white border-0 text-gray-800 font-bold text-[14px] cursor-pointer flex items-center justify-center gap-3 mb-2.5"
    >
      <GoogleIcon /> Google ilə daxil olun
    </motion.button>
  );
}

/* ── Divider ── */
export function OrDivider() {
  return (
    <div className="flex items-center gap-3 w-full max-w-[416px] mb-3">
      <span
        className="flex-1 h-px"
        style={{ background: "rgba(255,255,255,0.25)" }}
      />
      <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>
        Və ya
      </span>
      <span
        className="flex-1 h-px"
        style={{ background: "rgba(255,255,255,0.25)" }}
      />
    </div>
  );
}
