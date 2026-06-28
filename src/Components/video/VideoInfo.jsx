import React from "react";

function VideoInfo({ video }) {
  return (
    <>
      <h1 className="mt-4 text-xl font-semibold text-white leading-snug">
        {video.title}
      </h1>

      <p className="text-sm text-gray-400 mt-1">
        {video.views} views &bull; {new Date(video.createdAt).toDateString()}
      </p>

      <div className="border-t border-gray-700 my-4" />

      <div className="flex items-center gap-3">
        <img
          src={video.owner?.avatar}
          alt={video.owner?.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-white">{video.owner?.username}</p>
          <p className="text-xs text-gray-400">
            <span>
              {new Intl.NumberFormat("en", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(video.owner?.subscribersCount || 0)}{" "}
              Subscribers
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4 bg-[#1a1a1a] rounded-xl p-4 text-sm text-gray-300 whitespace-pre-wrap">
        {video.description}
      </div>
    </>
  );
}

export default VideoInfo;