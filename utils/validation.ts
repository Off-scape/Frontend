import { RegisterOptions, FieldValues, Path } from "react-hook-form";

const REGEXES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  onlyLetters: /^[a-zA-ZəƏıİöÖüÜğĞşŞçÇ\s\-']+$/,
  phone: /^\+994\d{9}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

export const EMAIL_REGEX = REGEXES.email;

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

  phone: <T extends FieldValues>(): RegisterOptions<T, Path<T>> => ({
    required: "Mobil nömrə tələb olunur",
    pattern: {
      value: REGEXES.phone,
      message: "Nömrə formatı yanlışdır (+994xxxxxxxxx)",
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
      message:
        "Böyük hərf, kiçik hərf, rəqəm və xüsusi simvol daxil edilməlidir",
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
