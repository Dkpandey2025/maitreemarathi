import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState("email"); // email only for now
  const [phone, setPhone] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [resetLink, setResetLink] = useState("");

  const token = searchParams.get("token");
  const phoneParam = searchParams.get("phone");

  // If token and phone are in URL, go directly to reset step
  // React.useEffect(() => {
  //   if (token && phoneParam) {
  //     setPhone(phoneParam);
  //     setStep("reset");
  //   }
  // }, [token, phoneParam]);

  // const handleRequestReset = async (e) => {
  //   e.preventDefault();
  //   if (!phone) {
  //     alert("Please enter your phone number");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/user/forgot-password", {
  //       phone
  //     });

  //     if (res.data.status === "success") {
  //       if (res.data.resetLink) {
  //         setResetLink(res.data.resetLink);
  //       }
  //       alert("Password reset link sent! Check your email or use the link below.");
  //     } else {
  //       alert(res.data.message || "Error sending reset link");
  //     }
  //   } catch (err) {
  //     console.error("Error:", err);
  //     alert("Error sending reset link");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleResetPassword = async (e) => {
  //   e.preventDefault();

  //   if (!newPassword || !confirmPassword) {
  //     alert("Please fill in all fields");
  //     return;
  //   }

  //   if (newPassword !== confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }

  //   if (newPassword.length < 4) {
  //     alert("Password must be at least 4 characters");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/user/reset-password", {
  //       phone,
  //       token: token || "",
  //       newPassword
  //     });

  //     if (res.data.status === "success") {
  //       alert("Password reset successfully! Please login with your new password.");
  //       navigate("/login");
  //     } else {
  //       alert(res.data.message || "Error resetting password");
  //     }
  //   } catch (err) {
  //     console.error("Error:", err);
  //     alert("Error resetting password");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleEmailRequest = () => {
    const email = "support@maitreemarathi.com";
    const subject = encodeURIComponent("Password Reset Request");
    const body = encodeURIComponent(
      `Hello,\n\nI would like to reset my password for my Maitree Marathi account.\n\nPhone Number: ${phone || "[Your Phone Number]"}\n\nPlease send me a password reset link.\n\nThank you.`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-lg w-full max-w-sm sm:max-w-md">
        <>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-4 sm:mb-6 text-center">
            Forgot Password?
          </h2>

          <div className="space-y-4 sm:space-y-5">
            <p className="text-gray-600 text-center text-sm sm:text-base">
              Contact our support team to reset your password. Choose your preferred method below.
            </p>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200 text-center">
                <Mail className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600 mb-1">Email Support</p>
                <a
                  href="mailto:support@maitreemarathi.com"
                  className="text-sm font-bold text-purple-600 hover:text-purple-700 break-all"
                >
                  support@maitreemarathi.com
                </a>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200 text-center">
                <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600 mb-1">WhatsApp Support</p>
                <a
                  href="https://wa.link/emk37j"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-green-600 hover:text-green-700"
                >
                  Chat with us
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  const email = "support@maitreemarathi.com";
                  const subject = encodeURIComponent("Password Reset Request");
                  const body = encodeURIComponent(
                    `Hello,\n\nI need help resetting my password for my Maitree Marathi account.\n\nMy Name: [Your Full Name]\nRegistered Phone/Email: [Your Phone Number or Email]\n\nPlease reset my password and send me the new credentials.\n\nThank you.`
                  );
                  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                }}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                Send Email Request
              </button>

              <button
                onClick={() => {
                  window.open("https://wa.link/emk37j", "_blank");
                }}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Send WhatsApp Request
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-700 text-center">
                <span className="font-semibold">Important:</span> Include your registered phone number or email address in your request for faster verification.
              </p>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition"
            >
              Back to Login
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">How It Works</h3>
            
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-purple-100">
                    <span className="text-purple-600 font-bold text-sm">1</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">Contact Support</p>
                  <p className="text-xs text-gray-600">Choose email or WhatsApp to send your request</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-purple-100">
                    <span className="text-purple-600 font-bold text-sm">2</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">Provide Details</p>
                  <p className="text-xs text-gray-600">Share your registered phone number or email</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-purple-100">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">Get New Password</p>
                  <p className="text-xs text-gray-600">We'll send your new password within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-gray-600 mb-1.5">
              <span className="font-semibold">Response Time:</span> Usually within 24 hours
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Support Hours:</span> Monday - Friday, 9 AM - 6 PM IST
            </p>
          </div>
        </>
      </div>
    </div>
  );
}
