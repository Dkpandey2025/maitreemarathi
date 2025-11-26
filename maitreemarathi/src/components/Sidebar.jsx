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
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-600">Menu</h2>
        <button className="sm:hidden text-gray-600 text-2xl" onClick={closeSidebar}>
          ✖
        </button>
      </div>
      <nav className="flex flex-col p-6 space-y-4">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={closeSidebar}
            className="text-gray-700 hover:text-purple-600 hover:bg-purple-100 px-4 py-3 rounded-lg transition text-xl flex items-center gap-3"
          >
            <span className="text-2xl">{link.label.split(' ')[0]}</span>
            <span>{link.label.split(' ').slice(1).join(' ')}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
