import { useEffect, useState } from "react";
import {
  currentUser,
  updateAccount,
  updateAvatar,
  updateCoverImage,
} from "../services/userApi.js";
import { ToastError, ToastSuccess } from "../Utils/ToastMessage.js";
import ChangePasswordModal from "../components/common/ChangePasswordModal.jsx";

function Profile() {
  const [mode, setMode] = useState("view"); // "view" | "edit"
  const [pendingAvatarFile, setPendingAvatarFile] = useState(null);
  const [pendingAvatarPreview, setPendingAvatarPreview] = useState(null);
  const [pendingCoverFile, setPendingCoverFile] = useState(null);
  const [pendingCoverPreview, setPendingCoverPreview] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [savingAccount, setSavingAccount] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const handleCancelEdit = () => {
    setFullName(user.fullName || "");
    setEmail(user.email || "");
    setPendingAvatarFile(null);
    setPendingAvatarPreview(null);
    setPendingCoverFile(null);
    setPendingCoverPreview(null);
    setMode("view");
  };

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const response = await currentUser();
      setUser(response.data);
      setFullName(response.data.fullName || "");
      setEmail(response.data.email || "");
    } catch (error) {
      ToastError(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    if (!fullName || !email) {
      ToastError("All fields are required");
      return;
    }
    try {
      setSavingAccount(true);

      const response = await updateAccount({ fullName, email });
      let latestUser = response.data;

      if (pendingAvatarFile) {
        const formData = new FormData();
        formData.append("avatar", pendingAvatarFile);
        const avatarRes = await updateAvatar(formData);
        latestUser = avatarRes.data;
      }

      if (pendingCoverFile) {
        const formData = new FormData();
        formData.append("coverImage", pendingCoverFile);
        const coverRes = await updateCoverImage(formData);
        latestUser = coverRes.data;
      }

      setUser(latestUser);
      setPendingAvatarFile(null);
      setPendingAvatarPreview(null);
      setPendingCoverFile(null);
      setPendingCoverPreview(null);
      setMode("view");
      ToastSuccess("Profile updated successfully");
    } catch (error) {
      ToastError(error?.response?.data?.message || error?.message);
    } finally {
      setSavingAccount(false);
    }
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingAvatarFile(file);
    setPendingAvatarPreview(URL.createObjectURL(file));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingCoverFile(file);
    setPendingCoverPreview(URL.createObjectURL(file));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-white">
        <p>Could not load user details.</p>
        <button
          onClick={fetchDetails}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
        >
          Retry
        </button>
      </div>
    );
  }

  const isDirty =
    fullName !== user.fullName ||
    email !== user.email ||
    !!pendingAvatarFile ||
    !!pendingCoverFile;

  const displayCover = pendingCoverPreview || user.coverImage;
  const displayAvatar = pendingAvatarPreview || user.avatar;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:px-8">
      {mode === "view" ? (
        <>
          <h1 className="text-2xl font-semibold text-white mb-6">Profile</h1>

          <div className="relative w-full h-40 sm:h-56 bg-[#1a1a1a] rounded-lg overflow-hidden">
            {user.coverImage && (
              <img
                src={user.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="relative -mt-10 ml-4 w-20 h-20">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-20 h-20 rounded-full object-cover border-4 border-black bg-[#1a1a1a]"
            />
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                Full Name
              </p>
              <p className="text-white text-base">{user.fullName}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                Username
              </p>
              <p className="text-gray-400 text-base">@{user.username}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                Email
              </p>
              <p className="text-white text-base">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => setMode("edit")}
            className="mt-8 px-6 py-2 rounded-full bg-red-800 hover:bg-red-700 text-white"
          >
            Edit profile
          </button>

          <div className="mt-10 pt-6 border-t border-gray-800">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
              Security
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Update your password to keep your account secure.
            </p>
            <button
              onClick={() => setChangePasswordOpen(true)}
              className="px-5 py-2 rounded-full border border-gray-600 text-white text-sm hover:bg-[#1a1a1a] transition-colors"
            >
              Change password
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-white mb-6">
            Edit Profile
          </h1>

          <div className="relative w-full h-40 sm:h-56 bg-[#1a1a1a] rounded-lg overflow-hidden">
            {displayCover && (
              <img
                src={displayCover}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            )}
            <label className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-3 py-1.5 rounded-md cursor-pointer hover:bg-black/90 border border-gray-700">
              Change cover
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverChange}
              />
            </label>
          </div>

          <div className="relative -mt-10 ml-4 w-20 h-20">
            <img
              src={displayAvatar}
              alt={user.username}
              className="w-20 h-20 rounded-full object-cover border-4 border-black bg-[#1a1a1a]"
            />
            <label className="absolute bottom-0 right-0 bg-red-800 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-full cursor-pointer">
              Edit
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          <form onSubmit={handleAccountUpdate} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={user.username}
                disabled
                className="w-full bg-[#121212] border border-gray-800 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={savingAccount}
                className="px-6 py-2 rounded-full border border-gray-600 text-white hover:bg-[#1a1a1a] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isDirty || savingAccount}
                className="px-6 py-2 rounded-full bg-red-800 hover:bg-red-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {savingAccount ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </>
      )}

      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
    </div>
  );
}

export default Profile;
