import React, { useEffect, useState, useCallback } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastError } from "../../utils/ToastMessage.js";
import { getUserPlaylists } from "../../services/playlistApi.js";
import { useAuthStore } from "../../store/authStore.js";
import Button from "../common/Button.jsx";
import PlaylistCard from "../playlist/PlaylistCard.jsx";
import PlaylistForm from "../playlist/PlaylistForm.jsx";
import EmptyState from "../common/EmptyState.jsx";

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
        <LoadingOutlined className="text-text-primary text-3xl" />
      </div>
    );
  }

  return (
    <div>
      <Button
        onClick={() => setShowForm(true)}
        variant="primary"
        className="mb-4"
      >
        + New Playlist
      </Button>

      {playlists.length === 0 ? (
        <EmptyState
          title="No playlists yet"
          subtitle="Create one to start saving videos"
        />
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
