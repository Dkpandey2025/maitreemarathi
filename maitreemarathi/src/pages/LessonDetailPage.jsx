import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";

export default function LessonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const phone = localStorage.getItem("userPhone") || JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.phone;

  useEffect(() => {
    fetchLesson();
  }, [id]);

  const fetchLesson = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/lesson/${id}`);
      if (res.data.status === "success") {
        setLesson(res.data.lesson);
      }
    } catch (err) {
      console.error("Error fetching lesson:", err);
    }
  };

  const markAsCompleted = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/complete-lesson", {
        phone,
        lessonId: id
      });
      if (res.data.status === "success") {
        alert("Lesson completed! Next lesson unlocked.");
        navigate(-1);
      }
    } catch (err) {
      console.error("Error marking lesson as completed:", err);
    }
  };

  if (!lesson) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-orange-50 p-6 flex items-center justify-center">
          <p className="text-xl">Loading lesson...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-orange-50 p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-orange-200"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold text-orange-600">
            Lesson {lesson.lessonNumber}: {lesson.title}
          </h1>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {lesson.level}
            </span>
          </div>

          <div className="prose max-w-none">
            <div className="text-gray-700 leading-8 whitespace-pre-wrap">
              {lesson.content}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={markAsCompleted}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg"
            >
              ✓ I've Read This Lesson
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
