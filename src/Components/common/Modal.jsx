import React from "react";
import Button from "./Button.jsx";

function Modal({
  open,
  title,
  children,
  onCancel,
  onOk,
  okText = "Confirm",
  cancelText = "Cancel",
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70"
      onClick={onCancel}
    >
      <div
        className="bg-[#212121] text-white rounded-xl shadow-xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-3">{title}</h2>
        <div className="text-sm text-gray-300 mb-6">{children}</div>
        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} variant="secondary" className="rounded">
            {cancelText}
          </Button>
          <Button onClick={onOk} variant="danger" className="rounded">
            {okText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
