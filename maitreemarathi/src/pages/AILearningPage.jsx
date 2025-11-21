import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { Send, Loader, Lightbulb, BookOpen } from "lucide-react";
import { startChatSession, sendMessage, generatePracticeExercise } from "../services/geminiService";

export default function AILearningPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [exercise, setExercise] = useState(null);
  const [exerciseLoading, setExerciseLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize chat
  useEffect(() => {
    const initChat = async () => {
      try {
        const chatSession = startChatSession();
        setChat(chatSession);
        
        // Add welcome message
        setMessages([
          {
            role: "model",
            content: "नमस्कार! (Namaste!) I'm your Marathi learning assistant. I'm here to help you learn Marathi through interactive conversations. What would you like to learn today? 😊",
          },
        ]);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initChat();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !chat || loading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await sendMessage(chat, userMessage);
      setMessages((prev) => [...prev, { role: "model", content: response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: `Sorry, I encountered an error: ${error.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const generateExercise = async () => {
    setExerciseLoading(true);
    try {
      const topics = ["Greetings", "Numbers", "Family", "Food", "Daily Routine"];
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      const levels = ["beginner", "intermediate", "advanced"];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];

      const result = await generatePracticeExercise(randomTopic, randomLevel);
      setExercise({
        topic: randomTopic,
        level: randomLevel,
        content: result,
      });
    } catch (error) {
      console.error("Error generating exercise:", error);
      setExercise({
        topic: "Error",
        level: "error",
        content: "Failed to generate exercise. Please try again.",
      });
    } finally {
      setExerciseLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100 p-4 sm:p-6 lg:p-8">
        {/* Header */}
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
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600">🤖 AI से सीखें</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Learn Marathi with AI</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all ${
              activeTab === "chat"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:shadow-md"
            }`}
          >
            💬 Chat
          </button>
          <button
            onClick={() => setActiveTab("practice")}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all ${
              activeTab === "practice"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:shadow-md"
            }`}
          >
            📝 Practice
          </button>
        </div>

        {/* Chat Tab */}
        {activeTab === "chat" && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[600px] sm:h-[700px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm sm:text-base whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-none">
                    <Loader className="w-5 h-5 animate-spin text-purple-600" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="border-t p-4 sm:p-6 bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about Marathi..."
                  className="flex-1 px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Practice Tab */}
        {activeTab === "practice" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="text-center mb-6">
                <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Practice Exercises</h2>
                <p className="text-gray-600">Generate random exercises to practice Marathi</p>
              </div>

              {exercise ? (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {exercise.level}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800 mt-2">Topic: {exercise.topic}</h3>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base">
                      {exercise.content}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-xl text-center mb-6">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Click the button below to generate an exercise</p>
                </div>
              )}

              <button
                onClick={generateExercise}
                disabled={exerciseLoading}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 font-semibold transition-all flex items-center justify-center gap-2"
              >
                {exerciseLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-5 h-5" />
                    Generate New Exercise
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
