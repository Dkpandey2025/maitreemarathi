import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="flex items-center justify-between bg-orange-500 text-white px-4 py-3 shadow-md">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="sm:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="font-bold text-xl">
          Maitree Marathi
        </Link>
      </div>
         <Link
        to="/home"
        className="bg-white text-orange-600 px-3 py-1 rounded-lg font-semibold hover:bg-orange-50 transition-all"
      >
        Dashboard
      </Link>
      <Link
        to="/profile"
        className="bg-white text-orange-600 px-3 py-1 rounded-lg font-semibold hover:bg-orange-50 transition-all"
      >
        Profile
      </Link>
     
    </nav>
  );
}
