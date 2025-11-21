import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Languages, Brain, Gift } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t sm:hidden">
      <div className="flex justify-around py-2">

        {/* Home */}
        <NavLink
          to="/home"
          className="flex flex-col items-center text-gray-600 hover:text-purple-600"
        >
          <Home size={22} />
          <span className="text-xs">Home</span>
        </NavLink>

        {/* Translate */}
        <NavLink
          to="/translate"
          className="flex flex-col items-center text-gray-600 hover:text-purple-600"
        >
          <Languages size={22} />
          <span className="text-xs">Translate</span>
        </NavLink>

        {/* AI Learn */}
        <NavLink
          to="/ai"
          className="flex flex-col items-center text-gray-600 hover:text-purple-600"
        >
          <Brain size={22} />
          <span className="text-xs">AI Learn</span>
        </NavLink>

        {/* Refer */}
        <NavLink
          to="/refer"
          className="flex flex-col items-center text-gray-600 hover:text-purple-600"
        >
          <Gift size={22} />
          <span className="text-xs">Refer</span>
        </NavLink>
      </div>
    </nav>
  );
}
