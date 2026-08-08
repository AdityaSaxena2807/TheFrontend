import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Components/common/Navbar";
import { useAuthStore } from "../store/authStore";
const AuthLayout = () => {
	const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

	// If already logged in, no point showing login/register
	if (isLoggedIn) return <Navigate to="/" />;
	return (
		<div className="flex min-h-screen w-full flex-col bg-bg text-text-primary">
			<Navbar />
			<main className="flex flex-1">
				<Outlet />
			</main>
		</div>
	);
};
export default AuthLayout;
