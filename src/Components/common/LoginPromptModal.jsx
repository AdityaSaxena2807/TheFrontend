import React from "react";

function LoginPromptModal({ isOpen, onClose, onLogin, modalText }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1a1a] rounded-xl p-6 w-[320px] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-white text-base font-medium mb-2">Login required</p>
        <p className="text-gray-400 text-sm mb-5">
          {modalText || "You need to be logged in to perform this action."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-sm text-gray-300 border border-gray-600 hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onLogin}
            className="px-4 py-2 rounded-full text-sm bg-white text-black hover:bg-gray-200"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPromptModal;