import { useEffect, useState } from "react";
import Button from "../components/common/Button.jsx";
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
			<div className="flex justify-center items-center h-64 text-text-primary">
				Loading...
			</div>
		);
	}

	if (!user) {
		return (
			<div className="flex flex-col items-center justify-center h-64 gap-3 text-text-primary">
				<p>Could not load user details.</p>
				<Button onClick={fetchDetails} variant="primary" className="px-6 py-2">
					Retry
				</Button>
			</div>
		);
	}

	const isDirty =
		fullName !== user.fullName ||
		email !== user.email ||
		!!pendingAvatarFile ||
		!!pendingCoverFile;

	const displayCover =
		pendingCoverPreview || user.coverImage?.url || user.coverImage;
	const displayAvatar = pendingAvatarPreview || user.avatar?.url || user.avatar;

	return (
		<div className="max-w-2xl mx-auto px-6 sm:px-12 lg:px-20 py-6">
			{mode === "view" ? (
				<>
					<h1 className="text-2xl font-heading font-semibold text-text-primary mb-6">
						Profile
					</h1>

					<div className="relative w-full h-40 sm:h-56 bg-surface rounded-md overflow-hidden">
						{(typeof user.coverImage === "string"
							? user.coverImage
							: user.coverImage?.url) && (
							<img
								src={
									typeof user.coverImage === "string"
										? user.coverImage
										: user.coverImage?.url
								}
								alt="Cover"
								className="w-full h-full object-cover"
							/>
						)}
					</div>

					<div className="relative -mt-10 ml-4 w-20 h-20">
						<img
							src={
								typeof user.avatar === "string" ? user.avatar : user.avatar?.url
							}
							alt={user.username}
							className="w-20 h-20 rounded-full object-cover border-4 border-bg bg-surface"
						/>
					</div>

					<div className="mt-6 space-y-5">
						<div>
							<p className="text-xs uppercase tracking-wide text-text-disabled mb-1 font-body">
								Full Name
							</p>
							<p className="text-text-primary text-base font-body">
								{user.fullName}
							</p>
						</div>
						<div>
							<p className="text-xs uppercase tracking-wide text-text-disabled mb-1 font-body">
								Username
							</p>
							<p className="text-text-secondary text-base font-body">
								@{user.username}
							</p>
						</div>
						<div>
							<p className="text-xs uppercase tracking-wide text-text-disabled mb-1 font-body">
								Email
							</p>
							<p className="text-text-primary text-base font-body">
								{user.email}
							</p>
						</div>
					</div>

					<Button
						onClick={() => setMode("edit")}
						variant="primary"
						className="mt-8 px-6 py-2"
					>
						Edit profile
					</Button>

					<div className="mt-10 pt-6 border-t border-border">
						<p className="text-xs uppercase tracking-wide text-text-disabled mb-1 font-body">
							Security
						</p>
						<p className="text-text-secondary text-sm mb-4 font-body">
							Update your password to keep your account secure.
						</p>
						<Button
							onClick={() => setChangePasswordOpen(true)}
							variant="secondary"
							className="px-5 py-2 text-sm"
						>
							Change password
						</Button>
					</div>
				</>
			) : (
				<>
					<h1 className="text-2xl font-heading font-semibold text-text-primary mb-6">
						Edit Profile
					</h1>

					<div className="relative w-full h-40 sm:h-56 bg-surface rounded-md overflow-hidden">
						{displayCover && (
							<img
								src={displayCover}
								alt="Cover"
								className="w-full h-full object-cover"
							/>
						)}
						<label className="absolute bottom-3 right-3 bg-bg/70 text-text-primary text-sm px-3 py-1.5 rounded-sm cursor-pointer hover:bg-bg/90 border border-border transition-colors duration-hover">
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
							className="w-20 h-20 rounded-full object-cover border-4 border-bg bg-surface"
						/>
						<label className="absolute bottom-0 right-0 bg-terracotta hover:bg-ember text-on-accent text-xs px-2 py-1 rounded-full cursor-pointer transition-colors duration-hover font-semibold">
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
							<label className="block text-sm text-text-secondary mb-2 font-body">
								Full Name
							</label>
							<input
								type="text"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								className="w-full bg-surface border border-border rounded-sm px-4 py-3 text-text-primary placeholder-text-disabled outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors duration-hover"
							/>
						</div>

						<div>
							<label className="block text-sm text-text-secondary mb-2 font-body">
								Username
							</label>
							<input
								type="text"
								value={user.username}
								disabled
								className="w-full bg-surface-elevated border border-border rounded-sm px-4 py-3 text-text-disabled cursor-not-allowed"
							/>
						</div>

						<div>
							<label className="block text-sm text-text-secondary mb-2 font-body">
								Email
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full bg-surface border border-border rounded-sm px-4 py-3 text-text-primary placeholder-text-disabled outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors duration-hover"
							/>
						</div>

						<div className="flex gap-3 pt-2">
							<Button
								type="button"
								onClick={handleCancelEdit}
								disabled={savingAccount}
								variant="secondary"
								className="px-6 py-2"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={!isDirty || savingAccount}
								variant="primary"
								className="px-6 py-2"
							>
								{savingAccount ? "Saving..." : "Save changes"}
							</Button>
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
