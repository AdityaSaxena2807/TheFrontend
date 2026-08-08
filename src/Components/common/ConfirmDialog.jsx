import React from "react";
import Button from "./Button.jsx";

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
      className="fixed inset-0 bg-bg/70 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-surface-elevated rounded-lg p-6 w-[320px] text-center shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-text-primary text-base font-medium mb-2">{title}</p>
        {message && <p className="text-text-secondary text-sm mb-5">{message}</p>}
        <div className="flex gap-3 justify-center">
          <Button
            onClick={onCancel}
            variant="secondary"
            className="rounded-full text-sm"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            variant={danger ? "danger" : "primary"}
            className="rounded-full text-sm"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
