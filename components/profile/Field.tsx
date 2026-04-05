interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  readOnly: boolean;
  placeholder?: string;
  type?: string;
}

export function Field({
  label,
  required,
  error,
  value,
  onChange,
  readOnly,
  placeholder,
  type = "text",
}: FieldProps) {
  return (
    <div>
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
