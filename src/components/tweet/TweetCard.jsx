import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore.js";
import { toggleTweetLike } from "../../services/likeApi.js";
import { deleteTweet } from "../../services/tweetApi.js";
import { timeAgo } from "../../utils/formatTime.js";
import CommentOptions from "../comment/CommentOptions.jsx";
import TweetInput from "./TweetInput.jsx";
import LoginPromptModal from "../common/LoginPromptModal.jsx";
import LikeButton from "../common/LikeButton.jsx";
import { Link, useNavigate } from "react-router-dom";

function TweetCard({ tweet, onDeleted, onUpdated }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(tweet.isLiked);
  const [likesCount, setLikesCount] = useState(tweet.likesCount);
  const [isEditing, setIsEditing] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isOwner = user?._id === tweet.ownerDetails?._id;

  const handleLike = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    try {
      const res = await toggleTweetLike(tweet._id);
      setIsLiked(res.data.isLiked);
      setLikesCount(res.data.likesCount);
    } catch (error) {
      console.error("Tweet like failed:", error?.response?.data || error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTweet(tweet._id);
      onDeleted?.(tweet._id);
    } catch (error) {
      console.error("Tweet delete failed:", error?.response?.data || error);
    }
  };

  if (isEditing) {
    return (
      <TweetInput
        existingTweet={tweet}
        onCancelEdit={() => setIsEditing(false)}
        onSuccess={(updated) => {
          onUpdated?.(updated);
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <div className="flex gap-3 bg-surface rounded-md p-4 hover:bg-surface-elevated transition-colors duration-hover">
      <Link to={`/channel/${tweet.ownerDetails?.username}`}>
        <img
          src={
            typeof tweet.ownerDetails?.avatar === "string"
              ? tweet.ownerDetails?.avatar
              : tweet.ownerDetails?.avatar?.url
          }
          alt={tweet.ownerDetails?.username}
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link to={`/channel/${tweet.ownerDetails?.username}`}>
              <span className="font-body font-medium text-text-primary hover:text-text-secondary transition-colors duration-hover">
                {tweet.ownerDetails?.username}
              </span>
            </Link>
            <span className="text-text-disabled">·</span>
            <span className="text-text-disabled">
              {timeAgo(tweet.createdAt)}
            </span>
          </div>
          {isOwner && (
            <CommentOptions
              isOwner={isOwner}
              onEdit={() => setIsEditing(true)}
              onDelete={handleDelete}
            />
          )}
        </div>
        <p className="text-base text-text-primary font-body mt-1.5 whitespace-pre-wrap wrap-break-word leading-snug">
          {tweet.content}
        </p>
        <LikeButton
          isLiked={isLiked}
          count={likesCount}
          onClick={handleLike}
          iconStyle="heart"
          className="rounded-full mt-2"
        />
      </div>
      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => navigate("/login")}
      />
    </div>
  );
}

export default TweetCard;
