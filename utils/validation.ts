export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
import { RegisterOptions, FieldValues, Path } from "react-hook-form";

const REGEXES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  onlyLetters: /^[a-zA-ZəƏıİöÖüÜğĞşŞçÇ\s]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
};

export const validations = {
  firstName: <T extends FieldValues>(): RegisterOptions<T, Path<T>> => ({
    required: "Ad tələb olunur",
    minLength: { value: 2, message: "Ad minimum 2 simvol olmalıdır" },
    pattern: {
      value: REGEXES.onlyLetters,
      message: "Ad yalnız hərflərdən ibarət olmalıdır",
    },
  }),

  lastName: <T extends FieldValues>(): RegisterOptions<T, Path<T>> => ({
    required: "Soyad tələb olunur",
    minLength: { value: 2, message: "Soyad minimum 2 simvol olmalıdır" },
    pattern: {
      value: REGEXES.onlyLetters,
      message: "Soyad yalnız hərflərdən ibarət olmalıdır",
    },
  }),

  email: <T extends FieldValues>(): RegisterOptions<T, Path<T>> => ({
    required: "E-poçt tələb olunur",
    pattern: {
      value: REGEXES.email,
      message: "Düzgün e-poçt ünvanı daxil edin",
    },
  }),

  password: <T extends FieldValues>(): RegisterOptions<T, Path<T>> => ({
    required: "Şifrə tələb olunur",
    minLength: { value: 8, message: "Şifrə minimum 8 simvol olmalıdır" },
    pattern: {
      value: REGEXES.password,
      message: "Böyük hərf, kiçik hərf və rəqəm daxil edilməlidir",
    },
  }),

  confirmPassword: <T extends FieldValues>(
    watchedPassword: string,
  ): RegisterOptions<T, Path<T>> => ({
    required: "Şifrə təkrarı tələb olunur",
    validate: (val) =>
      val === watchedPassword || "Şifrələr bir-biri ilə uyğun gəlmir",
  }),
};
