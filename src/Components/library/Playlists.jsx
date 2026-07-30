import React, { useEffect, useState, useCallback } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastError } from "../../Utils/ToastMessage.js";
import { getUserPlaylists } from "../../services/playlistApi.js";
import { useAuthStore } from "../../store/authStore.js";
import PlaylistCard from "../playlist/PlaylistCard.jsx";
import PlaylistForm from "../playlist/PlaylistForm.jsx";

function Playlists() {
  const user = useAuthStore((state) => state.user);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchPlaylists = useCallback(async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const response = await getUserPlaylists(user._id);
      setPlaylists(response.data || []);
    } catch (err) {
      ToastError("Failed to load playlists");
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingOutlined className="text-white text-3xl" />
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 px-4 py-2 bg-red-800 hover:bg-red-900 text-white text-sm rounded-lg transition-colors"
      >
        + New Playlist
      </button>

      {playlists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <p className="text-lg">No playlists yet</p>
          <p className="text-sm mt-1">Create one to start saving videos</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      )}

      <PlaylistForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSuccess={fetchPlaylists}
      />
    </div>
  );
}

export default Playlists;
