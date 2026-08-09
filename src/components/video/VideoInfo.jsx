import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SaveOutlined } from "@ant-design/icons";
import { useAuthStore } from "../../store/authStore.js";
import Button from "../common/Button.jsx";
import LikeButton from "../common/LikeButton.jsx";
import SubscribeButton from "../channel/SubscribeButton.jsx";
import SaveToPlaylistDropdown from "./SaveToPlaylistDropdown.jsx";
import LoginPromptModal from "../common/LoginPromptModal.jsx";

function VideoInfo({ video, isLiked, likesCount, onLike }) {
	const { user } = useAuthStore();
	const navigate = useNavigate();
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showPlaylist, setShowPlaylist] = useState(false);
	const [showFullDescription, setShowFullDescription] = useState(false);

	const handleLike = () => {
		if (!user) {
			setShowLoginModal(true);
			return;
		}
		onLike();
	};

	const handleSaveToPlaylist = () => {
		if (!user) {
			setShowLoginModal(true);
			return;
		}
		setShowPlaylist((prev) => !prev);
	};
	return (
		<>
			<h1 className="mt-4 text-xl font-heading font-semibold text-text-primary leading-snug">
				{video.title}
			</h1>

			<p className="text-sm text-text-secondary mt-1">
				{video.views} views • {new Date(video.createdAt).toDateString()}
			</p>

			<div className="border-t border-border my-4" />

			<div className="flex items-center justify-between flex-wrap gap-3">
				{/* Left: avatar + name — now clickable */}
				<div
					className="flex items-center gap-3 cursor-pointer"
					onClick={() => navigate(`/channel/${video.owner?.username}`)}
				>
					<img
						src={
							typeof video.owner?.avatar === "string"
								? video.owner?.avatar
								: video.owner?.avatar?.url
						}
						alt={video.owner?.username}
						className="w-10 h-10 rounded-full object-cover"
					/>
					<div>
						<p className="font-body font-medium text-text-primary hover:text-text-secondary transition-colors duration-hover">
							{video.owner?.username}
						</p>
						<p className="text-xs text-text-secondary">
							{new Intl.NumberFormat("en", {
								notation: "compact",
								maximumFractionDigits: 1,
							}).format(video.owner?.subscribersCount || 0)}{" "}
							Subscribers
						</p>
					</div>
				</div>

				{/* Right: Subscribe + Like + Save */}
				<div className="flex items-center gap-2 flex-wrap">
					{user?._id !== video.owner?._id && (
						<SubscribeButton
							channelId={video.owner?._id}
							isSubscribed={video.owner?.isSubscribed}
						/>
					)}

					<LikeButton
						isLiked={isLiked}
						count={likesCount}
						onClick={handleLike}
						iconStyle="like"
						className="gap-1.5 text-sm font-body"
					/>

					<div className="relative">
						<Button
							type="button"
							onClick={handleSaveToPlaylist}
							variant="ghost"
							className="flex items-center gap-1.5 text-sm"
						>
							<SaveOutlined className="text-base" />
							<span>Save</span>
						</Button>
						{showPlaylist && (
							<div className="absolute right-0 mt-2 z-30">
								<SaveToPlaylistDropdown
									videoId={video._id}
									onClose={() => setShowPlaylist(false)}
								/>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="mt-4 bg-surface rounded-md p-4 text-sm text-text-secondary">
				<p
					className={`whitespace-pre-wrap wrap-break-word font-body ${
						showFullDescription ? "" : "line-clamp-3"
					}`}
				>
					{video.description}
				</p>

				{video.description &&
					(video.description?.split("\n").length > 3 ||
						video.description?.length > 150) && (
						<Button
							type="button"
							onClick={() => setShowFullDescription((prev) => !prev)}
							variant="ghost"
							className="mt-2 text-text-primary text-sm font-body font-medium hover:text-text-secondary transition-colors duration-hover"
						>
							{showFullDescription ? "Show less" : "Show more"}
						</Button>
					)}
			</div>
			<LoginPromptModal
				isOpen={showLoginModal}
				onClose={() => setShowLoginModal(false)}
				onLogin={() => navigate("/login")}
			/>
		</>
	);
}

export default VideoInfo;
