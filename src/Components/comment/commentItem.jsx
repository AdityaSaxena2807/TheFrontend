import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";
import { toggleCommentLike } from "../../services/likeApi.js";
import LoginPromptModal from "../common/LoginPromptModal.jsx";
import Button from "../common/Button.jsx";
import LikeButton from "../common/LikeButton.jsx";
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
					className="w-9 h-9 rounded-full object-cover shrink-0 bg-surface"
				/>

				{/* Comment */}
				<div className="flex-1 min-w-0">
					{/* Header */}
					<div className="flex items-start justify-between">
						<div>
							<div className="flex items-center gap-2">
								<p className="text-sm font-body font-medium text-text-primary">
									@{comment.ownerDetails?.username}
								</p>

								<span className="text-xs text-text-secondary">
									{timeAgo(comment.createdAt)}
								</span>
							</div>

							{isEditing ? (
								<div className="mt-1 flex flex-col gap-2">
									<input
										value={editedContent}
										onChange={(e) => setEditedContent(e.target.value)}
										className="bg-surface-elevated text-sm text-text-primary rounded-sm px-2 py-1 border border-border focus:ring-1 focus:ring-terracotta outline-none"
										autoFocus
									/>
									<div className="flex gap-2">
										<Button
											type="button"
											onClick={handleEditSubmit}
											variant="primary"
											className="text-xs px-3 py-1"
										>
											Save
										</Button>
										<Button
											type="button"
											onClick={() => setIsEditing(false)}
											variant="secondary"
											className="text-xs px-3 py-1"
										>
											Cancel
										</Button>
									</div>
								</div>
							) : (
								<p className="mt-1 text-sm text-text-primary font-body leading-6 wrap-break-word">
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
						<LikeButton
							isLiked={isLiked}
							count={likesCount}
							onClick={() => handleCommentLike(comment._id)}
							iconStyle="heart"
							className="rounded-full"
						/>
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
