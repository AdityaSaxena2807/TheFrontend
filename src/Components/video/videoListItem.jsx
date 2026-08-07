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

  const owner =
    typeof video.owner === "object" ? video.owner : video.ownerDetails;

  const ownerAvatar =
    typeof owner?.avatar === "string" ? owner.avatar : owner?.avatar?.url;

  const ownerName = owner?.username || owner?.fullName || "";
  // row variant
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
            src={
              typeof video.thumbnail === "string"
                ? video.thumbnail
                : video.thumbnail?.url
            }
            alt={video.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />

          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">
            {formatDuration(video.duration)}
          </span>
        </div>

        <div className="flex-1 min-w-30">
          <div className="min-w-0">
            <p className="text-sm text-white line-clamp-2" title={video.title}>
              {video.title}
            </p>

            {owner && (
              <p className="mt-0.5 text-xs text-gray-400 truncate">
                {owner.username}
              </p>
            )}

            <p className="mt-0.5 text-xs text-gray-500 whitespace-nowrap">
              {formatViews(video.views)} · {timeAgo(video.createdAt)}
            </p>
          </div>
        </div>
        {actions && (
          <div onClick={(e) => e.stopPropagation()} className="shrink-0">
            {actions}
          </div>
        )}
      </div>
    );
  }

  // card variant
  if (variant === "card") {
    return (
      <div
        {...sharedProps}
        className="bg-black rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:bg-gray-700 transition-all duration-300 cursor-pointer"
      >
        <div className="relative">
          <img
            src={
              typeof video.thumbnail === "string"
                ? video.thumbnail
                : video.thumbnail?.url
            }
            alt={video.title}
            loading="lazy"
            className="w-full h-48 object-cover"
          />

          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
            {formatDuration(video.duration)}
          </span>
        </div>

        <div className="p-3">
          <div className="flex items-start gap-2">
            <img
              src={ownerAvatar}
              alt={ownerName}
              className="w-9 h-9 rounded-full object-cover shrink-0"
            />

            <div className="min-w-0">
              <h3 className="font-semibold text-white text-sm line-clamp-2">
                {video.title}
              </h3>

              <p className="text-gray-400 text-xs mt-1">{ownerName}</p>
            </div>
          </div>

          <p className="text-gray-500 text-xs mt-2 flex justify-between">
            <span>{formatViews(video.views)}</span>
            <span>{timeAgo(video.createdAt)}</span>
          </p>

          {actions && (
            <div className="mt-2" onClick={(e) => e.stopPropagation()}>
              {actions}
            </div>
          )}
        </div>
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
          src={
            typeof video.thumbnail === "string"
              ? video.thumbnail
              : video.thumbnail?.url
          }
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
