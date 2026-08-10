import {
  DownOutlined,
  MenuOutlined,
  SunOutlined,
  MoonOutlined,
  PoweroffOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userApi.js";
import { useAuthStore } from "../../store/authStore.js";
import { useUiStore } from "../../store/uiStore.js";
import { ToastError, ToastSuccess } from "../../utils/ToastMessage.js";
import Logo from "./Logo.jsx";
import Modal from "./Modal.jsx";
import SearchBar from "./SearchBar.jsx";
import Button from "./Button.jsx";
function Navbar() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { theme, toggleTheme } = useUiStore();
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between h-18 bg-surface px-4 sm:px-6 md:px-12 lg:px-20">
      {/* Sidebar toggle */}
      <Button
        type="button"
        onClick={useUiStore.getState().toggleSidebar}
        variant="icon"
        className="text-text-primary text-2xl"
        aria-label="Toggle sidebar"
      >
        <MenuOutlined />
      </Button>
      <div className="flex-1 mx-2 sm:mx-4 min-w-0 flex justify-center sm:justify-start">
        <Logo />
      </div>

      {/* Search */}
      <div className="flex-1 mx-4 hidden md:block">
        <SearchBar />
      </div>
      <Button
        type="button"
        onClick={() => setMobileSearchOpen((prev) => !prev)}
        variant="icon"
        className="md:hidden text-text-primary text-xl"
        aria-label="Toggle search"
      >
        <SearchOutlined />
      </Button>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Button
              type="button"
              onClick={() => navigate("/upload")}
              variant="ghost"
              aria-label="Upload"
              className="text-text-primary hover:text-text-primary font-medium px-2 sm:px-3 py-2 flex items-center gap-1.5"
            >
              <UploadOutlined className="text-lg" />
              <span className="hidden sm:inline">Upload</span>
            </Button>
            <div className="relative" ref={menuRef}>
              <Button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                variant="icon"
                className="flex items-center gap-1.5 hover:bg-surface-elevated rounded-full pl-1 pr-2 py-1 text-text-primary"
                aria-label="Open user menu"
              >
                <span className="w-9 h-9 rounded-full overflow-hidden border-2 border-border">
                  <img
                    src={
                      typeof user?.avatar === "string"
                        ? user?.avatar
                        : user?.avatar?.url
                    }
                    alt={user?.username}
                    className="w-full h-full object-cover"
                  />
                </span>
                <DownOutlined className="text-text-primary text-xs" />
              </Button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-elevated border border-border rounded-md shadow-md overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-text-secondary truncate">
                      @{user?.username}
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profile");
                    }}
                    variant="ghost"
                    className="w-full text-left px-4 py-3 text-sm text-text-primary flex items-center gap-2"
                  >
                    <UserOutlined />
                    My Profile
                  </Button>

                  <Button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(`/channel/${user.username}`);
                    }}
                    variant="ghost"
                    className="w-full text-left px-4 py-3 text-sm text-text-primary flex items-center gap-2"
                  >
                    <VideoCameraOutlined />
                    My Channel
                  </Button>

                  <Button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      toggleTheme();
                    }}
                    variant="ghost"
                    className="w-full text-left px-4 py-3 text-sm text-text-primary flex items-center gap-2"
                  >
                    {theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </Button>

                  <Button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setLogoutModalOpen(true);
                    }}
                    variant="danger"
                    className="w-full text-left px-4 py-3 text-sm border-t border-border flex items-center gap-2"
                  >
                    <PoweroffOutlined />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Button
            type="button"
            onClick={() => navigate("/login")}
            variant="primary"
            className="text-text-primary"
          >
            Login
          </Button>
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
      {mobileSearchOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface px-4 py-3 border-b border-border">
          <SearchBar />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
