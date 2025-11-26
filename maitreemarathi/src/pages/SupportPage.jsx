// src/pages/SupportPage.jsx
import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import Footer from "../components/Footer";

export default function SupportPage() {
  const user = localStorage.getItem("loggedInUser");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const mailtoLink = `mailto:support@maitreemarathi.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const content = (
    <div className="bg-purple-50 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-2xl w-full mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-4 text-center">Support</h2>
        <p className="text-gray-700 mb-6 text-center">
          Need help? Fill out the form below or contact us directly.
        </p>

        {/* Support Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none text-sm sm:text-base"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-6 py-2 sm:py-3 rounded-xl hover:bg-purple-700 transition font-semibold text-sm sm:text-base"
          >
            Submit
          </button>
        </form>

        {/* Direct Contact Options */}
        <div className="border-t pt-4 sm:pt-6">
          <p className="text-gray-600 text-center mb-3 font-semibold text-sm">Or contact us directly:</p>
          <div className="space-y-2 sm:space-y-3">
            <a
              href="mailto:support@maitreemarathi.com"
              className="block bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-purple-700 transition font-semibold text-center text-sm sm:text-base"
            >
              support@maitreemarathi.com
            </a>
            <a
              href="https://wa.me/+919136915196"
              className="block bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-green-600 transition font-semibold text-center text-sm sm:text-base"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // If user is logged in, show with DashboardLayout
  if (user) {
    return <DashboardLayout>{content}</DashboardLayout>;
  }

  // If not logged in, show public version
  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <div className="flex-1">
        {content}
      </div>
      <Footer />
    </div>
  );
}
