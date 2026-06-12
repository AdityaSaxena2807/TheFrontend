import React, { useEffect, useState } from "react";
import { getAllVideos } from "../services/videoApi";
import { ToastError } from "../Utils/ToastMessage.js";
import { useNavigate } from "react-router-dom";
import VideoCard from "../components/common/VideoCard.jsx";
import { LoadingOutlined } from "@ant-design/icons";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getAllVideos();
        setVideos(response.data.docs);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch videos");
        ToastError(err?.response?.data?.message || "Failed to fetch videos");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 bg-gray-900">
        <LoadingOutlined />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 bg-gray-900">
        {error}
      </div>
    );

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* <h1 className="text-3xl font-bold mb-6 text-white">Recommended Videos</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => navigate(`/watch/${video?._id}`)}
              className="cursor-pointer"
            >
              <VideoCard
                thumbnail={video.thumbnail}
                title={video.title}
                duration={video.duration}
                views={video.views}
                uploadedAt={video.createdAt}
                ownerDetails={video.ownerDetails.username}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
