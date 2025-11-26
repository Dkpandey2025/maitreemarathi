import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

export default function Logout() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(true);

  const handleLogout = () => {
    // Remove all user data from localStorage
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userType");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("token");
    localStorage.removeItem("referralCode");
    localStorage.removeItem("sessionToken");

    // Show confirmation
    alert("You have been logged out.");

    // Redirect to login page
    navigate("/login");
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  // Get logged-in user info (optional)
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <DashboardLayout>
      <div className="bg-purple-50 p-4 sm:p-6 flex items-start justify-center pt-8 sm:pt-12">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          {showConfirmation ? (
            <>
              <h1 className="text-xl sm:text-2xl font-bold text-purple-600 mb-3 sm:mb-4">
                Logout Confirmation
              </h1>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Are you sure you want to logout?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleLogout}
                  className="flex-1 bg-red-600 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-400 transition text-sm sm:text-base"
                >
                  No, Go Back
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-xl sm:text-2xl font-bold text-purple-600 mb-3 sm:mb-4">
                Welcome {user?.name || "User"} 👋
              </h1>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                You are now logged in with {user?.phone}.
              </p>
              <button
                onClick={() => setShowConfirmation(true)}
                className="bg-purple-600 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-purple-700 text-sm sm:text-base"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
