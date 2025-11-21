import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stats");

  // Check if user is admin
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    
    if (userType !== "admin" && !user.isAdmin) {
      alert("Access denied. Admin only.");
      navigate("/home", { replace: true });
    }
  }, [navigate]);
  const [stats, setStats] = useState({ totalUsers: 0, totalLessons: 0, totalWallet: 0 });
  const [users, setUsers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [lessonForm, setLessonForm] = useState({ level: "beginner", lessonNumber: 1, title: "", content: "" });
  const [editingLesson, setEditingLesson] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [quizForm, setQuizForm] = useState({ level: "beginner", quizNumber: 1, afterLesson: 5, questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }] });
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [redemptions, setRedemptions] = useState([]);
  const [editingWalletUser, setEditingWalletUser] = useState(null);
  const [newWalletAmount, setNewWalletAmount] = useState("");

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchLessons();
    fetchQuizzes();
    fetchRedemptions();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.ADMIN_STATS);
      if (res.data.status === "success") setStats(res.data.stats);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.ADMIN_USERS);
      if (res.data.status === "success") setUsers(res.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchLessons = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.ADMIN_LESSONS);
      if (res.data.status === "success") setLessons(res.data.lessons);
    } catch (err) {
      console.error("Error fetching lessons:", err);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.ADMIN_QUIZZES);
      console.log("Quizzes response:", res.data);
      if (res.data.status === "success") {
        setQuizzes(res.data.quizzes);
        console.log("Quizzes set:", res.data.quizzes.length);
      }
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  };

  const fetchRedemptions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/redemptions");
      if (res.data.status === "success") {
        setRedemptions(res.data.redemptions);
      }
    } catch (err) {
      console.error("Error fetching redemptions:", err);
    }
  };

  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setNewPassword("");
  };

  const updatePassword = async () => {
    if (!newPassword) return alert("Enter new password");
    try {
      const res = await axios.put(API_ENDPOINTS.ADMIN_UPDATE_PASSWORD(selectedUser._id), { password: newPassword });
      if (res.data.status === "success") {
        alert("Password updated successfully");
        setSelectedUser(null);
        setNewPassword("");
      }
    } catch (err) {
      console.error("Error updating password:", err);
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      const res = await axios.delete(API_ENDPOINTS.ADMIN_DELETE_USER(id));
      if (res.data.status === "success") {
        alert("User deleted");
        fetchUsers();
        fetchStats();
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleLessonSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLesson) {
        const res = await axios.put(API_ENDPOINTS.ADMIN_UPDATE_LESSON(editingLesson._id), lessonForm);
        if (res.data.status === "success") {
          alert("Lesson updated successfully!");
          setEditingLesson(null);
        } else {
          alert("Error: " + (res.data.message || "Failed to update lesson"));
        }
      } else {
        const res = await axios.post(API_ENDPOINTS.ADMIN_ADD_LESSON, lessonForm);
        if (res.data.status === "success") {
          alert("Lesson added successfully!");
        } else {
          alert("Error: " + (res.data.message || "Failed to add lesson"));
        }
      }
      setLessonForm({ level: "beginner", lessonNumber: 1, title: "", content: "" });
      fetchLessons();
      fetchStats();
    } catch (err) {
      console.error("Error saving lesson:", err);
      alert("Error saving lesson: " + (err.response?.data?.message || err.message));
    }
  };

  const editLesson = (lesson) => {
    setLessonForm({
      level: lesson.level,
      lessonNumber: lesson.lessonNumber,
      title: lesson.title,
      content: lesson.content
    });
    setEditingLesson(lesson);
  };

  const deleteLesson = async (id) => {
    if (!confirm("Delete this lesson?")) return;
    try {
      const res = await axios.delete(API_ENDPOINTS.ADMIN_DELETE_LESSON(id));
      if (res.data.status === "success") {
        alert("Lesson deleted");
        fetchLessons();
        fetchStats();
      }
    } catch (err) {
      console.error("Error deleting lesson:", err);
    }
  };

  const addQuestion = () => {
    setQuizForm({
      ...quizForm,
      questions: [...quizForm.questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = quizForm.questions.filter((_, i) => i !== index);
    setQuizForm({ ...quizForm, questions: newQuestions });
  };

  const updateQuestion = (qIndex, field, value) => {
    const newQuestions = [...quizForm.questions];
    newQuestions[qIndex][field] = value;
    setQuizForm({ ...quizForm, questions: newQuestions });
  };

  const updateOption = (qIndex, oIndex, value) => {
    const newQuestions = [...quizForm.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuizForm({ ...quizForm, questions: newQuestions });
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingQuiz) {
        const res = await axios.put(API_ENDPOINTS.ADMIN_UPDATE_QUIZ(editingQuiz._id), quizForm);
        if (res.data.status === "success") {
          alert("Quiz updated");
          setEditingQuiz(null);
        } else {
          alert("Error: " + (res.data.message || "Failed to update quiz"));
        }
      } else {
        const res = await axios.post(API_ENDPOINTS.ADMIN_ADD_QUIZ, quizForm);
        if (res.data.status === "success") {
          alert("Quiz added");
        } else {
          alert("Error: " + (res.data.message || "Failed to add quiz"));
        }
      }
      setQuizForm({ level: "beginner", quizNumber: 1, afterLesson: 5, questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }] });
      fetchQuizzes();
    } catch (err) {
      console.error("Error saving quiz:", err);
      alert("Error saving quiz: " + err.message);
    }
  };

  const editQuiz = (quiz) => {
    setQuizForm({
      level: quiz.level,
      quizNumber: quiz.quizNumber,
      afterLesson: quiz.afterLesson || 5, // Default to 5 if not set
      questions: quiz.questions
    });
    setEditingQuiz(quiz);
  };

  const deleteQuiz = async (id) => {
    if (!confirm("Delete this quiz?")) return;
    try {
      const res = await axios.delete(API_ENDPOINTS.ADMIN_DELETE_QUIZ(id));
      if (res.data.status === "success") {
        alert("Quiz deleted");
        fetchQuizzes();
      }
    } catch (err) {
      console.error("Error deleting quiz:", err);
    }
  };

  const updateRedemptionStatus = async (redemptionId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/redemptions/${redemptionId}/status`,
        { status: newStatus }
      );
      if (res.data.status === "success") {
        alert(`Redemption marked as ${newStatus}`);
        fetchRedemptions();
        fetchStats();
      }
    } catch (err) {
      console.error("Error updating redemption:", err);
      alert("Error updating redemption status");
    }
  };

  const updateUserWallet = async (userId) => {
    if (!newWalletAmount || newWalletAmount < 0) {
      alert("Enter a valid wallet amount");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/users/${userId}/wallet`,
        { wallet: parseInt(newWalletAmount) }
      );
      if (res.data.status === "success") {
        alert("Wallet updated successfully");
        setEditingWalletUser(null);
        setNewWalletAmount("");
        fetchUsers();
        fetchStats();
      }
    } catch (err) {
      console.error("Error updating wallet:", err);
      alert("Error updating wallet");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userType");
    localStorage.removeItem("userPhone");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-purple-600">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 justify-center flex-wrap">
        <button onClick={() => setActiveTab("stats")} className={`px-6 py-2 rounded-lg font-semibold ${activeTab === "stats" ? "bg-purple-600 text-white" : "bg-white"}`}>Stats</button>
        <button onClick={() => setActiveTab("users")} className={`px-6 py-2 rounded-lg font-semibold ${activeTab === "users" ? "bg-purple-600 text-white" : "bg-white"}`}>Users</button>
        <button onClick={() => setActiveTab("redemptions")} className={`px-6 py-2 rounded-lg font-semibold ${activeTab === "redemptions" ? "bg-purple-600 text-white" : "bg-white"}`}>Redemptions</button>
        <button onClick={() => setActiveTab("lessons")} className={`px-6 py-2 rounded-lg font-semibold ${activeTab === "lessons" ? "bg-purple-600 text-white" : "bg-white"}`}>Lessons</button>
        <button onClick={() => setActiveTab("quizzes")} className={`px-6 py-2 rounded-lg font-semibold ${activeTab === "quizzes" ? "bg-purple-600 text-white" : "bg-white"}`}>Quizzes</button>
      </div>

      {/* Stats Tab */}
      {activeTab === "stats" && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold text-purple-600">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h3 className="text-lg font-semibold">Total Lessons</h3>
            <p className="text-2xl font-bold text-purple-600">{stats.totalLessons}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h3 className="text-lg font-semibold">Total Wallet</h3>
            <p className="text-2xl font-bold text-green-600">₹{stats.totalWallet}</p>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">User Management</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left bg-purple-100">
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Phone</th>
                  <th className="p-3 border">Subscription</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Days Left</th>
                  <th className="p-3 border">Wallet</th>
                  <th className="p-3 border">Referrals</th>
                  <th className="p-3 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  // Calculate days remaining
                  let daysRemaining = null;
                  if (user.subscriptionType === "monthly" && user.subscriptionEndDate) {
                    const now = new Date();
                    const endDate = new Date(user.subscriptionEndDate);
                    const diff = endDate - now;
                    daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
                  }

                  return (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="p-3 border">{user.name}</td>
                      <td className="p-3 border">{user.phone}</td>
                      <td className="p-3 border">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          user.subscriptionType === "lifetime" ? "bg-purple-100 text-purple-700" :
                          user.subscriptionType === "monthly" ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {user.subscriptionType === "lifetime" ? "🌟 Lifetime" :
                           user.subscriptionType === "monthly" ? "📅 Monthly" :
                           "🆓 Free"}
                        </span>
                      </td>
                      <td className="p-3 border">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          user.subscriptionStatus === "active" ? "bg-green-100 text-green-700" :
                          user.subscriptionStatus === "expired" ? "bg-red-100 text-red-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {user.subscriptionStatus === "active" ? "✓ Active" :
                           user.subscriptionStatus === "expired" ? "✗ Expired" :
                           "- None"}
                        </span>
                      </td>
                      <td className="p-3 border">
                        {user.subscriptionType === "lifetime" ? (
                          <span className="text-purple-600 font-semibold">∞ Forever</span>
                        ) : user.subscriptionType === "monthly" && daysRemaining !== null ? (
                          <span className={`font-semibold ${
                            daysRemaining <= 5 ? "text-red-600" :
                            daysRemaining <= 10 ? "text-orange-600" :
                            "text-green-600"
                          }`}>
                            {daysRemaining > 0 ? `${daysRemaining} days` : "Expired"}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-3 border">₹{user.wallet}</td>
                      <td className="p-3 border">{user.referralCount}</td>
                      <td className="p-3 border text-center space-x-2">
                        <button onClick={() => viewUserDetails(user)} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">View</button>
                        <button onClick={() => deleteUser(user._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* User Details Modal */}
          {selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">User Details</h3>
                
                <div className="space-y-2 mb-4">
                  <p><strong>Name:</strong> {selectedUser.name}</p>
                  <p><strong>Phone:</strong> {selectedUser.phone}</p>
                  <p><strong>Wallet:</strong> ₹{selectedUser.wallet} 
                    <button 
                      onClick={() => {
                        setEditingWalletUser(selectedUser._id);
                        setNewWalletAmount(selectedUser.wallet);
                      }}
                      className="ml-2 text-blue-500 text-sm hover:underline"
                    >
                      (Edit)
                    </button>
                  </p>
                  <p><strong>Referral Code:</strong> {selectedUser.referralCode}</p>
                  <p><strong>Referred By:</strong> {selectedUser.referredBy || "None"}</p>
                  <p><strong>Referral Count:</strong> {selectedUser.referralCount}</p>
                  
                  <hr className="my-3" />
                  
                  <h4 className="font-bold text-lg mb-2">Subscription Details</h4>
                  <p><strong>Type:</strong> <span className="capitalize">{selectedUser.subscriptionType || "free"}</span></p>
                  <p><strong>Status:</strong> <span className={`font-semibold ${
                    selectedUser.subscriptionStatus === "active" ? "text-green-600" :
                    selectedUser.subscriptionStatus === "expired" ? "text-red-600" :
                    "text-gray-600"
                  }`}>
                    {selectedUser.subscriptionStatus || "none"}
                  </span></p>
                  
                  {selectedUser.subscriptionStartDate && (
                    <p><strong>Start Date:</strong> {new Date(selectedUser.subscriptionStartDate).toLocaleDateString()}</p>
                  )}
                  
                  {selectedUser.subscriptionEndDate && (
                    <p><strong>End Date:</strong> {new Date(selectedUser.subscriptionEndDate).toLocaleDateString()}</p>
                  )}
                  
                  {selectedUser.subscriptionType === "monthly" && selectedUser.subscriptionEndDate && (
                    <p><strong>Days Remaining:</strong> {
                      Math.ceil((new Date(selectedUser.subscriptionEndDate) - new Date()) / (1000 * 60 * 60 * 24))
                    } days</p>
                  )}
                </div>
                
                <hr className="my-4" />
                
                {editingWalletUser === selectedUser._id ? (
                  <div className="mt-4">
                    <label className="block font-semibold mb-2">Edit Wallet Balance</label>
                    <input 
                      type="number" 
                      value={newWalletAmount} 
                      onChange={(e) => setNewWalletAmount(e.target.value)} 
                      placeholder="Wallet amount" 
                      className="w-full border p-2 rounded-lg mb-2" 
                    />
                    <div className="flex gap-2">
                      <button 
                        onClick={() => updateUserWallet(selectedUser._id)} 
                        className="bg-green-500 text-white px-4 py-2 rounded-lg flex-1"
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => {
                          setEditingWalletUser(null);
                          setNewWalletAmount("");
                        }} 
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <label className="block font-semibold mb-2">Update Password</label>
                    <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" className="w-full border p-2 rounded-lg mb-2" />
                    <button onClick={updatePassword} className="bg-green-500 text-white px-4 py-2 rounded-lg w-full">Update Password</button>
                  </div>
                )}

                <button onClick={() => setSelectedUser(null)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg w-full">Close</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Redemptions Tab */}
      {activeTab === "redemptions" && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Wallet Redemption Requests</h3>
          
          {redemptions.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No redemption requests</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left bg-purple-100">
                    <th className="p-3 border">User Name</th>
                    <th className="p-3 border">Phone</th>
                    <th className="p-3 border">Amount</th>
                    <th className="p-3 border">Status</th>
                    <th className="p-3 border">Requested Date</th>
                    <th className="p-3 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {redemptions.map((redemption) => (
                    <tr key={redemption._id} className="hover:bg-gray-50">
                      <td className="p-3 border">{redemption.userName}</td>
                      <td className="p-3 border">{redemption.userPhone}</td>
                      <td className="p-3 border font-semibold">₹{redemption.amount}</td>
                      <td className="p-3 border">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          redemption.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                          redemption.status === "processing" ? "bg-blue-100 text-blue-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {redemption.status.charAt(0).toUpperCase() + redemption.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-3 border text-sm">{new Date(redemption.requestedAt).toLocaleDateString()}</td>
                      <td className="p-3 border text-center space-x-2">
                        {redemption.status === "pending" && (
                          <button 
                            onClick={() => updateRedemptionStatus(redemption._id, "processing")}
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                          >
                            Process
                          </button>
                        )}
                        {redemption.status === "processing" && (
                          <button 
                            onClick={() => updateRedemptionStatus(redemption._id, "processed")}
                            className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                          >
                            Complete
                          </button>
                        )}
                        {redemption.status === "processed" && (
                          <span className="text-green-600 font-semibold">✓ Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Lessons Tab */}
      {activeTab === "lessons" && (
        <div className="space-y-6">
          {/* Add/Edit Lesson Form */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">{editingLesson ? "Edit Lesson" : "Add New Lesson"}</h3>
            <form onSubmit={handleLessonSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Level</label>
                <select value={lessonForm.level} onChange={(e) => setLessonForm({ ...lessonForm, level: e.target.value })} className="w-full border p-2 rounded-lg">
                  <option value="beginner">Beginner</option>
                  <option value="medium">Medium</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">Lesson Number</label>
                <input type="number" value={lessonForm.lessonNumber} onChange={(e) => setLessonForm({ ...lessonForm, lessonNumber: e.target.value })} className="w-full border p-2 rounded-lg" required />
              </div>
              <div>
                <label className="block font-semibold mb-2">Title</label>
                <input type="text" value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} className="w-full border p-2 rounded-lg" required />
              </div>
              <div>
                <label className="block font-semibold mb-2">Content</label>
                <textarea value={lessonForm.content} onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })} className="w-full border p-2 rounded-lg h-32" required />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold">{editingLesson ? "Update" : "Add"} Lesson</button>
                {editingLesson && (
                  <button type="button" onClick={() => { setEditingLesson(null); setLessonForm({ level: "beginner", lessonNumber: 1, title: "", content: "" }); }} className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold">Cancel</button>
                )}
              </div>
            </form>
          </div>

          {/* Lessons List */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">All Lessons</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left bg-purple-100">
                    <th className="p-3 border">Level</th>
                    <th className="p-3 border">Lesson #</th>
                    <th className="p-3 border">Title</th>
                    <th className="p-3 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map((lesson) => (
                    <tr key={lesson._id} className="hover:bg-gray-50">
                      <td className="p-3 border capitalize">{lesson.level}</td>
                      <td className="p-3 border">{lesson.lessonNumber}</td>
                      <td className="p-3 border">{lesson.title}</td>
                      <td className="p-3 border text-center space-x-2">
                        <button onClick={() => editLesson(lesson)} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">Edit</button>
                        <button onClick={() => deleteLesson(lesson._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Quizzes Tab */}
      {activeTab === "quizzes" && (
        <div className="space-y-6">
          {/* Add/Edit Quiz Form */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">{editingQuiz ? "Edit Quiz" : "Add New Quiz"}</h3>
            <form onSubmit={handleQuizSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">Level</label>
                  <select value={quizForm.level} onChange={(e) => setQuizForm({ ...quizForm, level: e.target.value })} className="w-full border p-2 rounded-lg">
                    <option value="beginner">Beginner</option>
                    <option value="medium">Medium</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-2">Quiz Number</label>
                  <input type="number" value={quizForm.quizNumber} onChange={(e) => setQuizForm({ ...quizForm, quizNumber: parseInt(e.target.value) })} className="w-full border p-2 rounded-lg" required />
                </div>
                <div>
                  <label className="block font-semibold mb-2">After Lesson Number</label>
                  <input type="number" value={quizForm.afterLesson} onChange={(e) => setQuizForm({ ...quizForm, afterLesson: parseInt(e.target.value) })} className="w-full border p-2 rounded-lg" placeholder="Quiz appears after this lesson" required />
                  <p className="text-xs text-gray-500 mt-1">Quiz will appear after completing this lesson number</p>
                </div>
              </div>

              {/* Questions */}
              {quizForm.questions.map((q, qIndex) => (
                <div key={qIndex} className="border p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Question {qIndex + 1}</h4>
                    {quizForm.questions.length > 1 && (
                      <button type="button" onClick={() => removeQuestion(qIndex)} className="text-red-500 text-sm">Remove</button>
                    )}
                  </div>
                  <input type="text" value={q.question} onChange={(e) => updateQuestion(qIndex, "question", e.target.value)} placeholder="Question" className="w-full border p-2 rounded-lg mb-2" required />
                  {q.options.map((opt, oIndex) => (
                    <input key={oIndex} type="text" value={opt} onChange={(e) => updateOption(qIndex, oIndex, e.target.value)} placeholder={`Option ${oIndex + 1}`} className="w-full border p-2 rounded-lg mb-2" required />
                  ))}
                  <select value={q.correctAnswer} onChange={(e) => updateQuestion(qIndex, "correctAnswer", e.target.value)} className="w-full border p-2 rounded-lg" required>
                    <option value="">Select Correct Answer</option>
                    {q.options.filter(o => o).map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}

              <button type="button" onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 rounded-lg">+ Add Question</button>

              <div className="flex gap-2">
                <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold">{editingQuiz ? "Update" : "Add"} Quiz</button>
                {editingQuiz && (
                  <button type="button" onClick={() => { setEditingQuiz(null); setQuizForm({ level: "beginner", quizNumber: 5, questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }] }); }} className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold">Cancel</button>
                )}
              </div>
            </form>
          </div>

          {/* Quizzes List */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">All Quizzes</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left bg-purple-100">
                    <th className="p-3 border">Level</th>
                    <th className="p-3 border">Quiz #</th>
                    <th className="p-3 border">After Lesson</th>
                    <th className="p-3 border">Questions</th>
                    <th className="p-3 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map((quiz) => (
                    <tr key={quiz._id} className="hover:bg-gray-50">
                      <td className="p-3 border capitalize">{quiz.level}</td>
                      <td className="p-3 border">{quiz.quizNumber}</td>
                      <td className="p-3 border">{quiz.afterLesson || "Not set"}</td>
                      <td className="p-3 border">{quiz.questions?.length || 0}</td>
                      <td className="p-3 border text-center space-x-2">
                        <button onClick={() => editQuiz(quiz)} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">Edit</button>
                        <button onClick={() => deleteQuiz(quiz._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
