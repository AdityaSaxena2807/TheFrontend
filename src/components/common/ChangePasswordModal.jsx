import React, { useState } from "react";
import Button from "./Button.jsx";
import { changePassword } from "../../services/userApi.js";
import { ToastError, ToastSuccess } from "../../utils/ToastMessage.js";

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
			className="fixed inset-0 bg-bg/70 flex items-center justify-center z-100"
			onClick={onClose}
		>
			<div
				className="bg-surface-elevated rounded-lg p-6 w-90 border border-border shadow-lg"
				onClick={(e) => e.stopPropagation()}
			>
				<p className="text-text-primary text-base font-medium mb-4">
					Change password
				</p>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="mb-1.5 block text-sm font-medium text-text-secondary font-body">
							Current password
						</label>
						<input
							type="password"
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							className="w-full rounded-sm border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-disabled outline-none transition duration-hover focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
						/>
					</div>

					<div>
						<label className="mb-1.5 block text-sm font-medium text-text-secondary font-body">
							New password
						</label>
						<input
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="w-full rounded-sm border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-disabled outline-none transition duration-hover focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
						/>
					</div>

					<div>
						<label className="mb-1.5 block text-sm font-medium text-text-secondary font-body">
							Confirm new password
						</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full rounded-sm border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-disabled outline-none transition duration-hover focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
						/>
					</div>

					<div className="flex gap-3 justify-end pt-1">
						<Button
							type="button"
							onClick={() => {
								reset();
								onClose();
							}}
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
							className="rounded-full text-sm"
						>
							{saving ? "Saving..." : "Change password"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ChangePasswordModal;
