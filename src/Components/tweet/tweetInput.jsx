import { useRef, useState } from "react";
import { createTweet, updateTweet } from "../../services/tweetApi";
import { useAuthStore } from "../../store/authStore";
import EmojiPickerButton from "../common/EmojiPickerButton";
import { useNavigate } from "react-router-dom";
import LoginPromptModal from "../common/LoginPromptModal";
import Button from "../common/Button";

const MAX_LENGTH = 280;

function TweetInput({ existingTweet = null, onSuccess, onCancelEdit }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [content, setContent] = useState(existingTweet?.content || "");
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isEditMode = !!existingTweet;
  const remaining = MAX_LENGTH - content.length;
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (!content.trim() || remaining < 0) return;

    setLoading(true);
    try {
      if (isEditMode) {
        const res = await updateTweet(existingTweet._id, {
          newContent: content,
        });
        onSuccess?.(res.data);
        onCancelEdit?.();
      } else {
        const res = await createTweet({ content });
        onSuccess?.(res.data);
        setContent("");
      }
    } catch (error) {
      console.error("Tweet submit failed:", error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  };
  const avatarUrl =
    typeof user?.avatar === "string" ? user.avatar : user?.avatar?.url;
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-orange-600 flex items-center justify-center text-white font-semibold shrink-0 overflow-hidden">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={user?.username}
              className="w-full h-full object-cover"
            />
          ) : (
            user?.username?.[0]?.toUpperCase()
          )}
        </div>
        <span className="font-semibold text-white text-sm">
          {user?.fullname || user?.username}
        </span>
      </div>

      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, MAX_LENGTH + 20))}
        onFocus={(e) => {
          if (!user) {
            e.target.blur();
            setShowLoginModal(true);
          }
        }}
        placeholder="What's happening?"
        rows={2}
        className="w-full resize-none bg-transparent outline-none text-gray-200 placeholder-gray-500 text-base"
      />
      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => navigate("/login")}
      />

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#2a2a2a]">
        <div className="flex items-center gap-3">
          <EmojiPickerButton
            placement="bottom-start"
            width={400}
            height={250}
            onEmojiClick={(emoji) => {
              const textarea = textareaRef.current;

              if (!textarea) {
                setContent((prev) => prev + emoji);
                return;
              }

              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;

              const newContent =
                content.slice(0, start) + emoji + content.slice(end);

              setContent(newContent);

              requestAnimationFrame(() => {
                textarea.focus();

                const cursor = start + emoji.length;

                textarea.setSelectionRange(cursor, cursor);
              });
            }}
          />

          <span
            className={`text-xs ${
              remaining < 0 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {remaining}
          </span>
        </div>

        <div className="flex gap-2">
          {isEditMode && (
            <Button
              type="button"
              onClick={onCancelEdit}
              variant="secondary"
              className="text-xs px-4 py-1.5 rounded-full text-gray-400 hover:bg-white/10"
            >
              Cancel
            </Button>
          )}

          <Button
            type="submit"
            disabled={loading || !content.trim() || remaining < 0}
            variant="primary"
            className="text-xs font-semibold px-5 py-1.5 rounded-full"
          >
            {loading ? "..." : isEditMode ? "Save" : "Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default TweetInput;
