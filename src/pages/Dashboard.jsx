import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    averageScore: 0,
    totalAnalyses: 0,
    totalSkills: 0,
    totalSuggestions: 0,
  });

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

    const res = await API.get("/resume/analysis", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = res.data || [];

    setAnalyses(data);

    if (data.length > 0) {
      const avgScore = Math.round(
        data.reduce((sum, a) => sum + (a.Atsscore || 0), 0) / data.length
      );

      const totalSkills = data.reduce(
        (sum, a) => sum + (a.skills?.length || 0),
        0
      );

      const totalSuggestions = data.reduce(
        (sum, a) => sum + (a.suggestions?.length || 0),
        0
      );

      setStats({
        averageScore: avgScore,
        totalAnalyses: data.length,
        totalSkills,
        totalSuggestions,
      });
    }

    setLoading(false);
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    toast.error(err?.response?.data?.error || "Failed to load analyses");
    setLoading(false);
  }
};

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 60) return `${mins} mins ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return d.toLocaleDateString();
  };

  const handleClick = (id) => {
    navigate(`/analysis/${id}`);
  };

  const filteredAnalyses = analyses.filter((a) =>
    a.fileName.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className="px-10 py-8 bg-slate-100 dark:bg-slate-900 min-h-screen">

    {/* Header */}
    <div className="mb-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Dashboard
      </h1>
      <p className="text-white mt-1">
        Overview of your resume analyses
      </p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 font-medium md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      <StatCard
        title="Average ATS Score"
        value={`${stats.averageScore}/100`}
        color="blue"
      />
      <StatCard
        title="Total Analyses"
        value={stats.totalAnalyses}
        color="purple"
      />
      <StatCard
        title="Skills Detected"
        value={stats.totalSkills}
        color="cyan"
      />
      <StatCard
        title="Suggestions"
        value={stats.totalSuggestions}
        color="pink"
      />
    </div>

    {/* Analyses Card */}
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">

      {/* Search */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-300 flex justify-between items-center flex-wrap gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search analyses..."
          className="w-full md:w-80 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          onClick={() => navigate("/upload")}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
        >
          Upload New
        </button>
      </div>

      {/* Table Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          Recent Analyses
        </h2>
      </div>

      {/* Table Body */}
      {loading ? (
        <div className="p-8 text-center text-slate-500">
          Loading analyses...
        </div>
      ) : filteredAnalyses.length === 0 ? (
        <div className="p-8 text-center text-slate-500">
          No analyses found.
        </div>
      ) : (
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {filteredAnalyses.map((analysis) => (
            <div
              key={analysis._id}
              onClick={() => handleClick(analysis._id)}
              className="flex justify-between items-center px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition cursor-pointer"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {analysis.fileName}
                </p>
                <p className="text-sm text-slate-500">
                  {formatDate(analysis.createdAt)}
                </p>
              </div>

              <div
                className={`text-lg font-bold px-3 py-1 rounded-lg ${
                  analysis.Atsscore >= 75
                    ? "bg-green-100 text-green-600"
                    : analysis.Atsscore >= 60
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {analysis.Atsscore}%
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}

const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: "from-blue-500 to-indigo-600",
    purple: "from-purple-500 to-pink-600",
    cyan: "from-cyan-500 to-blue-500",
    pink: "from-pink-500 to-rose-500",
  };

  return (
    <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">

      {/* Gradient decoration */}
      <div
        className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colors[color]} opacity-10 rounded-bl-full`}
      />

      <p className="text-sm text-slate-500">{title}</p>

      <p className="text-3xl font-bold mt-3 text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
};

export default Dashboard;