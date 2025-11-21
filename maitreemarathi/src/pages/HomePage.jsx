import React, { useState } from "react";
//import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import DashboardLayout from "../layout/DashboardLayout";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

  return (
    <DashboardLayout>
      <div className="w-full">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-4 sm:mb-6">
          Welcome, {user.name || "Learner"} 👋
        </h1>

        {/* Greeting Banner */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-md text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            नमस्कार! 🙏
          </h2>
          <p className="text-base sm:text-lg">
            आज मराठी शिकण्यास सुरुवात करूया! <br />
            <span className="text-white/80 text-sm sm:text-base">
              (आज मराठी सीखना शुरू करें)
            </span>
          </p>
        </section>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {/* Beginner Lessons */}
          <Link
            to="/learn"
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl text-white shadow-md hover:shadow-lg transition bg-gradient-to-r from-purple-500 to-pink-500 text-center"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              मराठी सीखें
            </h3>
            <p className="text-sm sm:text-base text-white/90">
              पाठ, व्याकरण और शब्दावली सीखें
            </p>
          </Link>

          {/* AI Learning */}
          <Link
            to="/ai-learn"
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl text-white shadow-md hover:shadow-lg transition bg-gradient-to-r from-green-500 to-emerald-500 text-center"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              🤖 AI से सीखें
            </h3>
            <p className="text-sm sm:text-base text-white/90">
              AI के साथ संवादात्मक अभ्यास करें
            </p>
          </Link>

          {/* Translate */}
          <Link
            to="/translate"
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl text-white shadow-md hover:shadow-lg transition bg-gradient-to-r from-blue-500 to-cyan-500 text-center"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Translate
            </h3>
            <p className="text-sm sm:text-base text-white/90">
              हिंदी से मराठी या किसी भी भाषा में अनुवाद
            </p>
          </Link>

          {/* Refer & Earn */}
          <Link
            to="/refer"
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl text-white shadow-md hover:shadow-lg transition bg-gradient-to-r from-orange-500 to-red-500 text-center"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Refer & Earn
            </h3>
            <p className="text-sm sm:text-base text-white/90">
              दोस्तों को आमंत्रित करें और इनाम पाएं 🎁
            </p>
          </Link>

          {/* Quick Helpline */}
          <button
            onClick={() => {
              alert("Calling our helpline...");
              window.location.href = "tel:+918987562984";
            }}
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl text-white shadow-md hover:shadow-lg transition bg-gradient-to-r from-orange-500 to-amber-500 text-center"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              हेल्पलाइन
            </h3>
            <p className="text-sm sm:text-base text-white/90">
              त्वरित सहायता प्राप्त करें
            </p>
          </button>

          {/* WhatsApp Chat */}
          <button
            onClick={() => window.open("https://wa.me/918987562984", "_blank")}
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl text-white shadow-md hover:shadow-lg transition bg-gradient-to-r from-green-500 to-lime-500 text-center"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              चैट सहायता
            </h3>
            <p className="text-sm sm:text-base text-white/90">
              व्हाट्सअ‍ॅपवर आमच्याशी संपर्क करा
            </p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
