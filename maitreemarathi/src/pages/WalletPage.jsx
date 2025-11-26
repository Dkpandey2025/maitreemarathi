// // src/pages/WalletPage.jsx
// import React, { useState } from "react";

// export default function WalletPage() {
//   const [balance, setBalance] = useState(250);

//   const handleWithdraw = () => {
//     if (balance >= 100) {
//       alert("Withdrawal request sent successfully!");
//       setBalance(balance - 100);
//     } else {
//       alert("Insufficient balance!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-yellow-50 p-6 text-center">
//       <h2 className="text-3xl font-bold text-orange-600 mb-6">Wallet</h2>
//       <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
//         <h3 className="text-lg font-semibold mb-2">Current Balance</h3>
//         <p className="text-2xl font-bold text-green-600 mb-4">₹{balance}</p>
//         <button
//           onClick={handleWithdraw}
//           className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl"
//         >
//           Withdraw ₹100
//         </button>
//       </div>
//     </div>
//   );
// }


// // src/pages/WalletPage.jsx
// import React, { useEffect, useState } from "react";

// export default function WalletPage() {
//   const [balance, setBalance] = useState(0);

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

//     if (loggedInUser && loggedInUser.wallet !== undefined) {
//       setBalance(loggedInUser.wallet);
//     }
//   }, []);

//   const handleWithdraw = () => {
//     if (balance >= 100) {
//       alert("Withdrawal request sent successfully!");

//       const newBalance = balance - 100;
//       setBalance(newBalance);

//       // Update localStorage also
//       const user = JSON.parse(localStorage.getItem("loggedInUser"));
//       user.wallet = newBalance;
//       localStorage.setItem("loggedInUser", JSON.stringify(user));
//     } else {
//       alert("Insufficient balance!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-yellow-50 p-6 text-center">
//       <h2 className="text-3xl font-bold text-orange-600 mb-6">Wallet</h2>

//       <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
//         <h3 className="text-lg font-semibold mb-2">Current Balance</h3>

//         <p className="text-2xl font-bold text-green-600 mb-4">₹{balance}</p>

//         <button
//           onClick={handleWithdraw}
//           className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl"
//         >
//           Withdraw ₹100
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";
import { API_ENDPOINTS } from "../config/api";

export default function WalletPage() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [redemptions, setRedemptions] = useState([]);
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && user.wallet !== undefined) {
      setBalance(user.wallet);
      fetchRedemptions(user.phone);
    }
  }, []);

  const fetchRedemptions = async (phone) => {
    try {
      const res = await axios.get(API_ENDPOINTS.USER_REDEMPTIONS(phone));
      if (res.data.status === "success") {
        setRedemptions(res.data.redemptions);
      }
    } catch (err) {
      console.error("Error fetching redemptions:", err);
    }
  };

  const handleRedemptionRequest = async () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    
    if (!amount || amount < 100) {
      alert("Minimum redemption amount is ₹100");
      return;
    }

    if (amount > balance) {
      alert("Insufficient wallet balance");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.USER_REQUEST_REDEMPTION, {
        phone: user.phone,
        amount: parseInt(amount)
      });

      if (res.data.status === "success") {
        alert("Redemption request submitted successfully!");
        setAmount(100);
        fetchRedemptions(user.phone);
      } else {
        alert(res.data.message || "Error submitting redemption request");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error submitting redemption request");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "processed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-purple-50 p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-6">Wallet</h2>

        {/* Balance Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mb-6 max-w-md">
          <h3 className="text-lg font-semibold mb-2">Current Balance</h3>
          <p className="text-3xl sm:text-4xl font-bold text-green-600 mb-6">₹{balance}</p>

          {/* Redemption Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Redemption Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="100"
                step="100"
                className="w-full border-2 border-purple-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum: ₹100</p>
            </div>

            <button
              onClick={handleRedemptionRequest}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Processing..." : "Request Redemption"}
            </button>
          </div>
        </div>

        {/* Redemption History */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Redemption History</h3>
          
          {redemptions.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No redemption requests yet</p>
          ) : (
            <div className="overflow-x-auto sm:overflow-visible">
              <table className="w-full min-w-full">
                <thead>
                  <tr className="border-b-2 border-purple-200">
                    <th className="text-center p-2 sm:p-3 font-semibold">Amount</th>
                    <th className="text-center p-2 sm:p-3 font-semibold">Status</th>
                    <th className="text-center p-2 sm:p-3 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {redemptions.map((redemption) => (
                    <tr key={redemption._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-2 sm:p-3 font-semibold text-center align-middle text-sm sm:text-base whitespace-nowrap">₹{redemption.amount}</td>
                      <td className="p-2 sm:p-3 text-center align-middle">
                        <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(redemption.status)}`}>
                          {redemption.status.charAt(0).toUpperCase() + redemption.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-600 text-center align-middle whitespace-nowrap">
                        {new Date(redemption.requestedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
