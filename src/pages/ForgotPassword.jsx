import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyResetUser, resetPassword } from "../services/userApi";
import {ToastError, ToastSuccess} from "../Utils/ToastMessage";
const ForgotPassword = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [userId, setUserId] = useState(null);
	const [securityQuestion, setSecurityQuestion] = useState("");
	const [securityAnswer, setSecurityAnswer] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleVerifyUser = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const data = await verifyResetUser(username, email);
			setUserId(data.userId);
			setSecurityQuestion(data.securityQuestion);
			ToastSuccess("Verification successful! Please answer your security question.");
			setStep(2);
		} catch (err) {
			setError(err?.response?.data?.message || "Verification failed");
			ToastError("Verification failed");
		} finally {
			setLoading(false);
		}
	};

	const handleContinueToReset = (e) => {
		e.preventDefault();
		if (!securityAnswer.trim()) {
			setError("Please answer the security question");
			return;
		}
		setError("");
		ToastSuccess("Security answer accepted! Please set your new password.");
		setStep(3);
	};

	const handleResetPassword = async (e) => {
		e.preventDefault();
		setError("");

		if (newPassword !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		setLoading(true);
		try {
			await resetPassword(userId, securityAnswer, newPassword);
			ToastSuccess("Password reset successful! Redirecting to login...");
			navigate("/login");
		} catch (err) {
			setError(err?.response?.data?.message || "Reset failed");
			ToastError("Reset failed");
			// If the answer was wrong, send them back to re-enter it
			setStep(2);
		} finally {
			setLoading(false);
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
          Forgot Password
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          {step === 1 && "Verify your account to continue"}
          {step === 2 && "Answer your security question"}
          {step === 3 && "Choose a new password"}
        </p>
      </div>

      <div className="rounded-3xl border border-gray-800 bg-[#121212] p-8 shadow-lg shadow-black/70">
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleVerifyUser} className="space-y-5">
            <div>
              <label className={labelClass}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="janedoe"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className={inputClass}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-[#FF0000] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/50 transition-transform hover:scale-105 hover:bg-[#C50900] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0000] disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleContinueToReset} className="space-y-5">
            <div>
              <label className={labelClass}>{securityQuestion}</label>
              <input
                type="text"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                placeholder="Your answer"
                className={inputClass}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-[#FF0000] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/50 transition-transform hover:scale-105 hover:bg-[#C50900] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0000]"
            >
              Continue
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className={labelClass}>New password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-[#FF0000] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/50 transition-transform hover:scale-105 hover:bg-[#C50900] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0000] disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  </div>
);
};

export default ForgotPassword;
