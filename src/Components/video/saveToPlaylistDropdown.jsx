import React, { useEffect, useState } from "react";
import { getUserPlaylists, addVideoToPlaylist } from "../../services/playlistApi.js";
import { useAuthStore } from "../../store/authStore.js";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastError } from "../../Utils/ToastMessage.js";

function SaveToPlaylistDropdown({ videoId, onClose }) {
	const { user } = useAuthStore();
	const [playlists, setPlaylists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(null); // stores playlistId currently being saved

	useEffect(() => {
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
	}, []);

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

	return (
		<div className="bg-[#282828] rounded-xl shadow-xl w-56 py-2">
			<p className="text-xs text-gray-400 px-4 py-2 font-medium">Save to playlist</p>

			{loading ? (
				<div className="flex justify-center py-4">
					<LoadingOutlined className="text-white text-xl" />
				</div>
			) : playlists.length === 0 ? (
				<p className="text-xs text-gray-500 px-4 py-2">No playlists found.</p>
			) : (
				playlists.map((playlist) => (
					<button
						key={playlist._id}
						onClick={() => handleAdd(playlist._id)}
						disabled={saving === playlist._id}
						className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#3f3f3f] transition-colors duration-150 disabled:opacity-50"
					>
						{saving === playlist._id ? "Saving..." : playlist.name}
					</button>
				))
			)}
		</div>
	);
}

export default SaveToPlaylistDropdown;