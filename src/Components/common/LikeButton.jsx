import React from "react";
import {
	HeartOutlined,
	HeartFilled,
	LikeOutlined,
	LikeFilled,
} from "@ant-design/icons";
import Button from "./Button.jsx";

/**
 * Shared like button component
 * @param {boolean} isLiked - Whether the item is currently liked
 * @param {number} count - Current likes count
 * @param {function} onClick - Callback when button is clicked
 * @param {string} iconStyle - 'heart' (default) or 'like' for different icon sets
 * @param {string} className - Additional CSS classes
 */
function LikeButton({
	isLiked,
	count,
	onClick,
	iconStyle = "heart",
	className = "",
}) {
	const HeartIcon = isLiked ? HeartFilled : HeartOutlined;
	const LikeIcon = isLiked ? LikeFilled : LikeOutlined;
	const Icon = iconStyle === "like" ? LikeIcon : HeartIcon;

	return (
		<Button
			type="button"
			onClick={onClick}
			variant="ghost"
			className={`flex items-center gap-2 px-2 py-1 transition-all duration-hover ${
				isLiked ? "text-crimson" : "text-text-secondary hover:text-text-primary"
			} ${className}`}
		>
			{isLiked && iconStyle === "heart" ? (
				<HeartFilled
					className="text-base"
					style={{ color: "var(--color-accent-crimson)" }}
				/>
			) : iconStyle === "like" ? (
				<Icon className="text-base" />
			) : (
				<HeartOutlined className="text-base text-text-secondary hover:text-text-primary transition-colors duration-hover" />
			)}

			<span
				className={`text-xs ${isLiked ? "text-crimson" : "text-text-secondary"}`}
			>
				{count}
			</span>
		</Button>
	);
}

export default LikeButton;
