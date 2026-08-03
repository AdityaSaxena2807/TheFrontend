import React, { useState } from "react";
import { changePassword } from "../../services/userApi.js";
import { ToastError, ToastSuccess } from "../../Utils/ToastMessage.js";

function ChangePasswordModal({ open, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const reset = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      return ToastError("All fields are required");
    }
    if (newPassword !== confirmPassword) {
      return ToastError("New passwords do not match");
    }

    try {
      setSaving(true);
      await changePassword({ oldPassword, newPassword });
      ToastSuccess("Password changed successfully");
      reset();
      onClose();
    } catch (error) {
      ToastError(error?.response?.data?.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-100"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1a1a] rounded-xl p-6 w-90"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-white text-base font-medium mb-4">Change password</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Current password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-[#121212] px-3 py-2 text-sm text-white outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-[#121212] px-3 py-2 text-sm text-white outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Confirm new password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-[#121212] px-3 py-2 text-sm text-white outline-none focus:border-red-600"
            />
          </div>

          <div className="flex gap-3 justify-end pt-1">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              disabled={saving}
              className="px-4 py-2 rounded-full text-sm text-gray-300 border border-gray-600 hover:bg-gray-800 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-full text-sm bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Change password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
