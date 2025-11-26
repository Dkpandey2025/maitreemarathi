// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function PlanSelectionPage() {
//   const { setFromPlan } = useAuth();
//   const navigate = useNavigate();
//   const [selected, setSelected] = useState(null);

//   const plans = {
//     monthly: {
//       id: "monthly",
//       price: 199,
//       label: "Monthly Subscription",
//       desc: "Full access for 1 month",
//     },
//     lifetime: {
//       id: "lifetime",
//       price: 499,
//       label: "Lifetime Subscription",
//       desc: "Lifetime access - Best Deal Ever!",
//       original: 5999,
//     },
//   };

//   const handleProceed = () => {
//     if (!selected) return;
//     const plan = plans[selected];
//     setFromPlan(true); // Set the flag when navigating from plan selection

//     // Redirect with plan & amount
//     navigate(`/payment?amount=${plan.price}&plan=${plan.id}`);
//   };

//   return (
//     <div className="min-h-screen bg-orange-50 flex justify-center items-center px-4 py-10">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
//           Choose Your Plan
//         </h2>

//         {/* Monthly Plan */}
//         <div
//           onClick={() => setSelected("monthly")}
//           className={`border rounded-xl p-5 mb-4 cursor-pointer transition ${
//             selected === "monthly"
//               ? "border-orange-500 bg-orange-100"
//               : "border-gray-300 bg-gray-50"
//           }`}
//         >
//           <h3 className="text-lg font-bold">Monthly Subscription</h3>
//           <p className="text-gray-600 text-sm">Full access for 1 month</p>
//           <div className="text-2xl font-bold text-orange-600 mt-2">₹199</div>
//         </div>

//         {/* Lifetime Plan */}
//         <div
//           onClick={() => setSelected("lifetime")}
//           className={`border rounded-xl p-5 cursor-pointer transition ${
//             selected === "lifetime"
//               ? "border-orange-500 bg-orange-100"
//               : "border-gray-300 bg-gray-50"
//           }`}
//         >
//           <div className="text-sm text-red-600 font-semibold">
//             Limited Offer
//           </div>

//           <h3 className="text-lg font-bold">Lifetime Subscription</h3>
//           <p className="text-gray-600 text-sm">
//             Lifetime access - Best Deal Ever!
//           </p>

//           <div className="flex gap-2 items-center mt-2">
//             <div className="text-2xl font-bold text-orange-600">₹499</div>
//             <div className="line-through text-gray-500">₹5999</div>
//           </div>
//         </div>

//         {/* Proceed Button */}
//         <button
//           onClick={handleProceed}
//           disabled={!selected}
//           className={`w-full mt-6 py-3 rounded-xl text-white font-semibold ${
//             selected ? "bg-orange-600 hover:bg-orange-700" : "bg-gray-400"
//           }`}
//         >
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../layout/DashboardLayout";

export default function PlanSelectionPage() {
  const { setFromPlan } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours in seconds

  const plans = {
    monthly: {
      id: "monthly",
      price: 199,
      label: "Monthly Subscription",
      desc: "Full access for 1 month",
    },
    lifetime: {
      id: "lifetime",
      price: 499,
      label: "Lifetime Subscription",
      desc: "Lifetime access - Best Deal Ever!",
      original: 5999,
    },
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleProceed = () => {
    if (!selected) return;
    const plan = plans[selected];

    setFromPlan(true);
    localStorage.setItem("selectedPlan", plan.id);
    navigate(`/payment?amount=${plan.price}&plan=${plan.id}`);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-purple-50 flex flex-col px-4 py-6 sm:py-10 relative">
        {/* Back Button */}
        {/* <div className="mb-4 sm:mb-6">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 px-4 py-2 sm:py-3 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-purple-50 transition-all duration-200"
            aria-label="Go back to home"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <span className="text-sm sm:text-base font-semibold text-purple-600">Back</span>
          </button>
        </div> */}

        <div className="bg-white shadow-2xl rounded-3xl p-5 sm:p-8 max-w-md w-full mx-auto">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-purple-600 mb-5">
          Choose Your Plan
        </h2>

        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl px-4 py-3 mb-5 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔥</span>
            <span className="font-bold text-sm sm:text-base">
              Limited Time Offer: {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Monthly Plan */}
        <div
          onClick={() => setSelected("monthly")}
          className={`border-2 rounded-2xl p-4 sm:p-5 mb-4 cursor-pointer transition-all duration-200 ${
            selected === "monthly"
              ? "border-purple-500 bg-purple-50 shadow-lg"
              : "border-gray-200 bg-gray-50 hover:border-purple-300 hover:shadow-md"
          }`}
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">Monthly Subscription</h3>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl sm:text-4xl font-bold text-purple-600">₹199</span>
            <span className="text-gray-400 line-through text-base sm:text-lg">₹599</span>
            <span className="text-gray-500 text-sm">/month</span>
          </div>
          <p className="text-gray-600 text-sm">Full access for 1 month</p>
        </div>

        {/* Lifetime Plan */}
        <div
          onClick={() => setSelected("lifetime")}
          className={`border-2 rounded-2xl p-4 sm:p-5 mb-5 cursor-pointer transition-all duration-200 relative ${
            selected === "lifetime"
              ? "border-purple-500 bg-purple-50 shadow-lg"
              : "border-gray-200 bg-gray-50 hover:border-purple-300 hover:shadow-md"
          }`}
        >
          {/* Limited Badge */}
          <div className="absolute -top-3 right-4 whitespace-nowrap">
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              For Limited Users Only
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 mt-2">Lifetime Subscription</h3>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl sm:text-4xl font-bold text-purple-600">₹499</span>
            <span className="text-gray-400 line-through text-base sm:text-lg">₹5,999</span>
          </div>
          <p className="text-gray-600 text-sm">Lifetime access - Best Deal Ever!</p>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          disabled={!selected}
          className={`w-full py-3 sm:py-4 rounded-2xl text-white font-bold text-base sm:text-lg shadow-lg transition-all duration-200 ${
            selected 
              ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 hover:shadow-xl active:scale-95" 
              : "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed opacity-60"
          }`}
        >
          {selected ? "Proceed to Payment" : "Select a Plan to Continue"}
        </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
