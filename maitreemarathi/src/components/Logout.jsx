import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("loggedInUser");

    // Optional: show confirmation
    alert("You have been logged out.");

    // Redirect to login page
    navigate("/login");
  };

  // Get logged-in user info (optional)
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <DashboardLayout>
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">
          Welcome {user?.name || "User"} 👋
        </h1>
        <p className="text-gray-600 mb-6">
          You are now logged in with {user?.phone}.
        </p>
        <button
          onClick={handleLogout}
          className="bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-700"
        >
          Logout
        </button>
      </div>
    </div>
    </DashboardLayout>
  );
}
