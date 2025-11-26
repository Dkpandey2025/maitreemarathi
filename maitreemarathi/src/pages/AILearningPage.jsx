import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { Send, Loader, Lightbulb, BookOpen, Sparkles, MessageCircle, ArrowLeft } from "lucide-react";
import { startChatSession, sendMessage, generatePracticeExercise } from "../services/groqService";
import FormattedContent from "../components/FormattedContent";

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
            content: "🙏 नमस्कार! (Namaskar!)\n\nI'm your personal Marathi learning assistant powered by AI! Ready to help you master Marathi through interactive conversations.\n\n✨ What would you like to explore today?",
          },
        ]);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initChat();
  }, []);

  // Auto-scroll to bottom only when new messages are added (not on initial load)
  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
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
        { role: "model", content: `❌ Sorry, I encountered an error: ${error.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const generateExercise = async () => {
    setExerciseLoading(true);
    try {
      const topics = ["Greetings", "Numbers", "Family", "Food", "Daily Routine", "Colors", "Animals", "Weather"];
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
        content: "❌ Failed to generate exercise. Please try again.",
      });
    } finally {
      setExerciseLoading(false);
    }
  };

  // Quick suggestion buttons
  const quickSuggestions = [
    "Teach me basic greetings",
    "How do I introduce myself?",
    "Common daily phrases",
    "Numbers 1-10",
  ];

  const handleQuickSuggestion = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-3 sm:p-6 lg:p-8 pb-20 sm:pb-8">
        {/* Enhanced Header - Mobile Optimized */}
        <div className="max-w-4xl mx-auto mb-4 sm:mb-8">
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 animate-pulse flex-shrink-0" />
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Learn with AI
              </h1>
            </div>
            {/* <p className="text-xs sm:text-sm text-gray-600 mt-2">Powered by Groq AI</p> */}
          </div>

          {/* Enhanced Tabs - Mobile Optimized */}
          <div className="flex gap-2 sm:gap-3 bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-lg">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 ${
                activeTab === "chat"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 active:bg-gray-50"
              }`}
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => setActiveTab("practice")}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 ${
                activeTab === "practice"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 active:bg-gray-50"
              }`}
            >
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Practice</span>
            </button>
          </div>
        </div>

        {/* Chat Tab - Mobile Optimized */}
        {activeTab === "chat" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col" style={{ height: "calc(100vh - 200px)", minHeight: "400px", maxHeight: "700px" }}>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 bg-gradient-to-b from-white to-purple-50/30">
                {messages.length === 0 && (
                  <div className="text-center py-8 sm:py-12">
                    <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mx-auto mb-3 sm:mb-4 animate-bounce" />
                    <p className="text-gray-500 text-sm sm:text-base px-4">Start a conversation to learn Marathi!</p>
                  </div>
                )}
                
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                  >
                    <div
                      className={`max-w-[90%] sm:max-w-[85%] lg:max-w-[75%] px-3 sm:px-5 py-3 sm:py-4 rounded-2xl shadow-md ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none border border-purple-100"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed break-words">{msg.content}</p>
                      ) : (
                        <div className="text-sm sm:text-base">
                          <FormattedContent content={msg.content} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex justify-start animate-fadeIn">
                    <div className="bg-white px-4 sm:px-5 py-3 sm:py-4 rounded-2xl rounded-bl-none shadow-md border border-purple-100">
                      <div className="flex items-center gap-2">
                        <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-purple-600" />
                        <span className="text-xs sm:text-sm text-gray-600">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions - Mobile Optimized */}
              {messages.length <= 1 && !loading && (
                <div className="px-3 sm:px-6 py-2 sm:py-3 bg-purple-50/50 border-t border-purple-100">
                  <p className="text-xs text-gray-600 mb-2 font-medium">💡 Quick Start:</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {quickSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickSuggestion(suggestion)}
                        className="px-2.5 sm:px-3 py-1.5 bg-white text-purple-600 text-xs rounded-full active:bg-purple-100 transition-all shadow-sm active:shadow-md touch-manipulation"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area - Mobile Optimized */}
              <form onSubmit={handleSendMessage} className="border-t border-purple-100 p-3 sm:p-4 bg-white">
                <div className="flex gap-2 sm:gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 sm:px-5 py-2.5 sm:py-3 border-2 border-purple-200 rounded-xl sm:rounded-2xl focus:outline-none focus:border-purple-500 text-sm sm:text-base transition-all"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 touch-manipulation"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Practice Tab - Mobile Optimized */}
        {activeTab === "practice" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8">
              {/* Header - Mobile Optimized */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-3 sm:mb-4 shadow-lg">
                  <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 px-4">
                  Practice Exercises
                </h2>
                <p className="text-gray-600 text-sm sm:text-base px-4">Challenge yourself with AI-generated exercises</p>
              </div>

              {/* Exercise Display - Mobile Optimized */}
              {exercise ? (
                <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 sm:p-8 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-inner border border-purple-100">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-md">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                      {exercise.level.toUpperCase()}
                    </span>
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-white text-purple-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                      {exercise.topic}
                    </span>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md max-h-[60vh] min-h-[200px] overflow-y-auto">
                    {exercise.content ? (
                      <FormattedContent content={exercise.content} />
                    ) : (
                      <p className="text-gray-500 italic">Loading content...</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 sm:p-12 rounded-xl sm:rounded-2xl text-center mb-4 sm:mb-6 border-2 border-dashed border-purple-200">
                  <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-purple-300 mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-600 text-base sm:text-lg px-4">Click below to generate your first exercise!</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-2 px-4">Topics: Greetings, Numbers, Family, Food & more</p>
                </div>
              )}

              {/* Generate Button - Mobile Optimized */}
              <button
                onClick={generateExercise}
                disabled={exerciseLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg active:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed font-bold text-base sm:text-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 touch-manipulation"
              >
                {exerciseLoading ? (
                  <>
                    <Loader className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                    <span className="text-sm sm:text-base">Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Generate New Exercise</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </DashboardLayout>
  );
}
