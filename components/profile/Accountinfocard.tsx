import { useState } from "react";
import { Field } from "./Field";
import { EyeIcon, EyeOffIcon, SpinnerIcon } from "@/icons/ProfileIcons";
import { UserProfile } from "@/types/Profile";
import { getErrorMessage } from "@/services/api";

interface AccountInfoCardProps {
  user: UserProfile;
  onToast: (msg: string, type?: "success" | "error") => void;
  onChangePassword: (data: { currentPassword: string; newPassword: string }) => Promise<unknown>;
}

export function AccountInfoCard({ user, onToast, onChangePassword }: AccountInfoCardProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      setError("Cari və yeni şifrəni daxil edin.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Yeni şifrə ən azı 8 simvol olmalıdır.");
      return;
    }

    setError("");
    setIsSaving(true);
    try {
      await onChangePassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      onToast("Şifrə dəyişdirildi");
    } catch (requestError) {
      const message = getErrorMessage(requestError);
      const status = (requestError as { response?: { status?: number } })?.response?.status;
      setError(status === 400
        ? `${message} Cari şifrəni yoxlayıb yenidən cəhd edin.`
        : message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mx-3 mb-10">
      <Field label="E-poçt" value={user.email} onChange={() => undefined} readOnly placeholder="example@mail.com" type="email" />

      <div className="mt-6 border-t border-gray-100 pt-5">
        <h2 className="text-sm font-semibold text-[#142A12] mb-4">Şifrəni dəyiş</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
          <PasswordField label="Cari şifrə" value={currentPassword} show={showCurrentPassword} onToggle={() => setShowCurrentPassword((value) => !value)} onChange={(value) => { setCurrentPassword(value); setError(""); }} />
          <PasswordField label="Yeni şifrə" value={newPassword} show={showNewPassword} onToggle={() => setShowNewPassword((value) => !value)} onChange={(value) => { setNewPassword(value); setError(""); }} />
        </div>
        {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
        <div className="flex justify-end mt-5">
          <button
            type="button"
            onClick={handlePasswordChange}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#FF0004] text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all disabled:opacity-70 min-w-[160px] justify-center"
          >
            {isSaving ? <SpinnerIcon /> : "Şifrəni yenilə"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PasswordField({
  label,
  value,
  show,
  onToggle,
  onChange,
}: {
  label: string;
  value: string;
  show: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#828282] mb-1.5 uppercase tracking-wide">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={label === "Cari şifrə" ? "current-password" : "new-password"}
          className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 pr-11 text-sm text-[#142A12] outline-none focus:border-[#0B3E35] focus:ring-1 focus:ring-[#0B3E35]/20"
        />
        <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#828282]" aria-label={show ? "Gizlət" : "Göstər"}>
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
}
