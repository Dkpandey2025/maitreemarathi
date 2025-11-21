// src/pages/ProfilePage.jsx
import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

export default function ProfilePage() {
  const user = {
    name: "Manish Kumar",
    email: "manish@example.com",
    plan: "Premium",
  };

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-orange-50 p-6 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
          alt="profile"
          className="w-24 h-24 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-orange-600 mb-2">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="mt-4 text-sm text-gray-700">
          Subscription: <span className="font-semibold text-orange-500">{user.plan}</span>
        </p>
      </div>
    </div>
    </DashboardLayout>
  );
}
