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
          className="fixed inset-0 bg-bg/70 z-30 md:hidden"
          onClick={() => useUiStore.getState().setSidebar(false)}
        />
      )}
      <aside
        className={`
      fixed top-18 left-0 z-40 h-[calc(100vh-72px)] bg-surface text-text-primary
      overflow-auto
      transition-all duration-300
      ${sidebarOpen ? "w-65 translate-x-0" : "-translate-x-full md:translate-x-0 md:w-19"}
    `}
      >
        <nav className="flex flex-col mt-4 space-y-2 px-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-sm transition-colors duration-150 relative
        ${isActive ? "bg-terracotta/15 text-text-primary before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-terracotta before:rounded-r-sm" : "text-text-secondary hover:bg-surface-elevated"}`
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
                `flex items-center gap-3 px-4 py-3 rounded-sm transition-colors duration-150 relative
          ${isActive ? "bg-terracotta/15 text-text-primary before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-terracotta before:rounded-r-sm" : "text-text-secondary hover:bg-surface-elevated"}`
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
                `flex items-center gap-3 px-4 py-3 rounded-sm transition-colors duration-150 relative
      ${isActive ? "bg-terracotta/15 text-text-primary before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-terracotta before:rounded-r-sm" : "text-text-secondary hover:bg-surface-elevated"}`
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
              `flex items-center gap-3 px-4 py-3 rounded-sm transition-colors duration-150 relative
      ${isActive ? "bg-terracotta/15 text-text-primary before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-terracotta before:rounded-r-sm" : "text-text-secondary hover:bg-surface-elevated"}`
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
                `flex items-center gap-3 px-4 py-3 rounded-sm transition-colors duration-150 relative
      ${isActive ? "bg-terracotta/15 text-text-primary before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-terracotta before:rounded-r-sm" : "text-text-secondary hover:bg-surface-elevated"}`
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
                `flex items-center gap-3 px-4 py-3 rounded-sm transition-colors duration-150 relative
      ${isActive ? "bg-terracotta/15 text-text-primary before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-terracotta before:rounded-r-sm" : "text-text-secondary hover:bg-surface-elevated"}`
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
