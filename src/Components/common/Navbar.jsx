import { MenuOutlined } from "@ant-design/icons";
import Modal from "./Modal.jsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userApi.js";
import { useAuthStore } from "../../store/authStore.js";
import { useUiStore } from "../../store/uiStore.js";
import { ToastError, ToastSuccess } from "../../Utils/ToastMessage.js";
import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar.jsx";
function Navbar() {
	const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
	const user = useAuthStore((s) => s.user);
	const clearAuth = useAuthStore((state) => state.clearAuth);
	const navigate = useNavigate();
	const [logoutModalOpen, setLogoutModalOpen] = useState(false);
	return (
		<nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-black px-6 py-3 shadow-lg shadow-black/50">
			{/* Sidebar toggle */}
			<button
				onClick={useUiStore.getState().toggleSidebar}
				className="text-white text-2xl px-3 py-1 hover:bg-[#282828] rounded transition"
			>
				<MenuOutlined />
			</button>
			<div className="flex-1 mx-4">
				<Logo />
			</div>

			{/* Search */}
			<div className="flex-1 mx-4">
				<SearchBar />
			</div>

			{/* Right section */}
			<div className="flex items-center gap-4">
				{isLoggedIn ? (
					<>
						<Link
							to="/upload"
							className="px-4 py-2 rounded hover:bg-[#706e6e] text-white font-semibold transition"
						>
							Upload
						</Link>
						<button
							className="px-4 py-2 rounded hover:bg-[#706e6e] text-white font-semibold transition"
							onClick={() => setLogoutModalOpen(true)}
						>
							LogOut
						</button>
						<button className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#050505] hover:border-[#666363] transition">
							<img
								src={user?.avatar}
								alt={user?.username}
								className="w-full h-full object-cover"
							/>
						</button>
					</>
				) : (
					<Link
						to="/login"
						className="px-4 py-2 rounded hover:bg-[#706e6e] text-white font-semibold transition"
					>
						Login
					</Link>
				)}
			</div>
			<Modal
				title="Log out?"
				open={logoutModalOpen}
				onCancel={() => setLogoutModalOpen(false)}
				onOk={async () => {
					try {
						await logoutUser();
						clearAuth();
						setLogoutModalOpen(false);
						ToastSuccess("Logged out successfully");
						navigate("/");
						window.location.reload();
					} catch (error) {
						ToastError(error?.response?.data?.message || "Logout failed");
						setLogoutModalOpen(false);
					}
				}}
				okText="Log out"
				cancelText="Cancel"
			>
				Are you sure you want to log out?
			</Modal>
		</nav>
	);
}

export default Navbar;
