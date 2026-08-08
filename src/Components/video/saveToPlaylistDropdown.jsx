import React, { useEffect, useState, useRef } from "react";
import {
	getUserPlaylists,
	addVideoToPlaylist,
} from "../../services/playlistApi.js";
import { useAuthStore } from "../../store/authStore.js";
import Button from "../common/Button.jsx";

import { LoadingOutlined } from "@ant-design/icons";
import { ToastError } from "../../Utils/ToastMessage.js";

function SaveToPlaylistDropdown({ videoId, onClose }) {
	const { user } = useAuthStore();
	const [playlists, setPlaylists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(null); // stores playlistId currently being saved
	const dropdownRef = useRef(null);

	useEffect(() => {
		if (!user?._id) return;

		const fetchPlaylists = async () => {
			try {
				const response = await getUserPlaylists(user._id);
				setPlaylists(response.data);
			} catch (err) {
				ToastError("Failed to load playlists");
			} finally {
				setLoading(false);
			}
		};

		fetchPlaylists();
	}, [user?._id]);

	const handleAdd = async (playlistId) => {
		setSaving(playlistId);
		try {
			await addVideoToPlaylist(videoId, playlistId);
			onClose();
		} catch (err) {
			ToastError("Failed to save to playlist");
		} finally {
			setSaving(null);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);

	return (
		<div
			ref={dropdownRef}
			className="bg-surface-elevated rounded-md shadow-md w-56 py-2 border border-border"
		>
			<p className="text-xs text-text-secondary px-4 py-2 font-body font-medium">
				Save to playlist
			</p>

			{loading ? (
				<div className="flex justify-center py-4">
					<LoadingOutlined className="text-text-primary text-xl" />
				</div>
			) : playlists.length === 0 ? (
				<p className="text-xs text-text-secondary px-4 py-2">
					No playlists found.
				</p>
			) : (
				playlists.map((playlist) => (
					<Button
						key={playlist._id}
						onClick={() => handleAdd(playlist._id)}
						disabled={saving === playlist._id}
						variant="ghost"
						className="w-full justify-start text-left px-4 py-2 text-sm text-text-primary hover:bg-surface transition-colors duration-hover disabled:opacity-50"
					>
						{saving === playlist._id ? "Saving..." : playlist.name}
					</Button>
				))
			)}
		</div>
	);
}

export default SaveToPlaylistDropdown;
