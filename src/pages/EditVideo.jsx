import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { getVideoById, updateVideo } from "../services/videoApi.js";
import { ToastError, ToastSuccess } from "../Utils/ToastMessage.js";

function EditVideo() {
	const navigate = useNavigate();
	const { videoId } = useParams();

	const [loading, setLoading] = useState(true);
	const [thumbnailFile, setThumbnailFile] = useState(null);
	const [thumbnailPreview, setThumbnailPreview] = useState(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [saving, setSaving] = useState(false);
	const thumbnailInputRef = useRef(null);

	useEffect(() => {
		const fetchVideo = async () => {
			try {
				const response = await getVideoById(videoId);
				const video = response.data;
				setTitle(video.title);
				setDescription(video.description);
				setThumbnailPreview(video.thumbnail?.url || video.thumbnail);
			} catch (err) {
				ToastError("Failed to load video");
			} finally {
				setLoading(false);
			}
		};
		fetchVideo();
	}, [videoId]);

	const handleThumbnailChange = (e) => {
		const file = e.target.files?.[0] || null;
		setThumbnailFile(file);
		if (file) setThumbnailPreview(URL.createObjectURL(file));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title.trim()) return ToastError("Title is required");
		if (!description.trim()) return ToastError("Description is required");

		const formData = new FormData();
		formData.append("title", title.trim());
		formData.append("description", description.trim());
		if (thumbnailFile) {
			formData.append("thumbnail", thumbnailFile);
		}

		try {
			setSaving(true);
			await updateVideo(videoId, formData);
			ToastSuccess("Video updated successfully");
			navigate(`/watch/${videoId}`);
		} catch (err) {
			ToastError(err?.response?.data?.message || "Failed to update video");
		} finally {
			setSaving(false);
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
		<div className="max-w-3xl mx-auto px-4 py-8 text-white">
			<h1 className="text-xl font-semibold mb-6">Edit Video</h1>

			<form onSubmit={handleSubmit} className="space-y-5">
				{/* Title */}
				<div>
					<label className="mb-1.5 block text-sm text-gray-300">Title</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Add a title that describes your video"
						className="w-full rounded-lg border border-gray-700 bg-[#121212] px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-red-600"
					/>
				</div>

				{/* Description */}
				<div>
					<label className="mb-1.5 block text-sm text-gray-300">
						Description
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						rows={4}
						placeholder="Tell viewers about your video"
						className="w-full rounded-lg border border-gray-700 bg-[#121212] px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-red-600 resize-none"
					/>
				</div>

				{/* Thumbnail */}
				<div>
					<label className="mb-1.5 block text-sm text-gray-300">
						Thumbnail
					</label>

					{thumbnailPreview && (
						<div className="w-48 aspect-video rounded-lg overflow-hidden mb-3 bg-black">
							<img
								src={thumbnailPreview}
								alt="Thumbnail preview"
								className="w-full h-full object-cover"
							/>
						</div>
					)}

					<button
						type="button"
						onClick={() => thumbnailInputRef.current?.click()}
						className="px-4 py-2 rounded-full text-sm bg-[#272727] hover:bg-[#3f3f3f] transition-colors"
					>
						{thumbnailFile ? thumbnailFile.name : "Change thumbnail"}
					</button>
					<input
						ref={thumbnailInputRef}
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleThumbnailChange}
					/>
				</div>

				{/* Actions */}
				<div className="flex gap-3 justify-end pt-2">
					<button
						type="button"
						onClick={() => navigate(-1)}
						disabled={saving}
						className="px-4 py-2 rounded-full text-sm text-gray-300 border border-gray-600 hover:bg-gray-800 disabled:opacity-50"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={saving}
						className="px-4 py-2 rounded-full text-sm bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 flex items-center gap-2"
					>
						{saving ? (
							<>
								<LoadingOutlined /> Saving...
							</>
						) : (
							"Save changes"
						)}
					</button>
				</div>
			</form>
		</div>
	);
}

export default EditVideo;
