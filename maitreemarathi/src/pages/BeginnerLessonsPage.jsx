// src/pages/BeginnerLessonsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

export default function BeginnerLessonsPage() {
  const navigate = useNavigate();

  const lessons = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Lesson ${i + 1}`,
    description: "Beginner level Marathi basics",
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
            Beginner Lessons
          </h1>
        </div>

        {/* Lessons List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => navigate(`/lesson/${lesson.id}`)}
              className="bg-white p-5 rounded-xl shadow-md border-l-4 border-orange-500 cursor-pointer hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{lesson.title}</h2>
              <p className="text-gray-600">{lesson.description}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
