import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastError } from "../../Utils/ToastMessage.js";
import { getLikedVideos } from "../../services/likeApi.js";
import VideoListItem from "../video/VideoListItem.jsx";

function LikedVideos() {
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        setLoading(true);
        const response = await getLikedVideos();
        const videos = response.data.map((item) => ({
          _id: item.likedVideo._id,
          title: item.likedVideo.title,
          thumbnail:
            typeof item.likedVideo.thumbnail === "string"
              ? item.likedVideo.thumbnail
              : item.likedVideo.thumbnail?.url,
          videoFile:
            typeof item.likedVideo.videoFile === "string"
              ? item.likedVideo.videoFile
              : item.likedVideo.videoFile?.url,
          duration: item.likedVideo.duration,
          owner: item.likedVideo.owner,
          ownerDetails: item.likedVideo.ownerDetails,
          views: item.likedVideo.views,
          createdAt: item.likedVideo.createdAt,
        }));
        setLikedVideos(videos);
      } catch (err) {
        ToastError("Failed to load liked videos");
      } finally {
        setLoading(false);
      }
    };
    fetchLikedVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingOutlined className="text-white text-3xl" />
      </div>
    );
  }

  if (likedVideos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-lg">No liked videos yet</p>
        <p className="text-sm mt-1">Videos you like will show up here</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {likedVideos.map((video) => (
        <VideoListItem key={video._id} video={video} variant="row" />
      ))}
    </div>
  );
}

export default LikedVideos;
