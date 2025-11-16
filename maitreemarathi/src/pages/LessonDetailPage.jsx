// src/pages/LessonDetailPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

export default function LessonDetailPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">
          Lesson {id} Details
        </h2>
        <p className="text-gray-700 mb-6">
          This lesson will help you learn key Marathi words and phrases. Practice speaking them aloud to improve your fluency.
        </p>

        <div className="flex justify-end">
          <Link
            to="/home"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl"
          >
            Back to Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
