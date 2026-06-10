import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const AuthLayout = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  // If already logged in, no point showing login/register
  if (isLoggedIn) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-md bg-gray-900 rounded-xl p-8 shadow-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
