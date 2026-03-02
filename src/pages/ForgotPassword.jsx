import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      return setError("Please enter your email");
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/forgotPassword", { email });

      setSuccess(res.data.message || "Password reset email sent");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      const message =
        err?.response?.data?.message ||
        err.message ||
        "Something went wrong";

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
          Reset your password securely
        </h1>

        <p className="text-lg text-white/80 max-w-md">
          Enter your email and we’ll send you a link to reset your password.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm">

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Forgot Password
          </h2>

          <p className="text-gray-500 mb-6">
            Enter your registered email
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
              {loading ? "Sending..." : "Send Reset Link →"}
            </button>
          </form>

          {/* Back to login */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Remember your password?{" "}
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