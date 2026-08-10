/* eslint-disable react-refresh/only-export-components */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy } from "react";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";

const Channel = lazy(() => import("../pages/Channel"));
const Home = lazy(() => import("../pages/Home"));
const Library = lazy(() => import("../pages/Library"));
const Login = lazy(() => import("../pages/Login"));
const PlaylistDetail = lazy(() => import("../pages/PlaylistDetail"));
const Register = lazy(() => import("../pages/Register"));
const Search = lazy(() => import("../pages/Search"));
const Upload = lazy(() => import("../pages/Upload"));
const Watch = lazy(() => import("../pages/Watch"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const EditVideo = lazy(() => import("../pages/EditVideo"));
const UserDetails = lazy(() => import("../pages/Profile"));
const Tweets = lazy(() => import("../pages/Tweets"));
const Subscriptions = lazy(() => import("../pages/Subscriptions"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const DuckPicker = lazy(() => import("../pages/DuckPicker"));
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
