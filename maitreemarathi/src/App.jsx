// // src/App.jsx
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// // ✅ Import all pages
// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import HomePage from "./pages/HomePage";
// import BeginnerPage from "./pages/BeginnerPage";
// import LessonDetailPage from "./pages/LessonDetailPage";
// import ReferPage from "./pages/ReferPage";
// import ProfilePage from "./pages/ProfilePage";
// import WalletPage from "./pages/WalletPage";
// import SupportPage from "./pages/SupportPage";
// import AboutPage from "./pages/AboutPage";
// import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
// import PaymentPage from "./pages/PaymentPage";
// import AdminDashboard from "./pages/AdminDashboard";

// // ✅ Components
// import Footer from "./components/Footer";
// import Logout from "./components/Logout";
// import ProtectedRoute from "./components/ProtectedRoute";
// import TranslatePage from "./pages/TranslatePage";
// import MarathiLearningAssistant from "./components/MarathiLearningAssistant";
// import PlanSelectionPage from "./pages/PlanselectionPage";

// export default function App() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <main className="flex-1">
//         <Routes>
//           {/* 🌍 Public Routes */}
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
//           <Route path="/translate" element={<TranslatePage />} />
//           <Route path="/learn-marathi" element={<MarathiLearningAssistant />} />
//           {/* 🔒 Protected User Routes */}
//           <Route
//             path="/home"
//             element={
//               <ProtectedRoute>
//                 <HomePage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/beginner"
//             element={
//               <ProtectedRoute>
//                 <BeginnerPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/lesson/:id"
//             element={
//               <ProtectedRoute>
//                 <LessonDetailPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/refer"
//             element={
//               <ProtectedRoute>
//                 <ReferPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <ProfilePage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/wallet"
//             element={
//               <ProtectedRoute>
//                 <WalletPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/support"
//             element={
//               <ProtectedRoute>
//                 <SupportPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/payment"
//             element={
//               <ProtectedRoute>
//                 <PaymentPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/plan"
//             element={
//               <ProtectedRoute>
//                 <PlanSelectionPage />
//               </ProtectedRoute>
//             }
//           />

//           {/* 🔐 Logout */}
//           <Route path="/logout" element={<Logout />} />

//           {/* 🧭 Admin Route (you can later add admin check here) */}
//           <Route path="/admin" element={<AdminDashboard />} />

//           {/* 🚫 Fallback Route */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>

//       {/* Footer (optional, uncomment if needed) */}
//       {/* <Footer /> */}
//     </div>
//   );
// }

// src/App.jsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ✅ Import all pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import BeginnerPage from "./pages/BeginnerPage"; // Learn Marathi Main Menu
import BeginnerLessonsPage from "./pages/BeginnerLessonsPage";
import MediumLessonsPage from "./pages/MediumLessonsPage";
import ExpertLessonsPage from "./pages/ExpertLessonsPage";
import LessonDetailPage from "./pages/LessonDetailPage";
import ReferPage from "./pages/ReferPage";
import ProfilePage from "./pages/ProfilePage";
import WalletPage from "./pages/WalletPage";
import SupportPage from "./pages/SupportPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import PaymentPage from "./pages/PaymentPage";
import AdminDashboard from "./pages/AdminDashboard";

// Components
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import TranslatePage from "./pages/TranslatePage";
import MarathiLearningAssistant from "./components/MarathiLearningAssistant";
import PlanSelectionPage from "./pages/PlanselectionPage";
import QuizPage from "./pages/QuizPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import AILearningPage from "./pages/AILearningPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      <main className="flex-1">
        <Routes>
          {/* 🌍 Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ForgotPasswordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/translate" element={<TranslatePage />} />
          <Route path="/learn-marathi" element={<MarathiLearningAssistant />} />

          {/* 🔒 Protected User Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* Learn Marathi Main Menu */}
          <Route
            path="/learn"
            element={
              <ProtectedRoute>
                <BeginnerPage />
              </ProtectedRoute>
            }
          />

          {/* Beginner Lessons List */}
          <Route
            path="/beginner-lessons"
            element={
              <ProtectedRoute>
                <BeginnerLessonsPage />
              </ProtectedRoute>
            }
          />

          {/* Medium Lessons */}
          <Route
            path="/medium-lessons"
            element={
              <ProtectedRoute>
                <MediumLessonsPage />
              </ProtectedRoute>
            }
          />

          {/* Expert Lessons */}
          <Route
            path="/expert-lessons"
            element={
              <ProtectedRoute>
                <ExpertLessonsPage />
              </ProtectedRoute>
            }
          />

          {/* Lesson Detail Page */}
          <Route
            path="/lesson/:id"
            element={
              <ProtectedRoute>
                <LessonDetailPage />
              </ProtectedRoute>
            }
          />

          {/* Quiz Page */}
          <Route
            path="/quiz/:level/:quizNumber"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />

          {/* AI Learning Page */}
          <Route
            path="/ai-learn"
            element={
              <ProtectedRoute>
                <AILearningPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/refer"
            element={
              <ProtectedRoute>
                <ReferPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <WalletPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <ProtectedRoute>
                <PaymentSuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plan"
            element={
              <ProtectedRoute>
                <PlanSelectionPage />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/admin/add-lesson"
            element={
              <ProtectedRoute>
                <AdminAddLessonPage />
              </ProtectedRoute>
            }
          /> */}



          {/* 🔐 Logout */}
          <Route path="/logout" element={<Logout />} />

          {/* 🧭 Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 🚫 Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Optional Footer */}
      {/* <Footer /> */}
    </div>
  );
}
