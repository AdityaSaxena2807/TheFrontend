import { useState } from "react";
import { loginUser } from "../services/userApi.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { ToastError, ToastSuccess } from "../Utils/ToastMessage.js";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  //here setAuth is a function from the auth store that updates the authentication state with the user information and access token after a successful login.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.email.trim() && !userData.username.trim())
      return ToastError("Username or email is required");
    if (!userData.password) return ToastError("Password is required");

    const payload = {
      password: userData.password,
      ...(userData.email.trim() && { email: userData.email.trim() }),
      ...(userData.username.trim() && { username: userData.username.trim() }),
    };

    try {
      const data = await loginUser(payload);
      setAuth(data.data.user, data.data.accessToken);
      // After a successful login, the setAuth function is called with the user information and access token to update the authentication
      // state in the application. This allows other parts of the app to recognize that the user is logged in and have access to their information.
      ToastSuccess("Logged in successfully!");
      navigate("/");
    } catch (error) {
      ToastError(error?.response?.data?.message || "Login failed");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none transition focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]";
  const labelClass = "mb-1.5 block text-sm font-medium text-white";

  return (
    <div className="flex w-full flex-1 items-center justify-center bg-black px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-[#FF0000] hover:text-[#C50900] transition-colors"
            >
              Register
            </Link>
          </p>
        </div>

        <div className="rounded-3xl border border-gray-800 bg-[#121212] p-8 shadow-lg shadow-black/70">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass}>Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="janedoe"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className={inputClass}
              />
            </div>

            <p className="text-center text-xs text-gray-500">
              Username or email — either works
            </p>

            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-[#FF0000] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/50 transition-transform hover:scale-105 hover:bg-[#C50900] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0000]"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
