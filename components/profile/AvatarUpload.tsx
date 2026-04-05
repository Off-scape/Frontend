import { useRef, useState } from "react";
import { CameraIcon, CopyIcon } from "@/icons/ProfileIcons";

interface AvatarUploadProps {
  avatarUrl: string | null;
  userId: string;
  onToast: (msg: string, type?: "success" | "error") => void;
}

export function AvatarUpload({
  avatarUrl,
  userId,
  onToast,
}: AvatarUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(avatarUrl);
  const [dragOver, setDragOver] = useState(false);

  const applyFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      onToast("Yalnız şəkil faylları dəstəklənir", "error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      onToast("Fayl 5MB-dan böyük ola bilməz", "error");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) applyFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) applyFile(file);
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        <div
          className={`relative shrink-0 group cursor-pointer transition-transform duration-200 ${dragOver ? "scale-105" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Avatar yüklə"
          onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
        >
          <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden bg-[#e8f0ee]">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
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
          <div className="absolute bottom-1 right-0 w-10 h-10 bg-[#0B3E35] text-white rounded-full flex items-center justify-center shadow">
            <CameraIcon />
          </div>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex w-full flex-wrap gap-4 sm:gap-10">
          <div className="flex items-center gap-3 mb-3 sm:mb-5">
            <button
              onClick={() => fileRef.current?.click()}
              className="px-4 py-3 sm:px-15 sm:py-3 bg-[#0B3E35] text-white text-sm rounded-2xl font-semibold hover:bg-[#142A12] active:scale-[.98] transition-all"
            >
              Şəkil yüklə
            </button>
            <button
              onClick={() => setPreview(null)}
              disabled={!preview}
              className="px-4 py-3 sm:px-15 sm:py-3 border border-[#0B3E35] text-[#0B3E35] text-sm font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 active:scale-[.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Profil şəklini sil
            </button>
          </div>

          <div className="mb-4 sm:mb-10 mx-3">
            <p className="text-xs font-semibold text-[#828282] mb-1.5 uppercase tracking-wide">
              Id
            </p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={userId}
                className="w-full sm:max-w-[320px] border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#828282] bg-white font-mono select-all outline-none"
              />
              <button
                onClick={() =>
                  navigator.clipboard
                    .writeText(userId)
                    .then(() => onToast("ID kopyalandı"))
                }
                className="p-2.5 border border-gray-200 rounded-lg text-[#828282] hover:text-[#0B3E35] hover:border-gray-300 transition-colors"
                aria-label="ID kopyala"
              >
                <CopyIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
