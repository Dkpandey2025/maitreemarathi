// src/pages/SupportPage.jsx
import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import Footer from "../components/Footer";

export default function SupportPage() {
  const user = localStorage.getItem("loggedInUser");

  const content = (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-4">Support</h2>
        <p className="text-gray-700 mb-6">
          Need help? Contact us via WhatsApp or Email.
        </p>
        <div className="space-y-3">
          <a
            href="mailto:support@maitreemarathi.com"
            className="block bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition font-semibold"
          >
            support@maitreemarathi.com
          </a>
          <a
            href="https://wa.me/919876543210"
            className="block bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition font-semibold"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );

  // If user is logged in, show with DashboardLayout
  if (user) {
    return <DashboardLayout>{content}</DashboardLayout>;
  }

  // If not logged in, show public version
  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <div className="flex-1">
        {content}
      </div>
      <Footer />
    </div>
  );
}
