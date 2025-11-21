// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  
  // Admin
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  ADMIN_SIGNUP: `${API_BASE_URL}/api/admin/signup`,
  ADMIN_USERS: `${API_BASE_URL}/api/admin/users`,
  ADMIN_LESSONS: `${API_BASE_URL}/api/admin/lessons/all`,
  ADMIN_ADD_LESSON: `${API_BASE_URL}/api/admin/add-lesson`,
  ADMIN_LESSON: (id) => `${API_BASE_URL}/api/admin/lesson/${id}`,
  ADMIN_UPDATE_LESSON: (id) => `${API_BASE_URL}/api/admin/lessons/${id}`,
  ADMIN_DELETE_LESSON: (id) => `${API_BASE_URL}/api/admin/lessons/${id}`,
  ADMIN_QUIZZES: `${API_BASE_URL}/api/admin/quizzes`,
  ADMIN_ADD_QUIZ: `${API_BASE_URL}/api/admin/add-quiz`,
  ADMIN_UPDATE_QUIZ: (id) => `${API_BASE_URL}/api/admin/quizzes/${id}`,
  ADMIN_DELETE_QUIZ: (id) => `${API_BASE_URL}/api/admin/quizzes/${id}`,
  ADMIN_STATS: `${API_BASE_URL}/api/admin/stats`,
  ADMIN_UPDATE_PASSWORD: (id) => `${API_BASE_URL}/api/admin/users/${id}/password`,
  ADMIN_DELETE_USER: (id) => `${API_BASE_URL}/api/admin/users/${id}`,
  
  // User
  USER_LESSONS: (level, phone) => `${API_BASE_URL}/api/user/lessons/${level}/${phone}`,
  USER_COMPLETE_LESSON: `${API_BASE_URL}/api/user/complete-lesson`,
  USER_QUIZ: (level, quizNumber) => `${API_BASE_URL}/api/user/quiz/${level}/${quizNumber}`,
  USER_SUBMIT_QUIZ: `${API_BASE_URL}/api/user/submit-quiz`,
  USER_LEVEL_STATUS: (phone) => `${API_BASE_URL}/api/user/level-status/${phone}`,
  USER_PROGRESS: (phone) => `${API_BASE_URL}/api/user/progress/${phone}`,
  
  // Payment
  PAYMENT: `${API_BASE_URL}/payment`,
  
  // Subscription
  SUBSCRIPTION_ACTIVATE: `${API_BASE_URL}/api/subscription/activate`,
  SUBSCRIPTION_STATUS: (phone) => `${API_BASE_URL}/api/subscription/status/${phone}`,
  SUBSCRIPTION_CHECK_ACCESS: `${API_BASE_URL}/api/subscription/check-access`,
};

// Gemini API Key
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
