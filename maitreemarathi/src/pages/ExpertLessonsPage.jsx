import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export default function ExpertLessonsPage() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const phone = localStorage.getItem("userPhone") || JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.phone;

  useEffect(() => {
    checkUnlockStatus();
  }, []);

  const checkUnlockStatus = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.USER_LEVEL_STATUS(phone));
      if (res.data.status === "success") {
        if (res.data.levelStatus.expert.unlocked) {
          setIsUnlocked(true);
          fetchLessons();
        } else {
          alert("Complete all Medium days to unlock Expert level!");
          navigate("/learn");
        }
      }
    } catch (err) {
      console.error("Error checking unlock status:", err);
    }
  };

  const fetchLessons = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.USER_LESSONS("expert", phone));
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
      navigate(`/quiz/expert/${lesson.quizNumber}`);
      return;
    }
    if (lesson.isUnlocked) {
      navigate(`/lesson/${lesson._id}`);
    }
  };

  if (!isUnlocked) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-purple-50 p-6 flex items-center justify-center">
          <p className="text-xl">Checking access...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600">Expert Days</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">Master advanced Marathi concepts</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              onClick={() => handleLessonClick(lesson)}
              className={`p-5 rounded-xl shadow-md border-l-4 transition ${
                lesson.isCompleted
                  ? "bg-green-100 border-green-500"
                  : lesson.requiresSubscription
                  ? "bg-yellow-50 border-yellow-500 cursor-pointer hover:shadow-lg"
                  : lesson.isUnlocked
                  ? "bg-white border-green-500 cursor-pointer hover:shadow-lg"
                  : "bg-gray-200 border-gray-400 opacity-70 cursor-not-allowed"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">
                    Day {lesson.lessonNumber}: {lesson.title}
                  </h2>
                  {lesson.requiresSubscription && (
                    <p className="text-sm text-yellow-700 font-semibold mt-1">
                      👑 Subscription Required
                    </p>
                  )}
                  {lesson.requiresQuiz && !lesson.requiresSubscription && (
                    <p className="text-sm text-red-600 font-semibold mt-1">
                      🎯 Complete Quiz {lesson.quizNumber} to unlock
                    </p>
                  )}
                </div>
                <span className="text-2xl">
                  {lesson.isCompleted ? "✅" : 
                   lesson.requiresSubscription ? "👑" :
                   lesson.isUnlocked ? "📖" : "🔒"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
