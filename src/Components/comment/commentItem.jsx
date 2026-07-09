import React, { useState } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";
import { toggleCommentLike } from "../../services/likeApi.js";
import LoginPromptModal from "../common/LoginPromptModal.jsx";

function CommentItem({ comment }) {
	const { user } = useAuthStore();
	const navigate = useNavigate();
	const [isLiked, setIsLiked] = useState(comment.isLiked);
	const [likesCount, setLikesCount] = useState(comment.likesCount);
	const [showLoginModal, setShowLoginModal] = useState(false);

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
			<div className="flex gap-3">
				<div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0" />
				<div className="flex-1">
					<p className="text-xs text-gray-400">
						{new Date(comment.createdAt).toLocaleDateString()}
					</p>
					<p className="text-sm text-gray-200 mt-1">{comment.content}</p>
					{/* <div className="flex items-center gap-1 mt-1">
					{comment.isLiked ? (
						<HeartFilled className="text-red-500 text-sm" />
					) : (
						<HeartOutlined className="text-gray-400 text-sm" />
					)}
					<span className="text-xs text-gray-400">{comment.likesCount}</span>
				</div> */}
					<button
						onClick={() => handleCommentLike(comment._id)}
						className="flex items-center gap-1 mt-1.5 group"
					>
						{isLiked ? (
							<HeartFilled className="text-red-500 text-sm" />
						) : (
							<HeartOutlined className="text-gray-400 text-sm group-hover:text-red-400 transition-colors duration-150" />
						)}
						<span
							className={`text-xs transition-colors duration-150 ${isLiked ? "text-red-400" : "text-gray-400 group-hover:text-red-400"}`}
						>
							{likesCount}
						</span>
					</button>
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
