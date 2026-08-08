import React from "react";
import { useNavigate } from "react-router-dom";

function PlaylistCard({ playlist }) {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => navigate(`/playlist/${playlist._id}`)}
			className="bg-transparent rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-hover cursor-pointer p-0"
		>
			<div className="aspect-video bg-surface rounded-md overflow-hidden mb-2" />
			<h3 className="font-heading font-medium text-text-primary text-sm line-clamp-2">
				{playlist.name}
			</h3>
			<p className="text-text-secondary text-xs mt-1 line-clamp-2">
				{playlist.description}
			</p>
			<p className="text-text-disabled text-xs mt-3">
				{playlist.totalVideos} {playlist.totalVideos === 1 ? "video" : "videos"}
			</p>
		</div>
	);
}

export default PlaylistCard;
