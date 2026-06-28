import React from "react";

function VideoListItem({ video }) {
  const formatViews = (num) => {
    if (!num) return "0 views";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M views";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K views";
    return num + " views";
  };

  return (
    <div className="flex gap-2 cursor-pointer hover:bg-[#1a1a1a] rounded-lg p-1">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white line-clamp-2">{video.title}</p>
        <p className="text-xs text-gray-400 mt-1">{video.owner?.username}</p>
        <p className="text-xs text-gray-400">{formatViews(video.views)}</p>
      </div>
    </div>
  );
}

export default VideoListItem;