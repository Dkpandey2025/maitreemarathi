import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export default function BeginnerLessonsPage() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const phone = localStorage.getItem("userPhone") || JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.phone;

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.USER_LESSONS("beginner", phone));
      if (res.data.status === "success") {
        setLessons(res.data.lessons);
      }
    } catch (err) {
      console.error("Error fetching lessons:", err);
    }
  };

  const handleLessonClick = (lesson) => {
    if (!lesson.isUnlocked && !lesson.requiresSubscription) {
      alert(`🔒 Please complete Day ${lesson.lessonNumber - 1} first to unlock this day!`);
      return;
    }
    if (lesson.requiresSubscription) {
      if (confirm("👑 This day requires a subscription. Would you like to upgrade now?")) {
        navigate("/plan");
      }
      return;
    }
    if (lesson.requiresQuiz) {
      alert(`🎯 Please complete Quiz ${lesson.quizNumber} first to unlock this day!`);
      navigate(`/quiz/beginner/${lesson.quizNumber}`);
      return;
    }
    if (lesson.isUnlocked) {
      navigate(`/lesson/${lesson._id}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600">Beginner Days</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">Start your Marathi learning journey</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              onClick={() => handleLessonClick(lesson)}
              className={`group relative p-4 sm:p-5 rounded-2xl shadow-lg border-l-4 transition-all duration-300 ${
                lesson.isCompleted
                  ? "bg-gradient-to-r from-green-50 to-green-100 border-green-500"
                  : lesson.requiresSubscription
                  ? "bg-gradient-to-r from-purple-50 to-purple-100 border-purple-500 cursor-pointer hover:shadow-2xl hover:scale-[1.02]"
                  : lesson.isUnlocked
                  ? "bg-gradient-to-r from-white to-purple-50 border-purple-500 cursor-pointer hover:shadow-2xl hover:scale-[1.02]"
                  : "bg-gray-200 border-gray-400 opacity-70 cursor-not-allowed"
              }`}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl sm:text-2xl">
                      {lesson.isCompleted ? "✅" : 
                       lesson.requiresSubscription ? "👑" :
                       lesson.isUnlocked ? "📖" : "🔒"}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-gray-800">
                      Day {lesson.lessonNumber}
                    </h2>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-2">
                    {lesson.title}
                  </h3>
                  {lesson.requiresSubscription && (
                    <p className="text-xs sm:text-sm text-purple-700 font-semibold flex items-center gap-1">
                      <span>👑</span> Subscription Required
                    </p>
                  )}
                  {lesson.requiresQuiz && !lesson.requiresSubscription && (
                    <p className="text-xs sm:text-sm text-red-600 font-semibold flex items-center gap-1">
                      <span>🎯</span> Complete Quiz {lesson.quizNumber}
                    </p>
                  )}
                </div>
                {(lesson.isUnlocked || lesson.requiresSubscription) && (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
