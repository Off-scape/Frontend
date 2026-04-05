import { useState } from "react";
import { Field } from "./Field";
import { ActionRow } from "./Actionrow";
import { EyeIcon, EyeOffIcon } from "@/icons/ProfileIcons";
import { FieldErrors, Gender, UserProfile } from "@/types/Profile";
import { validations } from "@/utils/validation";

const PLACEHOLDER_PASSWORD = "**********";

function validate(
  email: string,
  password: string,
  gender: Gender,
): FieldErrors {
  const errors: FieldErrors = {};
  const emailRules = validations.email();
  const passwordRules = validations.password();

  if (!email.trim()) {
    errors.email = emailRules.required as string;
  } else if (
    emailRules.pattern &&
    !(emailRules.pattern as { value: RegExp }).value.test(email)
  ) {
    errors.email = (emailRules.pattern as { message: string }).message;
  }

  if (!password.trim() || password === PLACEHOLDER_PASSWORD) {
    errors.password = passwordRules.required as string;
  } else if (
    passwordRules.minLength &&
    password.length < (passwordRules.minLength as { value: number }).value
  ) {
    errors.password = (passwordRules.minLength as { message: string }).message;
  } else if (
    passwordRules.pattern &&
    !(passwordRules.pattern as { value: RegExp }).value.test(password)
  ) {
    errors.password = (passwordRules.pattern as { message: string }).message;
  }

  if (!gender) errors.gender = "Cins seçilməlidir";

  return errors;
}

interface AccountInfoCardProps {
  user: UserProfile;
  onToast: (msg: string, type?: "success" | "error") => void;
}

export function AccountInfoCard({ user, onToast }: AccountInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(PLACEHOLDER_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState<Gender>(user.gender);

  const handleSave = async () => {
    const validationErrors = validate(email, password, gender);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setIsEditing(false);
      onToast("Hesab məlumatları saxlanıldı");
    } catch {
      onToast("Xəta baş verdi", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEmail(user.email);
    setPassword(PLACEHOLDER_PASSWORD);
    setGender(user.gender);
    setErrors({});
    setIsEditing(false);
  };

  const clearError = (field: keyof FieldErrors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mx-3 mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
        <Field
          label="E-poçt"
          required
          error={errors.email}
          value={email}
          onChange={(v) => {
            setEmail(v);
            clearError("email");
          }}
          readOnly={!isEditing}
          placeholder="example@mail.com"
          type="email"
        />

        <PasswordField
          value={password}
          error={errors.password}
          readOnly={!isEditing}
          showPassword={showPassword}
          onToggleShow={() => setShowPassword((s) => !s)}
          onChange={(v) => {
            setPassword(v);
            clearError("password");
          }}
          onFocus={() => {
            if (isEditing && password === PLACEHOLDER_PASSWORD) setPassword("");
          }}
        />
      </div>

      <GenderSelector
        value={gender}
        error={errors.gender}
        disabled={!isEditing}
        onChange={(g) => {
          setGender(g);
          clearError("gender");
        }}
      />

      <ActionRow
        isEditing={isEditing}
        isSaving={isSaving}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}

interface PasswordFieldProps {
  value: string;
  error?: string;
  readOnly: boolean;
  showPassword: boolean;
  onToggleShow: () => void;
  onChange: (v: string) => void;
  onFocus: () => void;
}

function PasswordField({
  value,
  error,
  readOnly,
  showPassword,
  onToggleShow,
  onChange,
  onFocus,
}: PasswordFieldProps) {
  return (
    <div>
      <p className="text-xs font-semibold text-[#828282] mb-1.5 uppercase tracking-wide">
        Şifrə
      </p>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          className={`w-full border rounded-lg px-4 py-2.5 pr-11 text-sm outline-none transition-all text-[#828282]
            ${
              error
                ? "border-[#FF0004] bg-red-50 text-[#FF0004] focus:ring-1 focus:ring-[#FF0004]/30"
                : readOnly
                  ? "border-gray-200 bg-white cursor-default"
                  : "border-gray-300 bg-white focus:border-[#0B3E35] focus:ring-1 focus:ring-[#0B3E35]/20"
            }`}
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#828282] hover:text-[#0B3E35] transition-colors"
          aria-label={showPassword ? "Gizlət" : "Göstər"}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-[#FF0004]">{error}</p>}
    </div>
  );
}

interface GenderSelectorProps {
  value: Gender;
  error?: string;
  disabled: boolean;
  onChange: (g: Gender) => void;
}

function GenderSelector({
  value,
  error,
  disabled,
  onChange,
}: GenderSelectorProps) {
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold text-[#828282] mb-2.5 uppercase tracking-wide">
        Cins
      </p>
      <div className="flex flex-wrap gap-3">
        {(["male", "female"] as Gender[]).map((g) => (
          <button
            key={g}
            type="button"
            disabled={disabled}
            onClick={() => onChange(g)}
            className={`flex items-center gap-2.5 px-9 py-2 sm:px-9 sm:py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150
              ${value === g ? "bg-[#0B3E35] text-white border-[#0B3E35]" : "bg-white text-[#828282] border-gray-200"}
              ${disabled ? "cursor-default" : "cursor-pointer active:scale-[.97]"}`}
          >
            <span
              className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 ${value === g ? "border-white" : "border-[#828282]"}`}
            >
              {value === g && (
                <span className="w-2 h-2 rounded-full bg-white" />
              )}
            </span>
            {g === "male" ? "Kişi" : "Qadın"}
          </button>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-[#FF0004]">{error}</p>}
    </div>
  );
}
