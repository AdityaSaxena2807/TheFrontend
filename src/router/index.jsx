import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      // Public — centered card, no navbar
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      //Semi-public — navbar visible, no login required
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/watch/:videoId" element={<Watch />} />
        <Route path="/channel/:username" element={<Channel />} />
        <Route path="/search" element={<Search />} />
        <Route path="/playlist/:id" element={<PlaylistDetail />} /> */}
      </Route>
      // Protected — redirects to /login if not logged in
      <Route element={<ProtectedLayout />}>
        {/* <Route path="/upload" element={<Upload />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tweets" element={<Tweets />} />
        <Route path="/subscriptions" element={<Subscriptions />} /> */}
      </Route>
      // 404
    </Route>,
  ),
);

export default router;
