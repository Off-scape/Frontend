import { useEffect, useState } from "react";
import { Field } from "./Field";
import { ActionRow } from "./Actionrow";
import { FieldErrors, Gender, ProfileUpdatePayload, UserProfile } from "@/types/Profile";
import { validations } from "@/utils/validation";
import { getErrorMessage } from "@/services/api";

function validate(fields: ProfileUpdatePayload): FieldErrors {
  const errors: FieldErrors = {};
  const phoneRules = validations.phone();

  if (fields.firstName !== undefined) {
    if (!fields.firstName.trim()) errors.firstName = "Ad boş ola bilməz";
    else if (fields.firstName.length < 2) errors.firstName = "Ad minimum 2 simvol olmalıdır";
    else if (!/^[a-zA-ZəƏıİöÖüÜğĞşŞçÇ\s\-']+$/.test(fields.firstName)) {
      errors.firstName = "Ad yalnız hərflərdən ibarət olmalıdır";
    }
  }

  if (fields.lastName !== undefined) {
    if (!fields.lastName.trim()) errors.lastName = "Soyad boş ola bilməz";
    else if (fields.lastName.length < 2) errors.lastName = "Soyad minimum 2 simvol olmalıdır";
    else if (!/^[a-zA-ZəƏıİöÖüÜğĞşŞçÇ\s\-']+$/.test(fields.lastName)) {
      errors.lastName = "Soyad yalnız hərflərdən ibarət olmalıdır";
    }
  }

  if (fields.phone !== undefined && !/^\+994\d{9}$/.test(fields.phone.replace(/\s/g, ""))) {
    errors.phone = (phoneRules.pattern as { message: string }).message;
  }
  return errors;
}

interface BasicInfoCardProps {
  user: UserProfile;
  onToast: (msg: string, type?: "success" | "error") => void;
  onSave: (patch: ProfileUpdatePayload) => Promise<UserProfile>;
}

export function BasicInfoCard({ user, onToast, onSave }: BasicInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [gender, setGender] = useState<Gender>(user.gender);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhone(user.phone);
    setGender(user.gender);
  }, [user.firstName, user.lastName, user.phone, user.gender]);

  const handleSave = async () => {
    const patch: ProfileUpdatePayload = {};
    if (firstName !== user.firstName) patch.firstName = firstName.trim();
    if (lastName !== user.lastName) patch.lastName = lastName.trim();
    if (phone !== user.phone) patch.phone = phone.replace(/\s/g, "");
    if (gender !== user.gender) patch.gender = gender;

    if (Object.keys(patch).length === 0) {
      setIsEditing(false);
      return;
    }

    const validationErrors = validate(patch);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSaving(true);
    try {
      await onSave(patch);
      setIsEditing(false);
      onToast("Şəxsi məlumatlar yeniləndi");
    } catch (error) {
      onToast(getErrorMessage(error), "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhone(user.phone);
    setGender(user.gender);
    setErrors({});
    setIsEditing(false);
  };

  const clearError = (field: keyof FieldErrors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mx-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-5">
        <Field label="Ad" required error={errors.firstName} value={firstName} onChange={(v) => { setFirstName(v); clearError("firstName"); }} readOnly={!isEditing} placeholder="Adınız" />
        <Field label="Soyad" required error={errors.lastName} value={lastName} onChange={(v) => { setLastName(v); clearError("lastName"); }} readOnly={!isEditing} placeholder="Soyadınız" />
        <Field label="Mobil nömrə" error={errors.phone} value={phone} onChange={(v) => { setPhone(v); clearError("phone"); }} readOnly={!isEditing} placeholder="+994xxxxxxxxx" type="tel" />
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold text-[#828282] mb-2.5 uppercase tracking-wide">Cins</p>
        <div className="flex flex-wrap gap-3">
          {(["male", "female"] as Gender[]).map((item) => (
            <button
              key={item}
              type="button"
              disabled={!isEditing || isSaving}
              onClick={() => setGender(item)}
              className={`flex items-center gap-2.5 px-9 py-2 sm:py-2.5 rounded-xl text-sm font-semibold border transition-all ${gender === item ? "bg-[#0B3E35] text-white border-[#0B3E35]" : "bg-white text-[#828282] border-gray-200"} ${!isEditing ? "cursor-default" : "cursor-pointer"}`}
            >
              {item === "male" ? "Kişi" : "Qadın"}
            </button>
          ))}
        </div>
      </div>
      <ActionRow isEditing={isEditing} isSaving={isSaving} onEdit={() => setIsEditing(true)} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}
