import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { userId, token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ validation
    if (!password || !confirmPassword) {
      return setError("All fields are required");
    }

    if (password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await API.post(
        `/auth/ResetPassword/${userId}/${token}`,
        { password }
      );

      setSuccess(res.data.message || "Password reset successful");
      setLoading(false);

      // redirect after 2 sec
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setLoading(false);

      const message =
        err?.response?.data?.message ||
        err.message ||
        "Reset failed";

      setError(message);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-16 flex-col justify-center">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-white/20 p-2 rounded-lg">📄</div>
          <h2 className="text-xl font-semibold">AI Resume Analyzer</h2>
        </div>

        <h1 className="text-5xl font-bold leading-tight mb-6">
          Create a new password
        </h1>

        <p className="text-lg text-white/80 max-w-md">
          Your new password must be different from previously used passwords.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm">

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Reset Password
          </h2>

          <p className="text-gray-500 mb-6">
            Enter your new password
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            {/* Success */}
            {success && (
              <div className="text-green-600 text-sm">{success}</div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition"
            >
              {loading ? "Resetting..." : "Reset Password →"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Back to{" "}
            <Link
              to="/"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}