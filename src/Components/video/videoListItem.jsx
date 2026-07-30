import React from "react";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../Utils/formatTime.js";
import { formatDuration } from "../../Utils/formatDuration.js";

function VideoListItem({ video, variant = "grid", actions }) {
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

  if (variant === "row") {
    return (
      <div
        {...sharedProps}
        className="
        group
        flex
        gap-2
        cursor-pointer
        rounded-xl
        p-2
        transition-all
        duration-200
        ease-out
        hover:scale-[1.03]
        hover:bg-[#1b2732]
        hover:z-20
        hover:shadow-xl
      "
      >
        <div className="relative w-32 h-20 shrink-0 overflow-hidden rounded-lg bg-[#202020]">
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />

          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">
            {formatDuration(video.duration)}
          </span>
        </div>

        <div className="flex-1 min-w-30">
          <p className="text-sm text-white line-clamp-2">{video.title}</p>

          <p className="mt-0.5 text-xs text-gray-400 whitespace-nowrap">
            {formatViews(video.views)} · {timeAgo(video.createdAt)}
          </p>
        </div>
        {actions && (
          <div onClick={(e) => e.stopPropagation()} className="shrink-0">
            {actions}
          </div>
        )}
      </div>
    );
  }

  // default: grid variant
  return (
    <div
      {...sharedProps}
      className="
      group
      w-full
      cursor-pointer
      rounded-xl
      p-2
      transition-all
      duration-200
      ease-out
      hover:scale-[1.04]
      hover:bg-[#1b2732]
      hover:z-20
      hover:shadow-xl
    "
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#202020]">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />

        <span className="absolute bottom-1 right-1 rounded bg-black/85 px-1.5 py-0.5 text-[10px] font-medium text-white">
          {formatDuration(video.duration)}
        </span>
      </div>

      <div className="pt-2">
        <h3
          className="line-clamp-2 text-sm font-medium leading-5 text-white"
          title={video.title}
        >
          {video.title}
        </h3>

        <p className="mt-0.5 text-xs text-gray-400">
          {formatViews(video.views)} · {timeAgo(video.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default VideoListItem;
