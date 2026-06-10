import React from "react";
import { NavLink, navLink } from "react-router-dom";
function Sidebar() {
  return (
    <>
      <NavLink to="/" className={navLink}>
        Home
      </NavLink>
      <NavLink to="/subscriptions" className={navLink}>
        Subscriptions
      </NavLink>
      <NavLink to="/tweets" className={navLink}>
        Tweets
      </NavLink>
      <NavLink to="/dashboard" className={navLink}>
        Dashboard
      </NavLink>
    </>
  );
}

export default Sidebar;
