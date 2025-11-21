import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });

      console.log("Admin Login Response:", res.data);

      if (res.data.status === "success") {
        alert("Admin Login Successful!");

        // Clear old data
        localStorage.clear();

        // Save admin data
        localStorage.setItem("loggedInUser", JSON.stringify(res.data.admin));
        localStorage.setItem("userType", "admin");

        // Redirect to admin dashboard
        navigate("/admin", { replace: true });
      } else {
        alert(res.data.message || "Invalid admin credentials!");
      }
    } catch (err) {
      console.log("Admin login error:", err);
      alert("Something went wrong during admin login!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-900">
      <form
        onSubmit={handleAdminLogin}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96"
      >
        <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
          🔐 Admin Login
        </h2>

        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-800 text-white font-semibold py-3 rounded-lg hover:bg-purple-900"
        >
          Login as Admin
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          <Link to="/login" className="text-purple-600 font-semibold hover:underline">
            ← Back to User Login
          </Link>
        </p>
      </form>
    </div>
  );
}
