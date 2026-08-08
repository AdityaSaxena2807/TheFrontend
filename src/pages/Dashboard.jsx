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
import Modal from "../Components/common/Modal.jsx";
import { timeAgo } from "../Utils/formatTime.js";
import Button from "../Components/common/Button.jsx";

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
			<div className="flex items-center justify-center h-[60vh] bg-bg">
				<LoadingOutlined className="text-text-primary text-4xl" />
			</div>
		);
	}

	return (
		<div className="bg-bg min-h-screen text-text-primary px-6 sm:px-12 lg:px-20 py-6">
			<h1 className="text-2xl font-heading font-semibold text-text-primary mb-8">
				Creator Dashboard
			</h1>

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
			<h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
				Your Videos
			</h2>

			{videos.length === 0 ? (
				<p className="text-text-secondary">
					You haven't uploaded any videos yet.
				</p>
			) : (
				<div className="flex flex-col gap-3">
					{videos.map((video) => (
						<div
							key={video._id}
							className="flex items-center gap-4 bg-surface rounded-md p-3 hover:bg-surface-elevated transition-colors duration-hover"
						>
							<Link
								to={`/watch/${video._id}`}
								className="shrink-0 w-40 aspect-video rounded-md overflow-hidden bg-bg"
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
									className="font-heading font-medium text-text-primary truncate block hover:text-text-secondary transition-colors duration-hover"
								>
									{video.title}
								</Link>
								<p className="text-text-secondary text-sm mt-1 font-body">
									{typeof video.likesCount === "number" ? video.likesCount : 0}{" "}
									likes · {timeAgo(video.createdAt)}
								</p>
								<p className="text-text-disabled text-xs font-body">
									{new Date(video.createdAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</p>
								<span
									className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-tiny font-body font-medium ${
										video.isPublished
											? "bg-teal/20 text-teal"
											: "bg-copper/20 text-copper"
									}`}
								>
									{video.isPublished ? "Published" : "Unpublished"}
								</span>
							</div>

							<div className="flex items-center gap-2 shrink-0">
								<Button
									onClick={() => handleTogglePublish(video._id)}
									variant="secondary"
									className="px-3 py-1.5 text-sm"
								>
									{video.isPublished ? "Unpublish" : "Publish"}
								</Button>
								<Link
									to={`/edit-video/${video._id}`}
									className="px-3 py-1.5 rounded-sm bg-surface-elevated hover:bg-surface-elevated/80 text-text-primary text-sm transition-colors duration-hover font-body font-medium"
								>
									Edit
								</Link>
								<Button
									onClick={() => setDeleteTarget(video._id)}
									variant="danger"
									className="px-3 py-1.5 text-sm"
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
		<div className="relative bg-surface rounded-md p-5 overflow-hidden border border-border">
			<div className="absolute left-0 top-0 h-full w-1 bg-terracotta" />
			<div className="flex items-center gap-2 text-text-secondary text-sm mb-2 font-body">
				<span className="text-base text-text-primary">{icon}</span>
				{label}
			</div>
			<p className="text-3xl font-heading font-semibold tracking-tight text-text-primary">
				{value}
			</p>
		</div>
	);
}

export default Dashboard;
