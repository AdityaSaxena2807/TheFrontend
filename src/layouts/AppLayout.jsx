import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { useUiStore } from "../store/uiStore";

const AppLayout = () => {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="flex pt-16">
        {/* pt-16 pushes content below fixed navbar */}

        <Sidebar />

        <main
          className={`flex-1 transition-all duration-200 ${sidebarOpen ? "ml-64" : "ml-16"}`}
        >
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
