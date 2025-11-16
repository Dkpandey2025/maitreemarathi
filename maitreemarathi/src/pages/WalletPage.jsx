// src/pages/WalletPage.jsx
import React, { useState } from "react";

export default function WalletPage() {
  const [balance, setBalance] = useState(250);

  const handleWithdraw = () => {
    if (balance >= 100) {
      alert("Withdrawal request sent successfully!");
      setBalance(balance - 100);
    } else {
      alert("Insufficient balance!");
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6 text-center">
      <h2 className="text-3xl font-bold text-orange-600 mb-6">Wallet</h2>
      <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
        <h3 className="text-lg font-semibold mb-2">Current Balance</h3>
        <p className="text-2xl font-bold text-green-600 mb-4">₹{balance}</p>
        <button
          onClick={handleWithdraw}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl"
        >
          Withdraw ₹100
        </button>
      </div>
    </div>
  );
}
