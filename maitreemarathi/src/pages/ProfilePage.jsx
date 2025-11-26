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
import { Wallet, LogOut, Crown, Calendar, RefreshCw, Lock, Eye, EyeOff, Check, X } from "lucide-react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [subscription, setSubscription] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Password validation rules
  const passwordValidation = {
    minLength: newPassword.length >= 8,
    hasUpperCase: /[A-Z]/.test(newPassword),
    hasLowerCase: /[a-z]/.test(newPassword),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== "";

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedUser) {
      setUser(loggedUser);
      fetchSubscriptionStatus(loggedUser.phone);

      // Auto-refresh subscription status every 60 seconds
      const interval = setInterval(() => {
        fetchSubscriptionStatus(loggedUser.phone);
      }, 60000); // 60 seconds

      return () => clearInterval(interval);
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

  const handleRefresh = () => {
    if (user?.phone) {
      fetchSubscriptionStatus(user.phone);
    }
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  const goToWallet = () => {
    navigate("/wallet");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (!isPasswordValid) {
      alert("Password must be at least 8 characters and contain uppercase, lowercase, and a special symbol");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.CHANGE_PASSWORD, {
        phone: user.phone,
        currentPassword,
        newPassword
      });

      if (res.data.status === "success") {
        alert("Password changed successfully!");
        setShowChangePassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordTouched(false);
      } else {
        alert(res.data.message || "Failed to change password");
      }
    } catch (err) {
      console.error("Change password error:", err);
      alert("Error changing password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          
          {/* Profile Avatar */}
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              alt="profile"
              className="w-28 h-28 rounded-full mb-4 shadow"
            />

            <h2 className="text-2xl font-bold text-purple-600">
              {user?.name || "User"}
            </h2>

            {/* <p className="text-gray-600">{user?.email || "No email available"}</p>
 */}
            <p className="text-gray-600 text-sm mt-1">
              Phone/Email: {user?.phone || "Not available"}
            </p>

          </div>

          <hr className="my-6 border-gray-200" />

          {/* Subscription Section */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Crown className="text-purple-600" size={24} />
                <h3 className="text-lg font-bold text-gray-800">Subscription Status</h3>
              </div>
              <button
                onClick={handleRefresh}
                className="p-2 hover:bg-purple-200 rounded-lg transition"
                title="Refresh subscription status"
              >
                <RefreshCw className="text-purple-600" size={18} />
              </button>
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
                      <Calendar size={18} className="text-purple-600" />
                      <span className="text-sm font-semibold text-gray-700">Days Remaining</span>
                    </div>
                    <div className="text-3xl font-bold text-purple-600">
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
                    <p className="text-sm text-gray-600 mb-2">Access limited to first 3 beginner days</p>
                    <button
                      onClick={() => navigate("/plan")}
                      className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition text-sm font-semibold"
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
          <div className="bg-purple-50 p-4 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <p className="text-gray-700 text-sm font-semibold">Wallet Balance</p>
              <h3 className="text-xl font-bold text-green-600">
                ₹{user?.wallet || 0}
              </h3>
            </div>

            <button
              onClick={goToWallet}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
            >
              <Wallet size={18} />
              Open Wallet
            </button>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Change Password Section */}
          <div className="mb-6">
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="w-full bg-purple-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-purple-700 transition"
            >
              <Lock size={20} />
              Change Password
            </button>

            {showChangePassword && (
              <form onSubmit={handleChangePassword} className="mt-4 bg-purple-50 p-4 rounded-xl space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onFocus={() => setPasswordTouched(true)}
                      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        passwordTouched && !isPasswordValid ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  {passwordTouched && (
                    <div className="mt-2 p-3 bg-white rounded-lg border border-purple-200">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Password must contain:</p>
                      <div className="space-y-1">
                        <PasswordRequirement met={passwordValidation.minLength} text="At least 8 characters" />
                        <PasswordRequirement met={passwordValidation.hasUpperCase} text="One uppercase letter (A-Z)" />
                        <PasswordRequirement met={passwordValidation.hasLowerCase} text="One lowercase letter (a-z)" />
                        <PasswordRequirement met={passwordValidation.hasSymbol} text="One special symbol (!@#$%^&*)" />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        confirmPassword && !passwordsMatch ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {confirmPassword && !passwordsMatch && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <X size={14} /> Passwords do not match
                    </p>
                  )}
                  {confirmPassword && passwordsMatch && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <Check size={14} /> Passwords match
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading || (passwordTouched && !isPasswordValid) || !passwordsMatch}
                    className={`flex-1 py-2 rounded-lg transition font-semibold ${
                      loading || (passwordTouched && !isPasswordValid) || !passwordsMatch
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {loading ? "Changing..." : "Update Password"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowChangePassword(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                      setPasswordTouched(false);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

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

// Password Requirement Component
function PasswordRequirement({ met, text }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
      ) : (
        <X className="w-4 h-4 text-red-500 flex-shrink-0" />
      )}
      <span className={`text-xs ${met ? "text-green-700 font-medium" : "text-gray-600"}`}>
        {text}
      </span>
    </div>
  );
}
