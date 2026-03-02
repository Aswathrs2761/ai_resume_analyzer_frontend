import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const AnalysisResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis();
  }, [id]);

  const fetchAnalysis = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(`/resume/getanalysis/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAnalysis(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load analysis");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Analysis not found
      </div>
    );
  }

  const score = analysis.Atsscore || 0;
  const circumference = 439.6;
  const progress = (score / 100) * circumference;

  const scoreColor =
    score >= 80
      ? "text-green-600"
      : score >= 60
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <span className="px-3 py-1 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-full">
              AI Resume Analyzer
            </span>

            <h1 className="text-3xl font-bold mt-4 text-gray-900">
              Analysis Results
            </h1>

            <p className="text-gray-500 mt-1">
              {analysis.fileName}
            </p>
          </div>

          <button
            onClick={() => navigate("/upload")}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-sm"
          >
            Analyze Another
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* SCORE CARD */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-center text-gray-700 mb-8">
              ATS Resume Score
            </h3>

            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    fill="none"
                  />

                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#6366f1"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${progress} ${circumference}`}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className={`text-4xl font-bold ${scoreColor}`}>
                    {score}
                  </p>
                  <p className="text-xs text-gray-500 tracking-wide">
                    SCORE
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              {score >= 80
                ? "Excellent! Your resume is highly optimized."
                : score >= 60
                ? "Good foundation. Some improvements recommended."
                : "Needs improvement to pass ATS filters."}
            </p>
          </div>

          {/* SKILLS */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="font-semibold mb-4 text-gray-800">
              Extracted Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {analysis.skills?.length > 0 ? (
                analysis.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-400">
                  No skills detected
                </p>
              )}
            </div>
          </div>

          {/* MISSING SKILLS */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="font-semibold mb-4 text-gray-800">
              Missing Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {analysis.missingSkills?.length > 0 ? (
                analysis.missingSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border border-amber-200"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-400">
                  No missing skills identified
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECOND GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* SUGGESTIONS */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold mb-6 text-gray-800">
              AI Suggestions
            </h3>

            <ol className="space-y-4">
              {analysis.suggestions?.map((suggestion, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-bold shadow">
                    {i + 1}
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    {suggestion}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* SUMMARY */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold mb-4 text-gray-800">
              Professional Summary
            </h3>

            <p className="text-gray-700 text-sm leading-relaxed">
              {analysis.summary}
            </p>
          </div>
        </div>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/dashboard")}
          className="text-indigo-600 font-semibold hover:underline"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;