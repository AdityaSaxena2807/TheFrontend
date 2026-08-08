import React, { useState } from "react";
import Button from "../common/Button.jsx";
import { createPlaylist, updatePlaylist } from "../../services/playlistApi.js";
import { ToastError, ToastSuccess } from "../../Utils/ToastMessage.js";

function PlaylistForm({ isOpen, onClose, onSuccess, playlist }) {
	const isEditMode = Boolean(playlist);
	const [name, setName] = useState(playlist?.name || "");
	const [description, setDescription] = useState(playlist?.description || "");
	const [submitting, setSubmitting] = useState(false);

	if (!isOpen) return null;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name.trim()) return ToastError("Playlist name is required");

		setSubmitting(true);
		try {
			const payload = { name: name.trim(), description: description.trim() };
			const response = isEditMode
				? await updatePlaylist(playlist._id, payload)
				: await createPlaylist(payload);

			ToastSuccess(isEditMode ? "Playlist updated" : "Playlist created");
			onSuccess(response.data);
			onClose();
		} catch (err) {
			ToastError(
				err?.response?.data?.message ||
					(isEditMode
						? "Failed to update playlist"
						: "Failed to create playlist"),
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div
			className="fixed inset-0 bg-bg/70 flex items-center justify-center z-50"
			onClick={onClose}
		>
			<div
				className="bg-surface-elevated rounded-lg p-6 w-90 shadow-lg"
				onClick={(e) => e.stopPropagation()}
			>
				<p className="text-text-primary text-lg font-heading font-semibold mb-4">
					{isEditMode ? "Edit playlist" : "New playlist"}
				</p>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="mb-1.5 block text-sm text-text-secondary font-body">
							Name
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoFocus
							placeholder="My playlist"
							className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder-text-disabled outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors duration-hover"
						/>
					</div>

					<div>
						<label className="mb-1.5 block text-sm text-text-secondary font-body">
							Description
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows={3}
							placeholder="Description"
							className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder-text-disabled outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg resize-none transition-colors duration-hover"
						/>
					</div>

					<div className="flex gap-3 justify-end pt-1">
						<Button
							type="button"
							onClick={onClose}
							variant="secondary"
							className="text-sm"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={submitting}
							variant="primary"
							className="text-sm"
						>
							{submitting ? "Saving..." : isEditMode ? "Save" : "Create"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default PlaylistForm;
