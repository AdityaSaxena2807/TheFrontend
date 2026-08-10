import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastError } from "../../utils/ToastMessage.js";
import { watchHistory } from "../../services/userApi.js";
import VideoListItem from "../video/VideoListItem.jsx";
import EmptyState from "../common/EmptyState.jsx";

function WatchHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await watchHistory();
        setHistory(response.data);
      } catch (err) {
        ToastError("Failed to load watch history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingOutlined className="text-text-primary text-3xl" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <EmptyState
        title="No watch history yet"
        subtitle="Videos you watch will show up here"
      />
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {history.map((video) => (
        <VideoListItem key={video._id} video={video} variant="row" />
      ))}
    </div>
  );
}

export default WatchHistory;
