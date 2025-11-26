// src/pages/AboutPage.jsx
import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import Footer from "../components/Footer";

export default function AboutPage() {
  const user = localStorage.getItem("loggedInUser");

  // If user is logged in, show with DashboardLayout
  if (user) {
    return (
      <DashboardLayout>
        <div className="bg-purple-50 p-4 sm:p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-4">About Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Maitree Marathi is an innovative platform designed to help learners of all
              backgrounds easily learn and speak Marathi through engaging lessons,
              interactive AI tools, and fun activities.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our mission is to preserve and promote the beauty of the Marathi language by
              making it accessible, simple, and fun to learn for everyone.
            </p>
            <p className="text-gray-700">
              Join us and start your Marathi learning journey with interactive lessons,
              real-time AI assistance, and exciting rewards!
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // If not logged in, show public version
  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <div className="flex-1 p-6 sm:p-8 flex items-center justify-center">
        <div className="max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-4">About Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Maitree Marathi is an innovative platform designed to help learners of all
            backgrounds easily learn and speak Marathi through engaging lessons,
            interactive AI tools, and fun activities.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our mission is to preserve and promote the beauty of the Marathi language by
            making it accessible, simple, and fun to learn for everyone.
          </p>
          <p className="text-gray-700">
            Join us and start your Marathi learning journey with interactive lessons,
            real-time AI assistance, and exciting rewards!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
