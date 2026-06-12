// Watch.jsx
import React, { useEffect, useState } from "react";
import { ToastError } from "../Utils/ToastMessage.js";
import { getVideoById } from "../services/videoApi.js";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/video/videoPlayer.jsx";
import { LoadingOutlined } from "@ant-design/icons";

function Watch() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await getVideoById(videoId);
        setVideo(response.data);
      } catch (err) {
        ToastError("Failed to load video");
      }
    };
    fetchVideo();
  }, [videoId]);

  if (!video)
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f0f0f]">
        <LoadingOutlined className="text-white text-4xl" />
      </div>
    );

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      <div className="max-w-[1800px] mx-auto px-4 py-6 flex gap-6">
        {/* Left — Main content */}
        <div className="flex-1 min-w-0">
          {/* Video Player */}
          <div className="w-full rounded-xl overflow-hidden bg-black">
            <VideoPlayer
              videoUrl={video.videoFile}
              thumbnail={video.thumbnail}
            />
          </div>

          {/* Video Title */}
          <h1 className="mt-4 text-xl font-semibold text-white leading-snug">
            {video.title}
          </h1>

          {/* Views + Date */}
          <p className="text-sm text-gray-400 mt-1">
            {video.views} views &bull;{" "}
            {new Date(video.createdAt).toDateString()}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-700 my-4" />

          {/* Channel Info placeholder */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-600" />
            <div>
              <p className="font-medium text-white">{video.owner?.username}</p>
              <p className="text-xs text-gray-400">channel info here</p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4 bg-[#1a1a1a] rounded-xl p-4 text-sm text-gray-300 whitespace-pre-wrap">
            {video.description}
          </div>
        </div>

        {/* Right — Recommended videos (placeholder for now) */}
        <div className="w-[360px] hidden lg:flex flex-col gap-3">
          <p className="text-gray-400 text-sm">Up next</p>
          {/* You'll map <VideoListItem /> here later */}
          <div className="w-full h-24 bg-[#1a1a1a] rounded-xl animate-pulse" />
          <div className="w-full h-24 bg-[#1a1a1a] rounded-xl animate-pulse" />
          <div className="w-full h-24 bg-[#1a1a1a] rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default Watch;
//TODO complete this page with all apis and components. For now, it's just a skeleton with a video player and some placeholders for the rest of the content.