import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastError } from "../utils/ToastMessage.js";
import { getVideoById, getSuggestedVideos } from "../services/videoApi.js";
import VideoInfo from "../components/video/VideoInfo.jsx";
import VideoPlayer from "../components/video/VideoPlayer.jsx";
import VideoListItem from "../components/video/VideoListItem.jsx";
import CommentList from "../components/comment/CommentList.jsx";
import Skeleton from "../components/common/Skeleton.jsx";
import { toggleVideoLike } from "../services/likeApi.js";
import {
	getVideoComments,
	addComment,
	updateComment,
	deleteComment,
} from "../services/commentApi.js";
import { useUiStore } from "../store/uiStore.js";

function Watch() {
	const { videoId } = useParams();
	const [video, setVideo] = useState(null);
	const [comments, setComments] = useState([]);
	const [commentsLoading, setCommentsLoading] = useState(true);
	const [isLiked, setIsLiked] = useState(false); // start with false
	const [likesCount, setLikesCount] = useState(0); // start with 0
	const [suggested, setSuggested] = useState([]);
	const [suggestedLoading, setSuggestedLoading] = useState(true);
	const sidebarOpen = useUiStore((state) => state.sidebarOpen);
	const setSidebar = useUiStore((state) => state.setSidebar);

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
		const previousState = sidebarOpen;

		setSidebar(false);

		return () => {
			setSidebar(previousState);
		};
	}, [setSidebar]);

	useEffect(() => {
		const fetchSuggested = async () => {
			try {
				setSuggestedLoading(true);
				const response = await getSuggestedVideos(videoId);
				setSuggested(response.data);
			} catch (err) {
				ToastError("Failed to load suggested videos");
			} finally {
				setSuggestedLoading(false);
			}
		};
		fetchSuggested();
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
			<div className="flex items-center justify-center h-screen bg-bg">
				<LoadingOutlined className="text-text-primary text-4xl" />
			</div>
		);

	return (
		<div className="bg-bg min-h-screen text-text-primary">
			<div className="max-w-450 mx-auto px-4 py-6 flex gap-6">
				<div className="flex-1 min-w-0">
					<VideoPlayer
						videoUrl={
							typeof video.videoFile === "string"
								? video.videoFile
								: video.videoFile?.url
						}
						thumbnail={
							typeof video.thumbnail === "string"
								? video.thumbnail
								: video.thumbnail?.url
						}
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
					<p className="text-text-secondary text-sm">Up next</p>
					{suggestedLoading
						? Array.from({ length: 4 }).map((_, i) => (
								<Skeleton key={i} className="w-full h-24" />
							))
						: suggested.map((v) => <VideoListItem key={v._id} video={v} />)}
				</div>
			</div>
		</div>
	);
}

export default Watch;
