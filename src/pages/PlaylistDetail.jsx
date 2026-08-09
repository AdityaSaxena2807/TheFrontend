import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	LoadingOutlined,
	EditOutlined,
	DeleteOutlined,
	MoreOutlined,
} from "@ant-design/icons";
import Button from "../components/common/Button.jsx";
import {
	getPlaylistById,
	deletePlaylist,
	removeVideoFromPlaylist,
} from "../services/playlistApi.js";
import { ToastError, ToastSuccess } from "../utils/ToastMessage.js";
import PlaylistForm from "../components/playlist/PlaylistForm.jsx";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";
import VideoListItem from "../components/video/VideoListItem.jsx";

function VideoRowMenu({ onRemove }) {
	const [open, setOpen] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="absolute right-0 shrink-0" ref={menuRef}>
			<Button
				type="button"
				aria-label="More options"
				onClick={() => setOpen((prev) => !prev)}
				variant="icon"
				className="w-8 h-8 p-0 text-text-secondary hover:text-text-primary"
			>
				<MoreOutlined className="text-lg" />
			</Button>

			{open && (
				<div className="absolute right-0 mt-2 w-48 bg-surface-elevated border border-border rounded-md shadow-lg overflow-hidden z-30">
					<Button
						type="button"
						onClick={() => {
							setOpen(false);
							onRemove();
						}}
						variant="ghost"
						className="flex items-center gap-3 w-full justify-start px-4 py-3 text-sm text-crimson hover:bg-surface transition-colors duration-hover"
					>
						Remove from playlist
					</Button>
				</div>
			)}
		</div>
	);
}

function PlaylistDetail() {
	const { playlistId } = useParams();
	const navigate = useNavigate();
	const [playlist, setPlaylist] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showEditForm, setShowEditForm] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [videoToRemove, setVideoToRemove] = useState(null);

	useEffect(() => {
		const fetchPlaylist = async () => {
			try {
				setLoading(true);
				const response = await getPlaylistById(playlistId);
				setPlaylist(response.data);
			} catch (err) {
				ToastError("Failed to load playlist");
			} finally {
				setLoading(false);
			}
		};
		fetchPlaylist();
	}, [playlistId]);

	const handleRemoveVideo = async () => {
		const videoId = videoToRemove;
		setVideoToRemove(null);
		try {
			await removeVideoFromPlaylist(videoId, playlistId);
			setPlaylist((prev) => ({
				...prev,
				videos: prev.videos.filter((v) => v._id !== videoId),
			}));
			ToastSuccess("Removed from playlist");
		} catch (err) {
			ToastError("Failed to remove video");
		}
	};

	const handleDeletePlaylist = async () => {
		setConfirmDelete(false);
		try {
			await deletePlaylist(playlistId);
			ToastSuccess("Playlist deleted");
			navigate("/library");
		} catch (err) {
			ToastError("Failed to delete playlist");
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center py-20">
				<LoadingOutlined className="text-text-primary text-3xl" />
			</div>
		);
	}

	if (!playlist) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-text-secondary">
				<p className="text-lg">Playlist not found</p>
			</div>
		);
	}

	const coverThumbnail =
		typeof playlist.videos?.[0]?.thumbnail === "string"
			? playlist.videos?.[0]?.thumbnail
			: playlist.videos?.[0]?.thumbnail?.url;

	return (
		<div className="max-w-6xl mx-auto px-4 py-6 text-text-primary flex gap-6 flex-col md:flex-row">
			{/* Playlist sidebar */}
			<div className="md:w-72 shrink-0">
				<div className="aspect-video w-full rounded-md overflow-hidden bg-surface-elevated border border-border">
					{coverThumbnail ? (
						<img
							src={coverThumbnail}
							alt={playlist.name}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center text-text-disabled text-sm">
							No videos yet
						</div>
					)}
				</div>

				<h1 className="mt-4 text-xl font-heading font-semibold">
					{playlist.name}
				</h1>
				{playlist.description && (
					<p className="mt-1 text-sm text-text-secondary">
						{playlist.description}
					</p>
				)}
				<p className="mt-2 text-sm text-text-disabled">
					{playlist.videos?.length || 0}{" "}
					{playlist.videos?.length === 1 ? "video" : "videos"}
				</p>

				<div className="flex gap-2 mt-4">
					<Button
						onClick={() => setShowEditForm(true)}
						variant="secondary"
						className="flex items-center gap-1.5 rounded-full text-sm"
					>
						<EditOutlined /> Edit
					</Button>
					<Button
						onClick={() => setConfirmDelete(true)}
						variant="danger"
						className="flex items-center gap-1.5 rounded-full text-sm"
					>
						<DeleteOutlined /> Delete
					</Button>
				</div>
			</div>

			{/* Video list */}
			<div className="flex-1 min-w-0">
				{!playlist.videos || playlist.videos.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-20 text-text-secondary">
						<p className="text-lg">No videos in this playlist</p>
						<p className="text-sm mt-1">Save videos to see them here</p>
					</div>
				) : (
					<div className="flex flex-col gap-1">
						{playlist.videos.map((video) => (
							<VideoListItem
								key={video._id}
								video={video}
								variant="row"
								actions={
									<VideoRowMenu onRemove={() => setVideoToRemove(video._id)} />
								}
							/>
						))}
					</div>
				)}
			</div>

			<PlaylistForm
				isOpen={showEditForm}
				onClose={() => setShowEditForm(false)}
				playlist={playlist}
				onSuccess={(updated) =>
					setPlaylist((prev) => ({
						...prev,
						name: updated.name,
						description: updated.description,
					}))
				}
			/>

			<ConfirmDialog
				isOpen={confirmDelete}
				title="Delete this playlist?"
				message="This can't be undone."
				confirmLabel="Delete"
				danger
				onConfirm={handleDeletePlaylist}
				onCancel={() => setConfirmDelete(false)}
			/>

			<ConfirmDialog
				isOpen={Boolean(videoToRemove)}
				title="Remove this video?"
				message="It will be removed from this playlist."
				confirmLabel="Remove"
				danger
				onConfirm={handleRemoveVideo}
				onCancel={() => setVideoToRemove(null)}
			/>
		</div>
	);
}

export default PlaylistDetail;
