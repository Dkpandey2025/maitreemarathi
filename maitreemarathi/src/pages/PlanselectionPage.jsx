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


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";   // ✅ FIXED IMPORT

export default function PlanSelectionPage() {
  const { setFromPlan } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

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

  const handleProceed = () => {
    if (!selected) return;
    const plan = plans[selected];

    setFromPlan(true); // Mark that user came from plan page
    
    // Save selected plan to localStorage for payment success page
    localStorage.setItem("selectedPlan", plan.id);

    navigate(`/payment?amount=${plan.price}&plan=${plan.id}`);
  };

  return (
    <div className="min-h-screen bg-orange-50 flex justify-center items-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Choose Your Plan
        </h2>

        {/* Monthly */}
        <div
          onClick={() => setSelected("monthly")}
          className={`border rounded-xl p-5 mb-4 cursor-pointer transition ${
            selected === "monthly"
              ? "border-orange-500 bg-orange-100"
              : "border-gray-300 bg-gray-50"
          }`}
        >
          <h3 className="text-lg font-bold">Monthly Subscription</h3>
          <p className="text-gray-600 text-sm">Full access for 1 month</p>
          <div className="text-2xl font-bold text-orange-600 mt-2">₹199</div>
        </div>

        {/* Lifetime */}
        <div
          onClick={() => setSelected("lifetime")}
          className={`border rounded-xl p-5 cursor-pointer transition ${
            selected === "lifetime"
              ? "border-orange-500 bg-orange-100"
              : "border-gray-300 bg-gray-50"
          }`}
        >
          <div className="text-sm text-red-600 font-semibold">
            Limited Offer
          </div>

          <h3 className="text-lg font-bold">Lifetime Subscription</h3>
          <p className="text-gray-600 text-sm">
            Lifetime access - Best Deal Ever!
          </p>

          <div className="flex gap-2 items-center mt-2">
            <div className="text-2xl font-bold text-orange-600">₹499</div>
            <div className="line-through text-gray-500">₹5999</div>
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          disabled={!selected}
          className={`w-full mt-6 py-3 rounded-xl text-white font-semibold ${
            selected ? "bg-orange-600 hover:bg-orange-700" : "bg-gray-400"
          }`}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
