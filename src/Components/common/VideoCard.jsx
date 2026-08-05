import React from "react";
import { timeAgo } from "../../Utils/formatTime";
import { formatDuration } from "../../Utils/formatDuration";

function VideoCard({
  thumbnail,
  title,
  duration,
  views,
  uploadedAt,
  ownerName,
  ownerAvatar,
}) {
  const formatViews = (num) => {
    if (!num) return "0 views";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M views";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K views";
    return num + " views";
  };

  return (
    <div className="bg-black rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:bg-gray-700 transition-all duration-300 cursor-pointer">
      <div className="relative">
        <img src={typeof thumbnail === "string" ? thumbnail : thumbnail?.url} alt={title} className="w-full h-48 object-cover" />
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
          {formatDuration(duration)}
        </span>
      </div>
      <div className="p-3">
        <div className="flex items-start gap-2">
          <img
            src={typeof ownerAvatar === "string" ? ownerAvatar : ownerAvatar?.url}
            alt={ownerName}
            className="w-9 h-9 rounded-full object-cover shrink-0"
          />
          <div>
            <h3 className="font-semibold text-white text-sm line-clamp-2 ">
              {title}
            </h3>
            <p className="text-gray-400 text-xs mt-1">{ownerName}</p>
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-2 flex justify-between">
          <span>{formatViews(views)}</span>
          <span>{timeAgo(uploadedAt)}</span>
        </p>
      </div>
    </div>
  );
}

export default VideoCard;
