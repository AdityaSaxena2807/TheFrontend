import {
  AppstoreOutlined,
  BellOutlined,
  DashboardOutlined,
  HomeOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";
import { useUiStore } from "../../store/uiStore.js";
import Duck from "../../assets/icons/Duck.gif";
function Sidebar() {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <>
      {/* Mobile backdrop — only shows when sidebar is open on small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => useUiStore.getState().setSidebar(false)}
        />
      )}
      <aside
        className={`
      fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] bg-[#121212] text-white
      shadow-lg shadow-black/50 overflow-auto
      transition-all duration-300
      ${sidebarOpen ? "w-64 translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16"}
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
          <NavLink
            to="/tweets"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded transition-colors
      ${isActive ? "bg-[#3636368c] text-white" : "text-gray-300 hover:bg-[#706e6e]"}`
            }
          >
            {sidebarOpen ? (
              <>
                <TwitterOutlined className="text-lg" />
                Tweets
              </>
            ) : (
              <TwitterOutlined className="text-lg" />
            )}
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/subscriptions"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded transition-colors
      ${isActive ? "bg-[#3636368c] text-white" : "text-gray-300 hover:bg-[#706e6e]"}`
              }
            >
              {sidebarOpen ? (
                <>
                  <BellOutlined className="text-lg" />
                  Subscriptions
                </>
              ) : (
                <BellOutlined className="text-lg" />
              )}
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              to="/settings/logo"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded transition-colors
      ${isActive ? "bg-[#3636368c] text-white" : "text-gray-300 hover:bg-[#706e6e]"}`
              }
            >
              {sidebarOpen ? (
                <>
                  <img src={Duck} alt="" className="w-5 h-5 object-contain" />
                  App Logo
                </>
              ) : (
                <img src={Duck} alt="" className="w-5 h-5 object-contain" />
              )}
            </NavLink>
          )}
          {/* Add more links here */}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
