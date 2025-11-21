import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";

export default function BeginnerPage() {
  const navigate = useNavigate();
  const [levelStatus, setLevelStatus] = useState({
    beginner: { unlocked: true, completed: 0, total: 0 },
    medium: { unlocked: false, completed: 0, total: 0 },
    expert: { unlocked: false, completed: 0, total: 0 }
  });
  const phone = localStorage.getItem("userPhone") || JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.phone;

  useEffect(() => {
    if (phone) {
      fetchLevelStatus();
    } else {
      console.error("No phone number found");
    }
  }, []);

  const fetchLevelStatus = async () => {
    try {
      console.log("Fetching level status for phone:", phone);
      const res = await axios.get(`http://localhost:5000/api/user/level-status/${phone}`);
      console.log("Level status response:", res.data);
      if (res.data.status === "success") {
        setLevelStatus(res.data.levelStatus);
      }
    } catch (err) {
      console.error("Error fetching level status:", err);
    }
  };

  const handleLevelClick = (level, unlocked) => {
    if (!unlocked) {
      alert("Complete the previous level to unlock this!");
      return;
    }
    navigate(`/${level}-lessons`);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100 p-4 sm:p-6 lg:p-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center justify-center p-2 sm:p-3 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-purple-50 transition-all duration-200"
            aria-label="Go back"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600">मराठी सीखें</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Choose your learning level</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5">
          {/* Beginners */}
          <div
            className={`group relative p-5 sm:p-6 rounded-2xl shadow-lg border-l-4 transition-all duration-300 ${
              levelStatus.beginner.unlocked
                ? "bg-gradient-to-r from-white to-purple-50 hover:shadow-2xl hover:scale-[1.02] cursor-pointer border-purple-500"
                : "bg-gray-200 cursor-not-allowed opacity-60 border-gray-400"
            }`}
            onClick={() => handleLevelClick("beginner", levelStatus.beginner.unlocked)}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📚</span>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    I. Beginners {!levelStatus.beginner.unlocked && "🔒"}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600">शुरुआत से सीखने वालों के लिए पाठ</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center bg-purple-100 px-4 py-2 rounded-lg">
                  <p className="text-xs text-gray-600">Progress</p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-600">
                    {levelStatus.beginner.completed}/{levelStatus.beginner.total}
                  </p>
                </div>
                {levelStatus.beginner.unlocked && (
                  <svg className="w-6 h-6 text-purple-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Medium */}
          <div
            className={`group relative p-5 sm:p-6 rounded-2xl shadow-lg border-l-4 transition-all duration-300 ${
              levelStatus.medium.unlocked
                ? "bg-gradient-to-r from-white to-purple-50 hover:shadow-2xl hover:scale-[1.02] cursor-pointer border-purple-500"
                : "bg-gray-200 cursor-not-allowed opacity-60 border-gray-400"
            }`}
            onClick={() => handleLevelClick("medium", levelStatus.medium.unlocked)}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📖</span>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    II. Medium {!levelStatus.medium.unlocked && "🔒"}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  {levelStatus.medium.unlocked ? "मध्यम स्तर के पाठ" : "Beginners पूरा होने पर unlock होगा"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {levelStatus.medium.unlocked && (
                  <>
                    <div className="text-center bg-purple-100 px-4 py-2 rounded-lg">
                      <p className="text-xs text-gray-600">Progress</p>
                      <p className="text-xl sm:text-2xl font-bold text-purple-600">
                        {levelStatus.medium.completed}/{levelStatus.medium.total}
                      </p>
                    </div>
                    <svg className="w-6 h-6 text-purple-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Expert */}
          <div
            className={`group relative p-5 sm:p-6 rounded-2xl shadow-lg border-l-4 transition-all duration-300 ${
              levelStatus.expert.unlocked
                ? "bg-gradient-to-r from-white to-purple-50 hover:shadow-2xl hover:scale-[1.02] cursor-pointer border-purple-500"
                : "bg-gray-200 cursor-not-allowed opacity-60 border-gray-400"
            }`}
            onClick={() => handleLevelClick("expert", levelStatus.expert.unlocked)}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎓</span>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    III. Expert {!levelStatus.expert.unlocked && "🔒"}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  {levelStatus.expert.unlocked ? "उन्नत स्तर के पाठ" : "Medium पूरा होने पर unlock होगा"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {levelStatus.expert.unlocked && (
                  <>
                    <div className="text-center bg-purple-100 px-4 py-2 rounded-lg">
                      <p className="text-xs text-gray-600">Progress</p>
                      <p className="text-xl sm:text-2xl font-bold text-purple-600">
                        {levelStatus.expert.completed}/{levelStatus.expert.total}
                      </p>
                    </div>
                    <svg className="w-6 h-6 text-purple-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
