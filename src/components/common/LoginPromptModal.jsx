import React from "react";
import Button from "./Button.jsx";

function LoginPromptModal({ isOpen, onClose, onLogin, modalText }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-bg/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-surface-elevated rounded-lg p-6 w-[320px] text-center shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-text-primary text-base font-medium mb-2">
          Login required
        </p>
        <p className="text-text-secondary text-sm mb-5">
          {modalText || "You need to be logged in to perform this action."}
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={onClose}
            variant="secondary"
            className="rounded-full text-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={onLogin}
            variant="primary"
            className="rounded-full text-sm"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPromptModal;
