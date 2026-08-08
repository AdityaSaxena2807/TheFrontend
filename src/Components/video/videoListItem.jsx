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
        rounded-md
        p-2
        transition-all
        duration-hover
        hover:shadow-md
        hover:z-20
      "
      >
        <div className="relative w-32 h-20 shrink-0 overflow-hidden rounded-md bg-surface">
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

          <span className="absolute bottom-1 right-1 bg-bg/80 text-text-primary text-[10px] px-1.5 py-0.5 rounded-tiny font-medium">
            {formatDuration(video.duration)}
          </span>
        </div>

        <div className="flex-1 min-w-30">
          <div className="min-w-0">
            <p className="text-sm text-text-primary line-clamp-2 font-medium" title={video.title}>
              {video.title}
            </p>

            {owner && (
              <p className="mt-0.5 text-xs text-text-secondary truncate">
                {owner.username}
              </p>
            )}

            <p className="mt-0.5 text-xs text-text-disabled whitespace-nowrap">
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
        className="bg-transparent rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-hover cursor-pointer"
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
            className="w-full h-48 object-cover rounded-md"
          />

          <span className="absolute bottom-2 right-2 bg-bg/80 text-text-primary text-xs px-1.5 py-0.5 rounded-tiny font-medium">
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
              <h3 className="font-heading font-medium text-text-primary text-sm line-clamp-2">
                {video.title}
              </h3>

              <p className="text-text-secondary text-xs mt-1">{ownerName}</p>
            </div>
          </div>

          <p className="text-text-disabled text-xs mt-2 flex justify-between">
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
      rounded-md
      p-0
      transition-all
      duration-hover
      hover:z-20
    "
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-md bg-surface">
        <img
          src={
            typeof video.thumbnail === "string"
              ? video.thumbnail
              : video.thumbnail?.url
          }
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover group-hover:shadow-md transition-shadow duration-hover"
        />

        <span className="absolute bottom-1 right-1 rounded-tiny bg-bg/80 px-1.5 py-0.5 text-[10px] font-medium text-text-primary">
          {formatDuration(video.duration)}
        </span>
      </div>

      <div className="pt-2">
        <h3
          className="line-clamp-2 text-sm font-heading font-medium leading-5 text-text-primary"
          title={video.title}
        >
          {video.title}
        </h3>

        <p className="mt-0.5 text-xs text-text-secondary">
          {formatViews(video.views)} · {timeAgo(video.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default VideoListItem;
