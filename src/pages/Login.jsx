import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      const message =
        err?.response?.data?.message || err.message || "Login failed";
      setError(message);
    }
  };

  return (
    <div className="h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-16 flex-col justify-center">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-white/20 p-3 rounded-lg text-2xl">📄</div>
          <h2 className="text-2xl font-semibold">AI Resume Analyzer</h2>
        </div>

        <h1 className="text-5xl font-bold leading-tight mb-8">
          Land your dream job with AI-powered insights
        </h1>

        <p className="text-lg text-white/80 max-w-md leading-relaxed">
          Upload your resume and get instant feedback on how to improve it,
          match it to job descriptions, and stand out from the crowd.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 h-full items-center justify-center bg-gray-50 px-8">
        <div className="w-full max-w-md bg-white p-12 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Welcome back</h2>
          <p className="text-gray-500 mb-10">
            Sign in to continue to your dashboard
          </p>

          {/* FORM */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "hide" : "show"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm font-medium">{error}</div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
           <p className="mt-8 text-center text-sm text-gray-500">
            <Link
              to="/ForgotPassword"
              className="text-indigo-600 font-medium hover:underline"
            >
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
