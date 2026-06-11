import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";
import { useUiStore } from "../../store/uiStore.js";
import SearchBar from "./SearchBar.jsx";
import { MenuOutlined } from "@ant-design/icons";

function Navbar() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-black px-6 py-3 shadow-lg shadow-black/50">
      {/* Sidebar toggle */}
      <button
        onClick={useUiStore.getState().toggleSidebar}
        className="text-white text-2xl px-3 py-1 hover:bg-[#282828] rounded transition"
      >
        <MenuOutlined />
      </button>

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
            <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FF0000] hover:border-[#C50900] transition">
              <img
                src={user?.avatar}
                alt={user?.username}
                className="w-full h-full object-cover"
              />
            </button>
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
    </nav>
  );
}

export default Navbar;