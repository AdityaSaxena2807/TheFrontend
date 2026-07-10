import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LikeFilled, LikeOutlined, SaveOutlined } from "@ant-design/icons";
import { useAuthStore } from "../../store/authStore.js";
import SubscribeButton from "../channel/SubscribeButton.jsx";
import SaveToPlaylistDropdown from "./SaveToPlaylistDropdown.jsx";
import LoginPromptModal from "../common/LoginPromptModal.jsx";

function VideoInfo({ video, isLiked, likesCount, onLike }) {
	const { user } = useAuthStore();
	const navigate = useNavigate();
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showPlaylist, setShowPlaylist] = useState(false);

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
			<h1 className="mt-4 text-xl font-semibold text-white leading-snug">
				{video.title}
			</h1>

			<p className="text-sm text-gray-400 mt-1">
				{video.views} views &bull; {new Date(video.createdAt).toDateString()}
			</p>

			<div className="border-t border-gray-700 my-4" />

			{/* <div className="flex items-center gap-3">
				<img
					src={video.owner?.avatar}
					alt={video.owner?.username}
					className="w-10 h-10 rounded-full object-cover"
				/>
				<div>
					<p className="font-medium text-white">{video.owner?.username}</p>
					<p className="text-xs text-gray-400">
						<span>
							{new Intl.NumberFormat("en", {
								notation: "compact",
								maximumFractionDigits: 1,
							}).format(video.owner?.subscribersCount || 0)}{" "}
							Subscribers
						</span>
					</p>
				</div>
			</div> */}
			<div className="flex items-center justify-between flex-wrap gap-3">
				{/* Left: avatar + name — now clickable */}
				<div
					className="flex items-center gap-3 cursor-pointer"
					onClick={() => navigate(`/channel/${video.owner?.username}`)}
				>
					<img
						src={video.owner?.avatar}
						alt={video.owner?.username}
						className="w-10 h-10 rounded-full object-cover"
					/>
					<div>
						<p className="font-medium text-white hover:text-gray-300">
							{video.owner?.username}
						</p>
						<p className="text-xs text-gray-400">
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
					<SubscribeButton
						channelId={video.owner?._id}
						isSubscribed={video.owner?.isSubscribed}
					/>

					<button
						onClick={handleLike}
						className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isLiked ? "bg-white text-black" : "bg-[#272727] text-white hover:bg-[#3f3f3f]"}`}
					>
						{isLiked ? (
							<LikeFilled className="text-base" />
						) : (
							<LikeOutlined className="text-base" />
						)}
						<span>{likesCount}</span>
					</button>

					<div className="relative">
						<button
							onClick={handleSaveToPlaylist}
							className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-[#272727] text-white hover:bg-[#3f3f3f] transition-all duration-200"
						>
							<SaveOutlined className="text-base" />
							<span>Save</span>
						</button>
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
			<div className="mt-4 bg-[#1a1a1a] rounded-xl p-4 text-sm text-gray-300 whitespace-pre-wrap">
				{video.description}
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
