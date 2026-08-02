import React, { useEffect, useState } from "react";
import {
	currentUser,
	updateAccount,
	updateAvatar,
	updateCoverImage,
} from "../services/userApi.js";
import { ToastError, ToastSuccess } from "../Utils/ToastMessage.js";

function UserDetails() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [savingAccount, setSavingAccount] = useState(false);

	const [uploadingAvatar, setUploadingAvatar] = useState(false);
	const [uploadingCover, setUploadingCover] = useState(false);

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
			setUser(response.data);
			ToastSuccess("Account details updated successfully");
		} catch (error) {
			ToastError(error?.response?.data?.message || error?.message);
		} finally {
			setSavingAccount(false);
		}
	};

	const handleAvatarChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("avatar", file);

		try {
			setUploadingAvatar(true);
			const response = await updateAvatar(formData);
			setUser(response.data);
			ToastSuccess("Avatar updated successfully");
		} catch (error) {
			ToastError(error?.response?.data?.message || error?.message);
		} finally {
			setUploadingAvatar(false);
			e.target.value = "";
		}
	};

	const handleCoverChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("coverImage", file);

		try {
			setUploadingCover(true);
			const response = await updateCoverImage(formData);
			setUser(response.data);
			ToastSuccess("Cover image updated successfully");
		} catch (error) {
			ToastError(error?.response?.data?.message || error?.message);
		} finally {
			setUploadingCover(false);
			e.target.value = "";
		}
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

	const isDirty = fullName !== user.fullName || email !== user.email;

	return (
		<div className="max-w-2xl mx-auto px-4 py-6 sm:px-8">
			<h1 className="text-2xl font-semibold text-white mb-6">Edit Profile</h1>

			{/* Cover image */}
			<div className="relative w-full h-40 sm:h-56 bg-[#1a1a1a] rounded-lg overflow-hidden">
				{user.coverImage && (
					<img
						src={user.coverImage}
						alt="Cover"
						className="w-full h-full object-cover"
					/>
				)}
				<label className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-3 py-1.5 rounded-md cursor-pointer hover:bg-black/90 border border-gray-700">
					{uploadingCover ? "Uploading..." : "Change cover"}
					<input
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleCoverChange}
						disabled={uploadingCover}
					/>
				</label>
			</div>

			{/* Avatar */}
			<div className="relative -mt-10 ml-4 w-20 h-20">
				<img
					src={user.avatar}
					alt={user.username}
					className="w-20 h-20 rounded-full object-cover border-4 border-black bg-[#1a1a1a]"
				/>
				<label className="absolute bottom-0 right-0 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-full cursor-pointer">
					{uploadingAvatar ? "..." : "Edit"}
					<input
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleAvatarChange}
						disabled={uploadingAvatar}
					/>
				</label>
			</div>

			{/* Account details form */}
			<form onSubmit={handleAccountUpdate} className="mt-8 space-y-6">
				<div>
					<label className="block text-sm text-gray-300 mb-2">Full Name</label>
					<input
						type="text"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-500"
					/>
				</div>

				<div>
					<label className="block text-sm text-gray-300 mb-2">Username</label>
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
						onClick={() => {
							setFullName(user.fullName || "");
							setEmail(user.email || "");
						}}
						disabled={!isDirty || savingAccount}
						className="px-6 py-2 rounded-full border border-gray-600 text-white hover:bg-[#1a1a1a] disabled:opacity-40 disabled:cursor-not-allowed"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={!isDirty || savingAccount}
						className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
					>
						{savingAccount ? "Saving..." : "Save changes"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default UserDetails;
