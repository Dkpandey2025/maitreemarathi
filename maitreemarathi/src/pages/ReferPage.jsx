// src/pages/ReferPage.jsx
import React from "react";

export default function ReferPage() {
  const referCode = "MAITREE123";

  const copyCode = () => {
    navigator.clipboard.writeText(referCode);
    alert("Referral code copied!");
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6 text-center">
      <h2 className="text-3xl font-bold text-orange-600 mb-4">Refer & Earn</h2>
      <p className="text-gray-700 mb-6">
        Invite friends to join Maitree Marathi and earn exciting rewards!
      </p>
      <div className="bg-white shadow-lg rounded-2xl inline-block p-6">
        <h3 className="text-lg font-semibold mb-2">Your Referral Code</h3>
        <div className="flex justify-center items-center gap-2">
          <span className="font-mono bg-gray-100 px-4 py-2 rounded-lg">{referCode}</span>
          <button
            onClick={copyCode}
            className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
