import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";
import LoginPromptModal from "../common/LoginPromptModal.jsx";

function CommentInput({ onSubmit }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [text, setText] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleInputClick = () => {
    if (!user) setShowLoginModal(true);
  };

  const handleSubmit = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <>
      <div className="flex gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-gray-600 shrink-0" />
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClick={handleInputClick}
            readOnly={!user}
            placeholder="Add a comment..."
            className="w-full bg-transparent border-b border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white resize-none py-1 cursor-pointer"
            rows={1}
          />
          <div className="flex justify-end mt-1">
            <button
              onClick={handleSubmit}
              disabled={!!user && !text.trim()}
              className="text-sm bg-white text-black px-3 py-1 rounded-full disabled:opacity-30"
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => navigate("/login")}
        modalText="You need to be logged in to add a comment."
      />
    </>
  );
}

export default CommentInput;