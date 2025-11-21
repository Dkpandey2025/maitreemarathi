// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// export default function RegisterPage() {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   // const handleRegister = (e) => {
//   //   e.preventDefault();
//   //  axios.post('http://localhost:5000/register',{name,phone,password}).then((res)=>{
//   //   console.log(res.data);
//   //  }).catch((err)=>{
//   //   console.log(err);
//   //  })
//   //   // if (users.find((u) => u.phone === phone)) {
//   //   //   alert("User already exists!");
//   //   //   return;
//   //   // }

//   //   const newUser = {
//   //     name,
//   //     phone,
//   //     password,
//   //     userId: "U" + Date.now(),
//   //     plan: "",
//   //     progress: {},
//   //   };

//   //   // users.push(newUser);
//   //   // localStorage.setItem("registeredUsers", JSON.stringify(users));
//   //   // localStorage.setItem("loggedInUser", JSON.stringify(newUser));

//   //   alert("Registered successfully!");
//   //   navigate("/home");
//   // };
// const handleRegister = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await axios.post("http://localhost:5000/register", {
//       name,
//       phone,
//       password,
//     });

//     console.log(res.data);

//     if (res.data.status === "success") {
//       alert("Registered successfully!");
//       navigate("/home");
//     } else if (res.data.status === "error" && res.data.message) {
//       alert(res.data.message);
//     } else {
//       alert("Something went wrong. Please try again.");
//     }
//   } catch (err) {
//     console.error(err);

//     if (err.response && err.response.data && err.response.data.message) {
//       alert(err.response.data.message);
//     } else {
//       alert("Server error. Please try again later.");
//     }
//   }
// };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-orange-50">
//       <form
//         onSubmit={handleRegister}
//         className="bg-white p-8 rounded-2xl shadow-lg w-96"
//       >
//         <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
//           Create Account
//         </h2>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           required
//         />
//         <input
//           type="tel"
//           placeholder="Mobile Number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get referral code from URL: /register?ref=MM123456
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");

    if (ref) {
      setReferralCode(ref); // auto-set referral
    }
  }, [location.search]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/register", {
        name,
        phone,
        password,
        referralCode, // ⭐ sending referral code to backend
      });

      console.log(res.data);

      if (res.data.status === "success") {
        alert("Registered successfully!");
        navigate("/home");
      } else if (res.data.status === "error" && res.data.message) {
        alert(res.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);

      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 p-2 sm:p-3 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-purple-50 transition-all z-10"
        aria-label="Go back to home"
      >
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
      </button>

      <form
        onSubmit={handleRegister}
        className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-lg w-full max-w-sm sm:max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-6 sm:mb-8 text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 sm:mb-5 p-3 sm:p-4 text-base sm:text-lg border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          required
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-4 sm:mb-5 p-3 sm:p-4 text-base sm:text-lg border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 sm:mb-5 p-3 sm:p-4 text-base sm:text-lg border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          required
        />

        {/* ⭐ Optional Referral Code Input */}
        <input
          type="text"
          placeholder="Referral Code (optional)"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          className="w-full mb-6 sm:mb-8 p-3 sm:p-4 text-base sm:text-lg border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled={location.search.includes("ref")}
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-3 sm:py-4 text-base sm:text-lg rounded-lg sm:rounded-xl hover:bg-purple-700 transition shadow-md hover:shadow-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
}
