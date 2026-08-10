import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";
import LoginPromptModal from "../common/LoginPromptModal.jsx";
import Button from "../common/Button.jsx";
import EmojiPickerButton from "../common/EmojiPickerButton.jsx";

function CommentInput({ onSubmit }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [text, setText] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const textareaRef = useRef(null);

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
        <div className="w-8 h-8 rounded-full bg-surface shrink-0">
          {user?.avatar ? (
            <img
              src={
                typeof user.avatar === "string" ? user.avatar : user.avatar?.url
              }
              alt={user.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClick={handleInputClick}
            readOnly={!user}
            placeholder="Add a comment..."
            className="w-full bg-transparent border-b border-border text-sm text-text-primary placeholder-text-disabled outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg resize-none py-1 cursor-pointer transition-colors duration-hover"
            rows={1}
          />
          <div className="flex justify-between items-center mt-2">
            <EmojiPickerButton
              placement="bottom-start"
              width={400}
              height={250}
              onEmojiClick={(emoji) => {
                const textarea = textareaRef.current;

                if (!textarea) {
                  setText((prev) => prev + emoji);
                  return;
                }

                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;

                const newText = text.slice(0, start) + emoji + text.slice(end);

                setText(newText);

                requestAnimationFrame(() => {
                  textarea.focus();

                  const cursor = start + emoji.length;

                  textarea.setSelectionRange(cursor, cursor);
                });
              }}
            />

            <Button
              onClick={handleSubmit}
              disabled={!!user && !text.trim()}
              variant="primary"
              className="text-sm rounded-full"
            >
              Comment
            </Button>
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
