import { PencilIcon, SpinnerIcon } from "@/icons/ProfileIcons";

interface ActionRowProps {
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  editLabel?: string;
}

export function ActionRow({
  isEditing,
  isSaving,
  onEdit,
  onSave,
  onCancel,
  editLabel = "Düzəliş et",
}: ActionRowProps) {
  return (
    <div className="flex justify-end mt-5 gap-3">
      {isEditing ? (
        <>
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="px-4 py-2 sm:px-5 sm:py-2.5 border border-gray-200 text-[#828282] text-sm font-medium rounded-lg hover:bg-gray-50 active:scale-[.97] transition-all disabled:opacity-40"
          >
            Ləğv et
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#FF0004] text-white text-sm font-semibold rounded-lg hover:bg-red-700 active:scale-[.97] transition-all disabled:opacity-70 min-w-[140px] justify-center"
          >
            {isSaving ? (
              <SpinnerIcon />
            ) : (
              <>
                <span>Yadda saxla</span> <PencilIcon />
              </>
            )}
          </button>
        </>
      ) : (
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
