import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import Channel from "../pages/Channel";
import Home from "../pages/Home";
import Library from "../pages/Library";
import Login from "../pages/Login";
import PlaylistDetail from "../pages/PlaylistDetail";
import Register from "../pages/Register";
import Search from "../pages/Search";
import Upload from "../pages/Upload";
import Watch from "../pages/Watch";
import Dashboard from "../pages/Dashboard";
import EditVideo from "../pages/EditVideo";
import UserDetails from "../pages/Profile";
import Tweets from "../pages/Tweets";
import Subscriptions from "../pages/Subscriptions";
import ForgotPassword from "../pages/ForgotPassword";
import DuckPicker from "../pages/DuckPicker";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoId" element={<Watch />} />
        <Route path="/channel/:username" element={<Channel />} />
        <Route path="/search" element={<Search />} />
        <Route path="/tweets" element={<Tweets />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/library" element={<Library />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/playlist/:playlistId" element={<PlaylistDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-video/:videoId" element={<EditVideo />} />
          <Route path="/profile" element={<UserDetails />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/settings/logo" element={<DuckPicker />} />
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
