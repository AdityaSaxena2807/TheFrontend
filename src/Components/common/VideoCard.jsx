import React from "react";

function VideoCard({
  thumbnail,
  title,
  duration,
  views,
  uploadedAt,
  ownerName,
  ownerAvatar
}) {
  const formatViews = (num) => {
    if (!num) return "0 views";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M views";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K views";
    return num + " views";
  };

  const formatDuration = (duration) => {
    if (duration == null) return "0:00";

    const str = duration.toString();

    // If no decimal, treat as total seconds
    if (!str.includes(".")) {
      const totalSeconds = parseInt(str, 10);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    // Existing m.ss format handling
    const [minutesStr, decimalStr] = str.split(".");
    const minutes = parseInt(minutesStr, 10);

    let seconds = 0;
    if (decimalStr) {
      if (decimalStr.length === 1) {
        seconds = parseInt(decimalStr, 10) * 10;
      } else {
        seconds = parseInt(decimalStr.slice(0, 2), 10);
      }
    }

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const daysAgo = (date) => {
    if (!date) return "";
    const now = new Date();
    const uploaded = new Date(date);
    const diffTime = Math.abs(now - uploaded);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + " days ago";
  };

  return (
    <div className="bg-black rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:bg-gray-700 transition-all duration-300 cursor-pointer">
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
          {formatDuration(duration)}
        </span>
      </div>
      <div className="p-3">
        <div className="flex items-start gap-2">
          <img
            src={ownerAvatar}
            alt={ownerName}
            className="w-9 h-9 rounded-full object-cover shrink-0"
          />
          <div>
            <h3 className="font-semibold text-white text-sm line-clamp-2 hover:text-red-500">
              {title}
            </h3>
            <p className="text-gray-400 text-xs mt-1">{ownerName}</p>
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-2 flex justify-between">
          <span>{formatViews(views)}</span>
          <span>{daysAgo(uploadedAt)}</span>
        </p>
      </div>
    </div>
  );
}

export default VideoCard;