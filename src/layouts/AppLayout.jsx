import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { useUiStore } from "../store/uiStore";

const AppLayout = () => {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar className="bg-[#121212] text-white shadow-lg shadow-black/50" />

        {/* Main content */}
        <main
          className={`flex-1 transition-all duration-200 ${
            sidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          <div className="p-6 bg-[#181818] rounded-lg shadow-inner shadow-black/40 min-h-[calc(100vh-4rem)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
