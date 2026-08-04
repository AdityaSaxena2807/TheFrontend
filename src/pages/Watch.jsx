import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastError } from "../Utils/ToastMessage.js";
import { getVideoById } from "../services/videoApi.js";
import VideoInfo from "../components/video/VideoInfo.jsx";
import VideoPlayer from "../components/video/VideoPlayer.jsx";
import VideoListItem from "../components/video/VideoListItem.jsx";
import CommentList from "../components/comment/CommentList.jsx";
import { toggleVideoLike } from "../services/likeApi.js";
import {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment,
} from "../services/commentApi.js";

function Watch() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false); // start with false
  const [likesCount, setLikesCount] = useState(0); // start with 0
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await getVideoById(videoId);
        setVideo(response.data);
        setIsLiked(response.data.isLiked);
        setLikesCount(response.data.likesCount);
      } catch (err) {
        ToastError("Failed to load video");
      }
    };
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setCommentsLoading(true);
        const response = await getVideoComments(videoId);
        setComments(response.data.docs);
      } catch (err) {
        ToastError("Failed to load comments");
      } finally {
        setCommentsLoading(false);
      }
    };
    fetchComments();
  }, [videoId]);

  const handleAddComment = async (content) => {
    try {
      const response = await addComment(videoId, content);
      setComments((prev) => [
        { ...response.data, likesCount: 0, isLiked: false },
        ...prev,
      ]);
    } catch (err) {
      ToastError("Failed to post comment");
    }
  };

  const handleVideoLike = async () => {
    try {
      const response = await toggleVideoLike(videoId);
      setIsLiked(response.data.isLiked);
      setLikesCount(response.data.likesCount);
    } catch (err) {
      ToastError("Failed to like video");
    }
  };
  const handleUpdateComment = async (commentId, newContent) => {
    try {
      const response = await updateComment(commentId, newContent);
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, content: response.data.content } : c,
        ),
      );
    } catch (err) {
      ToastError("Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      ToastError("Failed to delete comment");
    }
  };
  if (!video)
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f0f0f]">
        <LoadingOutlined className="text-white text-4xl" />
      </div>
    );

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      <div className="max-w-450 mx-auto px-4 py-6 flex gap-6">
        <div className="flex-1 min-w-0">
          <VideoPlayer
            videoUrl={video.videoFile?.url || video.videoFile}
            thumbnail={video.thumbnail?.url || video.thumbnail}
          />

          <VideoInfo
            video={video}
            isLiked={isLiked}
            likesCount={likesCount}
            onLike={handleVideoLike}
          />

          <CommentList
            comments={comments}
            loading={commentsLoading}
            onAddComment={handleAddComment}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
          />
        </div>
        <div className="w-90 hidden lg:flex flex-col gap-3">
          <p className="text-gray-400 text-sm">Up next</p>
          <div className="w-full h-24 bg-[#1a1a1a] rounded-xl animate-pulse" />
          <div className="w-full h-24 bg-[#1a1a1a] rounded-xl animate-pulse" />
          <div className="w-full h-24 bg-[#1a1a1a] rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default Watch;
//TODO: wire up real "recommended videos" API — placeholder pulses for now
// Missing piece	Status
// Subscribe button	You already built channel/subscribeButton.jsx — it's just not placed next to the owner info in VideoInfo.jsx
// Save to playlist	You already built video/saveToPlaylistDropdown.jsx — unused so far
// Clickable channel	Clicking the owner avatar/username currently does nothing — should navigate to /channel/:username (your Channel.jsx page)
// Description show more/less	Nice-to-have — long descriptions just render in full right now, no truncation/expand
// Real "Up next" videos	Still placeholder pulses — needs a "related videos" API call (do you have one in videoApi.js, or is this not built on the backend yet?)
// Reply edit/delete on comments, nested replies, and comment sorting are reasonable v2 features but not essential for a working Watch page — I'd skip those for now unless you want them.
