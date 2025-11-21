import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        phone,
        password,
      });

      console.log("Login API Response:", res.data);

      if (res.data.status === "success") {
        alert("Login Successful!");

        // Clear all old login data
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("token");
        localStorage.removeItem("referralCode");

        // Save fresh data from backend
        localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
        localStorage.setItem("userType", res.data.userType);

        // Save phone for API calls
        if (res.data.userType === "user") {
          localStorage.setItem("userPhone", res.data.user.phone);
        }

        console.log("Saved user:", JSON.stringify(res.data.user));

        // Redirect based on user type
        if (res.data.userType === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      } else {
        alert(res.data.message || "Invalid credentials!");
      }
    } catch (err) {
      console.log("Login error:", err);
      alert("Something went wrong during login!");
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
        onSubmit={handleLogin}
        className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-lg w-full max-w-sm sm:max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-6 sm:mb-8 text-center">
          Login to Maitree Marathi
        </h2>

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
          className="w-full mb-6 sm:mb-8 p-3 sm:p-4 text-base sm:text-lg border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-3 sm:py-4 text-base sm:text-lg rounded-lg sm:rounded-xl hover:bg-purple-700 transition shadow-md hover:shadow-lg"
        >
          Login
        </button>

        <p className="text-center text-sm sm:text-base mt-6 sm:mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-600 font-semibold hover:text-purple-700">
            Register
          </Link>
        </p>

        <p className="text-center text-xs sm:text-sm mt-4 sm:mt-6">
          <Link to="/admin-login" className="text-gray-600 hover:text-gray-800 transition">
            Admin Login →
          </Link>
        </p>
      </form>
    </div>
  );
}
