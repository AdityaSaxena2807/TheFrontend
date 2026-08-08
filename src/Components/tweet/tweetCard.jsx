import React, { useState } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useAuthStore } from "../../store/authStore";
import { toggleTweetLike } from "../../services/likeApi";
import { deleteTweet } from "../../services/tweetApi";
import { timeAgo } from "../../Utils/formatTime";
import CommentOptions from "../comment/CommentOptions";
import TweetInput from "./TweetInput";
import LoginPromptModal from "../common/LoginPromptModal";
import Button from "../common/Button.jsx";
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
				<Button
					type="button"
					onClick={() => handleLike()}
					variant="ghost"
					className={`flex items-center gap-2 rounded-full px-2 py-1 transition-all duration-hover mt-2 ${
						isLiked
							? "text-crimson"
							: "text-text-secondary hover:text-text-primary"
					}`}
				>
					{isLiked ? (
						<HeartFilled
							className="text-base"
							style={{ color: "var(--color-accent-crimson)" }}
						/>
					) : (
						<HeartOutlined className="text-base text-text-secondary hover:text-text-primary transition-colors" />
					)}

					<span
						className={`text-xs ${isLiked ? "text-crimson" : "text-text-secondary"}`}
					>
						{likesCount}
					</span>
				</Button>
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
