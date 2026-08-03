import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { createTweet, updateTweet } from "../../services/tweetApi";

const MAX_LENGTH = 280;

function TweetInput({ existingTweet = null, onSuccess, onCancelEdit }) {
  const { user } = useAuthStore();
  const [content, setContent] = useState(existingTweet?.content || "");
  const [loading, setLoading] = useState(false);
  const isEditMode = !!existingTweet;
  const remaining = MAX_LENGTH - content.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || remaining < 0) return;

    setLoading(true);
    try {
      if (isEditMode) {
        const res = await updateTweet(existingTweet._id, { newContent: content });
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

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-orange-600 flex items-center justify-center text-white font-semibold shrink-0 overflow-hidden">
          {user?.avatar? (
            <img
              src={user.avatar}
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
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, MAX_LENGTH + 20))}
        placeholder="What's happening?"
        rows={2}
        className="w-full resize-none bg-transparent outline-none text-gray-200 placeholder-gray-500 text-base"
      />

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#2a2a2a]">
        <span
          className={`text-xs ${remaining < 0 ? "text-red-500" : "text-gray-500"}`}
        >
          {remaining}
        </span>
        <div className="flex gap-2">
          {isEditMode && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="text-xs px-4 py-1.5 rounded-full text-gray-400 hover:bg-white/10"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading || !content.trim() || remaining < 0}
            className="text-xs font-semibold px-5 py-1.5 rounded-full bg-gray-200 text-black disabled:opacity-30 disabled:bg-gray-500"
          >
            {loading ? "..." : isEditMode ? "Save" : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default TweetInput;