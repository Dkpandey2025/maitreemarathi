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

export default function WalletPage() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && user.wallet !== undefined) {
      setBalance(user.wallet);
    }
  }, []);

  const requestWithdrawal = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    const email = "support@maitreemarathi.com"; // your support email

    const subject = encodeURIComponent("Withdrawal Request");
    const body = encodeURIComponent(
      `Hello Team,

I would like to request a withdrawal.

Name: ${user?.name}
Phone: ${user?.phone}
Referral Code: ${user?.referralCode}
Current Wallet Balance: ₹${balance}

Requested Amount: ₹100

Thank you.`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6 text-center">
      <h2 className="text-3xl font-bold text-orange-600 mb-6">Wallet</h2>
      <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
        <h3 className="text-lg font-semibold mb-2">Current Balance</h3>
        <p className="text-2xl font-bold text-green-600 mb-4">₹{balance}</p>

        <button
          onClick={requestWithdrawal}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl"
        >
          Request Withdrawal
        </button>

        <p className="text-sm text-gray-600 mt-3">
          Minimum withdrawal: <strong>₹100</strong>
        </p>
      </div>
    </div>
  );
}
