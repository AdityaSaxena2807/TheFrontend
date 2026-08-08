import React, { useState, useRef, useEffect } from "react";
import Button from "../Components/common/Button.jsx";
import { useNavigate } from "react-router-dom";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { publishAVideo } from "../services/videoApi.js";
import { ToastError, ToastSuccess } from "../Utils/ToastMessage.js";

function Upload() {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const thumbnailInputRef = useRef(null);
  const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateVideo(file);
  };
  const validateVideo = (file) => {
    if (!file) return false;

    if (!file.type.startsWith("video/")) {
      ToastError("Please select a valid video file.");
      return false;
    }

    if (file.size > MAX_VIDEO_SIZE) {
      ToastError("Video size must be 100 MB or less.");
      return false;
    }

    setVideoFile(file);
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return ToastError("Please select a video file");
    if (!thumbnailFile) return ToastError("Please select a thumbnail image");
    if (!title.trim()) return ToastError("Title is required");
    if (!description.trim()) return ToastError("Description is required");
    if (videoFile.size > MAX_VIDEO_SIZE) {
      return ToastError("Video size must be 100 MB or less.");
    }
    const formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnailFile);
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("visibility", visibility);

    try {
      setUploading(true);
      const response = await publishAVideo(formData, (percent) =>
        setProgress(percent),
      );
      ToastSuccess("Video published successfully");
      navigate(`/watch/${response.data._id}`);
    } catch (err) {
      ToastError(err?.response?.data?.message || "Failed to publish video");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };
  useEffect(() => {
    return () => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-text-primary">
      <h1 className="text-xl font-heading font-semibold mb-6">Upload a Video</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Drag & drop video */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center text-center transition-colors duration-hover ${
            dragActive ? "border-terracotta bg-terracotta/5" : "border-border"
          }`}
        >
          <InboxOutlined className="text-4xl text-text-disabled mb-2" />
          {videoFile ? (
            <p className="text-sm text-text-secondary">{videoFile.name}</p>
          ) : (
            <>
              <p className="text-sm text-text-secondary">
                Drag & drop video file here
              </p>
              <label className="mt-2 text-sm text-terracotta cursor-pointer hover:underline">
                or Browse files
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) validateVideo(file);
                  }}
                />
              </label>
            </>
          )}
        </div>

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

          <div className="space-y-3">
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="w-full max-w-sm h-44 rounded-md object-cover border border-border"
              />
            )}

            <Button
              type="button"
              onClick={() => thumbnailInputRef.current?.click()}
              variant="secondary"
              className="rounded-full text-sm"
            >
              {thumbnailFile ? "Change thumbnail" : "Upload image"}
            </Button>

            <input
              ref={thumbnailInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                if (!file.type.startsWith("image/")) {
                  return ToastError("Please select a valid image.");
                }

                setThumbnailFile(file);

                if (thumbnailPreview) {
                  URL.revokeObjectURL(thumbnailPreview);
                }

                setThumbnailPreview(URL.createObjectURL(file));
              }}
            />
          </div>
        </div>

        {/* Visibility */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-secondary font-body">
            Visibility
          </label>
          <div className="flex gap-4 text-sm text-text-secondary">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                checked={visibility === "public"}
                onChange={() => setVisibility("public")}
              />
              Public
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                checked={visibility === "private"}
                onChange={() => setVisibility("private")}
              />
              Private
            </label>
          </div>
        </div>

        {/* Progress bar */}
        {uploading && (
          <div className="w-full bg-surface border border-border rounded-full h-2 overflow-hidden">
            <div
              className="bg-terracotta h-2 transition-all duration-hover"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-2">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            disabled={uploading}
            variant="secondary"
            className="rounded-full text-sm"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={uploading}
            variant="primary"
            className="rounded-full text-sm flex items-center gap-2"
          >
            {uploading ? (
              <>
                <LoadingOutlined /> Publishing...
              </>
            ) : (
              "Publish ▶"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
