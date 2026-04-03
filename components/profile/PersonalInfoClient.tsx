"use client";

import { useState, useRef, useCallback } from "react";

/* ─── Design tokens ───────────────────────────────────────────────
   #0B3E35  → primary dark green  (title, active states, buttons)
   #142A12  → deeper green        (hover on green btn)
   #828282  → muted gray          (labels, placeholders, readonly text)
   #FF0004  → red accent          (error, "Yadda saxla" btn, required *)
   border   → #E5E7EB (gray-200)  (card & input borders – thin 1px)
   bg card  → #FFFFFF             white
   bg input → #FFFFFF             white (readonly: same, cursor-default)
────────────────────────────────────────────────────────────────── */

type Gender = "male" | "female";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: Gender;
  avatarUrl: string | null;
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  password?: string;
  gender?: string;
}

const PHONE_RE = /^\+994\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[a-zA-ZəöğüşıçƏÖĞÜŞİÇ\s\-']+$/i;
const PASSWORD_RE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function validateBasic(
  firstName: string,
  lastName: string,
  phone: string,
): FieldErrors {
  const e: FieldErrors = {};
  if (!firstName.trim()) e.firstName = "Ad məcburidir";
  else if (!NAME_RE.test(firstName))
    e.firstName = "Ad yalnız hərflərdən ibarət olmalıdır";
  if (!lastName.trim()) e.lastName = "Soyad məcburidir";
  else if (!NAME_RE.test(lastName))
    e.lastName = "Soyad yalnız hərflərdən ibarət olmalıdır";
  if (!phone.trim()) e.phone = "Mobil nömrə məcburidir";
  else if (!PHONE_RE.test(phone.replace(/\s/g, "")))
    e.phone = "Nömrə formatı yanlışdır (+994xxxxxxxxx)";
  return e;
}

function validateAccount(
  email: string,
  password: string,
  gender: Gender,
): FieldErrors {
  const e: FieldErrors = {};
  if (!email.trim()) e.email = "E-poçt məcburidir";
  else if (!EMAIL_RE.test(email)) e.email = "E-poçt formatı yanlışdır";
  if (!password.trim() || password === "**********")
    e.password = "Şifrə məcburidir";
  else if (!PASSWORD_RE.test(password))
    e.password =
      "Şifrə güclü olmalıdır (ən az 8 simvol, böyük və kiçik hərf, rəqəm və xüsusi simvol)";
  if (!gender) e.gender = "Cins seçilməlidir";
  return e;
}

/* ════════════════════════════════════════════════════════════════ */
export default function PersonalInfoClient({ user }: { user: UserProfile }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.avatarUrl,
  );
  const [avatarDragOver, setAvatarDragOver] = useState(false);

  const [basicEdit, setBasicEdit] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [basicErrors, setBasicErrors] = useState<FieldErrors>({});
  const [basicSaving, setBasicSaving] = useState(false);

  const [accountEdit, setAccountEdit] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("**********");
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState<Gender>(user.gender);
  const [accountErrors, setAccountErrors] = useState<FieldErrors>({});
  const [accountSaving, setAccountSaving] = useState(false);

  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = useCallback(
    (msg: string, type: "success" | "error" = "success") => {
      setToast({ msg, type });
      setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  /* Avatar */
  const applyFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("Yalnız şəkil faylları dəstəklənir", "error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("Fayl 5MB-dan böyük ola bilməz", "error");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) applyFile(file);
    e.target.value = "";
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setAvatarDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) applyFile(file);
  };

  /* Basic */
  const handleBasicSave = async () => {
    const errors = validateBasic(firstName, lastName, phone);
    if (Object.keys(errors).length) {
      setBasicErrors(errors);
      return;
    }
    setBasicErrors({});
    setBasicSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setBasicEdit(false);
      showToast("Əsas məlumatlar saxlanıldı");
    } catch {
      showToast("Xəta baş verdi", "error");
    } finally {
      setBasicSaving(false);
    }
  };
  const cancelBasic = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhone(user.phone);
    setBasicErrors({});
    setBasicEdit(false);
  };

  /* Account */
  const handleAccountSave = async () => {
    const errors = validateAccount(email, password, gender);
    if (Object.keys(errors).length) {
      setAccountErrors(errors);
      return;
    }
    setAccountErrors({});
    setAccountSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setAccountEdit(false);
      showToast("Hesab məlumatları saxlanıldı");
    } catch {
      showToast("Xəta baş verdi", "error");
    } finally {
      setAccountSaving(false);
    }
  };
  const cancelAccount = () => {
    setEmail(user.email);
    setPassword("**********");
    setGender(user.gender);
    setAccountErrors({});
    setAccountEdit(false);
  };

  /* ════════════ RENDER ════════════════════════════════════════ */
  return (
    <div className="w-full space-y-6 relative sm:mx-3">
      {/* ── Toast ── */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg text-white text-sm font-medium
          ${toast.type === "success" ? "bg-[#0B3E35]" : "bg-[#FF0004]"}`}
        >
          {toast.type === "success" ? (
            <svg
              className="w-20 h-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              className="w-10 h-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <circle cx="22" cy="22" r="10" />
              <line x1="22" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
          {toast.msg}
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="sm:mx-3">
        {/* "Şəxsi Məlumatlar" — bold, ~28px, #0B3E35 */}
        <h1 className="text-3xl sm:text-[40px] font-bold leading-tight text-[#0B3E35]">
          Şəxsi Məlumatlar
        </h1>
        {/* subtitle — 14px, #828282 */}
        <p className="text-sm text-[#142A12] mt-1">
          Şəxsi məlumatlarınız məxfidir və paylaşılmır
        </p>
      </div>

      {/* ── Avatar Card ── */}
      <div className="bg-white">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          {/* Avatar circle — 96px, no extra ring, just round */}
          <div
            className={`relative shrink-0 group cursor-pointer transition-transform duration-200 ${avatarDragOver ? "scale-105" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setAvatarDragOver(true);
            }}
            onDragLeave={() => setAvatarDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Avatar yüklə"
            onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
          >
            <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden bg-[#e8f0ee]">
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarPreview}
                  alt="Profil şəkli"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#0B3E35]/25"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
              )}
            </div>
            {/* Camera badge — #0B3E35 */}
            <div className="absolute bottom-1 right-0 w-10 h-10 bg-[#0B3E35] text-white rounded-full flex items-center justify-center shadow">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Right: buttons + ID */}
          <div className="flex w-full flex-wrap gap-4 sm:gap-10">
            {/* Buttons row */}
            <div className="flex  items-center gap-3 mb-3 sm:mb-5">
              {/* "Şəkil yüklə" — filled #0B3E35, white text, rounded-lg */}
              <button
                onClick={() => fileRef.current?.click()}
                className="px-4 py-3 sm:px-15 sm:py-3 bg-[#0B3E35] text-white text-sm rounded-2xl font-semibold  hover:bg-[#142A12] active:scale-[.98] transition-all"
              >
                Şəkil yüklə
              </button>
              {/* "Profil şəklini sil" — outlined, gray border, gray text, rounded-lg */}
              <button
                onClick={() => setAvatarPreview(null)}
                disabled={!avatarPreview}
                className="px-4 py-3 sm:px-15 sm:py-3 border border-[#0B3E35] text-[#0B3E35] text-sm font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 active:scale-[.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Profil şəklini sil
              </button>
            </div>

            {/* ID field */}
            <div className="mb-4 sm:mb-10 mx-3">
              <p className="text-xs font-semibold text-[#828282] mb-1.5 uppercase tracking-wide">
                Id
              </p>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={user.id}
                  className="w-full sm:max-w-[320px] border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#828282] bg-white font-mono select-all outline-none"
                />
                <button
                  onClick={() =>
                    navigator.clipboard
                      .writeText(user.id)
                      .then(() => showToast("ID kopyalandı"))
                  }
                  className="p-2.5 border border-gray-200 rounded-lg text-[#828282] hover:text-[#0B3E35] hover:border-gray-300 transition-colors"
                  aria-label="ID kopyala"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Basic Info Card ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mx-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-5">
          <Field
            label="Ad"
            required
            error={basicErrors.firstName}
            value={firstName}
            onChange={(v) => {
              setFirstName(v);
              setBasicErrors((e) => ({ ...e, firstName: undefined }));
            }}
            readOnly={!basicEdit}
            placeholder="Adınız"
          />
          <Field
            label="Soyad"
            required
            error={basicErrors.lastName}
            value={lastName}
            onChange={(v) => {
              setLastName(v);
              setBasicErrors((e) => ({ ...e, lastName: undefined }));
            }}
            readOnly={!basicEdit}
            placeholder="Soyadınız"
          />
          <Field
            label="Mobile nömrə"
            required
            error={basicErrors.phone}
            value={phone}
            onChange={(v) => {
              setPhone(v);
              setBasicErrors((e) => ({ ...e, phone: undefined }));
            }}
            readOnly={!basicEdit}
            placeholder="+994xxxxxxxxx"
            type="tel"
          />
        </div>

        <ActionRow
          isEditing={basicEdit}
          isSaving={basicSaving}
          onEdit={() => setBasicEdit(true)}
          onSave={handleBasicSave}
          onCancel={cancelBasic}
          editLabel="Düzəliş et"
        />
      </div>

      {/* ── Account Info Card ── */}
      <div className="bg-white rounded-2xl border mb-4 border-gray-200 p-4 sm:p-6 mx-3 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
          {/* E-poçt */}
          <Field
            label="E-poçt"
            required
            error={accountErrors.email}
            value={email}
            onChange={(v) => {
              setEmail(v);
              setAccountErrors((e) => ({ ...e, email: undefined }));
            }}
            readOnly={!accountEdit}
            placeholder="example@mail.com"
            type="email"
          />

          {/* Şifrə */}
          <div>
            <p className="text-xs font-semibold text-[#828282] mb-1.5 uppercase tracking-wide">
              Şifrə
            </p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly={!accountEdit}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAccountErrors((err) => ({ ...err, password: undefined }));
                }}
                onFocus={() => {
                  if (accountEdit && password === "**********") setPassword("");
                }}
                className={`w-full border rounded-lg px-4 py-2.5 pr-11 text-sm outline-none transition-all text-[#828282]
                  ${
                    accountErrors.password
                      ? "border-[#FF0004] bg-red-50 text-[#FF0004] focus:ring-1 focus:ring-[#FF0004]/30"
                      : accountEdit
                        ? "border-gray-300 bg-white focus:border-[#0B3E35] focus:ring-1 focus:ring-[#0B3E35]/20"
                        : "border-gray-200 bg-white cursor-default"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#828282] hover:text-[#0B3E35] transition-colors"
                aria-label={showPassword ? "Gizlət" : "Göstər"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {accountErrors.password && (
              <p className="mt-1 text-xs text-[#FF0004]">
                {accountErrors.password}
              </p>
            )}
          </div>
        </div>

        {/* Cins */}
        <div className="mt-5">
          <p className="text-xs font-semibold text-[#828282] mb-2.5 uppercase tracking-wide">
            Cins
          </p>
          <div className="flex flex-wrap gap-3">
            {(["male", "female"] as Gender[]).map((g) => (
              <button
                key={g}
                type="button"
                disabled={!accountEdit}
                onClick={() => setGender(g)}
                className={`flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150
                  ${
                    gender === g
                      ? "bg-[#0B3E35] text-white border-[#0B3E35]"
                      : "bg-white text-[#828282] border-gray-200"
                  } ${!accountEdit ? "cursor-default" : "cursor-pointer active:scale-[.97]"}`}
              >
                {/* Radio dot */}
                <span
                  className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0
                  ${gender === g ? "border-white" : "border-[#828282]"}`}
                >
                  {gender === g && (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  )}
                </span>
                {g === "male" ? "Kişi" : "Qadın"}
              </button>
            ))}
          </div>
          {accountErrors.gender && (
            <p className="mt-1 text-xs text-[#FF0004]">
              {accountErrors.gender}
            </p>
          )}
        </div>

        <ActionRow
          isEditing={accountEdit}
          isSaving={accountSaving}
          onEdit={() => setAccountEdit(true)}
          onSave={handleAccountSave}
          onCancel={cancelAccount}
          editLabel="Düzəliş et"
        />
      </div>
    </div>
  );
}

/* ─── Field ───────────────────────────────────────────────────── */
function Field({
  label,
  required,
  error,
  value,
  onChange,
  readOnly,
  placeholder,
  type = "text",
}: {
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  readOnly: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      {/* Label: 12px, uppercase, #828282; required * in #FF0004 */}
      <p className="text-xs font-semibold mb-1.5 uppercase tracking-wide">
        <span className={error ? "text-[#FF0004]" : "text-[#828282]"}>
          {label}
          {required && <span className="text-[#FF0004] ml-0.5">*</span>}
        </span>
      </p>
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition-all
          ${
            error
              ? "border-[#FF0004] bg-red-50 text-[#FF0004] placeholder-red-300 focus:ring-1 focus:ring-[#FF0004]/30"
              : readOnly
                ? "border-gray-200 bg-white text-[#142A12] cursor-default"
                : "border-gray-300 bg-white text-[#142A12] focus:border-[#0B3E35] focus:ring-1 focus:ring-[#0B3E35]/20 placeholder-[#828282]"
          }`}
      />
      {error && <p className="mt-1 text-xs text-[#FF0004]">{error}</p>}
    </div>
  );
}

/* ─── ActionRow ───────────────────────────────────────────────── */
function ActionRow({
  isEditing,
  isSaving,
  onEdit,
  onSave,
  onCancel,
  editLabel = "Düzəliş et",
}: {
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  editLabel?: string;
}) {
  return (
    <div className="flex justify-end mt-5 gap-3">
      {isEditing ? (
        <>
          {/* Ləğv et — gray outlined */}
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="px-4 py-2 sm:px-5 sm:py-2.5 border border-gray-200 text-[#828282] text-sm font-medium rounded-lg hover:bg-gray-50 active:scale-[.97] transition-all disabled:opacity-40"
          >
            Ləğv et
          </button>
          {/* Yadda saxla — #FF0004 filled, white text */}
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#FF0004] text-white text-sm font-semibold rounded-lg hover:bg-red-700 active:scale-[.97] transition-all disabled:opacity-70 min-w-[140px] justify-center"
          >
            {isSaving ? (
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeOpacity={0.3}
                />
                <path d="M21 12a9 9 0 00-9-9" />
              </svg>
            ) : (
              <>
                Yadda saxla <PencilIcon />
              </>
            )}
          </button>
        </>
      ) : (
        /* Düzəliş et — gray outlined, pencil icon */
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 border border-gray-200 text-[#828282] text-sm font-medium rounded-lg hover:bg-gray-50 hover:text-[#0B3E35] hover:border-gray-300 active:scale-[.97] transition-all"
        >
          {editLabel}
          <PencilIcon />
        </button>
      )}
    </div>
  );
}

/* ─── Icons ───────────────────────────────────────────────────── */
function PencilIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}
