import React from "react";

function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-[#1a1a1a] rounded-xl p-6 w-[320px] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-white text-base font-medium mb-2">{title}</p>
        {message && <p className="text-gray-400 text-sm mb-5">{message}</p>}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-full text-sm text-gray-300 border border-gray-600 hover:bg-gray-800"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-full text-sm text-white transition-colors ${
              danger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
