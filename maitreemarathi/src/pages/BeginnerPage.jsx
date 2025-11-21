// src/pages/BeginnerPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

export default function BeginnerPage() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-orange-50 p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/home")}
            className="p-2 bg-white rounded-full shadow-md hover:bg-orange-100"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold text-orange-600">मराठी सीखें</h1>
        </div>

        {/* Level Cards */}
        <div className="max-w-xl mx-auto space-y-4">
          {/* Beginners */}
          <div
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg cursor-pointer border-l-4 border-orange-500"
            onClick={() => navigate("/beginner-lessons")}
          >
            <h2 className="text-xl font-semibold">I. Beginners</h2>
            <p className="text-gray-600">शुरुआत से सीखने वालों के लिए 30 पाठ</p>
          </div>

          {/* Medium - Locked */}
          <div
            className="bg-gray-200 p-5 rounded-xl shadow-md cursor-not-allowed opacity-60 border-l-4 border-gray-400"
          >
            <h2 className="text-xl font-semibold">II. Medium 🔒</h2>
            <p className="text-gray-600">Beginners पूरा होने पर unlock होगा</p>
          </div>

          {/* Expert - Locked */}
          <div
            className="bg-gray-200 p-5 rounded-xl shadow-md cursor-not-allowed opacity-60 border-l-4 border-gray-400"
          >
            <h2 className="text-xl font-semibold">III. Expert 🔒</h2>
            <p className="text-gray-600">Medium पूरा होने पर unlock होगा</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
