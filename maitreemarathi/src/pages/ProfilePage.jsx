// // src/pages/ProfilePage.jsx
// import React from "react";
// import DashboardLayout from "../layout/DashboardLayout";

// export default function ProfilePage() {
//   const user = {
//     name: "Manish Kumar",
//     email: "manish@example.com",
//     plan: "Premium",
//   };

//   return (
//     <DashboardLayout>
//     <div className="min-h-screen bg-orange-50 p-6 flex justify-center items-center">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
//           alt="profile"
//           className="w-24 h-24 mx-auto mb-4"
//         />
//         <h2 className="text-2xl font-bold text-orange-600 mb-2">{user.name}</h2>
//         <p className="text-gray-600">{user.email}</p>
//         <p className="mt-4 text-sm text-gray-700">
//           Subscription: <span className="font-semibold text-orange-500">{user.plan}</span>
//         </p>
//       </div>
//     </div>
//     </DashboardLayout>
//   );
// }


import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Wallet, LogOut, Crown, Calendar } from "lucide-react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [subscription, setSubscription] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedUser) {
      setUser(loggedUser);
      fetchSubscriptionStatus(loggedUser.phone);
    }
  }, []);

  const fetchSubscriptionStatus = async (phone) => {
    try {
      const res = await axios.get(API_ENDPOINTS.SUBSCRIPTION_STATUS(phone));
      if (res.data.status === "success") {
        setSubscription(res.data.subscription);
      }
    } catch (err) {
      console.error("Error fetching subscription:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out!");
    navigate("/login");
  };

  const goToWallet = () => {
    navigate("/wallet");
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* Profile Avatar */}
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              alt="profile"
              className="w-28 h-28 rounded-full mb-4 shadow"
            />

            <h2 className="text-2xl font-bold text-orange-600">
              {user?.name || "User"}
            </h2>

            <p className="text-gray-600">{user?.email || "No email available"}</p>

            <p className="text-gray-600 text-sm mt-1">
              Phone: {user?.phone || "Not available"}
            </p>

          </div>

          <hr className="my-6 border-gray-200" />

          {/* Subscription Section */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-5 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="text-orange-600" size={24} />
              <h3 className="text-lg font-bold text-gray-800">Subscription Status</h3>
            </div>

            {subscription ? (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Plan:</span>
                  <span className={`font-bold capitalize ${
                    subscription.type === "lifetime" ? "text-purple-600" :
                    subscription.type === "monthly" ? "text-blue-600" : "text-gray-600"
                  }`}>
                    {subscription.type === "lifetime" ? "🌟 Lifetime" :
                     subscription.type === "monthly" ? "📅 Monthly" : "🆓 Free"}
                  </span>
                </div>

                {subscription.type === "monthly" && subscription.daysRemaining !== null && (
                  <div className="mt-3 bg-white p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar size={18} className="text-orange-600" />
                      <span className="text-sm font-semibold text-gray-700">Days Remaining</span>
                    </div>
                    <div className="text-3xl font-bold text-orange-600">
                      {subscription.daysRemaining > 0 ? subscription.daysRemaining : 0} days
                    </div>
                    {subscription.daysRemaining <= 5 && subscription.daysRemaining > 0 && (
                      <p className="text-xs text-red-600 mt-1">⚠️ Subscription expiring soon!</p>
                    )}
                    {subscription.daysRemaining <= 0 && (
                      <p className="text-xs text-red-600 mt-1">❌ Subscription expired</p>
                    )}
                  </div>
                )}

                {subscription.type === "lifetime" && (
                  <div className="mt-2 text-center">
                    <p className="text-sm text-purple-600 font-semibold">✨ Enjoy unlimited access forever!</p>
                  </div>
                )}

                {subscription.type === "free" && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Access limited to first 3 beginner lessons</p>
                    <button
                      onClick={() => navigate("/plan")}
                      className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition text-sm font-semibold"
                    >
                      Upgrade Now
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-sm">Loading subscription...</p>
            )}
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Wallet Section */}
          <div className="bg-orange-50 p-4 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <p className="text-gray-700 text-sm font-semibold">Wallet Balance</p>
              <h3 className="text-xl font-bold text-green-600">
                ₹{user?.wallet || 0}
              </h3>
            </div>

            <button
              onClick={goToWallet}
              className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl hover:bg-orange-700 transition"
            >
              <Wallet size={18} />
              Open Wallet
            </button>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-red-600 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
