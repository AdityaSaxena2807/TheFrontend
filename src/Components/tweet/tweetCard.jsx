import React, { useState } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useAuthStore } from "../../store/authStore";
import { toggleTweetLike } from "../../services/likeApi";
import { deleteTweet } from "../../services/tweetApi";
import { timeAgo } from "../../Utils/formatTime";
import CommentOptions from "../comment/CommentOptions";
import TweetInput from "./TweetInput";
import { Link } from "react-router-dom";

function TweetCard({ tweet, onDeleted, onUpdated }) {
  const { user } = useAuthStore();
  const [isLiked, setIsLiked] = useState(tweet.isLiked);
  const [likesCount, setLikesCount] = useState(tweet.likesCount);
  const [isEditing, setIsEditing] = useState(false);

  const isOwner = user?._id === tweet.ownerDetails?._id;

  const handleLike = async () => {
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
    <div className="flex gap-3 bg-[#1c1c1c] rounded-xl p-4 hover:bg-[#212121] transition-colors">
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
              <span className="font-semibold text-white hover:text-gray-300 transition-colors">
                {tweet.ownerDetails?.username}
              </span>
            </Link>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{timeAgo(tweet.createdAt)}</span>
          </div>
          {isOwner && (
            <CommentOptions
              isOwner={isOwner}
              onEdit={() => setIsEditing(true)}
              onDelete={handleDelete}
            />
          )}
        </div>
        <p className="text-base text-gray-100 mt-1.5 whitespace-pre-wrap wrap-break-word leading-snug">
          {tweet.content}
        </p>
        <button
          onClick={() => handleLike()}
          className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-[#2f2f2f] transition-colors"
        >
          {isLiked ? (
            <HeartFilled className="text-base" style={{ color: "#ef4444" }} />
          ) : (
            <HeartOutlined className="text-base text-gray-400 hover:text-white transition-colors" />
          )}

          <span
            className={`text-xs ${isLiked ? "text-red-400" : "text-gray-400"}`}
          >
            {likesCount}
          </span>
        </button>
      </div>
    </div>
  );
}

export default TweetCard;
