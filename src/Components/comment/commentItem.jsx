import React, { useState } from "react";
import { HeartOutlined, HeartFilled, MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";
import { toggleCommentLike } from "../../services/likeApi.js";
import LoginPromptModal from "../common/LoginPromptModal.jsx";
import Button from "../common/Button.jsx";
import { timeAgo } from "../../Utils/formatTime.js";
import CommentOptions from "./CommentOptions.jsx";
import { ToastError } from "../../Utils/ToastMessage.js";

function CommentItem({ comment, onUpdate, onDelete }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likesCount);
  const [editedContent, setEditedContent] = useState(comment.content);
  const isOwner = user?._id === comment.ownerDetails?._id;

  const handleEditSubmit = async () => {
    if (!editedContent.trim()) return;
    await onUpdate(comment._id, editedContent);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await onDelete(comment._id);
  };

  const handleCommentLike = async (commentId) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    try {
      const response = await toggleCommentLike(commentId);
      setIsLiked(response.data.isLiked);
      setLikesCount(response.data.likesCount);
    } catch (err) {
      ToastError("Failed to like comment");
    }
  };
  return (
    <>
      <div className="flex gap-3 py-3 group">
        {/* Avatar */}
        <img
          src={
            typeof comment.ownerDetails?.avatar === "string"
              ? comment.ownerDetails?.avatar
              : comment.ownerDetails?.avatar?.url
          }
          alt={comment.ownerDetails?.username}
          className="w-9 h-9 rounded-full object-cover shrink-0 bg-gray-700"
        />

        {/* Comment */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-white">
                  @{comment.ownerDetails?.username}
                </p>

                <span className="text-xs text-gray-400">
                  {timeAgo(comment.createdAt)}
                </span>
              </div>

              {isEditing ? (
                <div className="mt-1 flex flex-col gap-2">
                  <input
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="bg-[#121212] text-sm text-white rounded-md px-2 py-1 outline-none"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={handleEditSubmit}
                      variant="ghost"
                      className="text-xs text-blue-400"
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      variant="ghost"
                      className="text-xs text-gray-400"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="mt-1 text-sm text-gray-200 leading-6 wrap-break-word">
                  {comment.content}
                </p>
              )}
            </div>

            {isOwner && (
              <div className="opacity-100 group-hover:opacity-100 transition-opacity">
                <CommentOptions
                  onEdit={() => setIsEditing(true)}
                  onDelete={handleDelete}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5 mt-2">
            <Button
              type="button"
              onClick={() => handleCommentLike(comment._id)}
              variant="ghost"
              className={`flex items-center gap-2 rounded-full px-2 py-1 text-white bg-[#121212] hover:bg-[#2f2f2f] transition-colors ${
                isLiked ? "bg-[#2f2f2f]" : ""
              }`}
            >
              {isLiked ? (
                <HeartFilled
                  className="text-base"
                  style={{ color: "#ef4444" }}
                />
              ) : (
                <HeartOutlined className="text-base text-gray-400 hover:text-white transition-colors" />
              )}

              <span
                className={`text-xs ${
                  isLiked ? "text-red-400" : "text-gray-400"
                }`}
              >
                {likesCount}
              </span>
            </Button>
          </div>
        </div>
      </div>

      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => navigate("/login")}
      />
    </>
  );
}

export default CommentItem;
