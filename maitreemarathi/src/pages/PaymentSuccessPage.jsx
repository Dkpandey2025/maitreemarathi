import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Processing your payment...");

  useEffect(() => {
    activateSubscription();
  }, []);

  const activateSubscription = async () => {
    try {
      // Get payment details from URL params
      const paymentId = searchParams.get("payment_id");
      const paymentRequestId = searchParams.get("payment_request_id");
      
      // ✅ CRITICAL: Verify payment IDs exist
      if (!paymentId && !paymentRequestId) {
        setStatus("error");
        setMessage("Invalid payment. Please complete the payment process.");
        setTimeout(() => navigate("/plan"), 3000);
        return;
      }
      
      // Get user data and plan from localStorage
      const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
      const userPhone = localStorage.getItem("userPhone"); // Could be phone or email
      const plan = localStorage.getItem("selectedPlan") || "monthly";

      // ✅ Get user identifier (phone or email) with multiple fallbacks
      const identifier = userPhone || user.phone || user.email;

      if (!identifier) {
        setStatus("error");
        setMessage("User not found. Please login again.");
        setTimeout(() => navigate("/login"), 3000);
        return;
      }

      console.log("🔍 Activating subscription for:", identifier);

      // Activate subscription with payment verification
      const res = await axios.post(API_ENDPOINTS.SUBSCRIPTION_ACTIVATE, {
        identifier: identifier,
        phone: user.phone, // Send both for backward compatibility
        email: user.email,
        subscriptionType: plan,
        paymentId: paymentId,
        paymentRequestId: paymentRequestId
      });

      if (res.data.status === "success") {
        setStatus("success");
        setMessage("Subscription activated successfully!");
        
        // Clear selected plan
        localStorage.removeItem("selectedPlan");
        
        // Redirect to profile after 3 seconds
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(res.data.message || "Failed to activate subscription");
      }
    } catch (err) {
      console.error("Activation error:", err);
      setStatus("error");
      setMessage("An error occurred while activating your subscription");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {status === "processing" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing...</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to your profile...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => navigate("/plan")}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
