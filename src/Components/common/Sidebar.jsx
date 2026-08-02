import { AppstoreOutlined, DashboardOutlined, HomeOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";
import { useUiStore } from "../../store/uiStore.js";
function Sidebar() {
	const sidebarOpen = useUiStore((s) => s.sidebarOpen);
	const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

	return (
		<aside
			className={`
    fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] bg-[#121212] text-white
    shadow-lg shadow-black/50 overflow-auto
    transition-all duration-300
    ${sidebarOpen ? "w-64" : "w-16"}
  `}
		>
			<nav className="flex flex-col mt-10 space-y-2 px-2">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`flex items-center gap-3 px-4 py-2 rounded transition-colors
        ${isActive ? "bg-[#3636368c] text-white" : "text-gray-300 hover:bg-[#706e6e]"}`
					}
				>
					{sidebarOpen ? (
						<>
							<HomeOutlined className="text-lg" />
							Home
						</>
					) : (
						<HomeOutlined className="text-lg" />
					)}
				</NavLink>
				{isLoggedIn && (
					<NavLink
						to="/library"
						className={({ isActive }) =>
							`flex items-center gap-3 px-4 py-2 rounded transition-colors
          ${isActive ? "bg-[#3636368c] text-white" : "text-gray-300 hover:bg-[#706e6e]"}`
						}
					>
						{sidebarOpen ? (
							<>
								<AppstoreOutlined className="text-lg" />
								Library
							</>
						) : (
							<AppstoreOutlined className="text-lg" />
						)}
					</NavLink>
				)}
				{isLoggedIn && (
					<NavLink
						to="/dashboard"
						className={({ isActive }) =>
							`flex items-center gap-3 px-4 py-2 rounded transition-colors
      ${isActive ? "bg-[#3636368c] text-white" : "text-gray-300 hover:bg-[#706e6e]"}`
						}
					>
						{sidebarOpen ? (
							<>
								<DashboardOutlined className="text-lg" />
								Dashboard
							</>
						) : (
							<DashboardOutlined className="text-lg" />
						)}
					</NavLink>
				)}
				{/* Add more links here */}
			</nav>
		</aside>
	);
}

export default Sidebar;
