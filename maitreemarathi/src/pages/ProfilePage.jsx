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
import { Wallet, LogOut } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Load user data dynamically from localStorage
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedUser) {
      setUser(loggedUser);  // ✅ dynamic user set here
    }
  }, []);

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

            {/* Plan */}
            <div className="mt-4 bg-orange-100 px-4 py-2 rounded-xl text-orange-700 text-sm font-semibold">
              {user?.plan ? `Plan: ${user.plan}` : "Free Plan"}
            </div>
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
