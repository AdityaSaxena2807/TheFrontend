import React, { useState } from "react";
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
      console.log("Response:", response);
      console.log("response.data:", response.data);
      console.log("response.data.data:", response.data.data);
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
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1a1a] rounded-xl p-6 w-90"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-white text-base font-medium mb-4">
          {isEditMode ? "Edit playlist" : "New playlist"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-gray-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              placeholder="My playlist"
              className="w-full rounded-lg border border-gray-700 bg-[#121212] px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Description"
              className="w-full rounded-lg border border-gray-700 bg-[#121212] px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-red-600 resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-sm text-gray-300 border border-gray-600 hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-full text-sm bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
            >
              {submitting ? "Saving..." : isEditMode ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlaylistForm;
