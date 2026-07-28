import React from "react";
import { useNavigate } from "react-router-dom";

function PlaylistCard({ playlist }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/playlist/${playlist._id}`)}
      className="bg-black rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:bg-gray-700 transition-all duration-300 cursor-pointer p-4"
    >
      <h3 className="font-semibold text-white text-sm line-clamp-2">
        {playlist.name}
      </h3>
      <p className="text-gray-400 text-xs mt-1 line-clamp-2">
        {playlist.description}
      </p>
      <p className="text-gray-500 text-xs mt-3">
        {playlist.totalVideos} {playlist.totalVideos === 1 ? "video" : "videos"}
      </p>
    </div>
  );
}

export default PlaylistCard;
