import { useEffect, useState } from "react";
import Button from "../Components/common/Button.jsx";
import { useNavigate, Link } from "react-router-dom";
import { ToastError, ToastSuccess } from "../Utils/ToastMessage.js";
import axiosInstance from "../services/axiosInstance.js";
import { SECURITY_QUESTIONS } from "../Utils/securityQuestions.js";

function Register() {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		fullName: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
		securityQuestion: SECURITY_QUESTIONS[0],
		securityAnswer: "",
	});
	const [files, setFiles] = useState({ avatar: null, coverImage: null });
	const [previews, setPreviews] = useState({
		avatar: null,
		coverImage: null,
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e) => {
		const { name, files: fileList } = e.target;

		if (!fileList[0]) return;

		const file = fileList[0];

		setFiles((prev) => ({
			...prev,
			[name]: file,
		}));

		setPreviews((prev) => {
			if (prev[name]) URL.revokeObjectURL(prev[name]);

			return {
				...prev,
				[name]: URL.createObjectURL(file),
			};
		});
	};
	useEffect(() => {
		return () => {
			Object.values(previews).forEach((url) => {
				if (url) URL.revokeObjectURL(url);
			});
		};
	}, [previews]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!userData.fullName ||
			!userData.email ||
			!userData.username ||
			!userData.password
		)
			return ToastError("All fields are required");
		if (userData.password !== userData.confirmPassword)
			return ToastError("Passwords do not match!");
		if (!userData.securityAnswer.trim())
			return ToastError("Security answer is required");
		if (!files.avatar || !files.coverImage)
			return ToastError("Avatar and cover image are required");

		const data = new FormData();
		Object.entries(userData).forEach(([key, value]) => data.append(key, value));
		data.append("avatar", files.avatar);
		data.append("coverImage", files.coverImage);

		try {
			await axiosInstance.post("/api/v1/users/register", data);
			ToastSuccess("Account created! Please log in.");
			navigate("/login");
		} catch (error) {
			ToastError(
				error?.response?.data?.message ||
					error?.message ||
					"Registration failed",
			);
		}
	};

	const inputClass =
		"w-full rounded-sm border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-disabled outline-none transition duration-hover focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg";
	const labelClass =
		"mb-1.5 block text-sm font-medium text-text-secondary font-body";

	return (
		<div className="flex w-full flex-1 items-center justify-center bg-bg px-6 py-12">
			<div className="w-full max-w-md">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-heading font-bold tracking-tight text-text-primary">
						Create an account
					</h1>
					<p className="mt-2 text-sm text-text-secondary font-body">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-medium text-terracotta hover:text-ember transition-colors duration-hover"
						>
							Login
						</Link>
					</p>
				</div>

				<div className="rounded-lg border border-border bg-surface-elevated p-8 shadow-lg">
					<form onSubmit={handleSubmit} className="space-y-5">
						<div>
							<label className={labelClass}>Full name</label>
							<input
								type="text"
								name="fullName"
								value={userData.fullName}
								onChange={handleChange}
								placeholder="Jane Doe"
								className={inputClass}
							/>
						</div>

						<div>
							<label className={labelClass}>Email</label>
							<input
								type="email"
								name="email"
								value={userData.email}
								onChange={handleChange}
								placeholder="jane@example.com"
								className={inputClass}
							/>
						</div>

						<div>
							<label className={labelClass}>Username</label>
							<input
								type="text"
								name="username"
								value={userData.username}
								onChange={handleChange}
								placeholder="janedoe"
								className={inputClass}
							/>
						</div>

						<div>
							<label className={labelClass}>Password</label>
							<input
								type="password"
								name="password"
								value={userData.password}
								onChange={handleChange}
								placeholder="••••••••"
								className={inputClass}
							/>
						</div>

						<div>
							<label className={labelClass}>Confirm password</label>
							<input
								type="password"
								name="confirmPassword"
								value={userData.confirmPassword}
								onChange={handleChange}
								placeholder="••••••••"
								className={inputClass}
							/>
						</div>

						<div>
							<label className={labelClass}>Security question</label>
							<select
								name="securityQuestion"
								value={userData.securityQuestion}
								onChange={handleChange}
								className={inputClass}
							>
								{SECURITY_QUESTIONS.map((question) => (
									<option key={question} value={question}>
										{question}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className={labelClass}>Answer</label>
							<input
								type="text"
								name="securityAnswer"
								value={userData.securityAnswer}
								onChange={handleChange}
								placeholder="Your answer"
								className={inputClass}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							{/* Avatar */}
							<div>
								<label className={labelClass}>Avatar</label>

								<label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border bg-surface transition duration-hover hover:border-terracotta">
									{previews.avatar ? (
										<>
											<img
												src={previews.avatar}
												alt="Avatar Preview"
												className="h-16 w-16 rounded-full object-cover border border-border"
											/>
											<span className="mt-2 max-w-[90%] truncate text-xs text-text-secondary font-body">
												{files.avatar?.name}
											</span>
										</>
									) : (
										<>
											<div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-border text-text-disabled text-xs">
												+
											</div>

											<span className="mt-2 text-xs text-text-secondary font-body">
												Click to upload
											</span>
										</>
									)}

									<input
										type="file"
										name="avatar"
										accept="image/*"
										onChange={handleFileChange}
										className="hidden"
									/>
								</label>
							</div>

							{/* Cover Image */}
							<div>
								<label className={labelClass}>Cover image</label>

								<label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border bg-surface transition duration-hover hover:border-terracotta overflow-hidden">
									{previews.coverImage ? (
										<>
											<img
												src={previews.coverImage}
												alt="Cover Preview"
												className="h-16 w-full object-cover"
											/>
											<span className="mt-2 max-w-[90%] truncate text-xs text-text-secondary font-body">
												{files.coverImage?.name}
											</span>
										</>
									) : (
										<>
											<div className="h-16 w-[90%] rounded-md border-2 border-dashed border-border flex items-center justify-center text-text-disabled text-xs">
												Cover Preview
											</div>

											<span className="mt-2 text-xs text-text-secondary font-body">
												Click to upload
											</span>
										</>
									)}

									<input
										type="file"
										name="coverImage"
										accept="image/*"
										onChange={handleFileChange}
										className="hidden"
									/>
								</label>
							</div>
						</div>

						<Button type="submit" variant="primary" className="mt-2 w-full">
							Create account
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Register;
