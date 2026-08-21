import { useState } from "react";
import { Field } from "./Field";
import { ActionRow } from "./Actionrow";
import { FieldErrors, UserProfile } from "@/types/Profile";
import { validations } from "@/utils/validation";
import { ProfileService } from "@/services/profile.servises";

type BasicFields = Pick<UserProfile, "firstName" | "lastName" | "phone">;

function validate(fields: BasicFields): FieldErrors {
  const errors: FieldErrors = {};
  const firstNameRules = validations.firstName();
  const lastNameRules = validations.lastName();
  const phoneRules = validations.phone();

  if (!fields.firstName.trim()) {
    errors.firstName = firstNameRules.required as string;
  } else if (
    firstNameRules.minLength &&
    fields.firstName.length <
      (firstNameRules.minLength as { value: number }).value
  ) {
    errors.firstName = (
      firstNameRules.minLength as { message: string }
    ).message;
  } else if (
    firstNameRules.pattern &&
    !(firstNameRules.pattern as { value: RegExp }).value.test(fields.firstName)
  ) {
    errors.firstName = (firstNameRules.pattern as { message: string }).message;
  }

  if (!fields.lastName.trim()) {
    errors.lastName = lastNameRules.required as string;
  } else if (
    lastNameRules.minLength &&
    fields.lastName.length <
      (lastNameRules.minLength as { value: number }).value
  ) {
    errors.lastName = (lastNameRules.minLength as { message: string }).message;
  } else if (
    lastNameRules.pattern &&
    !(lastNameRules.pattern as { value: RegExp }).value.test(fields.lastName)
  ) {
    errors.lastName = (lastNameRules.pattern as { message: string }).message;
  }

  if (!fields.phone.trim()) {
    errors.phone = phoneRules.required as string;
  } else if (
    phoneRules.pattern &&
    !(phoneRules.pattern as { value: RegExp }).value.test(
      fields.phone.replace(/\s/g, ""),
    )
  ) {
    errors.phone = (phoneRules.pattern as { message: string }).message;
  }

  return errors;
}

interface BasicInfoCardProps {
  user: UserProfile;
  onToast: (msg: string, type?: "success" | "error") => void;
}

export function BasicInfoCard({ user, onToast }: BasicInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);

  const handleSave = async () => {
    const validationErrors = validate({ firstName, lastName, phone });
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSaving(true);
    try {
      await ProfileService.updateProfile({ firstName, lastName, phone });
      setIsEditing(false);
      onToast("Əsas məlumatlar saxlanıldı");
    } catch {
      onToast("Xəta baş verdi", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhone(user.phone);
    setErrors({});
    setIsEditing(false);
  };

  const clearError = (field: keyof FieldErrors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mx-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-5">
        <Field
          label="Ad"
          required
          error={errors.firstName}
          value={firstName}
          onChange={(v) => {
            setFirstName(v);
            clearError("firstName");
          }}
          readOnly={!isEditing}
          placeholder="Adınız"
        />
        <Field
          label="Soyad"
          required
          error={errors.lastName}
          value={lastName}
          onChange={(v) => {
            setLastName(v);
            clearError("lastName");
          }}
          readOnly={!isEditing}
          placeholder="Soyadınız"
        />
        <Field
          label="Mobil nömrə"
          required
          error={errors.phone}
          value={phone}
          onChange={(v) => {
            setPhone(v);
            clearError("phone");
          }}
          readOnly={!isEditing}
          placeholder="+994xxxxxxxxx"
          type="tel"
        />
      </div>
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