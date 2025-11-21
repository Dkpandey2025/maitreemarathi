import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Mail } from "lucide-react";

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
      {/* Back Button */}
      <button
        onClick={() => navigate("/login")}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 p-2 sm:p-3 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-purple-50 transition-all z-10"
        aria-label="Go back to login"
      >
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
      </button>

      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-lg w-full max-w-sm sm:max-w-md">
        {/* Email Support Only */}
        <>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-6 sm:mb-8 text-center">
            Forgot Password?
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <p className="text-gray-600 text-center">
              Send an email to our support team to request a password reset. We'll help you regain access to your account.
            </p>

            <div className="bg-purple-50 p-4 sm:p-6 rounded-lg border-2 border-purple-200">
              <p className="text-sm text-gray-600 mb-3">Email Address:</p>
              <a
                href="mailto:support@maitreemarathi.com"
                className="text-lg sm:text-xl font-bold text-purple-600 hover:text-purple-700 break-all"
              >
                support@maitreemarathi.com
              </a>
            </div>

            <button
              onClick={() => {
                const email = "support@maitreemarathi.com";
                const subject = encodeURIComponent("Password Reset Request");
                const body = encodeURIComponent(
                  `Hello,\n\nI would like to reset my password for my Maitree Marathi account.\n\nPlease send me a password reset link.\n\nThank you.`
                );
                window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
              }}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 sm:py-4 text-base sm:text-lg rounded-lg sm:rounded-xl transition"
            >
              <Mail className="w-5 h-5" />
              Open Email Client
            </button>

            <p className="text-center text-xs sm:text-sm text-gray-500">
              Please include your phone number in the email so we can identify your account quickly.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 sm:py-4 text-base sm:text-lg rounded-lg sm:rounded-xl transition"
            >
              Back to Login
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-8 border-t-2 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
            
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-purple-100">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Send Email</p>
                  <p className="text-xs text-gray-600">Click "Open Email Client" to send a password reset request</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-purple-100">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Include Phone Number</p>
                  <p className="text-xs text-gray-600">Make sure to mention your registered phone number</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-purple-100">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Check Email</p>
                  <p className="text-xs text-gray-600">Our support team will respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-gray-600 mb-2">
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
