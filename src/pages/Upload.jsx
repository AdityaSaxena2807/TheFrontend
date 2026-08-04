import React, { useState, useRef } from "react";
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-white">
      <h1 className="text-xl font-semibold mb-6">Upload a Video</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Drag & drop video */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors ${
            dragActive ? "border-red-500 bg-red-500/5" : "border-gray-700"
          }`}
        >
          <InboxOutlined className="text-4xl text-gray-500 mb-2" />
          {videoFile ? (
            <p className="text-sm text-gray-300">{videoFile.name}</p>
          ) : (
            <>
              <p className="text-sm text-gray-400">
                Drag & drop video file here
              </p>
              <label className="mt-2 text-sm text-red-500 cursor-pointer hover:underline">
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
          <button
            type="button"
            onClick={() => thumbnailInputRef.current?.click()}
            className="px-4 py-2 rounded-full text-sm bg-[#272727] hover:bg-[#3f3f3f] transition-colors"
          >
            {thumbnailFile ? thumbnailFile.name : "Upload image"}
          </button>
          <input
            ref={thumbnailInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* Visibility */}
        <div>
          <label className="mb-1.5 block text-sm text-gray-300">
            Visibility
          </label>
          <div className="flex gap-4 text-sm">
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
          <div className="w-full bg-[#272727] rounded-full h-2 overflow-hidden">
            <div
              className="bg-red-600 h-2 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={uploading}
            className="px-4 py-2 rounded-full text-sm text-gray-300 border border-gray-600 hover:bg-gray-800 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="px-4 py-2 rounded-full text-sm bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 flex items-center gap-2"
          >
            {uploading ? (
              <>
                <LoadingOutlined /> Publishing...
              </>
            ) : (
              "Publish ▶"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
