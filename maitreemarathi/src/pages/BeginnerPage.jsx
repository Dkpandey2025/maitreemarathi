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
      <div className="min-h-screen bg-orange-50 p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/home")}
            className="p-2 bg-white rounded-full shadow-md hover:bg-orange-100"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold text-orange-600">मराठी सीखें</h1>
        </div>

        <div className="max-w-xl mx-auto space-y-4">
          {/* Beginners */}
          <div
            className={`p-5 rounded-xl shadow-md border-l-4 ${
              levelStatus.beginner.unlocked
                ? "bg-white hover:shadow-lg cursor-pointer border-orange-500"
                : "bg-gray-200 cursor-not-allowed opacity-60 border-gray-400"
            }`}
            onClick={() => handleLevelClick("beginner", levelStatus.beginner.unlocked)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">I. Beginners {!levelStatus.beginner.unlocked && "🔒"}</h2>
                <p className="text-gray-600">शुरुआत से सीखने वालों के लिए पाठ</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Progress</p>
                <p className="text-lg font-bold text-orange-600">
                  {levelStatus.beginner.completed}/{levelStatus.beginner.total}
                </p>
              </div>
            </div>
          </div>

          {/* Medium */}
          <div
            className={`p-5 rounded-xl shadow-md border-l-4 ${
              levelStatus.medium.unlocked
                ? "bg-white hover:shadow-lg cursor-pointer border-blue-500"
                : "bg-gray-200 cursor-not-allowed opacity-60 border-gray-400"
            }`}
            onClick={() => handleLevelClick("medium", levelStatus.medium.unlocked)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">II. Medium {!levelStatus.medium.unlocked && "🔒"}</h2>
                <p className="text-gray-600">
                  {levelStatus.medium.unlocked ? "मध्यम स्तर के पाठ" : "Beginners पूरा होने पर unlock होगा"}
                </p>
              </div>
              {levelStatus.medium.unlocked && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Progress</p>
                  <p className="text-lg font-bold text-blue-600">
                    {levelStatus.medium.completed}/{levelStatus.medium.total}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Expert */}
          <div
            className={`p-5 rounded-xl shadow-md border-l-4 ${
              levelStatus.expert.unlocked
                ? "bg-white hover:shadow-lg cursor-pointer border-green-500"
                : "bg-gray-200 cursor-not-allowed opacity-60 border-gray-400"
            }`}
            onClick={() => handleLevelClick("expert", levelStatus.expert.unlocked)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">III. Expert {!levelStatus.expert.unlocked && "🔒"}</h2>
                <p className="text-gray-600">
                  {levelStatus.expert.unlocked ? "उन्नत स्तर के पाठ" : "Medium पूरा होने पर unlock होगा"}
                </p>
              </div>
              {levelStatus.expert.unlocked && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Progress</p>
                  <p className="text-lg font-bold text-green-600">
                    {levelStatus.expert.completed}/{levelStatus.expert.total}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
