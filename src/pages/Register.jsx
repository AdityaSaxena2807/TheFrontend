import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastError, ToastSuccess } from "../Utils/ToastMessage.js";
import axiosInstance from "../services/axiosInstance.js";

function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [files, setFiles] = useState({ avatar: null, coverImage: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({ ...prev, [name]: fileList[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.fullName || !userData.email || !userData.username || !userData.password)
      return ToastError("All fields are required");
    if (userData.password !== userData.confirmPassword)
      return ToastError("Passwords do not match!");
    if (!files.avatar || !files.coverImage)
      return ToastError("Avatar and cover image are required");

    const data = new FormData();
    Object.entries(userData).forEach(([k, v]) => data.append(k, v));
    data.append("avatar", files.avatar);
    data.append("coverImage", files.coverImage);

    try {
      await axiosInstance.post("/api/v1/users/register", data);
      ToastSuccess("Account created! Please log in.");
      navigate("/login");
    } catch (error) {
      ToastError(error?.response?.data?.message || error?.message || "Registration failed");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-700 bg-[#121212] px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none transition focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]";
  const labelClass = "mb-1.5 block text-sm font-medium text-white";

  return (
    <div className="flex w-full flex-1 items-center justify-center bg-black px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#FF0000] hover:text-[#C50900] transition-colors"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="rounded-3xl border border-gray-800 bg-[#121212] p-8 shadow-lg shadow-black/70">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass}>Full name</label>
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
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

            <div>
              <label className={labelClass}>Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Avatar</label>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 bg-[#121212] px-3 py-4 text-center transition hover:border-[#FF0000]">
                  <span className="text-xs text-white">
                    {files.avatar?.name || "Click to upload"}
                  </span>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className={labelClass}>Cover image</label>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 bg-[#121212] px-3 py-4 text-center transition hover:border-[#FF0000]">
                  <span className="text-xs text-white">
                    {files.coverImage?.name || "Click to upload"}
                  </span>
                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-[#FF0000] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/50 transition-transform hover:scale-105 hover:bg-[#C50900] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0000]"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
