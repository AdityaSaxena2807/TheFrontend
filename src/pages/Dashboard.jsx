import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LoadingOutlined,
  EyeOutlined,
  LikeOutlined,
  TeamOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { getChannelStats, getChannelVideos } from "../services/dashboardApi.js";
import { toggleVideoPublishStatus, deleteVideo } from "../services/videoApi.js";
import { ToastError, ToastSuccess } from "../Utils/ToastMessage.js";
import Modal from "../components/common/Modal.jsx";
import { timeAgo } from "../Utils/formatTime.js";
import Button from "../components/common/Button.jsx";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, videosRes] = await Promise.all([
        getChannelStats(),
        getChannelVideos(),
      ]);
      setStats(statsRes.data);
      setVideos(videosRes.data);
    } catch (err) {
      ToastError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTogglePublish = async (videoId) => {
    try {
      const response = await toggleVideoPublishStatus(videoId);
      setVideos((prev) =>
        prev.map((v) =>
          v._id === videoId
            ? { ...v, isPublished: response.data.isPublished }
            : v,
        ),
      );
      ToastSuccess("Publish status updated");
    } catch (err) {
      ToastError("Failed to toggle publish status");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteVideo(deleteTarget);
      setVideos((prev) => prev.filter((v) => v._id !== deleteTarget));
      ToastSuccess("Video deleted");
    } catch (err) {
      ToastError("Failed to delete video");
    } finally {
      setDeleteTarget(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] bg-[#0f0f0f]">
        <LoadingOutlined className="text-white text-4xl" />
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white px-6 py-6">
      <h1 className="text-xl font-semibold mb-6">Channel Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<VideoCameraOutlined />}
          label="Videos"
          value={stats?.totalVideos ?? 0}
        />
        <StatCard
          icon={<EyeOutlined />}
          label="Views"
          value={stats?.totalViews ?? 0}
        />
        <StatCard
          icon={<TeamOutlined />}
          label="Subscribers"
          value={stats?.totalSubscribers ?? 0}
        />
        <StatCard
          icon={<LikeOutlined />}
          label="Likes"
          value={stats?.totalLikes ?? 0}
        />
      </div>

      {/* Video list */}
      <h2 className="text-lg font-medium mb-4">Your Videos</h2>

      {videos.length === 0 ? (
        <p className="text-gray-500">You haven't uploaded any videos yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {videos.map((video) => (
            <div
              key={video._id}
              className="flex items-center gap-4 bg-[#181818] rounded-xl p-3 hover:bg-[#212121] transition"
            >
              <Link
                to={`/watch/${video._id}`}
                className="shrink-0 w-40 aspect-video rounded-lg overflow-hidden bg-black"
              >
                <img
                  src={
                    typeof video.thumbnail === "string"
                      ? video.thumbnail
                      : video.thumbnail?.url
                  }
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  to={`/watch/${video._id}`}
                  className="font-medium truncate block hover:underline"
                >
                  {video.title}
                </Link>
                <p className="text-gray-400 text-sm mt-1">
                  {typeof video.likesCount === "number" ? video.likesCount : 0}{" "}
                  likes · {timeAgo(video.createdAt)}
                </p>
                <p className="text-gray-600 text-xs">
                  {new Date(video.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <span
                  className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                    video.isPublished
                      ? "bg-green-700/40 text-green-400"
                      : "bg-yellow-700/40 text-yellow-400"
                  }`}
                >
                  {video.isPublished ? "Published" : "Unpublished"}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  onClick={() => handleTogglePublish(video._id)}
                  variant="secondary"
                  className="px-3 py-1.5 rounded text-sm"
                >
                  {video.isPublished ? "Unpublish" : "Publish"}
                </Button>
                <Link
                  to={`/edit-video/${video._id}`}
                  className="px-3 py-1.5 rounded bg-[#282828] hover:bg-[#333] text-sm transition"
                >
                  Edit
                </Link>
                <Button
                  onClick={() => setDeleteTarget(video._id)}
                  variant="danger"
                  className="px-3 py-1.5 rounded text-sm"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        title="Delete video?"
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onOk={handleDelete}
        okText="Delete"
        cancelText="Cancel"
      >
        This will permanently delete the video, its comments, and likes. This
        can't be undone.
      </Modal>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="relative bg-[#181818] rounded-xl p-5 overflow-hidden border border-white/5">
      <div className="absolute left-0 top-0 h-full w-1 bg-red-600/70" />
      <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
        <span className="text-base">{icon}</span>
        {label}
      </div>
      <p className="text-3xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

export default Dashboard;
