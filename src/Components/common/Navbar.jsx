import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userApi.js";
import { useAuthStore } from "../../store/authStore.js";
import { useUiStore } from "../../store/uiStore.js";
import { ToastError, ToastSuccess } from "../../Utils/ToastMessage.js";
import Logo from "./Logo.jsx";
import Modal from "./Modal.jsx";
import SearchBar from "./SearchBar.jsx";
function Navbar() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 hover:bg-[#282828] rounded-full pl-1 pr-2 py-1 transition"
              >
                <span className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#050505]">
                  <img
                    src={user?.avatar}
                    alt={user?.username}
                    className="w-full h-full object-cover"
                  />
                </span>
                <DownOutlined className="text-white text-xs" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#282828] border border-[#3f3f3f] rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-[#3f3f3f]">
                    <p className="text-sm font-medium text-white truncate">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      @{user?.username}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-white hover:bg-[#3f3f3f] transition-colors"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(`/channel/${user.username}`);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-white hover:bg-[#3f3f3f] transition-colors"
                  >
                    My Channel
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setLogoutModalOpen(true);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-[#3f3f3f] transition-colors border-t border-[#3f3f3f]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
