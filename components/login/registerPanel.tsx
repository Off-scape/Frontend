"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Field,
  PassField,
  PrimaryBtn,
  GoogleBtn,
  OrDivider,
} from "./formFields";
import { validations } from "../../utils/validation";

type RegisterInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPanel({ onSwitch }: { onSwitch: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInputs>({ mode: "onTouched" });

  const password = watch("password");

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    setIsLoading(true);
    try {
      console.log("Register data:", data);
      // await registerUser(data);
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
        Qeydiyyatdan keç
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col"
        noValidate
      >
        <div className="flex flex-col gap-3 mb-3">
          <Field
            placeholder="Ad"
            register={register("firstName", validations.firstName())}
            error={errors.firstName}
          />

          <Field
            placeholder="Soyad"
            register={register("lastName", validations.lastName())}
            error={errors.lastName}
          />

          <Field
            placeholder="E-poçt"
            type="email"
            register={register("email", validations.email())}
            error={errors.email}
          />

          <PassField
            placeholder="Şifrə"
            register={register("password", validations.password())}
            error={errors.password}
          />

          <PassField
            placeholder="Şifrəni təkrarlayın"
            register={register(
              "confirmPassword",
              validations.confirmPassword(password),
            )}
            error={errors.confirmPassword}
          />
        </div>

        <div className="max-w-[416px] mt-2 mb-5">
          <OrDivider />
          <GoogleBtn />
          <PrimaryBtn isLoading={isLoading}>Qeydiyyatdan keç</PrimaryBtn>
        </div>
      </form>

      <p
        className="text-[13px] max-w-[416px]"
        style={{ color: "rgba(255,255,255,0.65)" }}
      >
        Artıq hesabınız var?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-white font-extrabold underline underline-offset-2 bg-transparent border-0 cursor-pointer p-0 text-[13px]"
        >
          Daxil ol
        </button>
      </p>
    </div>
  );
}
