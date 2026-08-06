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
          className={`flex-1 transition-all duration-200 ml-0 ${
            sidebarOpen ? "md:ml-64" : "md:ml-16"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
