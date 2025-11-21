// src/pages/MediumLessonsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

export default function MediumLessonsPage() {
  const navigate = useNavigate();

  const lessons = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Medium Lesson ${i + 1}`,
    description: "Advanced sentences and grammar",
  }));

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-orange-50 p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/learn")}
            className="p-2 bg-white rounded-full shadow-md hover:bg-orange-200"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold text-orange-600">
            Medium Lessons
          </h1>
        </div>

        {/* Lessons List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => navigate(`/lesson/medium-${lesson.id}`)}
              className="bg-gray-200 p-5 rounded-xl shadow-md opacity-70 border-l-4 border-gray-400 cursor-not-allowed"
            >
              <h2 className="text-lg font-semibold">{lesson.title} 🔒</h2>
              <p className="text-gray-600">
                Beginners पूरा होने पर unlock होगा
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
