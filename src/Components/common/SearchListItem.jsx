import React from "react";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../Utils/formatTime.js";
import { formatDuration } from "../../Utils/formatDuration.js";

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
      className="
        group
        flex
        gap-4
        cursor-pointer
        rounded-xl
        p-2
        transition-all
        duration-200
        ease-out
        hover:bg-[#1b2732]
      "
    >
      <div className="relative w-[360px] h-[202px] shrink-0 overflow-hidden rounded-xl bg-[#202020]">
        <img
          src={video.thumbnail?.url || video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
          {formatDuration(video.duration)}
        </span>
      </div>

      <div className="flex-1 min-w-0 py-1">
        <h3
          className="text-white text-lg font-medium line-clamp-2"
          title={video.title}
        >
          {video.title}
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          {formatViews(video.views)} · {timeAgo(video.createdAt)}
        </p>

        {video.owner && (
          <div className="flex items-center gap-2 mt-3">
            {video.owner.avatar && (
              <img
                src={video.owner.avatar}
                alt={video.owner.username}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="text-sm text-gray-400">
              {video.owner.username}
            </span>
          </div>
        )}

        {video.description && (
          <p className="mt-2 text-sm text-gray-400 line-clamp-2">
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
