import { NavLink } from "react-router-dom";
import { useUiStore } from "../../store/uiStore.js";
import { HomeOutlined } from "@ant-design/icons";
function Sidebar() {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);

  return (
    <aside
      className={`
    fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] bg-[#121212] text-white
    shadow-lg shadow-black/50 overflow-auto
    transition-all duration-300
    ${sidebarOpen ? "w-64" : "w-16"}
  `}
    >
      <nav className="flex flex-col mt-4 space-y-2 px-2">
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
        {/* <NavLink
          to="/shorts"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded transition-colors
        ${isActive ? "bg-[#3636368c] text-white" : "text-gray-300 hover:bg-[#706e6e]"}`
          }
        >
          {sidebarOpen ? "Shorts" : <VideoCameraOutlined className="text-lg" />}
        </NavLink> */}

        {/* Add more links here */}
      </nav>
    </aside>
  );
}

export default Sidebar;
