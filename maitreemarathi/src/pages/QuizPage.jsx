import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export default function QuizPage() {
  const { level, quizNumber } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const phone = localStorage.getItem("userPhone");

  useEffect(() => {
    fetchQuiz();
  }, [level, quizNumber]);

  const fetchQuiz = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.USER_QUIZ(level, quizNumber));
      if (res.data.status === "success") {
        setQuiz(res.data.quiz);
      } else {
        alert("Quiz not found. Please contact admin.");
      }
    } catch (err) {
      console.error("Error fetching quiz:", err);
      alert("Quiz not available yet.");
    }
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleSubmit = async () => {
    const answerArray = quiz.questions.map((_, index) => answers[index] || "");
    
    if (answerArray.some(a => !a)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      const res = await axios.post(API_ENDPOINTS.USER_SUBMIT_QUIZ, {
        phone,
        level,
        quizNumber: parseInt(quizNumber),
        answers: answerArray
      });

      if (res.data.status === "success") {
        setResult(res.data);
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  if (!quiz) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-purple-50 p-6 flex items-center justify-center">
          <p className="text-xl">Loading quiz...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (submitted && result) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-purple-50 p-6 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
            <div className={`text-6xl mb-4 ${result.passed ? "text-green-500" : "text-red-500"}`}>
              {result.passed ? "🎉" : "😔"}
            </div>
            <h2 className={`text-3xl font-bold mb-4 ${result.passed ? "text-green-600" : "text-red-600"}`}>
              {result.passed ? "Congratulations!" : "Try Again"}
            </h2>
            <p className="text-xl mb-2">
              Score: {result.correctCount}/{result.totalQuestions}
            </p>
            <p className="text-lg mb-6">
              Percentage: {result.percentage}%
            </p>
            {result.passed ? (
              <p className="text-gray-700 mb-6">
                You passed the quiz! Next lessons are now unlocked.
              </p>
            ) : (
              <p className="text-gray-700 mb-6">
                You need 60% to pass. Review the lessons and try again.
              </p>
            )}
            <button
              onClick={() => navigate(-1)}
              className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold w-full"
            >
              Back to Lessons
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-purple-50 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-purple-600">
            Quiz {quizNumber} - {level}
          </h1>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
          <div className="mb-6">
            <p className="text-gray-600">
              Answer all questions correctly (60% required to pass)
            </p>
          </div>

          {quiz.questions.map((question, index) => (
            <div key={question._id} className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                {index + 1}. {question.question}
              </h3>
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <label
                    key={optIndex}
                    className="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-purple-50 border-2 border-transparent hover:border-purple-300"
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleAnswerChange(index, option)}
                      className="mr-3"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end mt-8">
            <button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
