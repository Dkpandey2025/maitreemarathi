// src/pages/AboutPage.jsx
import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-orange-50 p-8 flex items-center justify-center">
      <div className="max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">About Us</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Maitree Marathi is an innovative platform designed to help learners of all
          backgrounds easily learn and speak Marathi through engaging lessons,
          interactive AI tools, and fun activities.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our mission is to preserve and promote the beauty of the Marathi language by
          making it accessible, simple, and fun to learn for everyone.
        </p>
        <p className="text-gray-700">
          Join us and start your Marathi learning journey with interactive lessons,
          real-time AI assistance, and exciting rewards!
        </p>
      </div>
    </div>
  );
}
