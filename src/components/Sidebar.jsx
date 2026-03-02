import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Upload Resume", path: "/upload" },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-950 text-slate-200 flex flex-col border-r border-slate-800">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            AI
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-wide text-white">
              Resume Analyzer
            </h1>
            {/* <p className="text-xs text-slate-400">SaaS Dashboard</p> */}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-slate-800 text-white shadow-inner"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {user?.name || "User Name"}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user?.email || "user@email.com"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full text-sm font-medium bg-slate-800 hover:bg-red-600 hover:text-white transition-all duration-200 py-2.5 rounded-lg"
        >
          Log Out
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;