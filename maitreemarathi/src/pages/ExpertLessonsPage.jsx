import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";

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
      const res = await axios.get(`http://localhost:5000/api/user/level-status/${phone}`);
      if (res.data.status === "success") {
        if (res.data.levelStatus.expert.unlocked) {
          setIsUnlocked(true);
          fetchLessons();
        } else {
          alert("Complete all Medium lessons to unlock Expert level!");
          navigate("/learn");
        }
      }
    } catch (err) {
      console.error("Error checking unlock status:", err);
    }
  };

  const fetchLessons = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user/lessons/expert/${phone}`);
      if (res.data.status === "success") {
        setLessons(res.data.lessons);
      }
    } catch (err) {
      console.error("Error fetching lessons:", err);
    }
  };

  const handleLessonClick = (lesson) => {
    if (lesson.requiresQuiz) {
      navigate(`/quiz/expert/${lesson.quizNumber}`);
    } else if (lesson.isUnlocked) {
      navigate(`/lesson/${lesson._id}`);
    }
  };

  if (!isUnlocked) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-orange-50 p-6 flex items-center justify-center">
          <p className="text-xl">Checking access...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-orange-50 p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/learn")}
            className="p-2 bg-white rounded-full shadow-md hover:bg-orange-200"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold text-orange-600">Expert Lessons</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              onClick={() => handleLessonClick(lesson)}
              className={`p-5 rounded-xl shadow-md border-l-4 transition ${
                lesson.isCompleted
                  ? "bg-green-100 border-green-500"
                  : lesson.isUnlocked
                  ? "bg-white border-orange-500 cursor-pointer hover:shadow-lg"
                  : "bg-gray-200 border-gray-400 opacity-70 cursor-not-allowed"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">
                    Lesson {lesson.lessonNumber}: {lesson.title}
                  </h2>
                  {lesson.requiresQuiz && (
                    <p className="text-sm text-red-600 font-semibold mt-1">
                      🎯 Complete Quiz {lesson.quizNumber} to unlock
                    </p>
                  )}
                </div>
                <span className="text-2xl">
                  {lesson.isCompleted ? "✅" : lesson.isUnlocked ? "📖" : "🔒"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
