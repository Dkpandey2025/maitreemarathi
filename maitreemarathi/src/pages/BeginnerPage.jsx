// src/pages/BeginnerPage.jsx
import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

export default function BeginnerPage() {
  return (
    <DashboardLayout>
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 text-gray-800">
      <h1 className="text-4xl font-bold text-orange-600 mb-4">
        Beginner Lessons
      </h1>
      <p className="text-gray-700 text-lg max-w-xl text-center">
        Start your journey with simple Marathi lessons designed for beginners.
      </p>
    </div>
    </DashboardLayout>  
  );
}
