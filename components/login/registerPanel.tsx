"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Field,
  PassField,
  PrimaryBtn,
  GoogleBtn,
  OrDivider,
} from "./formFields";
import { AuthService, extractToken } from "@/services/auth.service";
import { getErrorMessage } from "@/services/api";
import { setToken } from "@/utils/authstorage";
import { RegisterInputs } from "@/types/auth";
import { validations } from "../../utils/validation";

const REDIRECT_AFTER_REGISTER = "/dashboard";

export default function RegisterPanel({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInputs>({ mode: "onTouched" });

  const password = watch("password");

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const { data: res } = await AuthService.register({
        name: data.firstName.trim(),
        surname: data.lastName.trim(),
        email: data.email.trim(),
        password: data.password,
      });

      const token = extractToken(res);

      if (token) {
        // Backend qeydiyyatdan sonra token qaytarırsa, birbaşa daxil edirik
        setToken(token, true);
        router.push(REDIRECT_AFTER_REGISTER);
      } else {
        // Token yoxdursa, istifadəçini giriş formasına yönləndiririk
        onSwitch();
      }
    } catch (error) {
      setServerError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link
        href="/"
        className="flex items-start gap-1.5 mb-6 w-fit group"
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
      <div className="w-full flex flex-col items-center">
        <h1 className="text-white flex items-center text-3xl font-bold mb-6">
          Qeydiyyatdan keç
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 items-center w-full"
          noValidate
        >
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

          <OrDivider />

          <GoogleBtn />

          {serverError && (
            <p
              role="alert"
              className="w-full max-w-[416px] pl-4 text-[13px] text-red-300"
            >
              {serverError}
            </p>
          )}

          <PrimaryBtn isLoading={isLoading}>Qeydiyyatdan keç</PrimaryBtn>
        </form>

        <p className="text-white/70 mt-5 text-sm">
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
    </>
  );
}