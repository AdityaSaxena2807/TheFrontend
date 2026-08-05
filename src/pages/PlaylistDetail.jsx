import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LoadingOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  getPlaylistById,
  deletePlaylist,
  removeVideoFromPlaylist,
} from "../services/playlistApi.js";
import { ToastError, ToastSuccess } from "../Utils/ToastMessage.js";
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
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-[#3f3f3f] hover:text-white transition-all duration-150"
      >
        <MoreOutlined className="text-lg" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-[#282828] border border-[#3f3f3f] rounded-xl shadow-2xl overflow-hidden z-30">
          <button
            onClick={() => {
              setOpen(false);
              onRemove();
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-[#3f3f3f] transition-colors"
          >
            Remove from playlist
          </button>
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
        <LoadingOutlined className="text-white text-3xl" />
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-lg">Playlist not found</p>
      </div>
    );
  }

  const coverThumbnail = typeof playlist.videos?.[0]?.thumbnail === "string"
    ? playlist.videos?.[0]?.thumbnail
    : playlist.videos?.[0]?.thumbnail?.url;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-white flex gap-6 flex-col md:flex-row">
      {/* Playlist sidebar */}
      <div className="md:w-72 shrink-0">
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-[#1a1a1a]">
          {coverThumbnail ? (
            <img
              src={coverThumbnail}
              alt={playlist.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
              No videos yet
            </div>
          )}
        </div>

        <h1 className="mt-4 text-xl font-semibold">{playlist.name}</h1>
        {playlist.description && (
          <p className="mt-1 text-sm text-gray-400">{playlist.description}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          {playlist.videos?.length || 0}{" "}
          {playlist.videos?.length === 1 ? "video" : "videos"}
        </p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setShowEditForm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-[#272727] hover:bg-[#3f3f3f] transition-colors"
          >
            <EditOutlined /> Edit
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-[#272727] hover:bg-red-900/40 text-red-400 transition-colors"
          >
            <DeleteOutlined /> Delete
          </button>
        </div>
      </div>

      {/* Video list */}
      <div className="flex-1 min-w-0">
        {!playlist.videos || playlist.videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
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
