import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100">

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      {/* Main Dashboard Content */}
      <main className="flex-grow p-6 sm:ml-64">
        {/* Mobile sidebar toggle button */}
        <button
          className="sm:hidden mb-4 bg-orange-500 text-white px-3 py-2 rounded-lg shadow-md"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </button>

        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
