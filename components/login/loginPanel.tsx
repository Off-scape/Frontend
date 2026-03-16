"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Field, PassField, PrimaryBtn } from "./formFields";
import { validations } from "../../utils/validation";
import { LoginInputs } from "@/types/auth";

export default function LoginPanel({ onSwitch }: { onSwitch: () => void }) {
  const [rem, setRem] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setIsLoading(true);
    try {
      console.log("Login data:", data);
      // await loginUser(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Geri qayıt */}
      <Link
        href="/"
        className="flex items-center gap-1.5 mb-6 w-fit group"
        style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:-translate-x-0.5 transition-transform"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        <span className="text-[13px] group-hover:text-white transition-colors">
          Ana səhifəyə qayıt
        </span>
      </Link>

      <h1
        className="text-white font-extrabold tracking-tight mb-8 text-center max-w-[416px]"
        style={{ fontSize: "clamp(22px,2.4vw,30px)" }}
      >
        Daxil ol
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col"
        noValidate
      >
        <label
          className="text-[13px] mb-1.5 max-w-[416px]"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          E-poçt
        </label>
        <div className="mb-4">
          <Field
            placeholder=""
            type="email"
            register={register("email", validations.email())}
            error={errors.email}
          />
        </div>

        <label
          className="text-[13px] mb-1.5 max-w-[416px]"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          Şifrə
        </label>
        <PassField
          placeholder=""
          register={register("password", validations.password())}
          error={errors.password}
        />

        <div className="flex items-center justify-between max-w-[416px] mt-4 mb-6">
          <label
            className="flex items-center gap-2 text-[13px] cursor-pointer select-none"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            <input
              type="checkbox"
              checked={rem}
              onChange={() => setRem((v) => !v)}
              className="w-[15px] h-[15px] accent-[#4ecb80]"
            />
            Girişdə məni xatırla
          </label>
          <button
            type="button"
            className="text-[13px] bg-transparent border-0 cursor-pointer p-0"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Şifrəni unutdu?
          </button>
        </div>

        <div className="max-w-[416px]">
          <PrimaryBtn isLoading={isLoading}>Daxil ol</PrimaryBtn>
        </div>
      </form>

      <p
        className="text-[13px] mt-5 max-w-[416px]"
        style={{ color: "rgba(255,255,255,0.65)" }}
      >
        Hesabınız yoxdur?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-white font-extrabold underline underline-offset-2 bg-transparent border-0 cursor-pointer p-0 text-[13px]"
        >
          İndi qeydiyyatdan keç
        </button>
      </p>
    </div>
  );
}
