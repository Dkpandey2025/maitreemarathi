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
import { ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react";
import { API_ENDPOINTS } from "../config/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Password validation rules
  const passwordValidation = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

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

    // Validate password before submitting
    if (!isPasswordValid) {
      alert("Please ensure your password meets all requirements.");
      return;
    }

    try {
      const res = await axios.post(API_ENDPOINTS.REGISTER, {
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
          type="text"
          placeholder="Phone Number or Email"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-4 sm:mb-5 p-3 sm:p-4 text-base sm:text-lg border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          required
        />

        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordTouched(true)}
            className={`w-full p-3 sm:p-4 pr-12 text-base sm:text-lg border-2 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
              passwordTouched && !isPasswordValid
                ? "border-red-300"
                : "border-gray-200"
            }`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Eye className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Password Requirements */}
        {passwordTouched && (
          <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Password must contain:
            </p>
            <div className="space-y-1.5">
              <PasswordRequirement
                met={passwordValidation.minLength}
                text="At least 8 characters"
              />
              <PasswordRequirement
                met={passwordValidation.hasUpperCase}
                text="One uppercase letter (A-Z)"
              />
              <PasswordRequirement
                met={passwordValidation.hasLowerCase}
                text="One lowercase letter (a-z)"
              />
              <PasswordRequirement
                met={passwordValidation.hasSymbol}
                text="One special symbol (!@#$%^&*)"
              />
            </div>
          </div>
        )}

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
          disabled={passwordTouched && !isPasswordValid}
          className={`w-full font-semibold py-3 sm:py-4 text-base sm:text-lg rounded-lg sm:rounded-xl transition shadow-md hover:shadow-lg ${
            passwordTouched && !isPasswordValid
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          Register
        </button>

        {/* Already have an account link */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition"
          >
            Back to Login
          </button>
        </p>
      </form>
    </div>
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
      <span
        className={`text-xs sm:text-sm ${
          met ? "text-green-700 font-medium" : "text-gray-600"
        }`}
      >
        {text}
      </span>
    </div>
  );
}
