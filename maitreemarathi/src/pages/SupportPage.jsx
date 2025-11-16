// src/pages/SupportPage.jsx
import React from "react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">Support</h2>
        <p className="text-gray-700 mb-6">
          Need help? Contact us via WhatsApp or Email.
        </p>
        <div className="space-y-3">
          <a
            href="mailto:support@maitreemarathi.com"
            className="block bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600"
          >
            support@maitreemarathi.com
          </a>
          <a
            href="https://wa.me/919876543210"
            className="block bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
