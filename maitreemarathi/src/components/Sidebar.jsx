import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Sidebar({ open, closeSidebar }) {
  const links = [
    { to: "/home", label: "🏠 Home" },
    { to: "/wallet", label: "💰 Wallet" },
    // { to: "/beginner", label: "📚 Lessons" },
    // { to: "/ai", label: "🤖 AI Learn" },
    // { to: "/refer", label: "🎁 Refer & Earn" },
    { to: "/profile", label: "👤 Profile" },
    { to: "/support", label: "📞 Support" },
    { to: "/about", label: "ℹ️ About Us" },
    { to: "/privacy-policy", label: "🛡️ Privacy" },
    { to: "/logout", label: "🚪 Logout" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white w-64 shadow-lg transform transition-transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } sm:fixed sm:inset-y-0 sm:left-0 sm:translate-x-0 z-40`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-purple-600">Menu</h2>
        <button className="sm:hidden text-gray-600" onClick={closeSidebar}>
          ✖
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={closeSidebar}
            className="text-gray-700 hover:text-purple-600 hover:bg-purple-100 px-3 py-2 rounded-lg transition"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
