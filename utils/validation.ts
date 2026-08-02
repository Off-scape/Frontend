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
    required: "Ad və soyad tələb olunur",
    minLength: { value: 2, message: "Ad minimum 2 simvol olmalıdır" },
    pattern: {
      value: REGEXES.onlyLetters,
      message: "Ad və soyad yalnız hərflərdən ibarət olmalıdır",
    },
  }),

  cardType: <T extends FieldValues>(): RegisterOptions<T, Path<T>> => ({
    required: "Kart tipi tələb olunur",
    validate: (value: string) =>
      ["visa", "mastercard", "other"].includes(value.toLowerCase()) ||
      'Kart tipi yalnız "visa", "mastercard" və ya "other" ola bilər',
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
  cardNumber: <T extends FieldValues>(): RegisterOptions<T, Path<T>> => ({
    required: "Kart nömrəsi tələb olunur",
    minLength: { value: 16, message: "Kart nömrəsi minimum 16 simvol olmalıdır" },
    maxLength: { value: 16, message: "Kart nömrəsi maksimum 16 simvol olmalıdır" },
  }),
expiryMonth: <
  T extends FieldValues,
  K extends Path<T>
>(): RegisterOptions<T, K> => ({
  required: "Bitmə ayı tələb olunur",
  valueAsNumber: true,
  min: {
    value: 1,
    message: "Ay 1-12 arasında olmalıdır",
  },
  max: {
    value: 12,
    message: "Ay 1-12 arasında olmalıdır",
  },
}),

expiryYear: <
  T extends FieldValues,
  K extends Path<T>
>(): RegisterOptions<T, K> => ({
  required: "Bitmə ili tələb olunur",
  valueAsNumber: true,
  min: {
    value: new Date().getFullYear(),
    message: "Keçmiş il daxil edilə bilməz",
  },
  max: {
    value: new Date().getFullYear() + 20,
    message: "Düzgün il daxil edin",
  },
}),
  cvc: <T extends FieldValues>(): RegisterOptions<T, Path<T>> => ({
    required: "CVC tələb olunur",
    minLength: { value: 3, message: "CVC minimum 3 simvol olmalıdır" },
    maxLength: { value: 3, message: "CVC maksimum 3 simvol olmalıdır" },
  }),
  lastFourDigits: <T extends FieldValues>(): RegisterOptions<T, Path<T>> => ({
    required: "Kartın son 4 rəqəmi tələb olunur",
    minLength: {
      value: 4,
      message: "Kartın son 4 rəqəmini daxil edin",
    },
    maxLength: {
      value: 4,
      message: "Yalnız 4 rəqəm daxil edə bilərsiniz",
    },
    pattern: {
      value: /^\d{4}$/,
      message: "Yalnız 4 rəqəm daxil edin",
    },
  }),

};
