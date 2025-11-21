import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

export default function PrivacyPolicyPage() {
  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-4">
          At <strong>Maitree Marathi</strong>, we value your privacy and are committed
          to protecting your personal information. This policy explains how we
          collect, use, and safeguard your data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Name and basic profile information</li>
          <li>Email address or phone number (for login and communication)</li>
          <li>Usage data such as lessons completed, preferences, and interactions</li>
          <li>Referral and wallet-related activity</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>To provide and improve learning features</li>
          <li>To maintain your profile and progress</li>
          <li>To generate referral rewards</li>
          <li>To enhance the overall user experience</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
        <p className="text-gray-700">
          We use modern security practices to protect your data. However, no
          online platform can guarantee 100% safety.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Services</h2>
        <p className="text-gray-700">
          We may use trusted third-party services for payments, analytics, or
          communication. These services follow their own privacy policies.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>You can update your profile information anytime</li>
          <li>You can request account deletion</li>
          <li>You can opt out of promotional messages</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Updates to This Policy</h2>
        <p className="text-gray-700">
          We may update this policy from time to time. The latest version will
          always be available here.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions regarding this Privacy Policy, feel free to
          contact us at:
          <br />
          <span className="text-orange-600 font-semibold">support@maitreemarathi.com</span>
        </p>

        <p className="mt-6 text-gray-500 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </DashboardLayout>
  );
}
