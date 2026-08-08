import { Outlet } from "react-router-dom";
import Navbar from "../Components/common/Navbar";
import Sidebar from "../Components/common/Sidebar";
import { useUiStore } from "../store/uiStore";

const AppLayout = () => {
	const sidebarOpen = useUiStore((s) => s.sidebarOpen);

	return (
		<div className="min-h-screen bg-bg text-text-primary">
			<Navbar />

			<div className="flex pt-18">
				{/* Sidebar */}
				<Sidebar className="bg-surface text-text-primary shadow-md" />

				{/* Main content */}
				<main
					className={`flex-1 transition-all duration-300 ml-0 ${
						sidebarOpen ? "md:ml-65" : "md:ml-19"
					}`}
				>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AppLayout;
