import React, { useState, useRef, useEffect } from "react";
import Button from "../Components/common/Button.jsx";
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
        setThumbnailPreview(
          typeof video.thumbnail === "string"
            ? video.thumbnail
            : video.thumbnail?.url,
        );
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
      <div className="flex items-center justify-center h-[60vh] bg-bg">
        <LoadingOutlined className="text-text-primary text-4xl" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-text-primary">
      <h1 className="text-xl font-heading font-semibold mb-6">Edit Video</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-secondary font-body">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a title that describes your video"
            className="w-full rounded-sm border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-disabled outline-none transition duration-hover focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-secondary font-body">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Tell viewers about your video"
            className="w-full rounded-sm border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-disabled outline-none transition duration-hover focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg resize-none"
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-secondary font-body">
            Thumbnail
          </label>

          {thumbnailPreview && (
            <div className="w-48 aspect-video rounded-md overflow-hidden mb-3 bg-surface border border-border">
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <Button
            type="button"
            onClick={() => thumbnailInputRef.current?.click()}
            variant="secondary"
            className="rounded-full text-sm"
          >
            {thumbnailFile ? thumbnailFile.name : "Change thumbnail"}
          </Button>
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
          <Button
            type="button"
            onClick={() => navigate(-1)}
            disabled={saving}
            variant="secondary"
            className="rounded-full text-sm"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving}
            variant="primary"
            className="rounded-full text-sm flex items-center gap-2"
          >
            {saving ? (
              <>
                <LoadingOutlined /> Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditVideo;
