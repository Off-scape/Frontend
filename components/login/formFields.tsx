"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { GoogleIcon, EyeOpenIcon, EyeCloseIcon } from "../../icons/authIcon";

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
  const [focus, setFocus] = useState(false);

  return (
    <div className="w-full max-w-[416px]">
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={(e) => {
          setFocus(false);
          register?.onBlur(e);
        }}
        className="block w-full h-[46px] rounded-full px-5 bg-white text-gray-900 text-[14px] outline-none"
        style={{
          border: error
            ? "2px solid #e53e3e"
            : focus
              ? "2px solid #0B3E35"
              : "2px solid rgba(255,255,255,0.5)",
        }}
      />

      <p className="text-[12px] h-[18px] mt-1 pl-4 text-red-300">
        {error?.message}
      </p>
    </div>
  );
}

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
  const [focus, setFocus] = useState(false);

  return (
    <div className="w-full max-w-[416px]">
      <div className="relative">
        <input
          {...register}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={(e) => {
            setFocus(false);
            register?.onBlur(e);
          }}
          className="block w-full h-[46px] rounded-full px-5 pr-12 bg-white text-gray-900 text-[14px] outline-none"
          style={{
            border: error
              ? "2px solid #e53e3e"
              : focus
                ? "2px solid #0B3E35"
                : "2px solid rgba(255,255,255,0.5)",
          }}
        />

        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          {show ? <EyeCloseIcon /> : <EyeOpenIcon />}
        </button>
      </div>

      <p className="text-[12px] h-[18px] mt-1 pl-4 text-red-300">
        {error?.message}
      </p>
    </div>
  );
}

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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="w-full max-w-[416px] h-[46px] rounded-full bg-white text-[#0B3E35] font-bold text-[14px]"
    >
      {isLoading ? "Yüklənir..." : children}
    </motion.button>
  );
}

export function GoogleBtn() {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="w-full max-w-[416px] h-[46px] rounded-full bg-white text-gray-800 font-bold text-[14px] flex items-center justify-center gap-2"
    >
      <GoogleIcon /> Google ilə daxil olun
    </motion.button>
  );
}

export function OrDivider() {
  return (
    <div className="flex items-center gap-3 w-full max-w-[416px] my-4">
      <span className="flex-1 h-px bg-white/30" />
      <span className="text-[13px] text-white/60">Və ya</span>
      <span className="flex-1 h-px bg-white/30" />
    </div>
  );
}
