import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedLayout = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedLayout;
