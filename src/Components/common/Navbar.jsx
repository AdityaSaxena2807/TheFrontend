import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";
import { useUiStore } from "../../store/uiStore.js";
import SearchBar from "./SearchBar.jsx";
import Logo from "./Logo.jsx";
function Navbar() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);
  return (
    <nav>
      <button onClick={useUiStore.getState().toggleSidebar}>≡</button>
      <Logo />
      <SearchBar />
      {isLoggedIn ? (
        // logged in — show upload + avatar
        <div>
          <Link to="/upload">Upload</Link>
          <button>
            <img src={user?.avatar} alt={user?.username } />
          </button>
        </div>
      ) : (
        // not logged in — show sign in button
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

export default Navbar;
