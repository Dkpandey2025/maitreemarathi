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
      <div className="w-full pb-4">
        {/* Welcome Heading - Desktop Only */}
        <h1 className="hidden sm:block text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-4 sm:mb-6">
          Welcome, {user.name || "Learner"} 👋
        </h1>

        {/* Greeting Card - Mobile: horizontal, Desktop: banner */}
        <div className="sm:hidden bg-gradient-to-r from-purple-100 to-purple-50 p-4 rounded-2xl shadow-sm mb-4 flex items-start gap-3">
          <div className="bg-purple-500 p-3 rounded-xl flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              नमस्कार! 🙏
            </h2>
            <p className="text-sm text-gray-700">
              आज मराठी शिकण्यास सुरुवात करूया!
            </p>
            <p className="text-xs text-gray-600">
              (आज मराठी सीखना शुरू करें)
            </p>
          </div>
        </div>

        {/* Desktop Greeting Banner */}
        <section className="hidden sm:block bg-gradient-to-r from-purple-400 to-purple-300 text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-md text-center mb-6 sm:mb-10">
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

        {/* Quick Call Section - Mobile Only */}
        <div className="sm:hidden mb-6">
          <h3 className="text-base font-bold text-gray-800 mb-3">Quick Call</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                window.location.href = "tel:+919136915196";
              }}
              className="bg-purple-50 hover:bg-purple-100 p-4 rounded-xl text-center transition"
            >
              <p className="text-sm text-gray-700 font-medium">हेल्पलाइन</p>
            </button>
            <button
              onClick={() => window.open("https://wa.me/918987562984", "_blank")}
              className="bg-blue-50 hover:bg-blue-100 p-4 rounded-xl text-center transition"
            >
              <p className="text-sm text-gray-700 font-medium">चैट सहायता</p>
            </button>
          </div>
        </div>

        {/* Main Features Section - Mobile: vertical list, Desktop: grid */}
        <h3 className="sm:hidden text-base font-bold text-gray-800 mb-3">मुख्य विकल्प</h3>
        
        {/* Mobile: Vertical List */}
        <div className="sm:hidden space-y-3">
          {/* Mobile Cards with Icons and Arrows */}
          <Link to="/learn" className="bg-gradient-to-r from-purple-600 to-purple-500 p-5 rounded-2xl shadow-md hover:shadow-lg transition flex items-center gap-4 group">
            <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">मराठी सीखें</h3>
              <p className="text-sm text-white/90">पाठ, व्याकरण और शब्दावली सीखें</p>
            </div>
            <svg className="w-6 h-6 text-white flex-shrink-0 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link to="/translate" className="bg-gradient-to-r from-blue-500 to-blue-400 p-5 rounded-2xl shadow-md hover:shadow-lg transition flex items-center gap-4 group">
            <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">Translate</h3>
              <p className="text-sm text-white/90">हिंदी से मराठी या किसी भी भाषा में अनुवाद</p>
            </div>
            <svg className="w-6 h-6 text-white flex-shrink-0 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link to="/ai-learn" className="bg-gradient-to-r from-green-500 to-green-400 p-5 rounded-2xl shadow-md hover:shadow-lg transition flex items-center gap-4 group">
            <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">AI से सीखें</h3>
              <p className="text-sm text-white/90">AI के साथ संवादात्मक अभ्यास करें</p>
            </div>
            <svg className="w-6 h-6 text-white flex-shrink-0 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <Link to="/refer" className="bg-gradient-to-r from-orange-500 to-yellow-400 p-5 rounded-2xl shadow-md hover:shadow-lg transition flex items-center gap-4 group">
            <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">Refer & Earn</h3>
              <p className="text-sm text-white/90">दोस्तों को आमंत्रित करें और इनाम पाएं</p>
            </div>
            <svg className="w-6 h-6 text-white flex-shrink-0 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          <Link to="/learn" className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl text-white shadow-lg hover:shadow-xl transition bg-gradient-to-r from-purple-600 to-purple-500 text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">मराठी सीखें</h3>
            <p className="text-base sm:text-lg lg:text-xl text-white/90">पाठ, व्याकरण और शब्दावली सीखें</p>
          </Link>

          <Link to="/ai-learn" className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl text-white shadow-lg hover:shadow-xl transition bg-gradient-to-r from-green-400 to-emerald-400 text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">🤖 AI से सीखें</h3>
            <p className="text-base sm:text-lg lg:text-xl text-white/90">AI के साथ संवादात्मक अभ्यास करें</p>
          </Link>

          <Link to="/translate" className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl text-white shadow-lg hover:shadow-xl transition bg-gradient-to-r from-blue-400 to-cyan-400 text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">Translate</h3>
            <p className="text-base sm:text-lg lg:text-xl text-white/90">हिंदी से मराठी या किसी भी भाषा में अनुवाद</p>
          </Link>

          <Link to="/refer" className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl text-white shadow-lg hover:shadow-xl transition bg-gradient-to-r from-orange-400 to-yellow-400 text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">Refer & Earn</h3>
            <p className="text-base sm:text-lg lg:text-xl text-white/90">दोस्तों को आमंत्रित करें और इनाम पाएं 🎁</p>
          </Link>

          <button onClick={() => { window.location.href = "tel:+919136915196"; }} className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl text-white shadow-lg hover:shadow-xl transition bg-gradient-to-r from-pink-400 to-rose-400 text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">हेल्पलाइन</h3>
            <p className="text-base sm:text-lg lg:text-xl text-white/90">त्वरित सहायता प्राप्त करें</p>
          </button>

          <button onClick={() => window.open("https://wa.me/918987562984", "_blank")} className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl text-white shadow-lg hover:shadow-xl transition bg-gradient-to-r from-teal-400 to-cyan-400 text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">चैट सहायता</h3>
            <p className="text-base sm:text-lg lg:text-xl text-white/90">व्हाट्सअ‍ॅपवर आमच्याशी संपर्क करा</p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
