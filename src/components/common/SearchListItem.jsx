import React from "react";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/formatTime.js";
import { formatDuration } from "../../utils/formatDuration.js";

function SearchListItem({ video, actions }) {
  const navigate = useNavigate();

  const formatViews = (num = 0) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1).replace(".0", "")}M views`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(".0", "")}K views`;
    }
    return `${num} ${num === 1 ? "view" : "views"}`;
  };

  const handleOpenVideo = () => {
    navigate(`/watch/${video._id}`);
  };

  const sharedProps = {
    onClick: handleOpenVideo,
    role: "button",
    tabIndex: 0,
    onKeyDown: (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleOpenVideo();
      }
    },
  };

  return (
    <div
      {...sharedProps}
      className="group flex flex-col sm:flex-row gap-4 cursor-pointer rounded-md p-2 transition-all duration-hover ease-out hover:bg-surface-elevated"
    >
      <div className="relative w-full sm:w-90 h-48 sm:h-50.5 shrink-0 overflow-hidden rounded-md bg-surface">
        <img
          src={
            typeof video.thumbnail === "string"
              ? video.thumbnail
              : video.thumbnail?.url
          }
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        <span className="absolute bottom-1 right-1 bg-bg/80 text-text-primary text-xs px-1.5 py-0.5 rounded-sm">
          {formatDuration(video.duration)}
        </span>
      </div>

      <div className="flex-1 min-w-0 py-1">
        <h3
          className="text-text-primary text-lg font-medium line-clamp-2"
          title={video.title}
        >
          {video.title}
        </h3>

        <p className="mt-1 text-sm text-text-secondary">
          {formatViews(video.views)} · {timeAgo(video.createdAt)}
        </p>

        {video.owner && (
          <div className="flex items-center gap-2 mt-3">
            {(typeof video.owner.avatar === "string"
              ? video.owner.avatar
              : video.owner.avatar?.url) && (
              <img
                src={
                  typeof video.owner.avatar === "string"
                    ? video.owner.avatar
                    : video.owner.avatar?.url
                }
                alt={video.owner.username}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="text-sm text-text-secondary">
              {video.owner.username}
            </span>
          </div>
        )}

        {video.description && (
          <p className="mt-2 text-sm text-text-secondary line-clamp-2">
            {video.description}
          </p>
        )}
      </div>

      {actions && (
        <div onClick={(e) => e.stopPropagation()} className="shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}

export default SearchListItem;
