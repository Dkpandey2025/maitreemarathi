// src/pages/PrivacyPolicyPage.jsx
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-yellow-50 p-8 flex justify-center">
      <div className="max-w-3xl bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-4">Privacy Policy</h2>
        <p className="text-gray-700 mb-4">
          We value your privacy. Maitree Marathi collects minimal personal data necessary
          to provide you with our services and improve your learning experience.
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>We do not share your data with third parties.</li>
          <li>Your account information is securely stored.</li>
          <li>You can request deletion of your data anytime.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          By using this platform, you agree to our terms and policies. For questions,
          contact us at{" "}
          <a
            href="mailto:support@maitreemarathi.com"
            className="text-orange-600 underline"
          >
            support@maitreemarathi.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
