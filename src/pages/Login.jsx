import { useState } from "react";
import Button from "../Components/common/Button.jsx";
import { loginUser } from "../services/userApi.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { ToastError, ToastSuccess } from "../Utils/ToastMessage.js";

function Login() {
	const [userData, setUserData] = useState({
		identifier: "",
		password: "",
	});
	const navigate = useNavigate();
	const setAuth = useAuthStore((state) => state.setAuth);
	//here setAuth is a function from the auth store that updates the authentication state with the user information and access token after a successful login.
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!userData.identifier.trim())
			return ToastError("Username or email is required");
		if (!userData.password) return ToastError("Password is required");

		const identifier = userData.identifier.trim();
		const payload = {
			password: userData.password,
			...(identifier.includes("@")
				? { email: identifier }
				: { username: identifier }),
		};

		try {
			const data = await loginUser(payload);
			setAuth(data.data.user, data.data.accessToken);
			// After a successful login, the setAuth function is called with the user information and access token to update the authentication
			// state in the application. This allows other parts of the app to recognize that the user is logged in and have access to their information.
			ToastSuccess("Logged in successfully!");
			navigate("/");
		} catch (error) {
			ToastError(error?.response?.data?.message || "Login failed");
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
					<h1 className="text-4xl font-heading font-bold tracking-tight text-text-primary">
						Welcome Back
					</h1>
					<p className="mt-2 text-sm text-text-secondary font-body">
						Don't have an account?{" "}
						<Link
							to="/register"
							className="font-medium text-terracotta hover:text-ember transition-colors duration-hover"
						>
							Register
						</Link>
					</p>
				</div>

				<div className="rounded-lg border border-border bg-surface-elevated p-8 shadow-lg">
					<form onSubmit={handleSubmit} className="space-y-5">
						<div>
							<label className={labelClass}>Username or Email</label>
							<input
								type="text"
								name="identifier"
								value={userData.identifier}
								onChange={handleChange}
								placeholder="janedoe or jane@example.com"
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
						<div className="text-right">
							<Link
								to="/forgot-password"
								className="text-sm font-medium text-terracotta hover:text-ember transition-colors duration-hover"
							>
								Forgot password?
							</Link>
						</div>
						<Button type="submit" variant="primary" className="mt-2 w-full">
							Login
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
