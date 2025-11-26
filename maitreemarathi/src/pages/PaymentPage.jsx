// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// async function paynow(e) {
//   e.preventDefault();
//   try {
//     const form = e.target;

//     const payload = {
//       buyer_name: form.buyer_name.value,
//       amount: form.amount.value,
//       email: form.email.value,
//       phone: form.phone.value,
//       product: form.product.value,
//       purpose: form.purpose.value,
//     };

//     const res = await axios.post("http://localhost:5000/payment", payload);

//     const url = res.data.data.payment_request.longurl;
//     window.location.href = url;
//   } catch (err) {
//     console.log("Payment Error:", err);
//     alert("Payment request failed!");
//   }
// }

// export default function PaymentPage() {
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);

//   const [amount, setAmount] = useState("");
//   const [plan, setPlan] = useState("");

//   useEffect(() => {
//     const urlAmount = query.get("amount");
//     const urlPlan = query.get("plan");

//     if (urlAmount) setAmount(urlAmount);
//     if (urlPlan) setPlan(urlPlan);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex justify-center items-center p-6">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 border border-orange-200">
//         <h2 className="text-3xl font-bold text-center text-orange-600 mb-1">
//           Secure Payment
//         </h2>
//         <p className="text-center text-gray-600 mb-6 text-sm">
//           Complete your payment to continue learning with Maitreemarathi
//         </p>

//         <form onSubmit={paynow} className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="text-gray-600 text-sm">Full Name</label>
//             <input
//               type="text"
//               name="buyer_name"
//               required
//               placeholder="Enter your full name"
//               className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-gray-600 text-sm">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               required
//               placeholder="example@gmail.com"
//               className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="text-gray-600 text-sm">Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               required
//               placeholder="9876543210"
//               className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300"
//             />
//           </div>

//           {/* Auto Filled Amount */}
//           <div>
//             <label className="text-gray-600 text-sm">Amount (₹)</label>
//             <input
//               type="number"
//               name="amount"
//               value={amount}
//               readOnly
//               className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 bg-gray-100"
//             />
//           </div>

//           {/* Auto Filled Purpose */}
//           <div>
//             <label className="text-gray-600 text-sm">Purpose</label>
//             <input
//               type="text"
//               name="purpose"
//               value={
//                 plan === "monthly"
//                   ? "Monthly Marathi Course Subscription"
//                   : "Lifetime Marathi Course Subscription"
//               }
//               readOnly
//               className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 bg-gray-100"
//             />
//           </div>

//           {/* Auto Filled Product Name */}
//           <div>
//             <label className="text-gray-600 text-sm">Product</label>
//             <input
//               type="text"
//               name="product"
//               value={plan}
//               readOnly
//               className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 bg-gray-100"
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
//           >
//             Pay Securely
//           </button>
//         </form>

//         <p className="text-center text-gray-400 text-xs mt-6">
//           Payments processed securely via Instamojo
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

async function paynow(e) {
  e.preventDefault();
  try {
    const form = e.target;

    const payload = {
      buyer_name: form.buyer_name.value,
      amount: form.amount.value,
      email: form.email.value,
      phone: form.phone.value,
      product: form.product.value,
      purpose: form.purpose.value,
    };

    const res = await axios.post(API_ENDPOINTS.PAYMENT, payload);

    const url = res.data.data.payment_request.longurl;
    window.location.href = url;
  } catch (err) {
    console.log("Payment Error:", err);
    alert("Payment request failed!");
  }
}

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, fromPlan, setFromPlan } = useAuth();

  const query = new URLSearchParams(location.search);
  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState("");

  // 🔒 Route Protection
  useEffect(() => {
    // 1️⃣ Not logged in → login
    // if (!user) {
    //   navigate("/login");
    //   return;
    // }

    // 2️⃣ User did NOT come from Plan Page → redirect to /plan
    if (!fromPlan) {
      navigate("/plan");
      return;
    }

    // Reset the flag after entering
    return () => setFromPlan(false);
  }, []);

  // Auto-fill values
  useEffect(() => {
    const urlAmount = query.get("amount");
    const urlPlan = query.get("plan");

    if (urlAmount) setAmount(urlAmount);
    if (urlPlan) setPlan(urlPlan);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 border border-purple-200">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-1">
          Secure Payment
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Complete your payment to continue learning with Maitreemarathi
        </p>

        <form onSubmit={paynow} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-gray-600 text-sm">Full Name</label>
            <input
              type="text"
              name="buyer_name"
              required
              placeholder="Enter your full name"
              className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-600 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@gmail.com"
              className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-gray-600 text-sm">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="9876543210"
              className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300"
            />
          </div>

          {/* Auto Filled Amount */}
          <div>
            <label className="text-gray-600 text-sm">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={amount}
              readOnly
              className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 bg-gray-100"
            />
          </div>

          {/* Auto Filled Purpose */}
          <div>
            <label className="text-gray-600 text-sm">Purpose</label>
            <input
              type="text"
              name="purpose"
              value={
                plan === "monthly"
                  ? "Monthly Marathi Course Subscription"
                  : "Lifetime Marathi Course Subscription"
              }
              readOnly
              className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 bg-gray-100"
            />
          </div>

          {/* Auto Filled Product */}
          <div>
            <label className="text-gray-600 text-sm">Product</label>
            <input
              type="text"
              name="product"
              value={plan}
              readOnly
              className="w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 bg-gray-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
          >
            Pay Securely
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          Payments processed securely via Instamojo
        </p>
      </div>
    </div>
  );
}
